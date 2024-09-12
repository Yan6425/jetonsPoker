document.querySelectorAll(".nom").forEach(element => {
    element.addEventListener('click', function () {
        // Crée un champ input pour éditer le texte
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.textContent; // Utilise `this` pour accéder à l'élément actuel
        
        // Remplace le contenu de l'élément par l'input
        this.textContent = '';
        this.appendChild(input);
        input.focus(); // Met le focus sur l'input pour l'édition immédiate

        // Gestion de la sauvegarde du texte
        input.addEventListener('blur', () => {
            this.textContent = input.value; // Utilise `this` pour l'élément actuel
        });

        // Option de sauvegarde du texte avec la touche "Enter"
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur(); // Déclenche l'événement blur pour sauvegarder
            }
        });
    });
});

document.querySelectorAll(".solde").forEach(element => {
    element.addEventListener('click', function () {
        // Crée un champ input pour éditer le texte
        const input = document.createElement('input');
        input.type = 'number';
        input.value = this.textContent; // Utilise `this` pour accéder à l'élément actuel
        
        // Remplace le contenu de l'élément par l'input
        this.textContent = '';
        this.appendChild(input);
        input.focus(); // Met le focus sur l'input pour l'édition immédiate

        // Gestion de la sauvegarde du texte
        input.addEventListener('blur', () => {
            this.textContent = input.value; // Utilise `this` pour l'élément actuel
        });

        // Option de sauvegarde du texte avec la touche "Enter"
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur(); // Déclenche l'événement blur pour sauvegarder
            }
        });
    });
});

let nbJoueurs = 8;

function ajouterJoueur() {
    if (nbJoueurs < 10){
        nbJoueurs = nbJoueurs + 1;
        const cercle = document.getElementById("cercle");
        const joueur = document.createElement("div");
        joueur.className = "joueur";
        joueur.id = `Joueur ${nbJoueurs}`;
        const nom = document.createElement("div");
        nom.textContent = joueur.id;
        const solde = document.createElement("div");
        solde.textContent = "500"
        joueur.appendChild(nom);
        joueur.appendChild(solde);
        cercle.appendChild(joueur);
        positionJoueurs();
    }
}

// function enleverJoueur() {
//     if (nbJoueurs > 3){

//     }
// }

function positionJoueurs() {
    const players = document.querySelectorAll('.joueur'); // Sélectionne tous les éléments avec la classe 'joueur'
    const totalPlayers = players.length; // Compte le nombre total de joueurs
    const incrementAngle = 360 / totalPlayers; // Calcule l'angle entre chaque joueur
    const rayonCercle = window.innerHeight < window.innerWidth ? "30vh" : "30vw";

    players.forEach((player, index) => {
        const angle = incrementAngle * index; // Calcule l'angle pour chaque joueur
        player.style.transform = `rotate(${angle - 90}deg) translate(${rayonCercle}) rotate(${-angle + 90}deg)`; // Applique les transformations CSS
    });
}

//position des joueurs
positionJoueurs();