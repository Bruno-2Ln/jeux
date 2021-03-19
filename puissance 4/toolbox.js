let readline = require("readline-sync");

let toolbox = {
    saisieString: function(txt){
        return readline.question(txt);
    },

    /**
     * Permet d'initialiser un tableau de tableaux en fonction d'un nombre de ligne et de colonne passé en paramètre
     * @param {Number} nbLigne 
     * @param {Number} nbColonne 
     * @param {*} car 
     * @returns 
     */
    initialiserTableauVide: function(nbLigne, nbColonne, car = ''){
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

}
module.exports = toolbox;