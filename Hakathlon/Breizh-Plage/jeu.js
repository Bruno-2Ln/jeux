document.addEventListener('DOMContentLoaded', () => {

    $(window).on('load', function() {
        $('#myModal').modal('show');
    });

    /********************* jeu de tir********************************************* */

    /*****************************
     * définitions des variables *
     ****************************/

    //récupération des éléments
    let canvas = document.getElementById('canvas');
    let div_compteur = document.getElementById('compteur_mouettes');
    let div_play = document.getElementById('div_play');
    let play = document.getElementById('play');
    let seconds = document.getElementById('seconds');
    let minuts = document.getElementById('minuts');

    //positions du canvas
    let position_top = canvas.offsetTop;
    let position_left = canvas.offsetLeft;

    //dimensions du canvas
    let longueur_canvas = 1000;
    let hauteur_canvas = 550;

    let mouettes = []; //tableau contenant les mouettes créées venant de la gauche sous forme de class volatiles (avec leurs coordonnées)
    let merdes = []; //tableau contenant les merdes demouettes crées sous forme de class projectiles (avec leurs coordonnées)
    let mouettes_droite = []; //tableau contenant les mouettes venant de la droite
    let yannick_array = [];

    let compteur_mouettes_tuees = 0; //compteur de mouettes tuées

    let longueur_mouette = 60;
    let hauteur_mouette = 28;
    let longueur_merde = 10;
    let hauteur_merde = 10;
    let longueur_yannick = 80;
    let hauteur_yannick = 50;
    let positiony_yannick = 430;

    let secondes = 0;
    let minutes = 0;
    let on = false;

    let nbr_balles = 47;
    let array_balles = [];

    //détermine l'id du joueur au départ de la partie..
    let idPlayer = Date.now()
    //plus un bouléen à false car l'id n'existe pas encore dans les scores
    let idExist = false

    //tableau des scores
    let scores = [];

    //booleen qui arrète l'action de tir et bruitage si la partie est finie
    let alive = true;

    //les intervals
    let mouette_intervalle; //contiendra le setIntervalle des déplacements des mouettes
    let mouette_creation_intervalle; //contiendra le setIntervalle des créations des mouettes
    let tombe_merde_intervalle; //contiendra le setIntervalle des déplacements des merdes de mouettes
    let interval_mouette_chie; //contiendra le setInterval des chiures
    let interval_chrono; //contiendra le setInterval du chrono

    div_compteur.innerHTML = compteur_mouettes_tuees; //affichage du nombre de mouettes tuéées

    //sons
    let cri_mouette = new Audio("sons/cri_mouette.wav");
    let pet = new Audio("sons/pet.wav");
    let tir = new Audio("sons/pistolet.mp3");
    let bande_son = new Audio("sons/bande_son.mp3");

    let scoreMouettes = 0;
    let mouettes_simples = 0;
    let mouettes_dorees = 0;
    /******************************************
     * définition des couleurs et du contexte *
     *****************************************/

    //contexte 2D
    let ctx = canvas.getContext('2d');

    //change l'aspect du pointeur de la souris
    canvas.style.cursor = "crosshair";

    //image plage sur le background du canvas
    canvas.style.backgroundImage = "url('images/plageE.jpg')";
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";

    /*********
     * Yannick*
     ********/

    function creer_yannick() {
        let yannick = new personnage(500, 350, longueur_yannick, hauteur_yannick);
        yannick_array.push(yannick);
    }

    //insertion de yannick
    function affiche_yannick() {
        //affiche l'image de Yannick
        yannick_array.forEach(yannick => {
            let image_yannick = new Image(50, 50);
            image_yannick.src = "images/breton_ft_minsize.png";

            ctx.drawImage(image_yannick, yannick.x, yannick.y); //définit la position de l'image
        });
    }

    /*************************/
    /*****Texte à modifier****/
    /*************************/

    //récupération des balises dont le texte doit être créé avec textColor()
    let divTitle = document.getElementById('modalTitle')

    textColor("Breizh-Plage", divTitle)

    //va colorer le texte
    function textColor(text, parent) {
        for (let i = 0; i <= text.length; i++) {
            let span = document.createElement('span');
            span.textContent = text[i]
            if (i % 2 == 0) {
                span.style.color = "black"
            } else {
                span.style.color = "white"
            }
            parent.appendChild(span)
        }
    }

    /*****************************/
    /*****Suppression de balle****/
    /*****************************/

    //va supprimer une balle de l'écran de jeu
    function sub_balle() {
        //récupération de la collection
        let balles = document.getElementsByClassName('balles');
        //passage en tableau
        for (let i = 0; i <= balles.length; i++) {
            array_balles.push(balles[i]);
        }
        //récupération de l'index du tableau
        let last_balle = array_balles[nbr_balles];
        //on fait disparaitre la balle
        last_balle.classList.add("d-none")
            //on enlève une balle
        nbr_balles--;
        //si plus de munition fin du jeu
        if (nbr_balles == -1) {
            alive = false
            clearInterval(mouette_creation_intervalle);
            clearInterval(mouette_droite_creation_intervalle);
            clearInterval(mouette_intervalle);
            clearInterval(interval_mouette_chie);
            clearInterval(interval_chrono);
            bande_son.pause();
            console.log("score :" + calculScore())
            verifyScore()
            document.location.href = "top_10.html";
        }
    }

    /**********************************
     * gestion affichage des éléments *
     *********************************/

    //insertions des mouettes
    function creer_une_mouette() {
        let mouette; //contiendra une mouette dorée ou non
        //nombre aléatoire entier entre 1 et 300 pour la hauteur
        let y = Math.floor(Math.random() * (250 + 1));

        //créer une nouvelle mouette avec ses coordonnées
        //pour créer une mouette dorée avec une chance de 20%
        let random = Math.random();
        if (random < 0.2) {
            mouette = new volatile(0, y, longueur_mouette, hauteur_mouette, 1);
        } else {
            mouette = new volatile(0, y, longueur_mouette, hauteur_mouette, 0);
        }
        //pousse dans le tableau contenant les mouettes
        mouettes.push(mouette);

    }

    function creer_une_mouette_droite() {
        //nombre aléatoire entier entre 1 et 300 pour la hauteur
        let y = Math.floor(Math.random() * (300 + 1));

        //créer une nouvelle mouette avec ses coordonnées
        //pour créer une mouette dorée avec une chance de 20%
        let random = Math.random();
        if (random < 0.2) {
            mouette = new volatile(1000, y, longueur_mouette, hauteur_mouette, 1);
        } else {
            mouette = new volatile(1000, y, longueur_mouette, hauteur_mouette, 0);
        }
        //pousse dans le tableau contenant les mouettes
        mouettes_droite.push(mouette);
    }


    function creer_merde(x, y) {
        let merde = new projectile(x, y, longueur_merde, hauteur_merde);
        merdes.push(merde);
        pet.play();
    }

    function affiche_les_mouettes() {
        mouettes.forEach(mouette => {
            let img_mouette = new Image(longueur_mouette, hauteur_mouette);
            if (mouette.doree === 1) {
                img_mouette.src = "images/mouetteOr_ft_minsize.png";
            } else {
                img_mouette.src = "images/mouette.png";
            }
            ctx.drawImage(img_mouette, mouette.x, mouette.y);
        });
    }

    function affiche_les_mouettes_droite() {
        mouettes_droite.forEach(mouette => {
            let img_mouette = new Image(longueur_mouette, hauteur_mouette);
            if (mouette.doree === 1) {
                img_mouette.src = "images/mouetteOr_ft_minsize2.png";
            } else {
                img_mouette.src = "images/mouette_droite.png";
            }

            ctx.drawImage(img_mouette, mouette.x, mouette.y);
        });
    }

    function affiche_merde() {
        merdes.forEach(merde => {
            let img_merde = new Image(longueur_merde, hauteur_merde);
            img_merde.src = "images/merde.png";

            ctx.drawImage(img_merde, merde.x, merde.y);
        });
    }

    /**********
     * timers *
     *********/

    function timer_deplace_tout() {
        mouette_intervalle = setInterval(bouge_tout, 20);
        mouette_intervalle;
    }

    function timer_cree_mouettes() {
        mouette_creation_intervalle = setInterval(creer_une_mouette, 1000);
        mouette_creation_intervalle;
    }

    function timer_cree_mouettes_droite() {
        mouette_droite_creation_intervalle = setInterval(creer_une_mouette_droite, 1000);
        mouette_droite_creation_intervalle;
    }

    function timer_mouette_chie() {
        interval_mouette_chie = setInterval(mouette_chie, 1000);
        interval_mouette_chie;
    }

    function timer_chrono() {
        interval_chrono = setInterval(incremente_chrono, 1000);
        interval_chrono;
    }

    /********************
     * demarrage du jeu *
     *******************/

    play.addEventListener('click', () => {
        bande_son.play();
        creer_yannick();
        timer_cree_mouettes();
        timer_cree_mouettes_droite();
        timer_deplace_tout();
        timer_mouette_chie();
        timer_chrono();
        div_play.innerHTML = "";
        canvas.addEventListener('click', (e) => {
            console.log('x' + e.clientX)
            console.log('y' + e.clientY)
                //si le jeu est en cours alors bruits et tirs possibles
            if (alive) {
                //bruitage coup de feu
                feu();
                sub_balle()
            }

            mouettes.forEach(mouette => {

                //si les coordonnées du tir sont compris dans les coordonnées de l'image de la mouette
                if ((e.clientX - position_left) > (mouette.x) &&
                    (e.clientX - position_left) < (mouette.x + longueur_mouette + 10) &&
                    (e.clientY - position_top) > (mouette.y) &&
                    (e.clientY - position_top) < (mouette.y + hauteur_mouette + 10)
                ) {
                    if (mouette.doree === 0){
                        scoreMouettes += 5
                        mouettes_simples += 1
                    } else {
                        scoreMouettes += 20
                        mouettes_dorees += 1
                    }
                    //on sort la mouette du tableau de mouettes
                    mouettes = mouettes.filter(m => m !== mouette);
                    compteur_mouettes_tuees++;
                    div_compteur.innerHTML = compteur_mouettes_tuees;
                    
                    mouette_crie();
                }
            });
            mouettes_droite.forEach(mouette => {
                if ((e.clientX - position_left) > (mouette.x) &&
                    (e.clientX - position_left) < (mouette.x + longueur_mouette + 10) &&
                    (e.clientY - position_top) > (mouette.y) &&
                    (e.clientY - position_top) < (mouette.y + hauteur_mouette + 10)
                ) {
                    if (mouette.doree === 0){
                        scoreMouettes += 5
                        mouettes_simples += 1
                    } else {
                        scoreMouettes += 20
                        mouettes_dorees += 1
                    }
                    //on sort la mouette du tableau de mouettes
                    mouettes_droite = mouettes_droite.filter(m => m !== mouette);
                    compteur_mouettes_tuees++;
                    div_compteur.innerHTML = compteur_mouettes_tuees;
                   
                    mouette_crie();
                }
            });
        });
    });


    /**************************
     * mouvements des éléments*
     *************************/

    //déplacements de Yannick
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault(); //élimine l'action par défaut
                yannick_array[0].x -= 2;
                if (yannick_array[0].x < 0) {
                    yannick_array[0].x = 0;
                }
                break;

            case "ArrowRight":
                e.preventDefault();
                yannick_array[0].x += 2;
                if (yannick_array[0].x > longueur_canvas) {
                    yannick_array[0].x -= 2;
                }
                break;
        }
    });

    function bouge_tout() {
        ctx.clearRect(0, 0, longueur_canvas, hauteur_canvas);
        affiche_yannick();
        mouettes.forEach(mouette => {
            mouette.x += 2;
        });
        affiche_les_mouettes();

        mouettes_droite.forEach(droite => {
            droite.x -= 2;
        });
        affiche_les_mouettes_droite();

        merdes.forEach(merde => {
            merde.y += 2;
        });
        affiche_merde();

        verifie_position_mouette();
        verifie_positions_mouette_droite();
        verifie_position_merdes();
    }

    function mouette_chie() {
        //récupère nombre de mouettes
        let nb_mouettes = mouettes.length;
        //récupère nombre de mouettes qui arrivent de la droite
        let nbDroite = mouettes_droite.length

        //choisir une mouette au hasard
        index_aleatoire = nombre_aleatoire(nb_mouettes);
        //choisir une mouette qui arrive de la droite au hasard 
        index_aleatoire_droite = nombre_aleatoire(nbDroite);

        //pour les mouettes qui arrivent de la gauche
        if (mouettes[index_aleatoire]) {
            creer_merde(mouettes[index_aleatoire].x, mouettes[index_aleatoire].y);
        }

        //pour les mouettes qui arrivent de la droite
        if (mouettes_droite[index_aleatoire_droite]) {
            creer_merde(mouettes_droite[index_aleatoire_droite].x + longueur_mouette, mouettes_droite[index_aleatoire_droite].y)
        }
    }

    function nombre_aleatoire(nb) {
        return Math.floor(Math.random() * (nb + 1));
    }

    /*********************/
    /********Chrono*******/
    /*********************/

    function incremente_chrono() {
        secondes += 1;

        if (secondes > 59) {
            minutes += 1;
            secondes = 0;
        }

        if (minutes < 10 && secondes < 10) {
            minuts.textContent = "0" + minutes
            seconds.textContent = "0" + secondes;

        } else if (minutes < 10 && secondes >= 10) {
            minuts.textContent = "0" + minutes
            seconds.textContent = secondes;

        } else if (minutes >= 10 && secondes < 10) {
            minuts.textContent = minutes;
            seconds.textContent = "0" + secondes;
        } else if (minutes >= 10 && secondes > 10) {
            minuts.textContent = minutes;
            seconds.textContent = secondes;
        }
    }

    /*****************
     * vérifications *
     ****************/

    function verifie_position_mouette() {
        for (let i = 0; i < mouettes.length; i++) {
            if (mouettes[i].x > 1000) {
                mouettes.splice(i, 1);
            }
        }
    }

    function verifie_positions_mouette_droite() {
        for (let i = 0; i < mouettes_droite.length; i++) {
            if (mouettes_droite[i].x < 0 - longueur_mouette) {
                mouettes_droite.splice(i, 1);
            }
        }
    }

    function verifie_position_merdes() {
        for (let i = 0; i < merdes.length; i++) {
            if (merdes[i].y >= positiony_yannick - 70 &&
                merdes[i].x >= yannick_array[0].x + 8 &&
                merdes[i].x <= yannick_array[0].x - 5 + longueur_yannick
            ) {
                clearInterval(mouette_creation_intervalle);
                clearInterval(mouette_intervalle);
                clearInterval(tombe_merde_intervalle);
                clearInterval(interval_mouette_chie);
                clearInterval(interval_chrono);
                alive = false;
                bande_son.pause();
                verifyScore()
                document.location.href = "top_10.html";
            }

            if (merdes[i].y > hauteur_canvas) {
                //supprime la merde du tableau
                merdes.splice(i, 1);
            }
        }
    }

    function feu() {
        tir.play();
    }

    function mouette_crie() {
        cri_mouette.play();
    }

/*************************** */


function verifyScore() {
    let totalScore = calculScore()

    localStorage.setItem("playerScoreBretagne", totalScore);

    //déclaration de la fin du jeu dans le localStorage
    localStorage.setItem("endGameBretagne", true);
    //récupération du pseudo
    let pseudoJoueur = JSON.parse(localStorage.getItem("pseudoBretagne"))

    //si la clé higth_scores existe
    if (JSON.parse(localStorage.getItem("higth_scores_bretagne"))) {
        //convertion du fichier JSON
        let scoresView = JSON.parse(localStorage.getItem("higth_scores_bretagne"))

        //vérification si l'idJoueur existe déjà
        if ((playerRow = scoresView.find((row) => row.id === idPlayer))) {
            idExist = true;
        }
        //si l'id n'existe pas déjà alors on rajoute au tableau des scores
        if (!idExist) {
            scoresView.push(
                scoreJoueur = new HightScore(idPlayer, pseudoJoueur, totalScore)
            )
        }
        //classement des scores
        scoresView.sort(function(a, b) {
            return a.score - b.score;
        }).reverse()

        //pas plus de 10 scores possibles sur le tableau
        if (scoresView.length > 10) {
            scoresView.pop();
        }
        //et reconversion en JSON pour intégrer le localStorage
        let scoresJSON = JSON.stringify(scoresView)

        if ((playerRow = scoresView.find((row) => row.id === idPlayer))) {
            localStorage.setItem("top_10_bretagne", true)
        }

        return localStorage.setItem("higth_scores_bretagne", scoresJSON);

        //si la clé n'existe pas
    } else {
        scores.push(
            scoreJ = new HightScore(idPlayer, pseudoJoueur, totalScore)
        )
        let scoresJSON = JSON.stringify(scores)
        localStorage.setItem("top_10_bretagne", true)
        return localStorage.setItem("higth_scores_bretagne", scoresJSON);
    }
}

//localStorage.clear()
/****************************/
/*****Calcul des scores******/
/****************************/

    function calculScore(){


        let time = parseInt(seconds.textContent) + parseInt(minuts.textContent)*60

        localStorage.setItem("chrono_bretagne", time);
        localStorage.setItem("nbr_mouettes", mouettes_simples);
        localStorage.setItem("nbr_mouettes_dorees", mouettes_dorees);

        return (parseInt(time + scoreMouettes))
    }

});

/*********************/
/*******Classe********/
/*********************/

class volatile {
    constructor(x, y, longueur, hauteur, doree) {
        this.x = x;
        this.y = y;
        this.longueur = longueur;
        this.hauteur = hauteur;
        this.doree = doree;
    }
}

class projectile {
    constructor(x, y, longueur, hauteur) {
        this.x = x;
        this.y = y;
        this.longueur = longueur;
        this.hauteur = hauteur;
    }
}

class personnage {
    constructor(x, y, longueur, hauteur) {
        this.x = x;
        this.y = y;
        this.longueur = longueur;
        this.hauteur = hauteur;
    }
}

class HightScore {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}