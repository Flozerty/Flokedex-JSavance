import { displayPkmn } from "./pokemonList.js";
import { pkmnbyGen } from "./generation.js";

const typeDiv = document.getElementById("typeDiv");
let typesTable = [];
let pkmnbyTypes = [];
let selectedTypes = [];

const titre = document.createElement('legend');
titre.textContent = 'Choisissez vos types : '
typeDiv.appendChild(titre);

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {

        //On récupère tous les types
        pokemons.forEach(pokemon => {
            if (pokemon.types) {
                pokemon.types.forEach(type => {
                    if (!typesTable.includes(type.name)) {
                        typesTable.push(type.name);
                    }
                });
            }
        });

        // POur chaque type, on créait un radio
        typesTable.forEach(type => {
            const label = document.createElement('label');
            label.textContent = `${type} :`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'typesCheckbox';
            checkbox.value = type;

            checkbox.addEventListener('change', function () {
                const selectedTypeElements = document.querySelectorAll('input[name="typesCheckbox"]:checked');
                selectedTypes = Array.from(selectedTypeElements).map(checked => checked.value);
                console.log('select types : ', selectedTypes)
                fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
                    .then(response => response.json())
                    .then(pokemons => {
                        pkmnbyTypes = [];
                        for (let i = 1; i < pokemons.length; i++) {
                            let allTypes = true;
                            let pokemonTypes = [];

                            if (pokemons[i].types) {
                                pokemonTypes = pokemons[i].types.map(type => type.name)
                            }

                            // si un des deux types n'est pas présent, on ne prend pas.
                            for (const selectedType of selectedTypes) {
                                if (!pokemonTypes.includes(selectedType)) {
                                    allTypes = false;
                                    break;
                                }
                            }
                            if (allTypes) {
                                pkmnbyTypes.push(pokemons[i]);
                            }
                        }
                        displayPkmn(pkmnbyTypes, pkmnbyGen);
                    })
                    .catch(error => {
                        console.error("erreur pendant la récupération des types : " + error);
                    });
            });

            label.appendChild(checkbox);
            typeDiv.appendChild(label);
        });
    })
    .catch(error => {
        console.error("erreur pendant la récupération des types : " + error);
    });



export { typesTable };
export { pkmnbyTypes };
export { selectedTypes };