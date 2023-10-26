import { Card } from './pokemonCard.js';

const generationDiv = document.getElementById("generationDiv");
const genTable = ['All'];
const pokemonList = document.getElementById('pokemonList');
const pkmnByGen = [];
fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {

        pokemons.forEach(pokemon => {
            genTable.includes(pokemon.generation) ?
                null : genTable.push(pokemon.generation);
        });

        // Pour chaque gen, on crée un radio (même nom!!)
        genTable.forEach(gen => {

            const label = document.createElement('label');
            label.textContent = gen;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `generationRadio`;
            radio.value = gen;

            label.appendChild(radio);
            generationDiv.appendChild(label);

        })
    })
    .catch(error => {
        console.error("Erreur pendant la récupération des générations : " + error);
    });

generationDiv.addEventListener('change', function () {
    const selectedGeneration = document.querySelector('input[name="generationRadio"]:checked').value;

    const apiUrl = (selectedGeneration === 'All') ?
        'https://api-pokemon-fr.vercel.app/api/v1/pokemon' :
        `https://api-pokemon-fr.vercel.app/api/v1/gen/${selectedGeneration}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(pokemons => {


            pokemonList.innerHTML = ''; //reset des images

            const newpkmnByGen = pokemons.map(pokemons => {
                return new Card(pokemons.name.fr, pokemons.generation, pokemons.sprites.regular)
            });
            // pkmnByGen prend les nouvelles valeurs
            pkmnByGen.length = 0;
            pkmnByGen.push(...newpkmnByGen);

            console.log(pkmnByGen)

        })
        .catch(error => {
            console.error('Erreur pendant le chargement des sprites par génération : ' + error);
        });
});

export { pkmnByGen };