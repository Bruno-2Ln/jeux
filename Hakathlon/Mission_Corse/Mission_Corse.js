document.addEventListener('DOMContentLoaded', () => {

    let play = document.getElementById('play');
    
    play.addEventListener("click", savePseudo)
    
    function savePseudo() {

        let pseudoJoueurContainer = document.getElementById('pseudoJoueur'); 
    if(pseudoJoueurContainer.value === ""){
        pseudoJoueurContainer.value = "Super-Concombre"
    }
        let pseudoJSON = JSON.stringify(pseudoJoueurContainer.value);

        localStorage.setItem('pseudo', pseudoJSON);

}

//localStorage.removeItem('pseudo');


})