const pokemonList = document.getElementById('pokemonList');
let pressedBtn = false;
class Card {
    constructor(nom, pokedexId, generation, imageURL) {
        this.nom = nom;
        this.pokedexId = pokedexId;
        this.generation = generation;
        this.imageURL = imageURL;

        this.createCard(); // Appel de la méthode pour créer la carte
    }

    /*
    <img src=''>
    <div>
        <h2>nom</h2>
        <h2>Id</h2>    
    </div>
    */

    createCard(Card) {
        this.li = document.createElement("li");
        this.li.classList.add('carte');

        this.imagePkmn = document.createElement("img");
        this.imagePkmn.src = this.imageURL;
        this.imagePkmn.alt = `image de ${this.nom}`;
        this.imagePkmn.classList.add('imagePkmn');

        this.div = document.createElement("div");
        this.div.classList.add(`infos`);

        this.h2Name = document.createElement("h2");
        this.h2Name.textContent = this.nom;

        this.h2gen = document.createElement("h2");
        this.h2gen.textContent = `G : ${this.generation}`;

        this.h2Id = document.createElement("h2");
        this.h2Id.textContent = `Id : ${this.pokedexId}`;


        this.div.appendChild(this.h2Name);
        this.div.appendChild(this.h2gen);
        this.div.appendChild(this.h2Id);


        this.li.appendChild(this.imagePkmn);
        this.li.appendChild(this.div);

        pokemonList.appendChild(this.li);

        this.li.addEventListener('click', () => {
            if (pressedBtn) return;
            if (`../cris/${this.pokedexId}.ogg`) {
                playAudio(this.pokedexId);
            }
        })
    }
}
const playAudio = (Id) => {
    const cri = new Audio(`../cris/${Id}.ogg`);
    cri.currentTime = 0;
    cri.play();
    cri.volume = 0.03;
    pressedBtn = true;
    cri.addEventListener('ended', () => {
        pressedBtn = false;
    });
}

export { Card };