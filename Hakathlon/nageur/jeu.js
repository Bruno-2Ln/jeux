//attente du chargement de la page
document.addEventListener('DOMContentLoaded', () => {

    //récupération des éléments
    let canvas = document.getElementById('canvas');
    let canvasLife = document.getElementById('canvasLife');
    let bouton = document.getElementById('bouton_play');
    let div_bouton = document.getElementById('div_bouton');
    let requinKills = document.getElementById('requinKills');
    let meduseKills = document.getElementById('meduseKills');
    let flagAdd = document.getElementById('flagAdd');

    //le textContent à 0 (number) au départ pour incrémenter
    requinKills.textContent = 0
    meduseKills.textContent = 0
    flagAdd.textContent = 0


    //chrono
    let on = false;

    //barre de vie
    let life = 100;

    //barre de tir
    let power = 100;

    //détermine l'id du joueur au départ de la partie..
    let idPlayer = Date.now()
        //plus un bouléen à false car l'id n'existe pas encore dans les scores
    let idExist = false

    //tableau des scores
    let scores = [];
    let minuts = document.getElementById('minuts');
    let seconds = document.getElementById('seconds');
    seconds.textContent = 45;

    let bande_son = new Audio("sons/bande_son.mp3");

    //tableau contenant toutes les méduses
    let meduses = [];
    //tableau contenant tous les requins 
    let requins = [];
    //tableau contenant les tirs
    let tirs = [];
    //tableau contenant les drapeaux corses
    let drapeaux = [];

    //dimensions des éléments
    longueur_canvas = 1100;
    hauteur_canvas = 500;
    longueur_bateau = 50;
    hauteur_bateau = 35;
    longueur_requin = 100;
    hauteur_requin = 50;
    longueur_meduse = 30;
    hauteur_meduse = 40;
    longueur_drapeau = 25;
    hauteur_drapeau = 30;


    //contexte du canvas en 2D
    let ctx = canvas.getContext('2d');
    let ctxLife = canvasLife.getContext('2d');
    let ctxPower = canvasPower.getContext('2d');

    //barre de vie pleine
    drawLine(ctxLife, 0, 0, life, 0, 20, "red")

    //barre de tir pleine
    drawLine(ctxPower, 0, 0, power, 0, 20, "blue")

    //couleurs
    canvasLife.style.border = "1px solid black";
    canvasPower.style.border = "1px solid black";
    canvasLife.style.backgroundColor = "#E5E8E8";
    canvasPower.style.backgroundColor = "#E5E8E8";
    canvas.style.backgroundColor = "#369EC1"; //couleur background color du canvas

    //compteur de temps pour dessiner les obstacles
    let compteur = 0;

    //setIntervalle qui bouge tout le jeu
    let bouge_tout_le_monde;

    //booleen pour un tir dans le canvas
    let booleen_tir = true;

    //dessin du bateau de Thomas
    let image_source_thomas = "images/thomas-jet.png";
    let bateau = new protagoniste(10, 180, hauteur_bateau, longueur_bateau, image_source_thomas);

    /***************************
     * affichages des éléments *
     **************************/

    function dessine_thomas() {
        let image_thomas = new Image(longueur_bateau, hauteur_bateau);
        image_thomas.src = bateau.source;
        ctx.drawImage(image_thomas, bateau.x, bateau.y);
    }
    dessine_thomas(); //dessine Thomas dès le début

    function affiche_requins() {
        requins.forEach(requin => {
            let image_requin = new Image(longueur_requin, hauteur_requin); //créer une nouvelle image
            image_requin.src = requin.source; //récupère l'image

            ctx.drawImage(image_requin, requin.x, requin.y); //dessine l'image aux coordonnées voulues
        });
    }

    function affiche_meduse() {
        meduses.forEach(meduse => {
            let image_meduse = new Image(longueur_meduse, hauteur_meduse);
            image_meduse.src = meduse.source;

            ctx.drawImage(image_meduse, meduse.x, meduse.y);
        });
    }

    function affiche_tir() {
        tirs.forEach(tir => {
            ctx.beginPath();
            ctx.fillRect(tir.x, tir.y, tir.longueur, tir.hauteur);
            ctx.fillStyle = 'white';

        });
    }

    function affiche_drapeau() {
        drapeaux.forEach(drapeau => {
            let image_drapeau = new Image(longueur_drapeau, hauteur_drapeau);
            image_drapeau.src = drapeau.source;

            ctx.drawImage(image_drapeau, drapeau.x, drapeau.y);
        });
    }

    //dessine tous les éléments du canvas
    function dessineTout() {
        ctx.clearRect(0, 0, 1280, 720); //efface tout le canvas avant de redessiner
        compteur += 1; //incrémente le compteur pour ajouter des obstacles
        //si les requins sortent de l'écran on le sort du tableau
        verifie_positions_requins();
        //si les meduses sortent de l'écran on le sort du tableau
        verifie_positions_meduses();
        if ((compteur % 200) === 0 || compteur === 1) {
            ajoute_meduse();
            ajoute_requin();
        }
        meduses.forEach(meduse => {
            meduse.y += 1;
            meduse.x -= 1;
            affiche_meduse();
        });
        requins.forEach(requin => {
            requin.x -= 1;
            affiche_requins();
        });
        tirs.forEach(tir => {
            tir.x += 4;
            affiche_tir();
        });
        drapeaux.forEach(drapeau => {
            if (drapeau.etat === 1) {
                affiche_drapeau();
            }
        });
        dessine_thomas();
        verifie_collisions();
        verifie_tirs();
        verifie_drapeau();
        //si la jauge de tir inférieur à 200
        if (power < 100) {
            //on rajoute +1
            power += 0.5
                //et on redessine la jauge
            drawLine(ctxPower, 0, 0, power, 0, 20, "blue")
                //si elle passe à 200, le tir est de nouveau possible
            if (power === 100) {
                booleen_tir = true;
            }
        }
    }

    /*************************
     * actions et mouvements *
     ************************/

    //mouvement du bateau de Thomas
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "ArrowUp":
                bateau.y -= 10;
                if (bateau.y < 0) {
                    bateau.y = 0;
                }
                break;
            case "ArrowLeft":
                bateau.x -= 10;
                if (bateau.x < 0) {
                    bateau.x = 0;
                }
                break;
            case "ArrowRight":
                bateau.x += 10;
                if (bateau.x > longueur_canvas - longueur_bateau) {
                    bateau.x = longueur_canvas - longueur_bateau;
                }
                break;
            case "ArrowDown":
                bateau.y += 10;
                if (bateau.y > hauteur_canvas + hauteur_bateau) {
                    bateau.y = hauteur_canvas + hauteur_bateau;
                }
                break;
            case " ": //barre d'espace pour les tirs
                if (booleen_tir) {
                    ajoute_tir();
                    power = 0
                    booleen_tir = false;
                    drawLine(ctxPower, 0, 0, power, 0, 20, "blue")
                }
                break;
        }
    });

    /**********************
     * ajout des éléments *
     *********************/

    //ajoute un tir au tableau avec les coordonnées du bateau
    function ajoute_tir() {
        let tir = new protagoniste(bateau.x + longueur_bateau, bateau.y + (hauteur_bateau / 2), 2, 10);
        tirs.push(tir);

    }

    //ajoute un requin au tableau avec les ordonnées du bateau
    function ajoute_requin() {
        let source = '';
        //pour générer un nombre aléatoire
        let nombre = Math.random();

        if (nombre < 0.5) { //50% de chance
            source = "images/requin.png";
        } else {
            source = "images/requin3.png";
        }
        requins.push(
            requin = new protagoniste(1200, bateau.y, hauteur_requin, longueur_requin, source)

        );
    }
    //ajoute une meduse au tableau de méduses
    function ajoute_meduse() {
        let source = "images/meduse1.png";
        meduses.push(
            meduse = new protagoniste(bateau.x + 600, 0, hauteur_meduse, longueur_meduse, source)
        );
    }

    function ajoute_drapeau() {
        let source = "images/corse_mini.png";
        //donne une abscisse aléatoire entre 600 et 1000
        let x = donne_nombre_entier_aleatoire(600, 1000);
        //donne une ordonnée aléatoire entre 0 et 500
        let y = donne_nombre_entier_aleatoire(0, 500);
        drapeaux.push(
            drapeau = new accessoires(x, y, hauteur_drapeau, longueur_drapeau, source, 1)
        );
        attente_vide_drapeaux();
    }

    function donne_nombre_entier_aleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function attente_ajoute_drapeau() {
        setTimeout(() => {
            ajoute_drapeau();
        }, 5000);
    }

    function attente_vide_drapeaux() {
        setTimeout(() => {
            drapeaux = [];
            attente_ajoute_drapeau();
        }, 5000);
    }

    /********************
     * démarrage du jeu *
     *******************/

    //déclenche l'animation
    function demarre() {
        //je dois supprimer le bouton car lorsqu'on appuie sur la barre d'espace
        //on réctive le bouton
        div_bouton.innerHTML = "";
        bouge_tout_le_monde = setInterval(dessineTout, 20);
        bouge_tout_le_monde;
        attente_ajoute_drapeau();
        //démarre le chrono
        start();
        bande_son.play();
    }

    bouton.addEventListener('click', () => {
        demarre();
    });




    /*****************
     * vérifications *
     ****************/

    function verifie_positions_requins() {
        for (let i = 0; i < requins.length; i++) {
            if (requins[i].x + longueur_requin < 0) {
                requins.splice(i, 1);
            }
        }
    }

    function verifie_positions_meduses() {
        for (let i = 0; i < meduses.length; i++) {
            if (meduses[i].y > 600) {
                meduses.splice(i, 1);
            }
        }
    }

    function verifie_collisions() {
        //avec les requins
        verifie_collision(requins);
        //avec les méduses
        verifie_collision(meduses);
    }

    function verifie_tirs() {
        verifie_position_tir();
    }

    function verifie_drapeau() {
        drapeaux.forEach(drapeau => {
            if (drapeau.etat === 1) {
                if (drapeau.x >= bateau.x &&
                    drapeau.x <= bateau.x + longueur_bateau &&
                    drapeau.y >= bateau.y &&
                    drapeau.y <= bateau.y + hauteur_bateau
                ) {
                    drapeau.etat = 0; //fait disparaître le drapeau
                    flagAdd.textContent++;
                }
            }
        });
    }

    function verifie_collision(obstacles) {
        compteur_x = 0;
        compteur_y = 0;
        //pour chaque obstacle
        obstacles.forEach(obstacle => {
            //si les coordonnées de l'aire du bateau est égale à celle d'un obstacle
            if (bateau.x >= obstacle.x && bateau.x <= obstacle.x + obstacle.longueur) {
                compteur_x++;
            }
            if (bateau.x + longueur_bateau >= obstacle.x && bateau.x <= obstacle.x + obstacle.longueur) {
                compteur_x++;
            }
            if (bateau.y >= obstacle.y && bateau.y <= obstacle.y + obstacle.hauteur) {
                compteur_y++;
            }
            if (bateau.y + hauteur_bateau >= obstacle.y && bateau.y + hauteur_bateau <= obstacle.y + obstacle.hauteur) {
                compteur_y++;
            }
            if (compteur_x > 0 && compteur_y > 0) {

                //la collision baisse la barre de vie
                if (life > 0) {
                    life -= 0.5
                    console.log(life)
                        //barre de vie redessinée
                    drawLine(ctxLife, 0, 0, life, 0, 20, "red")
                }
                //si la barre est à 0..
                if (life === 0) {
                    clearInterval(bouge_tout_le_monde); //stoppe la boucle du temps 
                    //stoppe le chrono 
                    stop();
                    bande_son.pause();
                    verifyScore();
                }
            } else {
                compteur_x = 0;
                compteur_y = 0;
                return false;
            }
        });
    }

    function verifie_position_tir() {
        tirs.forEach(tir => {
            if (tir.x >= 1100) {
                tirs = [];
            } else {
                if (!verifie_impact(requins, requinKills)) {
                    verifie_impact(meduses, meduseKills);
                }
            }
        });
    }

    function verifie_impact(obstacle, addKills) {
        let impact = false;
        for (let i = 0; i < obstacle.length; i++) {
            if (tirs[0].x > obstacle[i].x &&
                tirs[0].x < obstacle[i].x + obstacle[i].longueur &&
                tirs[0].y > obstacle[i].y &&
                tirs[0].y < obstacle[i].y + obstacle[i].hauteur
            ) {
                obstacle.splice(i, 1);
                tirs = [];
                impact = true;
                //s'il y a impact, +1 dans le compteur html correspondant
                addKills.textContent++
            }
        }

        return impact;
    }

    //------------timer------------------



    function chrono() {
        seconds.textContent--;

        if (seconds.textContent < 10) {
        
            seconds.textContent = "0" + seconds.textContent;
        } 

        if (seconds.textContent == "0" + 0){
            clearInterval(bouge_tout_le_monde);
            stop()
        }

    }

    function start() {
        if (on === false) {
            timerID = setInterval(chrono, 1000);
            on = true;
            reset = false;
        }
    }

    function stop() {
        if (on === true) {
            on = false;
            clearTimeout(timerID);
        }
    }

    //----------------Life-------------------------------------
    //pour tracer la barre de vie
    function drawLine(ctx, x1, y1, x2, y2, lineWidth, color) {
        ctx.clearRect(0, 0, 200, 10);
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color
        ctx.stroke()
    }

    //------------Hight-Score----------------------------------

    //TODO : Rajouter la demande du nom joueur pour le récupérer dans la création prototype
    function verifyScore() {
        let totalScore = calculScore()
        let pseudoJoueur = JSON.parse(localStorage.getItem("pseudo"))

        //console.log(idPlayer)
        //si la clé higth_scores existe
        if (JSON.parse(localStorage.getItem("higth_scores"))) {
            //convertion du fichier JSON
            let scoresView = JSON.parse(localStorage.getItem("higth_scores"))

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

            return localStorage.setItem("higth_scores", scoresJSON);

            //si la clé n'existe pas
        } else {
            scores.push(
                scoreJ = new HightScore(idPlayer, pseudoJoueur, totalScore)
            )
            let scoresJSON = JSON.stringify(scores)

            return localStorage.setItem("higth_scores", scoresJSON);
        }

    }

    //(à décommenter pour vider le localStorage pour les tests)
    //localStorage.removeItem("higth_scores")

    //fonction de calcul des scores PROVISOIRE (le temps pour terminer devrait être
    //un malus plutôt qu'un bonus)
    function calculScore() {
        //conversion des minutes en secondes
        let m = parseInt(minuts.textContent * 60)
            //récupération des secondes
        let s = parseInt(seconds.textContent)
            //calcul des deux
        return m + s
    }

});



class protagoniste {
    constructor(x, y, hauteur, longueur, source) {
        this.x = x;
        this.y = y;
        this.hauteur = hauteur;
        this.longueur = longueur;
        this.source = source;
    }
}


class HightScore {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}

class accessoires {
    constructor(x, y, hauteur, longueur, source, etat) {
        this.x = x;
        this.y = y;
        this.hauteur = hauteur;
        this.longueur = longueur;
        this.source = source;
        this.etat = etat;
    }
}