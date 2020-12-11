document.addEventListener('DOMContentLoaded', () => {

    let container = document.getElementById('container');
    let scoresArray = document.getElementById('scoresArray');
    let endTitle = document.getElementById("endTitle");
    let endMess = document.getElementById("endMess");

    let scoresData = [];
    let order = 1;
    scoresData = JSON.parse(localStorage.getItem("higth_scores"));
    
    if(!JSON.parse(localStorage.getItem("top_10"))){
        //message si le score ne figure pas dans le top 10 du tableau
        endTitle.innerHTML = "Mouais...";
        endMess.innerHTML = "Ok la mission est réussie.. Mais elle où la passion..?! La Corse ça se mérite..!! Retourne sur le continent et pense à prendre ta fierté Corse cette fois si tu veux atteindre le top 10 !!";

    } else {
        //s'il y figure
        endTitle.innerHTML = "Bravo !!"
        endMess.innerHTML = "Tu intègres le top 10 !! A coups de mandales d'ours tu as rejoins la terre ferme ! C'est pas joe le clodo qui aurait pu faire ça !!";
        //et la clé est effacée derrière
        localStorage.removeItem("top_10");
    }

    //si le stockage existe, ouverture modal
    if(JSON.parse(localStorage.getItem("endGame"))){

        $(window).on('load',function(){
            $('#theEndGame').modal('show');
        });

        //récupération des valeurs voulues
        let nbr_requins = localStorage.getItem("nbr_requins",);
        let nbr_meduses = localStorage.getItem("nbr_meduses");
        let nbr_flag = localStorage.getItem("nbr_flags");
        let life = localStorage.getItem("life");
        let playerScore = localStorage.getItem("playerScore");

        let requin = document.getElementById('requins');
        let meduse = document.getElementById('meduses');
        let flag = document.getElementById('drapeaux');
        let vie = document.getElementById('vie');
        let score = document.getElementById('score');
        let h_requin = document.getElementById('h_requin');
        let h_meduse = document.getElementById('h_meduse');
        let h_drapeau = document.getElementById('h_drapeau');
        let h_vie = document.getElementById('h_vie');
        let h_score = document.getElementById('h_score');
        
        //déclarations des setInterval
        let intervalle_requin;
        let intervalle_meduse;
        let intervalle_flag;
        let intervalle_vie;
        let intervalle_score;

        //nombre zéro
        let nb = 0;
        h_score.textContent = nb;
        function demarre_interval_requin() {
            //h_requin.innerHTML = "Requins tués : ";
            intervalle_requin = setInterval(incremente_requin, 50);
            intervalle_requin;
        }
    
        function demarre_interval_meduse() {
            //h_meduse.innerHTML = "Méduses tuées : ";
            intervalle_meduse = setInterval(incremente_meduse, 50);
            intervalle_meduse;
        }
    
        function demarre_interval_flag() {
            //h_drapeau.innerHTML = "Drapeaux attrapés : ";
            intervalle_flag = setInterval(incremente_flag, 50);
            intervalle_flag;
        }
    
        function demarre_interval_vie() {
            //h_vie.innerHTML = "Vie restante : ";
            intervalle_vie = setInterval(incremente_vie, 20);
            intervalle_vie;
        }
    
        function demarre_interval_score() {
            
            intervalle_score = setInterval(incremente_score, 10);
            intervalle_score;
        }
    
        function incremente_requin() {
            if (nb < nbr_requins) {
                requin.innerHTML = nb;
                nb++;
            } else {
                requin.innerHTML = nbr_requins;
                nb = 0;
                clearInterval(intervalle_requin);
                demarre_interval_meduse();
            }
        }
    
        function incremente_meduse() {
            if (nb < nbr_meduses) {
                meduse.innerHTML = nb;
                nb++;
            } else {
                meduse.innerHTML = nbr_meduses;
                nb = 0;
                clearInterval(intervalle_meduse);
                demarre_interval_flag();
            }
        }
    
        function incremente_flag() {
            if (nb < nbr_flag) {
                flag.innerHTML = nb;
                nb++;
            } else {
                flag.innerHTML = nbr_flag;
                nb = 0;
                clearInterval(intervalle_flag);
                demarre_interval_vie();
            }
        }
    
        function incremente_vie() {
            if (nb < life) {
                vie.innerHTML = nb;
                nb++;
            } else {
                vie.innerHTML = life;
                nb = 0;
                clearInterval(intervalle_vie);
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
    
        demarre_interval_requin();

        //effaçage du stockage après affichage
        localStorage.removeItem("endGame")
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

            order++
            hightScoresFragment.appendChild(tr);
        })

        tbody.appendChild(hightScoresFragment);
        tabScores.appendChild(tbody);
        scoresArray.appendChild(tabScores);

    }

})