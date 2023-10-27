import { Card } from "./pokemonCard.js";
import { selectedTypes } from "./types.js";
const pokemonList = document.getElementById('pokemonList');

const displayPkmn = (typesList, genList) => {
    console.log('PkmnType : ', typesList, 'PkmnGen : ', genList)

    pokemonList.innerHTML = '';
    let matchingPkmn = [];
    {
        if (!genList[0]) {
            matchingPkmn = [...typesList]
        }
        if ((!typesList[0] && !selectedTypes[1]) || !selectedTypes[0]) {
            matchingPkmn = [...genList]
        }

        for (let i = 0; i < genList.length; i++) {
            const genPkmn = genList[i];

            for (let j = 0; j < genList.length; j++) {
                const typePkmn = typesList[j];
                if (genPkmn?.pokedexId === typePkmn?.pokedexId) {
                    matchingPkmn.push(genPkmn);

                }
            }
        }
    }

    console.log('match : ', matchingPkmn)

    matchingPkmn.forEach(pokemon => {

        const { name, pokedexId, generation, sprites } = pokemon;
        const card = new Card(name.fr, pokedexId, generation, sprites.regular);
    });
}

export { displayPkmn };