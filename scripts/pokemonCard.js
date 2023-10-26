const pokemonList = document.getElementById('pokemonList');

class Card {
    constructor(nom, generation, imageURL) {
        this.nom = nom;
        this.generation = generation;
        this.imageURL = imageURL;

        this.createCard(); // Appel de la méthode pour créer la carte
    }

    /*
    <img src=''>
    <div>
        <h2>nom</h2>
        <h2>gen</h2>    
    </div>
    
    */
    createCard() {
        this.li = document.createElement("li");

        this.image = document.createElement("img");
        this.image.src = this.imageURL;

        this.div = document.createElement("div");

        this.h2Name = document.createElement("h2");
        this.h2Name.textContent = this.nom;

        this.h2Gen = document.createElement("h2");
        this.h2Gen.textContent = this.generation;

        this.div.appendChild(this.h2Name);
        this.div.appendChild(this.h2Gen);


        this.li.appendChild(this.image);
        this.li.appendChild(this.div);

        pokemonList.appendChild(this.li);
    }
}
export { Card };