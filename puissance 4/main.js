let toolbox = require("./toolbox.js");
let jeu = require("./jeu.js");

intro();

jeu.joueur1car = choixCaractere(1);
jeu.joueur2car = choixCaractere(2);
jeu.initialisation();
jeu.afficherPuissance4();

while(true){
    if(jouerCase(1)){
        console.log("Joueur 1 a gagné");
        break;
    }
    if(jouerCase(2)){
        console.log("Joueur 2 a gagné");
        break;
    }
}

/**
 * Intro du jeu
 */
function intro(){
    let txt ="***************************************************\n";
    txt += "***************Bienvenu sur Puissance 4************\n";
    txt += "***************************************************\n";
    console.log(txt);
}

/**
 * Fonction permettant de choisir le caractère qui s'affichera en guise de jeton
 * pendant la partie.
 * @param {Number} joueur 
 * @returns 
 */
function choixCaractere(joueur){
    var txt = "Veuillez choisir le caractere que vous voulez pour joueur " + joueur + " : "
    return toolbox.saisieString(txt)
}


/**
 * Fonction permettant à un joueur de jouer une case.
 * Retourne true par la fonction verificationFinJeu() 
 * (et les fonctions qui la composent) si le joueur a gagné
 * @param {Number} joueur 
 * @returns 
 */
function jouerCase(joueur){
    let ligneVide = -1;
    let colonne = -1;

    while(ligneVide === -1 || colonne <= 0 || colonne >7){
        console.log("Choisir une colonne à un emplacement vide");
        colonne = jeu.saisirColonne();
        ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
    }
    
    jeu.jouerCase(joueur,ligneVide,colonne);
    jeu.afficherPuissance4();
    return jeu.verificationFinJeu(joueur);
}
