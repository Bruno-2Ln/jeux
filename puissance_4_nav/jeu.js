// let toolbox = require("./toolbox.js");

let jeu = {

    puissance4 : [],
    nbColonne : Number = 7,
    nbLigne : Number = 6,

    joueur1car : "x",
    joueur2car : "o",

    initialisation : function(){ 
        this.puissance4 = toolbox.initialiserTableauVide(this.nbLigne, this.nbColonne, 0);
    },

    /**
     * Permet d'afficher un tableau de puissance 4.
     * Une fois la fonction initialisation() appelée et le tableau de tableaux puissance4 créé
     * la première boucle va parcourir chaque tableau (ligne) de puissance 4,
     * la seconde boucle parcourt chaque cellule de la ligne du tour.
     */
    afficherPuissance4 : function(){
        for(let i=0; i <this.puissance4.length; i++){
            let ligne = "";
            for(let j=0; j < this.puissance4[i].length; j++){
                ligne += "| ";
                if(this.puissance4[i][j] === 0){
                    ligne += "_";
                } else if(this.puissance4[i][j] === 1){
                    ligne += this.joueur1car
                } else if(this.puissance4[i][j] === 2){
                    ligne += this.joueur2car
                }
                ligne += " |";
            }
            console.log(ligne);
        }
    },

    jouerCase : function(joueur,ligne,colonne){ 
        this.puissance4[ligne][colonne-1] = joueur;
    },


    /**
     * Fonction permettant de retourner la première ligne vide d'une colonne.
     * Elle boucle sur la dernière ligne -1 et remonte pour trouver une case vide.
     * @param {Number} colonne retourne -1 si la colonne est pleine
     * @returns 
     */
    retournerLigneCaseVideColonne : function(colonne){
        for(let i =this.nbLigne-1; i>=0; i--){
            if(this.verifCaseVide(i,colonne)) {
                return i
            };
        }
        return -1;
    },

    /**
     * Fonction permettant de retourner si une cellule est vide (retourne true / false).
     * Pour rappel il n'y a que des 1, 2 ou 0 dans le tableau à son initialisation retournant
     * la fonction initialiserTableauVide(), c'est lorsque le tableau de tableaux est en paramètre
     * de la fonction afficherPuissance4() que les 1 et 2 sont remplacés par les caractères décidés en
     * début de partie et que le 0 est remplacé par "_".
     * Si 0 est trouvé alors la case est vide.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @returns 
     */
    verifCaseVide : function(ligne, colonne){
        return this.puissance4[ligne][colonne-1] === 0
    },

    /**
     * Fonction permettant de saisir une colonne.
     * Nécessite le module readline-sync.
     * le fonction saisieString renvoyant une chaîne de caractères
     * on utilise parseInt()
     * @returns 
     */
    saisirColonne : function(){
        return parseInt(toolbox.saisieString("Quelle colonne ?"));
    },

    /**
     * Fonction permettant de vérifier si un joueur à gagner
     * en ligne ou en colonne ou en diagonale
     * @param {Number} joueur 
     * @returns 
     */
    verificationFinJeu : function(joueur){
        if(this.verificationLigneFinJeu(joueur) || this.verificationColonneFinJeu(joueur) ||this.verificationDiagonaleFinJeu(joueur)){
            return true;
        }
        return false;
    },

    /**
     * Fonction permettant de vérifier si un joueur à gagner sur une ligne.
     * On boucle de la dernière ligne et on remonte. Pour chaque tour on
     * boucle de nouveau sur chaque cellule de la ligne. Dans cette seconde boucle
     * si la case est égale au joueur alors il faut que ce tour +1, +2 et
     * +3 le soient aussi pour gagner et sortir de la boucle. La fin de la boucle
     * est à -3 sur le nbrColonne car si après vérification de puissance4[i][3]
     * le joueur n'a pas gagné c'est que les 3 dernières cases ne permettent pas de
     * gagner. Il est donc inutile de les vérifier.
     * @param {Number} joueur 
     * @returns 
     */
    verificationLigneFinJeu : function(joueur){
        for(let i=this.nbLigne-1; i>=0; i--){

            for (let j=0; j<this.nbColonne-3;j++){
                if( this.puissance4[i][j] === joueur &&
                    this.puissance4[i][j+1] === joueur &&
                    this.puissance4[i][j+2] === joueur &&
                    this.puissance4[i][j+3] === joueur){

                    return true;
                }
            }
        }
        return false;
    },

    /**
     * Fonction permettant de vérifier si un joueur a gagné en colonne.
     * On boucle sur la première colonne et pour chaque tour on boucle
     * une nouvelle fois sur la dernière ligne-4 et on remonte. On va 
     * donc partir de la 3ème ligne et vérifier si les 3 du dessous sont
     * égales pour retourner true et sortir de la boucle. Il est inutile
     * de vérifier plus les 3 dernières, c'est-à-dire les 3 cellules basses
     * de chaque colonne car vu qu'on descend dans la vérification on ne peut
     * trouver 4 cases identiques.
     * @param {Number} joueur 
     * @returns 
     */
    verificationColonneFinJeu : function(joueur){
        for(let i=0; i<this.nbColonne; i++){

            for (let j=this.nbLigne-4; j>=0; j--){
                if( this.puissance4[j][i] === joueur &&
                    this.puissance4[j+1][i] === joueur &&
                    this.puissance4[j+2][i] === joueur &&
                    this.puissance4[j+3][i] === joueur){

                    return true;
                    }
            }
        }
        return false;
    },

    /**
     * Fonction permettant de vérifier si un joueur a gagné en diagonale.
     * Les vérifications se font en remontant à droite puis à gauche.
     * On boucle sur les lignes en partant du nbLigne-1 et on remonte sur
     * 3 tours puisque au-dessus il ne peut y avoir de retour gagnant.
     * On boucle une seconde fois à chacun des 3 tours sur les cellules/colonnes
     * des lignes pour vérifier les diagonales droite et gauche.
     * @param {Number} joueur 
     * @returns 
     */
    verificationDiagonaleFinJeu : function(joueur){
        for(let i=this.nbLigne-1; i>=3; i--){

            for (let j=0; j<this.nbColonne;j++){
                if( this.puissance4[i][j] === joueur &&
                    this.puissance4[i-1][j+1] === joueur &&
                    this.puissance4[i-2][j+2] === joueur &&
                    this.puissance4[i-3][j+3] === joueur){

                    return true;
                }
                if( this.puissance4[i][j] === joueur &&
                    this.puissance4[i-1][j-1] === joueur &&
                    this.puissance4[i-2][j-2] === joueur &&
                    this.puissance4[i-3][j-3] === joueur){

                    return true;
                }
            }
        }
        return false;
    },


}
// module.exports = jeu;