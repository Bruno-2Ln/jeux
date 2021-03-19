let readline = require("readline-sync");

let puissance4 = [];
let nbColonne = 7;
let nbLigne = 6;

let joueur1car = choixCaractere(1);
let joueur2car = choixCaractere(2);

intro();

puissance4 = initialiserTableauVide(nbLigne, nbColonne, 0);
afficherPuissance4(puissance4,joueur1car,joueur2car);


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

function intro(){
    let txt ="***************************************************\n";
    txt += "***************Bienvenu sue Puissance 4************\n";
    txt += "***************************************************\n";
    console.log(txt);
}

function choixCaractere(joueur){
    var txt = "Veuillez choisir le caractere que vous voulez pour joueur " + joueur + " : "
    return saisieString(txt)
}

function saisieString(txt){
    return readline.question(txt);
}

/**
 * Fonction permettant à un joueur de jouer une case
 * Retourne true si le joueur a gagné
 * @param {Number} joueur 
 * @returns 
 */
function jouerCase(joueur){
    let ligneVide = -1;
    let colonne = -1;

    while(ligneVide === -1 || colonne <= 0 || colonne >7){
        console.log("Choisir une colonne à un emplacement vide");
        colonne = saisirColonne();
        ligneVide = retournerLigneCaseVideColonne(colonne);
    }
    
    puissance4[ligneVide][colonne-1] = joueur;
    afficherPuissance4(puissance4,joueur1car,joueur2car);
    return verificationFinJeu(joueur);
}

/**
 * Fonction permettant de saisir une colonne
 * @returns 
 */
function saisirColonne(){
    return parseInt(saisieString("Quelle colonne ?"));
}

/**
 * Fonction permettant de retourner la première ligne vide d'une colonne
 * @param {Number} colonne retourne -1 si la colonne est pleine
 * @returns 
 */
function retournerLigneCaseVideColonne(colonne){
    for(let i =nbLigne-1; i>=0; i--){
        if(verifCaseVide(i,colonne)) {
            return i
        };
    }
    return -1;
}

/**
 * Fonction permettant de retourner si une cellule est vide (retourne true / false)
 * @param {Number} ligne 
 * @param {Number} colonne 
 * @returns 
 */
function verifCaseVide(ligne, colonne){
    return puissance4[ligne][colonne-1] === 0
}

/**
 * Fonction permettant de vérifier si un joueur à gagner
 * @param {Number} joueur 
 * @returns 
 */
function verificationFinJeu(joueur){
    if(verificationLigneFinJeu(joueur) || verificationColonneFinJeu(joueur) ||verificationDiagonaleFinJeu(joueur)){
        return true;
    }
    return false;
}

/**
 * Fonction permettant de vérifier si un joeur à gagner sur une ligne
 * @param {Number} joueur 
 * @returns 
 */
function verificationLigneFinJeu(joueur){
    for(let i=nbLigne-1; i>=0; i--){

        for (let j=0; j<nbColonne-3;j++){
            if( puissance4[i][j] === joueur &&
                puissance4[i][j+1] === joueur &&
                puissance4[i][j+2] === joueur &&
                puissance4[i][j+3] === joueur){

                return true;
            }
        }
    }
    return false;
}

/**
 * Fonction permettant de vérifier si un joueur a gagné en colonne
 * @param {Number} joueur 
 * @returns 
 */
function verificationColonneFinJeu(joueur){
    for(let i=0; i<nbColonne; i++){

        for (let j=nbLigne-4; j>=0; j--){
            if( puissance4[j][i] === joueur &&
                puissance4[j+1][i] === joueur &&
                puissance4[j+2][i] === joueur &&
                puissance4[j+3][i] === joueur){

                return true
                }
        }
    }
}

/**
 * Fonction permettant de vérifier si un joueur a gagné en diagonale
 * @param {Number} joueur 
 * @returns 
 */
function verificationDiagonaleFinJeu(joueur){
    for(let i=nbLigne-1; i>=3; i--){

        for (let j=0; j<nbColonne;j++){
            if( puissance4[i][j] === joueur &&
                puissance4[i-1][j+1] === joueur &&
                puissance4[i-2][j+2] === joueur &&
                puissance4[i-3][j+3] === joueur){

                return true;
            }
            if( puissance4[i][j] === joueur &&
                puissance4[i-1][j-1] === joueur &&
                puissance4[i-2][j-2] === joueur &&
                puissance4[i-3][j-3] === joueur){

                return true;
            }
        }
    }
    return false;
}



/**
 * Permet d'initialiser un tableau de tableaux en fonction d'un nombre de ligne et de colonne passé en paramètre
 * @param {Number} nbLigne 
 * @param {Number} nbColonne 
 * @param {*} car 
 * @returns 
 */
function initialiserTableauVide(nbLigne, nbColonne, car = ''){
    let tab = [];
    for(let i=0; i < nbLigne; i++){
        let ligne = [];
        for(let j=0; j < nbColonne; j++){
            ligne.push(car);
        }
        tab.push(ligne);
    }
    return tab
}

/**
 * Permet d'afficher un tableau de puissance 4
 * @param {Array<String>} tab tableau de car
 * @param {String} j1car le car de j1
 * @param {String} j2car le car de j2
 */
function afficherPuissance4(tab, j1car, j2car){
    for(let i=0; i <tab.length; i++){
        let ligne = "";
        for(let j=0; j < tab[i].length; j++){
            ligne += "| ";
            if(tab[i][j] === 0){
                ligne += "_";
            } else if(tab[i][j] === 1){
                ligne += j1car
            } else if(tab[i][j] === 2){
                ligne += j2car
            }
            ligne += " |";
        }
        console.log(ligne);
    }
}