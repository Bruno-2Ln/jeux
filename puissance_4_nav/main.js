let j1 = document.getElementById("j1");
let j2 = document.getElementById("j2");

let scoreJ1 = 0;
let scoreJ2 = 0;

initialisationTableau()


jeu.initialisation();
jeu.afficherPuissance4();

function initialisationTableau() {

    let imgJ1 = document.createElement("img");
    let imgJ2 = document.createElement("img");
    let ContainerScoreJ1 = document.createElement("p");
    let ContainerScoreJ2 = document.createElement("p");

    imgJ1.src = "./images/J1.png";
    imgJ2.src = "./images/J2.png";

    j1.appendChild(imgJ1);
    j2.appendChild(imgJ2);

    toolbox.addClasses(imgJ1, ["bg-danger","rounded-circle"]);
    toolbox.addClasses(imgJ2, ["bg-info","rounded-circle"]);

    j1.appendChild(ContainerScoreJ1);
    j2.appendChild(ContainerScoreJ2);

    jeu.initialisation();
    jeu.afficherPuissance4();
}
