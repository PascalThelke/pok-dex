let pokedexData;
let backgroundColor;
let currentPokemon;
let statusContainer;
let aboutContainer;
let evolutionData;
let speciesData;
let chartDataStats = [];
let chartDataLabel = [];
let pokemonSprites = [];
let pokemonTypes = [];
let pokemonTypes2 = [];
let pokemoIDs = [];
let loadedAmountLimit = 20;
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

async function loadPokemon(i, pokemonName) {
  // let url = `https://pokeapi.co/api/v2/pokemon/${lowerFirstLetter(pokemonName)}`;
  let url = `${pokedexData['results'][i]['url']}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded currentPokemon:', currentPokemon);

  await loadSpeciesData();
}

async function loadSinglePokemon(i, pokemonName) {
  await loadPokemon(i, pokemonName);

  renderPokedexHeader();
  renderPokemonInfo();
  renderAbout();
  renderColor();

}

async function loadSpeciesData() {
  let url = currentPokemon['species']['url'];
  let response = await fetch(url);
  speciesData = await response.json();
  // console.log('species info:', speciesData);

}



function renderColor() {
  backgroundColor = speciesData['color']['name'];
  console.log('Hintergrundfarbe:', backgroundColor);
  document.getElementById('pokemonId').style.color = backgroundColor;
  document.getElementById('pokedex').style.backgroundColor = 'light' + backgroundColor;
  document.getElementById('firstType').style.backgroundColor = backgroundColor;
  document.getElementById('secondType').style.backgroundColor = backgroundColor;
  let infoLineColor = document.getElementsByClassName('singleInfoLine');
  for (let i = 0; i < infoLineColor.length; i++) {
    const singleLine = infoLineColor[i];
    singleLine.style.backgroundColor = 'light' + backgroundColor;

  }

}

function renderPokemonInfo() {
  renderInfoboxHTML();
  document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById('firstType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
  if (currentPokemon['types'].length > 1) {
    document.getElementById('secondType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']);
  }
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#' + String(currentPokemon['id']).padStart(3, '0');

}

async function loadAllPokemonInfos() {
  for (let i = 0; i < pokedexData['results'].length; i++) {
    await loadPokemon(i);
    pokemonSprites.push(currentPokemon['sprites']['other']['official-artwork']['front_default']);
    pokemonTypes.push(capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']));
    if (currentPokemon['types'].length > 1) {
      pokemonTypes2.push(capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']));
    }
    pokemoIDs.push(currentPokemon['id']);
  }
  renderPokedexData();
}

async function expandPokedexNext(){
  loadedAmountStart = loadedAmountStart + 20;
  await loadPokedex();
  renderPokedex();
  document.getElementById('previousBtn').disabled = false;
}

async function expandPokedexPrevious(){
  loadedAmountStart = loadedAmountStart - 20;
  await loadPokedex();
  renderPokedex();
  if (loadedAmountStart > 19) {
    document.getElementById('previousBtn').disabled = false;
  }
}


function renderPokedexData() {
  // Alle Daten in den gerenderten Pokedex einfügen
  for (let i = 0; i < pokedexData['results'].length; i++) {
    let pokedexContainer = document.getElementById(`pokemoncard${i}`);
    // if (currentPokemon['types'].length == 2){
    //   pokedexContainer.innerHTML += `
    //   <img id="pokedexIMG" src="${pokemonSprites[i]}" alt="">
    //   <div class="row w100 spaceBetw">
    //     <div id="firstType"> ${pokemonTypes[i]} </div>
    //     <div id="secondType"> ${pokemonTypes2[i]} </div>
    //   </div>
    //   <div>#${String(pokemoIDs[i]).padStart(3, '0')}</div>
    // `;
    // } 
    // else {
      pokedexContainer.innerHTML += `
      <img id="pokedexIMG" src="${pokemonSprites[i]}" alt="">
      <div class="row w100 spaceBetw">
        <div id="firstType"> ${pokemonTypes[i]} </div>
        <div>#${String(pokemoIDs[i]).padStart(3, '0')}</div>
      </div>
      
    `;
    // }
  }
  pokemonSprites = [];
  pokemonTypes = [];
  pokemonTypes2 = [];
  pokemoIDs = [];
}


function renderStats() {
  statusContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;
  statusContainer.innerHTML = ``;

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
  renderStatChart();
  renderChart();
  renderColor();
}

// RenderHTMLfunktionen

function renderInfoboxHTML() {
  let pokedex = document.getElementById('pokedex');
  pokedex.innerHTML += `
  <div id="infobox">
        <nav>
            <span onclick="renderAbout()">About</span>
            <span onclick="renderStats()">Base Stats</span>
         
        </nav>
        <div id="pokemonInfo">
        
        </div>
        <div id="pokemonStatus">
          <div id="statusTable">
          </div>

        </div>
    </div>
  `;

}

function renderPokedex() {
  let pokedex = document.getElementById('pokedex');
  pokedex.innerHTML = ``;
  for (let i = 0; i < pokedexData['results'].length; i++) {
    const pokemonCardName = capitalizeFirstLetter(pokedexData['results'][i]['name']);
    // const cardImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    // console.log(pokemonCard);
    pokedex.innerHTML += `
    <div onclick="loadSinglePokemon(${[i]},'${pokemonCardName}')" id="pokemoncard${[i]}" class="pokemoncard">
      ${pokemonCardName}
    </div>
    `;
  }

  renderPokedexFooter(pokedex);
  
}

function renderPokedexFooter(){
  pokedex.innerHTML +=`
  <div class="buttonContainer">
  <button id="previousBtn" disabled onclick="expandPokedexPrevious()">previous</button>
  <button onclick="expandPokedexNext()">next</button>
  </div>
  `;
}

function renderPokedexHeader() {
  let container = document.getElementById('pokedex');
  container.innerHTML = `
  <div class="pokedexHeader">
  <div class="column">
      <h1 id="pokemonName">Name</h1>
      <div class="typeBox">
          <div id="firstType">
              Typ1
          </div>
          <div id="secondType">
              Typ2
          </div>
      </div>   
  </div>
  <b><h1 id="pokemonId">
      #id
  </h1></b>      
</div>
<div class="center w100">
  <img id="pokemonPicture" src="#" alt="">
</div>
  `;
}

function renderAbout() {
  aboutContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;
  aboutContainer.innerHTML += `
  
<div class="topContainerAbout">
  <div class="">
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
  <div class="">
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
<div class="singleInfoLine w80 column">
  <span>
    Entry : 
  </span>
  ${speciesData['flavor_text_entries']['1']['flavor_text']}
</div>
  `;
  renderColor();
}

function renderStatusTable(i, singleStatValue, singleStatName) {
  statusContainer = document.getElementById('statusTable');
  statusContainer.innerHTML += `
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
  statusContainer = document.getElementById('pokemonStatus');
  statusContainer.innerHTML += `
    <div>
      <canvas id="statChart"></canvas>
    </div>
  `;
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


