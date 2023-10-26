import { Card } from "./pokemonCard.js";
const pokemonList = document.getElementById('pokemonList');





function displayPkmn(pokemons) {
    pokemonList.innerHTML = '';

    pokemons.forEach(pokemon => {
        const { name, types, sprites } = pokemon;
        const card = new Card(name.fr, types, sprites.regular);
    });
}

export { displayPkmn };