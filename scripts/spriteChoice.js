const spritesDiv = document.getElementById("spritesDiv");
const spriteChoice = ['regular', 'shiny'];

spriteChoice.forEach(sprite => {

    const label = document.createElement('label');
    label.textContent = sprite;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'spritesRadio';
    radio.value = sprite;

    label.appendChild(radio);
    spritesDiv.appendChild(label);
})

export { spriteChoice };