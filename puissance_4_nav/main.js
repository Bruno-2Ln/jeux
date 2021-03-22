jeu.initialisation();
jeu.afficherPuissance4();


// /**
//  * Fonction permettant à un joueur de jouer une case.
//  * Retourne true par la fonction verificationFinJeu() 
//  * (et les fonctions qui la composent) si le joueur a gagné
//  * @param {Number} joueur 
//  * @returns 
//  */
// function jouer(joueur){
//     let ligneVide = -1;
//     let colonne = -1;

//     while(ligneVide === -1 || colonne <= 0 || colonne >7){
//         console.log("Choisir une colonne à un emplacement vide");
//         colonne = jeu.saisirColonne();
//         ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
//     }
    
//     jeu.jouerCase(joueur,ligneVide,colonne);
//     jeu.afficherPuissance4();
//     return jeu.verificationFinJeu(joueur);
// }
