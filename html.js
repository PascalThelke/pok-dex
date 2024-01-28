function renderPokedexData() {
    for (let i = 0; i < pokedexData['results'].length; i++) {
        let pokedexContainer = document.getElementById(`pokemoncard${i + loadedAmountStart}`);
        pokedexContainer.innerHTML += `
        <img id="pokedexIMG" src="${pokemonSprites[i]}" alt="">
        <div class="row w100 spaceBetw">
          <div id="pokedexType${[i + loadedAmountStart]}">${pokemonTypes[i]}</div>
          <div id="secondPokedexType${[i + loadedAmountStart]}">${pokemonTypes2[i]}</div>
          <div>#${String(pokemoIDs[i]).padStart(3, '0')}</div>
        </div>
      `;
        document.getElementById(`pokedexType${[i + loadedAmountStart]}`).style.display = 'unset';
        pokedexContainer.classList.add(`${lowerFirstLetter(pokemonTypes[i])}`);
    }
    pokemonSprites = [];
    pokemonTypes = [];
    pokemonTypes2 = [];
    pokemoIDs = [];
}

function renderPokedex() {
    let pokedex = document.getElementById('pokedex');
    for (let i = 0; i < pokedexData['results'].length; i++) {
        const pokemonCardName = capitalizeFirstLetter(pokedexData['results'][i]['name']);
        pokedex.innerHTML += `
      <div onclick="loadSinglePokemon(${[(i + 1) + loadedAmountStart]})" id="pokemoncard${[i + loadedAmountStart]}" class="pokemoncard">
        ${pokemonCardName}
      </div>
      `;
    }
}

function renderInfoboxHTML() {
    let pokedex = document.getElementById('singleView');
    pokedex.innerHTML += `
    <div id="infobox">
          <nav>
              <span id="aboutlink" onclick="renderAbout()">About</span>
              <span id="statslink" onclick="renderStats()">Base Stats</span>
              <span id="chartlink" onclick="renderStatChart()">Status Chart</span>
          </nav>
          <div id="pokemonInfo">
          
          </div>
   
      </div>
    `;
}

function renderPokedexHeader() {
    let container = document.getElementById('singleView');
    container.innerHTML = `
    <div class="pokedexHeader">
    <div class="column">
        <h1 id="pokemonName">Name</h1>
        <div class="typeBox">
            <div id="firstType">
            </div>
            <div id="secondType">
            </div>
        </div>   
    </div>
    <b><h1 id="pokemonId">
        #id
    </h1></b>      
  </div>
  <div class="pokedex-navcontainer">
    <button class="center" id="previousPortrait-button" onclick="previousPokemon()">
    <img src="./img/arrow_left.png" alt="">
    </button>
    <button class="center" id="nextPortrait-button" onclick="nextPokemon()">
      <img src="./img/arrow_right.png" alt="">
    </button>
  </div>
  <div class="center w100">
    <img id="pokemonPicture" src="#" alt="">
  </div>
    `;
    if (currentPokemon['id'] > 1) {
        document.getElementById('previousPortrait-button').disabled = false;
    }
}

function renderAbout() {
    document.getElementById('aboutlink').classList.add('indicator');
    document.getElementById('statslink').classList.remove('indicator');
    document.getElementById('chartlink').classList.remove('indicator');
    aboutContainer = document.getElementById('pokemonInfo');
    aboutContainer.innerHTML = ``;
    aboutContainer.innerHTML += `
  <div class="topContainerAbout">
    <div class="w100 center column">
        <div class="singleInfoLine">
            <div>
              <span>Name :</span>
            </div>
            <div>
                ${capitalizeFirstLetter(currentPokemon['name'])}
            </div>
        </div>
        <div class="singleInfoLine">
            <div>
              <span>Species :</span>
            </div>
            <div>
                ${speciesData['genera']['7']['genus']}
            </div>
        </div>
        <div class="singleInfoLine">
            <div>
              <span> Weight :</span>
            </div>
            <div>
                ${convertNumberTo100(currentPokemon['weight'])} kg
            </div>
        </div>
    </div>
    <div class="w100 center column">
        <div class="singleInfoLine">
            <div>
                <span>Ability :</span>
            </div>
            <div>
                ${capitalizeFirstLetter(currentPokemon['abilities']['0']['ability']['name'])}
            </div>
        </div>
        <div class="singleInfoLine">
            <div>
              <span>Habitat :</span>
            </div>
            <div>
                ${capitalizeFirstLetter(speciesData['habitat']['name'])}
            </div>
        </div>
        <div class="singleInfoLine">
            <div>
              <span>Height :</span>
            </div>
            <div>
                ${convertNumberTo100(currentPokemon['height'])} m
            </div>
        </div>
    </div>
  </div>
  <div class="entryInfo column">
    <span>
      Entry : 
    </span>
    <div id="flavorText">
    </div>
  </div>
    `;
    renderFlavorText();
    renderColor();
}

function renderFlavorText() {
    for (let i = 0; i < speciesData['flavor_text_entries'].length; i++) {
        let pokemonFlavorTextData = speciesData['flavor_text_entries'][i];
        if (pokemonFlavorTextData['language']['name'] == 'en') {
            let pokemonFlavorText = speciesData['flavor_text_entries'][i]['flavor_text'];
            document.getElementById('flavorText').innerHTML = pokemonFlavorText;
        }
    }
}

function renderStatusTable(i, singleStatValue, singleStatName) {
    aboutContainer = document.getElementById('pokemonInfo');
    aboutContainer.innerHTML += `
        <div class="singleInfoLine">
          <div id="statName${[i]}"> 
            ${singleStatName} 
          </div>
          <div>
            ${singleStatValue}
          </div>
        </div>
      `;
}

function renderStatChart() {
    document.getElementById('chartlink').classList.add('indicator');
  document.getElementById('aboutlink').classList.remove('indicator');
  document.getElementById('statslink').classList.remove('indicator');
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        const singleStatName = capitalizeFirstLetter(currentPokemon['stats'][i]['stat']['name']);
        const singleStatValue = currentPokemon['stats'][i]['base_stat'];
        const isDuplicate = isDuplicateLabelAndStat(singleStatName, singleStatValue);
        if (!isDuplicate) {
            chartDataStats.push(singleStatValue);
            chartDataLabel.push(singleStatName);
        }
    }
    aboutContainer = document.getElementById('pokemonInfo');
    aboutContainer.innerHTML = `
      <div>
        <canvas id="statChart"></canvas>
      </div>
    `;
    renderChart();
    chartDataStats = [];
    chartDataLabel = [];
}