document.addEventListener('DOMContentLoaded', () => {

    let divTitle = document.getElementById('title')
    let pseudoJoueur = document.getElementById('pseudoJoueur')

    textColor("Breizh-Plage", divTitle)

    function textColor(text, parent){
        for (let i = 0; i <= text.length; i++){
            let span = document.createElement('span');
            span.textContent = text[i]
            if (i%2 == 0){
               span.style.color = "black"  
            } else {
                span.style.color = "white"  
            }
            parent.appendChild(span)
        }
    }

    let play = document.getElementById('play');
        
    play.addEventListener("click", savePseudo)
        
    //sauvegarde du pseudo
    function savePseudo() {
    
        let pseudoJoueurContainer = document.getElementById('pseudoJoueur'); 
        if(pseudoJoueurContainer.value === ""){
            pseudoJoueurContainer.value = "Super-Concombre"
        }
        let pseudoJSON = JSON.stringify(pseudoJoueurContainer.value);
    
        localStorage.setItem('pseudoBretagne', pseudoJSON);
    
    }
    
    //localStorage.removeItem('pseudoBretagne');

})