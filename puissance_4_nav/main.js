let j1 = document.getElementById("j1");
let j2 = document.getElementById("j2");

let btnIA = document.getElementById("IA");

let scoreJ1 = 0;
let scoreJ2 = 0;

jeu.initialisationTableau();

btnIA.addEventListener("change", ()=> {
    jeu.isIAOn = !jeu.isIAOn;
})
