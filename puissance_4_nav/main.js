let j1 = document.getElementById("j1");
let j2 = document.getElementById("j2");

let IA = document.getElementById("IA");

let scoreJ1 = 0;
let scoreJ2 = 0;

//let isIAOn = false;

jeu.initialisationTableau();

IA.addEventListener("change", ()=> {
    jeu.isIAOn = !jeu.isIAOn;
    console.log("coucou");
})
