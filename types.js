const typeDiv = document.getElementById("typeDiv");

fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
    .then(response => response.json())
    .then(pokemons => {
        const Types = [];

        //On récupère tous les types
        pokemons.forEach(pokemon => {
            if (pokemon.types) {
                pokemon.types.forEach(type => {
                    if (!Types.includes(type.name)) {
                        Types.push(type.name);
                    }
                });
            }
        });

        // POur chaque type, on créait un radio
        Types.forEach(type => {

            const label = document.createElement('label');
            label.textContent = type;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'typeRadio';
            radio.value = type;

            label.appendChild(radio);
            typeDiv.appendChild(label);

        });
    })
    .catch(error => {
        console.error("erreur pour la récupération des types : " + error);
    });