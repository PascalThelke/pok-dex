let currentPokemon;
let statusContainer;
let evolutionLine;
let chartDataStats = [];
let chartDataLabel = [];



function init() {
  loadPokemon();
  loadEvolutions();
}

async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded :', currentPokemon);

  renderPokemonInfo();
}

async function loadEvolutions(){
  let url = 'https://pokeapi.co/api/v2/evolution-chain/1/';
  let response = await fetch(url);
  evolutionLine = await response.json();
  console.log('info:', evolutionLine);
}

async function loadSpeciesData(){
  let url = 'https://pokeapi.co/api/v2/pokemon-species/1/';
  let response = await fetch(url);
  evolutionLine = await response.json();
  console.log('info:', evolutionLine);
}

function renderPokemonInfo() {
  document.getElementById('pokemonName').innerHTML = capitalizeFirstLetter(currentPokemon['name']);
  document.getElementById('firstType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
  document.getElementById('secondType').innerHTML = capitalizeFirstLetter(currentPokemon['types']['1']['type']['name']);
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#00' + currentPokemon['id'];

}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderAbout() {
  let aboutContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;
  aboutContainer.innerHTML += `

<div class="singleInfoLine">
    <div>
        Name: 
    </div>
    <div> 
        ${currentPokemon['name']} 
    </div>
</div>
<div class="singleInfoLine">
    <div>
        Weight: 
    </div>
    <div> 
        ${currentPokemon['weight']} 
    </div>
</div>
<div class="singleInfoLine">
    <div>
        Height: 
    </div>
    <div> 
        ${currentPokemon['height']} 
    </div>
</div>
  `;


}

function renderStats() {
  statusContainer = document.getElementById('pokemonInfo');
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
  renderStatChart();
  renderChart();
}



function renderStatChart(){
  statusContainer.innerHTML += `
    <div>
      <canvas id="statChart"></canvas>
    </div>
  `;
}