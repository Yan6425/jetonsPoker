function modifierNom() {
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
}

document.querySelectorAll(".nom").forEach(element => {
    element.addEventListener('click', modifierNom);
});

function modifierSolde() {
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
        if (input.value >= 0) {
            this.textContent = input.value; // Utilise `this` pour l'élément actuel
        }
        if (!(this.textContent === "number")) {
            this.textContent = "0";
        }
    });

    // Option de sauvegarde du texte avec la touche "Enter"
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            input.blur(); // Déclenche l'événement blur pour sauvegarder
        }
    });
}

document.querySelectorAll(".solde").forEach(element => {
    element.addEventListener('click', modifierSolde);
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
        nom.addEventListener("click", modifierNom);
        joueur.appendChild(nom);
        const solde = document.createElement("div");
        solde.textContent = "500";
        solde.addEventListener("click", modifierSolde);
        joueur.appendChild(solde);
        joueur.addEventListener("click", supprimerJoueur);
        cercle.appendChild(joueur);
        positionJoueurs();
    }
}

let modeSuppression = false; // Variable pour suivre l'état du mode suppression

// Fonction pour activer/désactiver le mode suppression
function toggleModeSuppression() {
    modeSuppression = !modeSuppression; // Inverse l'état du mode suppression
    const button = document.getElementById('enleverJoueur');
    button.style.backgroundColor = modeSuppression ? "red" : "white";
}

// Ajoute un écouteur d'événement au bouton pour activer/désactiver le mode suppression
document.getElementById('enleverJoueur').addEventListener('click', toggleModeSuppression);

function supprimerJoueur() {
    if (modeSuppression) {
        nbJoueurs = nbJoueurs - 1;
        this.remove(); // Supprime l'élément cliqué
        modeSuppression = false; // Désactive le mode suppression après la suppression
        const bouton = document.getElementById('enleverJoueur');
        bouton.style.backgroundColor = "white"; // Met à jour le texte du bouton
        positionJoueurs();
    }
}

// Sélectionne tous les éléments avec la classe 'supprimable' et ajoute un écouteur d'événement
document.querySelectorAll('.joueur').forEach(element => {
    element.addEventListener('click', supprimerJoueur)
});


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

window.addEventListener("resize", positionJoueurs);

//position des joueurs
positionJoueurs();