document.addEventListener('DOMContentLoaded', () => {

    let container = document.getElementById('container');
    let scoresArray = document.getElementById('scoresArray');
    let endTitle = document.getElementById("endTitle");
    let endMess = document.getElementById("endMess");
    let titletopscores = document.getElementById("title-topscores");

    let scoresData = [];
    let order = 1;

    scoresData = JSON.parse(localStorage.getItem("higth_scores_bretagne"));
    
    textColor("Top 10", titletopscores)
    textColor("Game Over", modalTitle)

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

    if(!JSON.parse(localStorage.getItem("top_10_bretagne"))){
        //message si le score ne figure pas dans le top 10 du tableau
        textColor("Le goéland est sournois ...", endTitle);
        endMess.innerHTML = "C'est quand tu penses avoir réussi qu'il gagne à la fin.. C'était pas si mal mais tes tirs pas assez précis, Yannick pas assez souple du pas chassé.. Bref il te faudra recommencer pour atteindre le top 10 !! ";

    } else {
        //s'il y figure
        textColor(" Bravo !!", endTitle);
        
        endMess.innerHTML = "Le panthéon des dieux Bretons s'ouvre à toi ! Tu intègres le top 10 et Yannick te payes une crèpe. Mais pendant que tu la manges il te faudra l'écouter te parler des pours et contres du beurre salé... POSE CE FUSIL LA PARTIE EST FINIE !!";
        //et la clé est effacée derrière
        localStorage.removeItem("top_10_bretagne");
    }

    //si le stockage existe, ouverture modal
    if(JSON.parse(localStorage.getItem("endGameBretagne"))){

        $(window).on('load',function(){
            $('#theEndGameBretagne').modal('show');
        });

        //récupération des valeurs voulues
        //récupération des valeurs voulues
        let chrono_value = localStorage.getItem("chrono_bretagne");
        let mouettes_value = localStorage.getItem("nbr_mouettes");
        let mouettes_dorees_value = localStorage.getItem("nbr_mouettes_dorees");
        let playerScore = localStorage.getItem("playerScoreBretagne");

        let mouettes = document.getElementById('mouettes');
        let mouettes_dorees = document.getElementById('mouettes_dorees');
        let chrono = document.getElementById('chrono');
        
        let h_score = document.getElementById('h_score');
        
        //déclarations des setInterval
        let intervalle_mouettes;
        let intervalle_mouettes_dorees;
        let intervalle_chrono;
        let intervalle_score;

        //nombre zéro
        let nb = 0;
        h_score.textContent = nb;

        function demarre_interval_mouettes() {
            //h_requin.innerHTML = "Requins tués : ";
            intervalle_mouettes = setInterval(incremente_mouettes, 50);
            intervalle_mouettes;
        }
    
        function demarre_interval_mouettes_dorees() {
            //h_meduse.innerHTML = "Méduses tuées : ";
            intervalle_mouettes_dorees = setInterval(incremente_mouettes_dorees, 50);
            intervalle_mouettes_dorees;
        }
    
        function demarre_interval_chrono() {
            //h_drapeau.innerHTML = "Drapeaux attrapés : ";
            intervalle_chrono = setInterval(incremente_chrono, 50);
            intervalle_chrono;
        }
    
        function demarre_interval_score() {
            
            intervalle_score = setInterval(incremente_score, 10);
            intervalle_score;
        }
    
        function incremente_mouettes() {
            if (nb < mouettes_value) {
                mouettes.innerHTML = nb;
                nb++;
            } else {
                mouettes.innerHTML = mouettes_value;
                nb = 0;
                clearInterval(intervalle_mouettes);
                demarre_interval_mouettes_dorees();
            }
        }
    
        function incremente_mouettes_dorees() {
            if (nb < mouettes_dorees_value) {
                mouettes_dorees.innerHTML = nb;
                nb++;
            } else {
                mouettes_dorees.innerHTML = mouettes_dorees_value;
                nb = 0;
                clearInterval(intervalle_mouettes_dorees);
                demarre_interval_chrono();
            }
        }
    
        function incremente_chrono() {
            if (nb < chrono_value) {
                chrono.innerHTML = nb;
                nb++;
            } else {
                chrono.innerHTML = chrono_value;
                nb = 0;
                clearInterval(intervalle_chrono);
                demarre_interval_score()
            }
        }
    
        function incremente_score() {
            if (nb < playerScore) {
                h_score.innerHTML++;
                nb++;
            } else {
                h_score.innerHTML = playerScore;
                nb = 0;
                clearInterval(intervalle_score);
            }
        }
    
        demarre_interval_mouettes();

        //effaçage du stockage après affichage*/
        localStorage.removeItem("endGameBretagne")
    }

    displayHightScores(scoresData);

    function displayHightScores(x) {

        let hightScoresFragment = document.createDocumentFragment();

        let tabScores = document.createElement("table");

        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let thName = document.createElement('th');
        let thPoints = document.createElement('th');
        let thOrder = document.createElement('th');

        thName.textContent = "Pseudo";
        thPoints.textContent = "Pts";
        thOrder.textContent = "#";

        scoresArray.classList.add("container");
        scoresArray.classList.add("d-flex");
        scoresArray.classList.add("justify-content-center");
        scoresArray.classList.add("mt-5");
        scoresArray.classList.add("h-50");
        scoresArray.classList.add("tabScores")

        tabScores.classList.add("table")
        tabScores.classList.add("w-50");
        tabScores.classList.add("table-light");

        thName.classList.add("text-center");
        thPoints.classList.add("text-center");
        thOrder.classList.add("text-center");

        thead.classList.add("thead-light");

        thead.appendChild(thOrder);
        thead.appendChild(thName);
        thead.appendChild(thPoints);

        tabScores.appendChild(thead);


        x.forEach(data => {
            let tr = document.createElement('tr');
            let tdPlayerName = document.createElement('td');
            let tdPlayerScore = document.createElement('td');
            let tdPlayerOrder = document.createElement('td');

            tdPlayerName.textContent = data.name;
            tdPlayerScore.textContent = data.score;
            tdPlayerOrder.textContent = order;

            tdPlayerOrder.classList.add("order")

            tr.appendChild(tdPlayerOrder);
            tr.appendChild(tdPlayerName);
            tr.appendChild(tdPlayerScore);

            tdPlayerName.classList.add("text-center");
            tdPlayerScore.classList.add("text-center");
            tdPlayerOrder.classList.add("text-center");
            tdPlayerOrder.classList.add("w-25");
            tdPlayerOrder.classList.add("text-warning");

            order++
            hightScoresFragment.appendChild(tr);
        })

        tbody.appendChild(hightScoresFragment);
        tabScores.appendChild(tbody);
        scoresArray.appendChild(tabScores);

    }

})