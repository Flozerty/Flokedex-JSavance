import { displayPkmn } from "./pokemonList.js";
const typeDiv = document.getElementById("typeDiv");
const typesTable = [];

let pkmnbyTypes = [];
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
            label.textContent = type;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'typesCheckbox';
            checkbox.value = type;

            checkbox.addEventListener('change', function () {
                const selectedTypeElements = document.querySelectorAll('input[name="typesCheckbox"]:checked');
                const selectedTypes = Array.from(selectedTypeElements).map(checked => checked.value);
                console.log(selectedTypes)
                fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
                    .then(response => response.json())
                    .then(pokemons => {
                        pkmnbyTypes = [];
                        for (let i = 0; i < pokemons.length; i++) {
                            const pokemonType = pokemons[i].types?.map(type => type.name);
                            pokemons[i].types?.forEach(type => {

                                if (selectedTypes.includes(type.name)) {
                                    console.log('c');
                                    pkmnbyTypes.push(pokemons[i]);
                                }
                            })
                        }
                        console.log(pkmnbyTypes)
                        displayPkmn(pkmnbyTypes)
                    });
            });

            label.appendChild(checkbox);
            typeDiv.appendChild(label);
        });
    })
    .catch(error => {
        console.error("erreur pendant la récupération des types : " + error);
    });



export { typesTable }