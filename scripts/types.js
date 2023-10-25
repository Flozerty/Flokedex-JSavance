const typeDiv = document.getElementById("typeDiv");
const typesTable = [];

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
            checkbox.name = 'typeRadio';
            checkbox.value = type;

            label.appendChild(checkbox);
            typeDiv.appendChild(label);
        });
    })
    .catch(error => {
        console.error("erreur pendant la récupération des types : " + error);
    });



export { typesTable }