import { displayPkmn } from "./pokemonList.js";
import { pkmnbyTypes } from "./types.js";

const generationDiv = document.getElementById("generationDiv");
const genTable = ['All'];
let pkmnbyGen = [];

const titre = document.createElement('legend');
titre.textContent = 'Choisissez votre gen : '
generationDiv.appendChild(titre);

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            genTable.includes(pokemon.generation) ?
                null : genTable.push(pokemon.generation);
        });

        // Pour chaque gen, on crée un radio (même nom!!)
        genTable.forEach((gen, index) => {

            const label = document.createElement('label');
            label.textContent = gen;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `generationRadio`;
            radio.value = gen;

            radio.addEventListener('change', function () {
                const selectedGeneration = document.querySelector('input[name="generationRadio"]:checked').value;

                const apiUrl = (selectedGeneration === 'All') ?
                    'https://api-pokemon-fr.vercel.app/api/v1/pokemon' :
                    `https://api-pokemon-fr.vercel.app/api/v1/gen/${selectedGeneration}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(pokemons => {
                        pkmnbyGen = pokemons;
                        displayPkmn(pkmnbyTypes, pkmnbyGen);
                    })
                    .catch(error => {
                        console.error('Erreur pendant la récupération des pkmn par génération : ' + error);
                    });
            });
            label.appendChild(radio);
            generationDiv.appendChild(label);
        });
    })
    .catch(error => {
        console.error("Erreur pendant la récupération des générations : " + error);
    });
export { pkmnbyGen };