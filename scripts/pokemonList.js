import { Card } from "./pokemonCard.js";
import { typesTable } from "./types.js";

const generationDiv = document.getElementById('generationDiv');
const typeDiv = document.getElementById('typeDiv');
const pokemonList = document.getElementById('pokemonList');

let pkmnbyGen = [];

generationDiv.addEventListener('change', function () {
    const selectedGeneration = document.querySelector('input[name="generationRadio"]:checked').value;

    const apiUrl = (selectedGeneration === 'All') ?
        'https://api-pokemon-fr.vercel.app/api/v1/pokemon' :
        `https://api-pokemon-fr.vercel.app/api/v1/gen/${selectedGeneration}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(pokemons => {
            pkmnbyGen = pokemons;
            displayPkmn(pkmnbyGen);
            console.log(pkmnbyGen)
        })
        .catch(error => {
            console.error('Erreur pendant la récupération des pkmn par génération : ' + error);
        });
});




function displayPkmn(pokemons) {
    pokemonList.innerHTML = '';

    pokemons.forEach(pokemon => {
        const { name, pokedexId, sprites } = pokemon;
        const card = new Card(name.fr, pokedexId, sprites.regular);
    });
}

export { displayPkmn };