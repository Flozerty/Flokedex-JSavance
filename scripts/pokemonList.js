import { Card } from "./pokemonCard.js";
const pokemonList = document.getElementById('pokemonList');





function displayPkmn(pokemons) {
    pokemonList.innerHTML = '';

    pokemons.forEach(pokemon => {
        const { name, pokedexId, sprites } = pokemon;
        const card = new Card(name.fr, pokedexId, sprites.regular);
    });
}

export { displayPkmn };