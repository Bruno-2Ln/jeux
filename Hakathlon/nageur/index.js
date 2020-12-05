//attente du chargement de la page
document.addEventListener('DOMContentLoaded', () => {

    //récupération des éléments
    let canvas = document.getElementById('canvas');

    let secondes = 0;
    let minutes = 0;
    let on = false;
    let reset = false;

    //dimensions des éléments
    longueur_nageur = 50;
    hauteur_nageur = 20;
    longueur_requin = 100;
    hauteur_requin = 50;
    longueur_meduse = 10;
    hauteur_meduse = 10;

    //contexte du canvas en 2D
    let ctx = canvas.getContext('2d');

    //couleurs
    canvas.style.backgroundColor = "#369EC1"; //couleur background color du canvas
    let couleur_nageur = "black";
    let couleur_requin = "#586A83";
    let couleur_meduse = "#EF5DE8";

    //compteur de temps pour dessiner les obstacles
    let compteur = 0;

    let nageur = new protagoniste(hauteur_nageur, longueur_nageur, 10, 300, couleur_nageur);

    function dessine(protagoniste) {

        ctx.beginPath();
        ctx.fillStyle = protagoniste.couleur;
        ctx.fillRect(protagoniste.x, protagoniste.y, protagoniste.longueur, protagoniste.hauteur);
        ctx.stroke;
    }
    dessine(nageur);

    //mouvement du nageur
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "ArrowUp":
                nageur.y -= 10;
                if (nageur.y < 0) {
                    nageur.y = 0;
                }
                break;
            case "ArrowLeft":
                nageur.x -= 10;
                if (nageur.x < 0) {
                    nageur.x = 0;
                }
                break;
            case "ArrowRight":
                nageur.x += 10;
                if (nageur.x > 1150) {
                    nageur.x = 1150;
                }
                break;
            case "ArrowDown":
                nageur.y += 10;
                if (nageur.y > 580) {
                    nageur.y = 580;
                }
                break;
        }

    });

    //tableau contenant tous les requins 
    let requins = [];
    //ajoute un requin au tableau avec les ordonnées du nageur
    function ajoute_requin() {
        requins.push(
            requin = new protagoniste(hauteur_requin, longueur_requin, 1200, nageur.y, couleur_requin)
        )
    }

    //tableau contenant toutes les méduses
    let meduses = [];
    //ajiute une meduse au tableau de méduses
    function ajoute_meduse() {
        meduses.push(
            meduse = new protagoniste(longueur_meduse, hauteur_meduse, nageur.x + 600, 0, couleur_meduse)
        )
    }

    //déclenche l'animation
    function demarre() {
        
        d = setInterval(dessineTout, 20);
        d;
        //démarre le chrono
        start();
    }
    demarre();
   

    //dessine tous les éléments du canvas
    function dessineTout() {
        ctx.clearRect(0, 0, 1280, 720); //efface tout le canvas avant de redessiner
        compteur += 1; //incrémente le compteur pour ajouter des obstacles
        dessine(nageur);
        if ((compteur % 200) === 0 || compteur === 1) {
            ajoute_requin();
            ajoute_meduse();
        }
        requins.forEach(requin => {
            requin.x -= 1;
            dessine(requin);
        });
        meduses.forEach(meduse => {
            meduse.y += 1;
            meduse.x -= 1;
            dessine(meduse);
        });
        verifie_collisions();
    }

    function verifie_collisions() {
        //avec les requins
        verifie_collision(requins);
        verifie_collision(meduses);
    }

    function verifie_collision(obstacles) {
        compteur_x = 0;
        compteur_y = 0;
        //pour chaque obstacle
        obstacles.forEach(obstacle => {
            //si les coordonnées de l'air du nageur est égale à celle d'un obstacle
            if (nageur.x >= obstacle.x && nageur.x <= obstacle.x + obstacle.longueur) {
                compteur_x++;
            }
            if (nageur.x + 50 >= obstacle.x && nageur.x <= obstacle.x + obstacle.longueur) {
                compteur_x++;
            }
            if (nageur.y >= obstacle.y && nageur.y <= obstacle.y + obstacle.hauteur) {
                compteur_y++;
            }
            if (nageur.y + 20 <= obstacle.y && nageur.y >= obstacle.y + obstacle.hauteur) {
                compteur_y++;
            }
            if (compteur_x > 0 && compteur_y > 0) {
                //stoppe le chrono
                stop();
                return clearInterval(d); //stoppe la boucle du temps 
                
            } else {
                compteur_x = 0;
                compteur_y = 0;
                return false;
            }
        });
    }

    //------------timer------------------
    
       let timer = document.getElementById('timer');
       
        function chrono(){
          secondes += 1;
         
          if(secondes>59){
            minutes += 1;
            secondes = 0;
          }
         
          if(minutes<10 && secondes<10){
            timer.textContent = "0"+minutes+" : 0"+secondes; 
          }
            else if(minutes<10 && secondes>=10){
              timer.textContent= "0"+minutes+" : "+secondes;
          }
          else if(minutes>=10 && secondes<10){
              timer.textContent = minutes+" : 0"+secondes;
          }
          else if(minutes>=10 && secondes>10){
              timer.textContent = minutes+" : "+secondes;
          }
        }
       
        function start(){
          if(on===false){
            timerID = setInterval(chrono, 1000);
            on = true;
            reset = false;
          }
        }
       
        function stop(){
          if(on===true){
            on = false;
            clearTimeout(timerID);
          }
        }
     
});

class protagoniste {
    constructor(hauteur, longueur, x, y, couleur) {
        this.hauteur = hauteur,
            this.longueur = longueur,
            this.x = x,
            this.y = y,
            this.couleur = couleur
    }
}