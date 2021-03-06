
let jeu = {

    puissance4 : [],
    nbColonne : Number = 7,
    nbLigne : Number = 6,

    joueurEnCours : Number = 1,

    pointJ1 : Number = 0,
    pointJ2 : Number = 0,

    isIAOn : Boolean = false,

    nbrCellulesVides : Number = 0,


    /**
     * Fonction permettant d'initialiser la propriété puissance4 de l'objet
     * en tableau de tableaux
     */
    initialisation : function(){
        this.puissance4 = toolbox.initialiserTableauVide(this.nbLigne, this.nbColonne, 0);
        
    },

    matchNul : function(){

        let tourJoueurIndication = document.getElementById("tourJoueurIndication");
        let divHeader = document.getElementById("divHeader");

        let buttons = document.getElementsByClassName("bouton")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("disabled", "");
        }
        let containerBtnReplay = document.createElement("div");
        let btnReplay = document.createElement("button");
        
        let btnIA = document.getElementById("IA");

        tourJoueurIndication.textContent = "Match nul !!"
        btnReplay.textContent = "Rejouer";
        toolbox.addClasses(btnReplay, ["btn","btn-secondary", "my-auto", "btn-replay", "w-100"]);
        btnReplay.setAttribute("type", "button");

        toolbox.addClasses(containerBtnReplay, ["d-flex","justify-content-center"]);
        
        containerBtnReplay.appendChild(btnReplay);
        divHeader.appendChild(containerBtnReplay);

        btnReplay.addEventListener("click", function(){
            btnIA.removeAttribute("disabled");
            jeu.initialisationTableau();
        })
    },

    /**
     * Fonction permettant à la fin d'une partie d'afficher une alerte indiquant
     * le gagnant et un bouton pour rejouer. Le score du joueur gagnant est
     * incrémenté.
     */
    gererFinJeu : function(){

        let tourJoueurIndication = document.getElementById("tourJoueurIndication");
        let divHeader = document.getElementById("divHeader");

        let buttons = document.getElementsByClassName("bouton")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("disabled", "");
        }
        let containerBtnReplay = document.createElement("div");
        let btnReplay = document.createElement("button");
        
        let btnIA = document.getElementById("IA");

        tourJoueurIndication.textContent = "Partie terminée, le gagnant est le joueur " + this.joueurEnCours;
        btnReplay.textContent = "Rejouer";
        toolbox.addClasses(btnReplay, ["btn","btn-secondary", "my-auto", "btn-replay",  "w-100"]);
        btnReplay.setAttribute("type", "button");
        toolbox.addClasses(containerBtnReplay, ["d-flex","justify-content-center"]);
        
        containerBtnReplay.appendChild(btnReplay);
        divHeader.appendChild(containerBtnReplay);

        if(this.joueurEnCours === 1){
            this.pointJ1++;
        } else {
            this.pointJ2++;
        }

        btnReplay.addEventListener("click", function(){
            btnIA.removeAttribute("disabled");
            jeu.initialisationTableau();
        })
    },

    /**
     * Fonction permettant d'initialiser l'ensemble de l'interface graphique,
     * mais aussi sa réinitialisation suite à une partie terminée.
     */
    initialisationTableau : function () {

        this.joueurEnCours = 1;

        let sousContainer = document.getElementById("sous-container");
        sousContainer.textContent = "";

        this.creationPlateau();

        this.initialisation();
        this.afficherPuissance4();
        this.isBtnActivateIA();
    },

    /**
     * Fonction permettant d'activer et de désactiver l'IA avant de commencer une partie.
     * La checkbox va également changer la couleur du jeton du second joueur en fonction de s'il
     * s'agit d'un joueur humain ou de l'IA
     */
    isBtnActivateIA : function() {
        let btnIA = document.getElementById("IA");
        let j2OrIA = document.getElementById("j2OrIA");
        btnIA.addEventListener("change", ()=> {
        this.isIAOn = !this.isIAOn;
        if (this.isIAOn) {
            j2OrIA.classList.toggle("bg-info");
            j2OrIA.classList.toggle("bg-success");
        } else {
            j2OrIA.classList.toggle("bg-info");
            j2OrIA.classList.toggle("bg-success");
        }
        console.log(this.isIAOn);
        console.log("test");
        })
    },

    /**
     * Fonction permettant de créer toute l'interface de jeu
     */
    creationPlateau : function() {

        let sousContainer = document.getElementById("sous-container");

        let divHeader = document.createElement("div");
        divHeader.id = "divHeader";
        toolbox.addClasses(divHeader, ["bg-primary", "d-flex", "justify-content-center"]);

        let h2 = document.createElement("h2");

        let divIA = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");

        let divPlateau = document.createElement("div");
        let divJ1 = document.createElement("div");
        divJ1.id = "divJ1"
        let divGrille = document.createElement("div");
        let divJ2 = document.createElement("div");
        divJ2.id = "divJ2"
        toolbox.addClasses(h2, ["bg-primary","text-white","rounded-lg","p-2", "text-center", "justify-content-center", "mt-1", "mb-0"]);
        h2.id = "tourJoueurIndication";
        h2.textContent = "Tour du Joueur 1";

        toolbox.addClasses(divIA, ["col-1","offset-10"]);
        toolbox.addClasses(label, ["text-light", "m-1"]);
        label.textContent = "IA"
        divIA.id = "test";
        input.id = "IA";
        
        if (this.isIAOn){
            input.checked = true
        } else (input.checked = false);

        input.setAttribute("type", "checkbox");

        toolbox.addClasses(divPlateau, ["row","offset-1"]);
        toolbox.addClasses(divJ1, ["col-2", "display-5", "font-weight-bold", "text-light"]);
        toolbox.addClasses(divGrille, ["col-7", "d-flex", "justify-content-center"]);
        toolbox.addClasses(divJ2, ["col-2", "display-5", "font-weight-bold", "text-light"]);

        let imgJ1 = document.createElement("img");
        let imgJ2 = document.createElement("img");
        imgJ2.id = "j2OrIA";

        let containerScoreJ1 = document.createElement("p");
        let containerScoreJ2 = document.createElement("p");
    
        imgJ1.src = "./images/J1.png";
        imgJ2.src = "./images/J2.png";
    
        divJ1.appendChild(imgJ1);
        divJ2.appendChild(imgJ2);
    
        containerScoreJ1.textContent = this.pointJ1;
        containerScoreJ2.textContent = this.pointJ2;
    
        toolbox.addClasses(imgJ1, ["bg-danger","rounded-circle"]);
        if (!this.isIAOn){
            toolbox.addClasses(imgJ2, ["bg-info","rounded-circle"]);
        } else {
            toolbox.addClasses(imgJ2, ["bg-success","rounded-circle"]);
        }
        
    
        toolbox.addClasses(divJ1, ["text-center","align-self-center"]);
        toolbox.addClasses(divJ2, ["text-center","align-self-center"]);
    
        divJ1.appendChild(containerScoreJ1);
        divJ2.appendChild(containerScoreJ2);

        divJ1.id = "j1";
        divJ2.id = "j2";
        divGrille.id = "jeu";

        divIA.appendChild(input);
        divIA.appendChild(label);

        divPlateau.appendChild(divJ1);
        divPlateau.appendChild(divGrille);
        divPlateau.appendChild(divJ2);

        divHeader.appendChild(h2)

        sousContainer.appendChild(divHeader);
        sousContainer.appendChild(divIA);
        sousContainer.appendChild(divPlateau);

    },

    /**
     * Permet d'afficher un tableau de puissance 4.
     * Une fois la fonction initialisation() appelée et le tableau de tableaux puissance4 créé
     * la première boucle va parcourir chaque tableau (ligne) de puissance 4,
     * la seconde boucle parcourt chaque cellule de la ligne du tour.
     * Une grille est créée sous forme de tableau. Sous chaque colonne de cette grille
     * est ajouté un bouton avec le nom de la colonne, au click un jeton du joueurEnCours
     * apparait dans la case vide la plus basse, si la vérification de fin de partie est validée
     * et donc s'il y a un gagnant, le jeu s'arrête.
     */
    afficherPuissance4 : function(){

        const jeu = document.querySelector("#jeu");
        jeu.innerHTML = "";
        this.nbrCellulesVides = 0;

        let grille = document.createElement("table");
        
        let tourJoueurIndication = document.getElementById("tourJoueurIndication");

        for (let i =0; i < this.nbLigne; i++){
            let ligne = document.createElement("tr")
            for (let j =0 ; j < this.nbColonne ; j++){

                let cellule = document.createElement("td")

                let jeton = document.createElement("div");

                toolbox.addClasses(cellule, ["bg-dark","border","text-center","format-cellule"]);

                if(this.puissance4[i][j]=== 0){
                    cellule.textContent = "";
                    this.nbrCellulesVides++
                } else if(this.puissance4[i][j]=== 1){

                    toolbox.addClasses(jeton, ["bg-danger","rounded-circle", "w-100", "h-100"]);


                } else if(this.puissance4[i][j]=== 2){
                    if (!this.isIAOn){
                        toolbox.addClasses(jeton, ["bg-info","rounded-circle", "w-100", "h-100"]);
                    } else {
                        toolbox.addClasses(jeton, ["bg-success","rounded-circle", "w-100", "h-100"]);
                    }
                }

                cellule.appendChild(jeton);
                ligne.appendChild(cellule);
            }

            grille.appendChild(ligne);
            
        }
        let btnIA = document.getElementById('IA');
        if (this.nbrCellulesVides !== 42){
            btnIA.setAttribute("disabled", "")
            console.log(this.nbrCellulesVides);
        }

        let ligneBouton = document.createElement("tr");

        for (let i =0; i < this.nbColonne; i++){

            let celluleBouton = document.createElement("td");
            let btn = document.createElement("button");

            toolbox.addClasses(celluleBouton, ["pt-1"]);
            toolbox.addClasses(btn, ["btn","btn-secondary","bouton"]);

            btn.textContent = "Colonne " + (i+1);

            //Todo : Redondance du code ligne 174 à 209.
            btn.addEventListener("click", () => {

            let ligneVide = this.retournerLigneCaseVideColonne(i);
                if (ligneVide !== -1) {
                    this.jouerCase(this.joueurEnCours, ligneVide, i)
                    this.afficherPuissance4();

                    if(this.verificationFinJeu(this.joueurEnCours)){
                        return this.gererFinJeu();
                    }

                    if(!this.verificationFinJeu(1) && !this.verificationFinJeu(2) && this.nbrCellulesVides === 0){
                        return this.matchNul();
                    }

                    if(this.joueurEnCours === 1){
                        this.joueurEnCours = 2;
                        tourJoueurIndication.textContent = "Tour du Joueur 2";
                    } else {
                        this.joueurEnCours = 1;
                        tourJoueurIndication.textContent = "Tour du Joueur 1";
                    }
                } if (this.isIAOn){
                    colonneIA = IA.choixColonne();
                    ligneVide = this.retournerLigneCaseVideColonne(colonneIA);
                        if (ligneVide !== -1) {


                            this.jouerCase(this.joueurEnCours, ligneVide, colonneIA)
                            this.afficherPuissance4();


                            if(this.verificationFinJeu(this.joueurEnCours)){
                                return this.gererFinJeu();
                            }

                            if(!this.verificationFinJeu(1) && !this.verificationFinJeu(2) && this.nbrCellulesVides === 0){
                                return this.matchNul();
                            }

                            if(this.joueurEnCours === 1){
                                this.joueurEnCours = 2;
                                tourJoueurIndication.textContent = "Tour du Joueur 2";

                            } else {
                                this.joueurEnCours = 1;
                                tourJoueurIndication.textContent = "Tour du Joueur 1";
                            }
                        }
                    }
            })
            
            celluleBouton.appendChild(btn);
            ligneBouton.appendChild(celluleBouton);
            grille.appendChild(ligneBouton);

            jeu.appendChild(grille)
        }
    },

    /**
     * Fonction permettant de jouer un tour
     * @param {Number} joueur 
     * @param {Number} ligne 
     * @param {Number} colonne 
     */
    jouerCase : function(joueur,ligne,colonne){
        this.puissance4[ligne][colonne] = joueur;
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
        return this.puissance4[ligne][colonne] === 0
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
