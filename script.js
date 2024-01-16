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
    document.getElementById('pokemonPicture').src = currentPokemon['sprites']['other']['dream_world']['front_default'];


}