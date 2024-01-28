let pokedexData;
let backgroundColor;
let backgroundColor2;
let currentPokemon;
let aboutContainer;
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
  loadAllPokemonInfos();
}

async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  await loadSpeciesData();

}

async function loadSinglePokemon(i) {
  document.getElementById('portrait').style.display = 'unset';
  await loadPokemon(i);
  renderPokedexHeader();
  renderPokemonInfo();
  renderAbout();
  renderStatChart();
}

async function loadSpeciesData() {
  let url = currentPokemon['species']['url'];
  let response = await fetch(url);
  speciesData = await response.json();
}

async function renderColor() {
  backgroundColor = currentPokemon['types']['0']['type']['name'];
  if (currentPokemon['types'].length == 2) {
    backgroundColor2 = currentPokemon['types']['1']['type']['name'];
  }

  document.getElementById('singleView').classList.add(`${backgroundColor}`);
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

async function pokedexCardColor() {
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
    document.getElementById('secondType').style.display = 'unset';
    document.getElementById('secondType').classList.add(`${currentPokemon['types']['1']['type']['name']}`);
    document.getElementById('secondType').style.opacity = 0.8;
  }
  document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  document.getElementById('pokemonId').innerHTML = '#' + String(currentPokemon['id']).padStart(3, '0');
}

async function loadAllPokemonInfos() {
  for (let i = 0; i < pokedexData['results'].length; i++) {
    await loadPokemon((i + 1) + loadedAmountStart);
    pokemonSprites.push(currentPokemon['sprites']['other']['official-artwork']['front_default']);
    pokemonTypes.push(capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']));
    pokemoIDs.push(currentPokemon['id']);
  }
  renderPokedexData();
}

async function expandPokedexNext() {
  loadedAmountStart += 20;
  await loadPokedex();
  renderPokedex();
}

function renderStats() {
  aboutContainer = document.getElementById('pokemonInfo');
  aboutContainer.innerHTML = ``;
  loadStats();
  renderColor();
}

function loadStats() {
  for (let i = 0; i < currentPokemon['stats'].length; i++) {
    const singleStatName = capitalizeFirstLetter(currentPokemon['stats'][i]['stat']['name']);
    const singleStatValue = currentPokemon['stats'][i]['base_stat'];
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

function noClose(event) {
  event.stopPropagation();
}

function nextPokemon() {
  let nextIndex = currentPokemon['id'] + 1;
  if (nextIndex === 387) {
    nextIndex = 1;
  }
  loadSinglePokemon(nextIndex);
}

function previousPokemon() {
  let previousIndex = currentPokemon['id'] - 1;
  if (previousIndex === 0) {
    previousIndex = 386;
  }
  loadSinglePokemon(previousIndex);
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
