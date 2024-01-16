let currentPokemon;


function init(){
    loadPokemon();
}

 async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded :', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo(){
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
      let text = element.textContent;
      let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
      element.textContent = capitalizedText;
    }
  }

