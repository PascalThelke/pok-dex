let pokedexData;
let backgroundColor;
let currentPokemon;
let aboutContainer;
let speciesData;
let chartDataStats = [];
let chartDataLabel = [];
let pokemonSprites = [];
let pokemonTypes = [];
let pokemonTypes2 = [];
let pokemoIDs = [];
let loadedAmountLimit = 20; //
let loadedAmountStart = 0;



async function init() {
  await loadPokedex();
  renderPokedex();

}

// FetchDataFunktionen

async function loadPokedex() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${loadedAmountLimit}&offset=${loadedAmountStart}`;
  let response = await fetch(url);
  pokedexData = await response.json();
  console.log('loaded Dex: ', pokedexData);

  loadAllPokemonInfos();
}

async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  // let url = `${pokedexData['results'][i]['url']}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded currentPokemon:', currentPokemon);

  await loadSpeciesData();
}

async function loadSinglePokemon(i) {
  document.getElementById('singleView').classList.remove(`${backgroundColor}`);
  document.getElementById('portrait').style.display = 'unset';
  
  await loadPokemon(i);
  renderPokedexHeader();
  renderPokemonInfo();
  renderAbout();
  

}

async function loadSpeciesData() {
  let url = currentPokemon['species']['url'];
  let response = await fetch(url);
  speciesData = await response.json();
  // console.log('species info:', speciesData);

}



async function renderColor() {
  backgroundColor = currentPokemon['types']['0']['type']['name'];
  document.getElementById('singleView').classList.add(`${backgroundColor}`);
  // document.getElementById(`pokemoncard`).classList.add(`${backgroundColor}`);
  
  let infoLineColor = document.getElementsByClassName('singleInfoLine');
  for (let i = 0; i < infoLineColor.length; i++) {
    const singleLine = infoLineColor[i];
    singleLine.classList.add(`${backgroundColor}`);
  }
  let entryInfoColor = document.getElementsByClassName('entryInfo');
  for (let i = 0; i < entryInfoColor.length; i++) {
    const singleEntry = entryInfoColor[i];
    singleEntry.classList.add(`${backgroundColor}`);
  }

}

async function pokedexCardColor(){
  let pokeCard = document.getElementsByClassName('pokemoncard');
  for (let i = 0; i < pokeCard.length; i++) {
    const singleCard = pokeCard[i];
    singleCard.classList.add(`${backgroundColor}`);
  }
}

function renderPokemonInfo() {
  renderInfoboxHTML();
  document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById('firstType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
  document.getElementById('firstType').style.display = 'unset'
  if (currentPokemon['types'].length == 2) {
    document.getElementById('secondType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']);
    document.getElementById('secondType').style.display = 'unset'
  }
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#' + String(currentPokemon['id']).padStart(3, '0');

}

async function loadAllPokemonInfos() {
  for (let i = 0; i < pokedexData['results'].length; i++) {
    await loadPokemon((i + 1) + loadedAmountStart);
    pokemonSprites.push(currentPokemon['sprites']['other']['official-artwork']['front_default']);
    pokemonTypes.push(capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']));
    if (currentPokemon['types'].length == 2) {
      pokemonTypes2.push(capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']));
    }
    pokemoIDs.push(currentPokemon['id']);
  }
  renderPokedexData();
}

function renderPokedex() {
  let pokedex = document.getElementById('pokedex');
  // pokedex.innerHTML = ``;
  for (let i = 0; i < pokedexData['results'].length; i++) {
    const pokemonCardName = capitalizeFirstLetter(pokedexData['results'][i]['name']);
    pokedex.innerHTML += `
    <div onclick="loadSinglePokemon(${[(i + 1) + loadedAmountStart]})" id="pokemoncard${[i + loadedAmountStart]}" class="pokemoncard">
      ${pokemonCardName}
    </div>
    `;
  }
}


async function expandPokedexNext() {
  loadedAmountStart += 20;
  // loadedAmountLimit += 20;
  await loadPokedex();
  renderPokedex();
}


function renderPokedexData() {
  // Alle Daten in den gerenderten Pokedex einfügen
  for (let i = 0; i < pokedexData['results'].length; i++) {
    let pokedexContainer = document.getElementById(`pokemoncard${i + loadedAmountStart}`);
    pokedexContainer.innerHTML += `
      <img id="pokedexIMG" src="${pokemonSprites[i]}" alt="">
      <div class="row w100 spaceBetw">
        <div id="pokedexType${[i]}">${pokemonTypes[i]}</div>
        <div id="secondPokedexType${[i]}">${pokemonTypes2[i]}</div>
        <div>#${String(pokemoIDs[i]).padStart(3, '0')}</div>
      </div>
    `;
    document.getElementById(`pokedexType${[i]}`).style.display = 'unset';
    let secondTypeContainer = document.getElementById(`secondPokedexType${[i]}`).innerHTML;
    if (secondTypeContainer !== 'undefined') {
      document.getElementById(`secondPokedexType${[i]}`).style.display = 'unset';
    }
    pokedexContainer.classList.add(`${lowerFirstLetter(pokemonTypes[i])}`);
  }
  pokemonSprites = [];
  pokemonTypes = [];
  pokemonTypes2 = [];
  pokemoIDs = [];
}



function renderStats() {
  aboutContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;

  loadStats();
  renderColor();
}

function loadStats(){
  for (let i = 0; i < currentPokemon['stats'].length; i++) {
    const singleStatName = capitalizeFirstLetter(currentPokemon['stats'][i]['stat']['name']);
    const singleStatValue = currentPokemon['stats'][i]['base_stat'];
    //  prüft, ob es bereits ein Element im Array gibt, das den gleichen Label-Wert und den gleichen Wert hat wie die aktuellen Werte
    const isDuplicate = chartDataLabel.some((label, i) => label === singleStatName && chartDataStats[i] === singleStatValue);
    if (!isDuplicate) {
      chartDataStats.push(singleStatValue);
      chartDataLabel.push(singleStatName);
    }
    renderStatusTable(i, singleStatValue, singleStatName);
  }
  chartDataStats = [];
  chartDataLabel = [];
}

function closeView() {
  document.getElementById('portrait').style.display = 'none';
}

function noClose(event){
  event.stopPropagation();
}

// RenderHTMLfunktionen

function renderInfoboxHTML() {
  let pokedex = document.getElementById('singleView');
  pokedex.innerHTML += `
  <div id="infobox">
        <nav>
            <span onclick="renderAbout()">About</span>
            <span onclick="renderStats()">Base Stats</span>
            <span onclick="renderStatChart()">Status Chart</span>
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
  <button class="center" id="previousPortrait-button" disabled onclick="previousPokemon()">
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
  if(currentPokemon['id'] > 1){
    document.getElementById('previousPortrait-button').disabled = false;
  }
  
}

function nextPokemon() {
  let nextIndex = currentPokemon['id']++;
  if (nextIndex === loadedAmountLimit + loadedAmountStart ){
    document.getElementById('nextPortrait-button').disabled = true;
  }else{
    loadSinglePokemon(nextIndex);
  }
  
  
}

function previousPokemon(){
  let previousIndex = currentPokemon['id'] - 2;
    loadSinglePokemon(previousIndex);
    if(currentPokemon['id'] === 1){
      document.getElementById('previousPortrait-button').disabled = true;
    }
}

function renderAbout() {
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

// Hilfsfunktionen

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function lowerFirstLetter(text) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function convertNumberTo100(number) {
  return (number / 10).toFixed(1);

}

function isDuplicateLabelAndStat(label, statValue) {
  //  prüft, ob es bereits ein Element im Array gibt, das den gleichen Label-Wert und den gleichen Wert hat wie die aktuellen Werte
  return chartDataLabel.some((existingLabel, i) => existingLabel === label && chartDataStats[i] === statValue);
}
