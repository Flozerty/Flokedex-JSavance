import { Card } from "./pokemonCard.js";
const pokemonList = document.getElementById('pokemonList');

function displayPkmn(newList, oldList) {
    console.log('old : ', oldList, 'new : ', newList)

    pokemonList.innerHTML = '';
    const matchingPkmn = [];

    if (oldList[0]) {


        for (let i = 0; i < newList.length; i++) {
            const newPkmn = newList[i];

            for (let j = 0; j < newList.length; j++) {
                const oldPkmn = oldList[j];
                if (newPkmn?.pokedexId === oldPkmn?.pokedexId) {
                    matchingPkmn.push(oldPkmn);
                    break;
                }
            }
        }
    } else {
        for (let i = 0; i < newList.length; i++) {
            matchingPkmn.push(newList[i])
        }
    }

    console.log('match : ', matchingPkmn)

    matchingPkmn.forEach(pokemon => {
        const { name, pokedexId, sprites } = pokemon;
        const card = new Card(name.fr, pokedexId, sprites.regular);
    });
}

export { displayPkmn };