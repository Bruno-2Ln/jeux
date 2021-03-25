let IA = {
    /**
     * Fonction renvoyant le coup qui va être joué. On commence par récupérer le tableau des
     * possibilités. On initialise la meilleur colonne qui sera la colonne 0 et qui va servir
     * de comparatif aux colonnes suivantes. On va donc dans une boucle for parcourir le tableau
     * des possibilités en partant de l'index 1. Si la poids de la cellule du tour est plus important
     * que le poids de la meilleur colonne, son index devient la meilleure colonne, on réinitialiser le tableau
     * des meilleurs colonnes pour la pousser dedans.. Par contre si la valeur est identique alors on se contente
     * de pousser dans le tableau sans le réinitialiser puisque cela correspond au fait qu'on puisse jouer deux coups
     * ayant la même importance. Sur ce tableau on fait ensuite un random pour aléatoirement désigner le coup qui sera
     * joué.
     * @returns 
     */
    choixColonne : function(){
        let tabColonne = this.getTableauCellulesPossibles();
        let meilleureColonne = 0;
        let tabMeilleureColonne = [0];
        for(let i = 1; i < tabColonne.length; i++) {
            if(tabColonne[i]> tabColonne[meilleureColonne]) {
                meilleureColonne = i;
                tabMeilleureColonne = new Array();
                tabMeilleureColonne.push(i);
            } else if(tabColonne[i] === tabColonne[meilleureColonne]) {
                tabMeilleureColonne.push(i);
            }
        }

        console.log(tabColonne);
        console.log(tabMeilleureColonne);
        return tabMeilleureColonne[Math.floor(Math.random() * tabMeilleureColonne.length)]
    },

    /**
     * Fonction permettant de retourner un tableau de possibiltés de coups à jouer à partir
     * d'une boucle qui va parcourir les colonnes. Pour chaque colonne si un coup est possible,
     * on détermine par la fonction getPoidsCellule le poids de la cellule, plus le poids est important
     * plus le coup est intéressant. La fonction getPoidsCellule va prendre en paramètre la ligne et la colonne,
     * la colonne est l'index du tour et pour la ligne on fait appel à la fonction retournerLigneCaseVideColonne
     * qui va donner la première cellule vide d'une colonne, son paramètre, cette colonne, est i.
     * @returns 
     */
    getTableauCellulesPossibles : function(){
        let tabColonne = [];
        for (let i = 0; i < jeu.nbColonne; i++) {
            let possibility = this.getPoidsCellule(jeu.retournerLigneCaseVideColonne(i),i);
            tabColonne.push(possibility);
        }
        return tabColonne;
    },

    /**
     * Fonction permettant de calculer quel coup doit faire l'IA, 
     * il faut vérifier si l'IA peut gagner --> on retourne un poids de 100, 
     * si l'IA peut perdre --> on retourne un poids de 99. 
     * Autres cas : Éviter un coup qui fera perdre l'IA au tour suivant, défendre et bloquer
     * 2 jetons adverses qui se suivent et inversement attaquer en positionnant un 3ème
     * jetons pour l'IA et additionner les poids.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @returns 
     */
    getPoidsCellule : function(ligne, colonne){
        if(ligne === -1) return 0;

        if(this.verifGagner(ligne, colonne,2)) return 100;
        if(this.verifGagner(ligne, colonne,1)) return 99;

        if(this.coupPerdant(ligne, colonne)) return 0;

        let poids = 0;

        if(this.positionAttaqueDefense(ligne,colonne,1)){
            poids +=20;
        }
        if(this.positionAttaqueDefense(ligne,colonne,2)){
            poids +=20;
        }

        
        poids += this.getPoidsBase(ligne,colonne);

        return poids;
    },

    /**
     * Fonction peermettant de déterminer un poids de base pour chaque cellule, cela permet d'éviter sur
     * par exemple un début de partie de générer un tableau de meilleurs colonnes de 0 à 6 et donc de faire en sorte
     * de réduire les possibilités et de permettre à l'IA de jouer de meilleurs coups. Le poids des cellules étant
     * plus important vers le centre car en jouant vers le centre il y a plus de chance de créer une suite de coups
     * gagnants sur des axes différents. Pour chaque coups possible on va donc déterminer le poids de son index de colonne
     * multiplié par le poids de son index de ligne.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @returns 
     */
    getPoidsBase : function(ligne, colonne){
        let poidsLigne = 0;
        let poidsColonne = 0;
        switch(ligne){
            case 0 : poidsLigne = 1; 
            break;
            case 1 : poidsLigne = 2; 
            break;
            case 2 : poidsLigne = 3; 
            break;
            case 3 : poidsLigne = 4; 
            break;
            case 4 : poidsLigne = 3; 
            break;
            case 5 : poidsLigne = 2; 
            break;
        }

        switch(colonne){
            case 0 : poidsColonne = 1; 
            break;
            case 1 : poidsColonne = 2; 
            break;
            case 2 : poidsColonne = 3; 
            break;
            case 3 : poidsColonne = 3; 
            break;
            case 4 : poidsColonne = 3; 
            break;
            case 5 : poidsColonne = 2; 
            break;
            case 6 : poidsColonne = 1; 
            break;
        }
        return poidsColonne * poidsLigne;
    },
    /**
     * Fonction permettant de vérifier à partir de la première case vide d'une colonne
     * si deux jetons d'un même joueur se suivent puis sont suivis à nouveau d'un espace vide.
     * La fonction est utilisé de manière a être appelé lorsqu'on détermine le poids des cellules
     * dans la fonction getPoidsCellule. De cette façon si est renvoyé true alors le poids de la cellule
     * sera alourdi de 20 lui conférent une certaine importance à être joué.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @param {Number} joueur 
     * @returns 
     */
    positionAttaqueDefense : function(ligne, colonne, joueur){
        let cpt = 1;
        if(jeu.puissance4[ligne][colonne+1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne+2] === joueur && jeu.puissance4[ligne][colonne+3] === 0) cpt++;
        }
        if(jeu.puissance4[ligne][colonne-1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne-2] === joueur && jeu.puissance4[ligne][colonne-3] === 0) cpt++;
        }
        if(cpt > 2) return true;
    },

    /**
     * Fonction permettant de vérifier par un booleen s'il est possible de gagner en ligne, colonne ou diagonale.
     * Peut être utiliser pour gagner mais aussi prévoir le coup de l'adversaire et donc le bloquer.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @param {Number} joueur 
     * @returns 
     */
    verifGagner : function(ligne, colonne, joueur){

        if(this.verifGagnerLigne(ligne,colonne,joueur)) return true;
        if(this.verifGagnerColonne(ligne,colonne,joueur)) return true;
        if(this.verifGagnerDiagonale(ligne,colonne,joueur)) return true;
    },

    /**
     * Fonction permettant de vérifier s'il on peut gagner en ligne.
     * Cette vérification est efficace car partant d'une case vide possiblement joué au tour
     * suivant, on va commencer par vérifier sur la droite puis sur la gauche.
     * Dans les deux cas si un jeton de même joueur est trouvé on incrémente cpt et on vérifie le jeton suivant.
     * si à l'arrivée cpt est supérieur à 3 alors on retourne true car si cet espace vide est comblé au tour suivant
     * il y aura un gagnant.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @param {Number} joueur 
     * @returns 
     */
    verifGagnerLigne : function(ligne, colonne, joueur){
        let cpt = 1;
        if(jeu.puissance4[ligne][colonne+1] === joueur){
            cpt++;
            if(jeu.puissance4[ligne][colonne+2] === joueur){
                cpt++
                if(jeu.puissance4[ligne][colonne+3] === joueur){
                    cpt++
                }
            } 
        }
        if(jeu.puissance4[ligne][colonne-1] === joueur){
            cpt++;
            if(jeu.puissance4[ligne][colonne-2] === joueur){
                cpt++
                if(jeu.puissance4[ligne][colonne-3] === joueur){
                    cpt++
                }
            } 
        }
        if(cpt>3) return true;
    },
    /**
     * Fonction permettant de vérifier s'il est possible de gagner en colonne.
     * On ne vérifie que les 3 premières lignes indexées (0, 1, 2) car à partir de 3
     * même avec les lignes aux index 4 et 5 avec un même jeton, on sait déjà qu'il 
     * ne peut être un coup gagnant.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @param {Number} joueur 
     * @returns 
     */
    verifGagnerColonne : function(ligne, colonne, joueur){
        let cpt = 1;
        if (ligne < 3){
            if(jeu.puissance4[ligne+1][colonne] === joueur){
                cpt++;
                if(jeu.puissance4[ligne+2][colonne] === joueur){
                    cpt++;
                    if(jeu.puissance4[ligne+3][colonne] === joueur){
                        cpt++;
                    }
                }
            }
        }
        if(cpt>3) return true;
    },

    /**
     * Fonction permettant de vérifier si un coup peut être gagnant en diagonale.
     * On vérifie d'abord sur la droite en remontant puis en descendant. On réinitialise
     * cpt et fait pareil ensuite sur la gauche. Pour chaque test on met dans la condition
     * que la ligne et la colonne ne sont pas inférieur à 0 ou supérieur au nombre max
     * déterminé pour chacun.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @param {Number} joueur 
     * @returns 
     */
    verifGagnerDiagonale : function(ligne, colonne, joueur){
        let cpt = 1;
        if(ligne-1 >= 0 && colonne+1 <= jeu.nbColonne && jeu.puissance4[ligne-1][colonne+1] === joueur){
            cpt++;
            if(ligne-2 >= 0 && colonne+2 <= jeu.nbColonne && jeu.puissance4[ligne-2][colonne+2] === joueur){
                cpt++;
                if(ligne-3 >= 0 && colonne+3 <= jeu.nbColonne && jeu.puissance4[ligne-3][colonne+3] === joueur){
                    cpt++;
                }
            }
        }
        if(ligne+1 < jeu.nbLigne && colonne-1 >= 0 && jeu.puissance4[ligne+1][colonne-1] === joueur){
            cpt++;
            if(ligne+2 < jeu.nbLigne && colonne-2 >= 0 && jeu.puissance4[ligne+2][colonne-2] === joueur){
                cpt++;
                if(ligne+3 < jeu.nbLigne && colonne-3 >= 0 && jeu.puissance4[ligne+3][colonne-3] === joueur){
                    cpt++;
                }
            }
        }
        if(cpt>3) return true;
        cpt = 1;
        if(ligne-1 >= 0 && colonne-1 >= 0 && jeu.puissance4[ligne-1][colonne-1] === joueur){
            cpt++;
            if(ligne-2 >= 0 && colonne-2 >= 0 && jeu.puissance4[ligne-2][colonne-2] === joueur){
                cpt++;
                if(ligne-3 >= 0 && colonne-3 >= 0 && jeu.puissance4[ligne-3][colonne-3] === joueur){
                    cpt++;
                }
            }
        }
        if(ligne+1 < jeu.nbLigne && colonne+1 <= jeu.nbColonne && jeu.puissance4[ligne+1][colonne+1] === joueur){
            cpt++;
            if(ligne+2 < jeu.nbLigne && colonne+2 <= jeu.nbColonne && jeu.puissance4[ligne+2][colonne+2] === joueur){
                cpt++;
                if(ligne+3 < jeu.nbLigne && colonne+3 <= jeu.nbColonne && jeu.puissance4[ligne+3][colonne+3] === joueur){
                    cpt++;
                }
            }
        }
        if(cpt>3) return true;
    },

    /**
     * Fonction permettant de renvoyer true si le coup possible va permmettre de faire gagner le joueur
     * adverse au coup suivant. Lorsqu'elle va renvoyer true dans la fonction getPoidsCellule, la cellule
     * aura un poids de 0 ce qui la rendra impossible à jouer. Pour ce faire on fait appel à la fonction vérifGagner
     * qui va prendre comme paramètre la cellule au dessus de celle que l'on pourrait jouer là tout de suite. On anticipe
     * ainsi un coup qui pourrait précipité une défaite.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @returns 
     */
    coupPerdant : function(ligne, colonne){
        if(ligne-1 > 0){
            if(this.verifGagner(ligne-1,colonne,1)) return true;
        }
    }

}