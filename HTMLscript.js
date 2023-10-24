const types = ['Acier', 'Combat', 'Dragon', 'Eau', 'Électrik', 'Fée', 'Feu', 'Glace', 'Insecte', 'Normal', 'Plante', 'Poison', 'Psy', 'Roche', 'Sol', 'Spectre', 'Ténèbres', 'Vol'];
const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9]


fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon')
    .then(response => response.json())
    .then(data => {
        const pokemonByType = {};

        types.forEach(type => {
            pokemonByType[type] = getTypes(data, type);
        });

        console.log('Pokémons par type :', pokemonByType);
    })
    .catch(err => console.log(err));


const getTypes = (data, type) => {
    return data
        .filter(pokemon => Array.isArray(pokemon.types) && pokemon.types.some(pokemonType => pokemonType.name === type))
        .map(pokemon => pokemon.name.fr);
}
