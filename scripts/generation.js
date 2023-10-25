const generationDiv = document.getElementById("generationDiv");
const genTable = ['All'];
const pokemonList = document.getElementById('pokemonList');

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {

        pokemons.forEach(pokemon => {
            genTable.includes(pokemon.generation) ?
                null : genTable.push(pokemon.generation);
        });

        // Pour chaque gen, on crée un radio
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

    fetch(`https://api-pokemon-fr.vercel.app/api/v1/gen/${selectedGeneration}`)
        .then(response => response.json())
        .then(pokemons => {
            pokemonList.innerHTML = ''; //reset des images

            const pkmnByGen = pokemons.map(pokemon => {
                const img = document.createElement('img');
                img.src = pokemon.sprites.regular;
                img.alt = pokemon.name.fr;
                return img;
            });

            pkmnByGen.forEach(img => {
                pokemonList.appendChild(img);
            });

        })
        .catch(error => {
            console.error('Erreur pendant le chargement des sprites par génération : ' + error);
        });
});

export { genTable };