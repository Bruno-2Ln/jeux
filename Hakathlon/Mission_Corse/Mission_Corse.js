document.addEventListener('DOMContentLoaded', () => {

    let play = document.getElementById('play');
    
    play.addEventListener("click", savePseudo)
    
    function savePseudo(){

        let pseudoJoueurContainer = document.getElementById('pseudoJoueur'); 

        if(pseudoJoueurContainer.value === ""){
            pseudoJoueurContainer.value = "Pseudo"
        }

        let pseudoJSON = JSON.stringify(pseudoJoueurContainer.value);

        localStorage.setItem('pseudo', pseudoJSON);
    }

//localStorage.removeItem('pseudo');


})