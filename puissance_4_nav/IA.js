let IA = {

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
     * si l'IA peut perdre --> on retourne u poids de 99. 
     * Autres cas : Éviter un coup qui fera perdre l'IA, défendre et bloquer
     * 2 jetons advers qui se suivent et inversement attaquer en positionnant un 3ème
     * jetons pour l'IA et additionner les poids.
     * @param {Number} ligne 
     * @param {Number} colonne 
     * @returns 
     */
    getPoidsCellule : function(ligne, colonne){
        if(ligne === -1) return 0;

        if(this.verifGagner(ligne, colonne,2)) return 100;

        return 1;
    },

    verifGagner : function(ligne, colonne, joueur){
        if(this.verifGagnerLigne(ligne,colonne,joueur)) return true;
        if(this.verifGagnerColonne(ligne,colonne,joueur)) return true;
        if(this.verifGagnerDiagonale(ligne,colonne,joueur)) return true;
    },

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
        //console.log(cpt);
        if(cpt>3) return true;
    },

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
        if(ligne+1 < jeu.nbLigne && colonne-1 <= 0 && jeu.puissance4[ligne+1][colonne-1] === joueur){
            cpt++;
            if(ligne+2 < jeu.nbLigne && colonne-2 <= 0 && jeu.puissance4[ligne+2][colonne-2] === joueur){
                cpt++;
                if(ligne+3 < jeu.nbLigne && colonne-3 <= 0 && jeu.puissance4[ligne+3][colonne-3] === joueur){
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
    }

}