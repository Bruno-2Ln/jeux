let toolbox = {

    /**
     * Permet d'initialiser un tableau de tableaux en fonction d'un nombre de ligne et de colonne passé en paramètre.
     * La première boucle va récupérer initialiser une ligne.
     * La deuxième va créer des cellules dans la ligne du tour.
     * La ligne intègre ensuite le tableau.
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
    },

    /**
     * Fonction permettant d'ajouter un tableau de classes à une balise
     * @param {String} balise 
     * @param {Array} arrayClass 
     */
    addClasses: function(balise, arrayClass){

        for (let i = 0; i <= arrayClass.length; i++){
            balise.classList.add(arrayClass[i])
        }
    },

}
