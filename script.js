let pokedexData;
let currentPokemon;
let statusContainer;
let aboutContainer;
let evolutionData;
let speciesData;
let chartDataStats = [];
let chartDataLabel = [];



function init() {
  loadPokedex();
  loadPokemon();
  loadEvolutions();
  loadSpeciesData();
  
}

// FetchDataFunktionen

async function loadPokedex() {
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
  let response = await fetch(url);
  pokedexData = await response.json();
  console.log('loaded Dex: ', pokedexData);

}

async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded pokeInfo:', currentPokemon);

  renderPokemonInfo();
  
}

async function loadEvolutions(){
  let url = 'https://pokeapi.co/api/v2/evolution-chain/1/';
  let response = await fetch(url);
  evolutionData = await response.json();
  console.log('evolution info:', evolutionData);
}

async function loadSpeciesData(){
  let url = 'https://pokeapi.co/api/v2/pokemon-species/1/';
  let response = await fetch(url);
  speciesData = await response.json();
  console.log('species info:', speciesData);
  renderAbout();
}


function renderPokemonInfo() {
  document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById('firstType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
  document.getElementById('secondType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']);
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#00' + currentPokemon['id'];

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
}

// RenderHTMLfunktionen

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
              <span>Abilities :</span>
          </div>
          <div>
              ${capitalizeFirstLetter(currentPokemon['abilities']['0']['ability']['name'])},
              ${capitalizeFirstLetter(currentPokemon['abilities']['1']['ability']['name'])}
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

}

function renderStatusTable(i, singleStatValue, singleStatName){
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

function renderStatChart(){
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

function convertNumberTo100(number) {
  return (number / 10).toFixed(1);
  
}


