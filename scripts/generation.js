const generationDiv = document.getElementById("generationDiv");

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {
        const genTable = [];

        pokemons.forEach(pokemon => {
            genTable.includes(pokemon.generation) ?
                null : genTable.push(pokemon.generation);
        });

        // POur chaque gen, on créait un radio
        genTable.forEach(gen => {

            const label = document.createElement('label');
            label.textContent = gen;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'typeRadio';
            radio.value = gen;

            label.appendChild(radio);
            generationDiv.appendChild(label);

        })
    })
    .catch(error => {
        console.error("erreur pendant la récupération des gen : " + error);
    });

export { genTable };