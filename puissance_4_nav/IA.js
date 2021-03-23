let IA = {

    choixColonne(){
        let tabColonne = this.getTableauCellulesPossibles();
        return tabColonne[0];
    },

    getTableauCellulesPossibles : function(){
        let tabColonne = [];
        for (let i = 1; i <= jeu.nbColonne; i++) {
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

        if(this.verifGagner(ligne, colonne)) return 100;

        return 1;
    },

    verifGagner : function(ligne, colonne){}


}