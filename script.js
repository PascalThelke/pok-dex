let currentPokemon;
let statusContainer;
let chartDataStats = [];
let chartDataLabel = [];



function init() {
  loadPokemon();
}

async function loadPokemon() {
  let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded :', currentPokemon);

  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
  capitalizeFirstLetter('pokemonName');
  document.getElementById('firstType').innerHTML = currentPokemon['types']['0']['type']['name'];
  capitalizeFirstLetter('firstType');
  document.getElementById('secondType').innerHTML = currentPokemon['types']['1']['type']['name'];
  capitalizeFirstLetter('secondType');
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#00' + currentPokemon['id'];

}

function capitalizeFirstLetter(elementId) {
  let element = document.getElementById(elementId);
  if (element) {
    let text = element.innerHTML;
    let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    element.innerHTML = capitalizedText;
  }
}

function renderAbout() {
  let aboutContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;
  aboutContainer.innerHTML += `
  <div>  ${currentPokemon['name']} </div>
  `;


}

function renderStats() {
  statusContainer = document.getElementById('pokemonInfo');
  statusContainer.innerHTML = ``;

  for (let i = 0; i < currentPokemon['stats'].length; i++) {
    const singleStatName = currentPokemon['stats'][i]['stat']['name'];
    const singleStatValue = currentPokemon['stats'][i]['base_stat'];
    //  prüft, ob es bereits ein Element im Array gibt, das den gleichen Label-Wert und den gleichen Wert hat wie die aktuellen Werte
    const isDuplicate = chartDataLabel.some((label, i) => label === singleStatName && chartDataStats[i] === singleStatValue);

    if (!isDuplicate) {
      chartDataStats.push(singleStatValue);
      chartDataLabel.push(singleStatName);
    }

    statusContainer.innerHTML += `
      <div class="singleStatLine">
        <div id="statName"> 
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