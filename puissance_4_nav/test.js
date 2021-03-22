afficherPuissance4 : function(){
    const jeu = document.querySelector("#jeu");
    jeu.innerHTML = "";

    let fragment = document.createDocumentFragment();

    let grille = document.createElement("table")


    for (let i =0; i < this.nbLigne; i++){
        let ligne = document.createElement("tr")
        for (let j =0 ; j < this.nbColonne ; j++){

            let cellule = document.createElement("td")

            cellule.classList("border")
            cellule.classList("text-center")
            

            content += "<td class='border text-center' style='width:100px; height:100px'>";
            content += "</td>"
        }
    }

    content += "<tr>";
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(0)">Colonne1</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(1)">Colonne2</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(2)">Colonne3</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(3)">Colonne4</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(4)">Colonne5</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(5)">Colonne6</button></td>';
    content += '<td><button type="button" class="btn btn-secondary" onClick="jouer(6)">Colonne7</button></td>';
    content += "</tr>";


    content += "</table>";
    jeu.innerHTML += content;

}