function modifierNom() {
    if (!modeCouchation && !modeSuppression){
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
}

document.querySelectorAll(".nom").forEach(element => {
    element.addEventListener('click', modifierNom);
});

function modifierSolde() {
    if (!modeCouchation && !modeSuppression){
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
            if (input.value == "" || Number(input.value) < 0 || !Number.isInteger(Number(input.value))){
                this.textContent = "0";
            }
            else {
                this.textContent = input.value; // Utilise `this` pour l'élément actuel
            }
        });
    
        // Option de sauvegarde du texte avec la touche "Enter"
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                input.blur(); // Déclenche l'événement blur pour sauvegarder
            }
        });
    }
}

document.querySelectorAll(".solde").forEach(element => {
    element.addEventListener('click', modifierSolde);
});

let nbJoueurs = 8;

function genererId() {
    let id ="";
    do {
        for (let i = 0; i < 8; i++) {id += Math.floor(Math.random() * 10);}
    } while (document.getElementById(id) !== null);
    return id;
}

function ajouterJoueur() {
    if (nbJoueurs < 10){
        nbJoueurs = nbJoueurs + 1;
        const cercle = document.getElementById("cercle");
        const joueur = document.createElement("div");
        joueur.className = "joueur";
        joueur.id = genererId();
        miseParJoueur[joueur.id] = 0;
        const nom = document.createElement("div");
        nom.className = "nom";
        nom.textContent = "Entrez un nom";
        nom.addEventListener("click", modifierNom);
        joueur.appendChild(nom);
        const solde = document.createElement("div");
        solde.className = "solde";
        solde.textContent = "500";
        solde.addEventListener("click", modifierSolde);
        joueur.appendChild(solde);
        joueur.addEventListener("click", supprimerJoueur);
        cercle.appendChild(joueur);
        positionJoueurs();
    }
}

let miseParJoueur = {};

function initialiserDict() {
    document.querySelectorAll(".joueur").forEach(joueur => {
        joueur.id = genererId();
        miseParJoueur[joueur.id] = 0;
    });
}

initialiserDict();

let modeSuppression = false; // Variable pour suivre l'état du mode suppression

// Fonction pour activer/désactiver le mode suppression
function toggleModeSuppression() {
    modeSuppression = !modeSuppression; // Inverse l'état du mode suppression
    const button = document.getElementById('enleverJoueur');
    button.style.backgroundColor = modeSuppression ? "red" : "white";
}


function supprimerJoueur() {
    if (modeSuppression) {
        nbJoueurs = nbJoueurs - 1;
        delete miseParJoueur[this.id];
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

let mise = 0;

function majMise(somme) {
    mise = somme;
    document.getElementById("mise").textContent = `mise : ${mise}`;
}

function modifierMise(bouton) {
    // Crée un champ input pour éditer le texte
    const input = document.createElement('input');
    input.type = 'number';
    
    // Remplace le contenu de l'élément par l'input
    bouton.textContent = '';
    bouton.appendChild(input);
    input.focus(); // Met le focus sur l'input pour l'édition immédiate

    // Gestion de la sauvegarde du texte
    input.addEventListener('blur', () => {
        if (!(input.value == "" || Number(input.value) < 0 || !Number.isInteger(Number(input.value)))){
            majMise(input.value);
        }
        bouton.textContent = "Modifier mise";
    });

    // Option de sauvegarde du texte avec la touche "Enter"
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            input.blur(); // Déclenche l'événement blur pour sauvegarder
        }
    });
}

let modeCouchation = false; // Variable pour suivre l'état du mode suppression

// Fonction pour activer/désactiver le mode suppression
function toggleModeCouchation() {
    modeCouchation = !modeCouchation; // Inverse l'état du mode suppression
    const button = document.getElementById('coucher');
    button.style.backgroundColor = modeCouchation ? "red" : "white";
}

function coucherJoueur() {
    if (modeCouchation) {
        delete miseParJoueur[this.id];
        this.style.backgroundColor = "grey";
        modeCouchation = false; // Désactive le mode suppression après la suppression
        const bouton = document.getElementById('coucher');
        bouton.style.backgroundColor = "white"; // Met à jour la couleur du bouton
    }
}

document.querySelectorAll('.joueur').forEach(element => {
    element.addEventListener('click', coucherJoueur);
});