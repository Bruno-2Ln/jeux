document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    //positions du canvas
    let position_canvas_left = canvas.offsetLeft;
    let position_canvas_top = canvas.offsetTop;
    console.log(position_canvas_top)
    console.log(position_canvas_left)

    let panneau_array = [];

    function creer_img() {
        let panneau = new affiche(50, 0);
        panneau_array.push(panneau);
    }

    function affiche_panneau() {
        let panneau_img = new Image(500, 600);
        panneau_img.src = "images/p4.png";
        panneau_array.forEach(panneau => {
            panneau_img.onload = () => {
                ctx.drawImage(panneau_img, panneau.x, panneau.y);
            }
        });
    }

    creer_img();
    affiche_panneau();

    canvas.addEventListener('mousemove', (e) => {
        //si la souris se trouve sur la panneau corse
        canvas.style.cursor = "default";
        if (e.clientX > canvas.offsetLeft + 130 &&
            e.clientX < canvas.offsetLeft + 619 &&
            e.clientY > canvas.offsetTop - window.scrollY + 75 &&
            e.clientY < canvas.offsetTop - window.scrollY + 190) {
            //console.log(e.clientY)
            canvas.style.cursor = "grab";
            canvas.addEventListener('click', () => {
                window.location.href = "../Mission_Corse/Mission_Corse.html";
            })
        }
        if (e.clientX > canvas.offsetLeft + 80 &&
            e.clientX < canvas.offsetLeft + 500 &&
            e.clientY > canvas.offsetTop - window.scrollY + 220 &&
            e.clientY < canvas.offsetTop - window.scrollY + 350) {
            //console.log(e.clientY)
            canvas.style.cursor = "grab";
            canvas.addEventListener('click', () => {
                window.location.href = "../Breizh-Plage/Breizh-Plage.html";
            })
        }

    })

});

class affiche {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}