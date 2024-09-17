function modifierNom() {
    if (!modeCouchation && !modeSuppression && !modeGagnage){
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
    if (!modeCouchation && !modeSuppression && !modeGagnage){
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
                majSolde(this.parentNode.id, input.value); 
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

let soldeDepart = 500;

function ajouterJoueur() {
    if (nbJoueurs < 10){
        nbJoueurs = nbJoueurs + 1;
        const cercle = document.getElementById("cercle");
        const joueur = document.createElement("div");
        joueur.className = "joueur";
        joueur.id = genererId();
        cagnotteParJoueur[joueur.id] = 0;
        soldes[joueur.id] = soldeDepart;
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
        joueur.addEventListener("click", coucherJoueur);
        joueur.addEventListener("click", selectionnerGagnant);
        cercle.appendChild(joueur);
        positionJoueurs();
    }
}

let cagnotteParJoueur = {};

let soldes = {};

function initialiserPartie() {
    document.querySelectorAll(".joueur").forEach(joueur => {
        joueur.id = genererId();
        cagnotteParJoueur[joueur.id] = 0;
        majSolde(joueur.id, soldeDepart);
    });
}

initialiserPartie();

let modeSuppression = false; // Variable pour suivre l'état du mode suppression

// Fonction pour activer/désactiver le mode suppression
function toggleModeSuppression() {
    if (!modeSuppression) {resetModes();}
    modeSuppression = !modeSuppression; // Inverse l'état du mode suppression
    const button = document.getElementById('enleverJoueur');
    button.style.backgroundColor = modeSuppression ? "red" : "white";
}


function supprimerJoueur() {
    if (modeSuppression) {
        nbJoueurs = nbJoueurs - 1;
        if (positionDealer > Array.from(document.querySelectorAll(".joueur")).indexOf(this)){
            positionDealer = (positionDealer - 1) % nbJoueurs;
        }
        delete cagnotteParJoueur[this.id];
        this.remove(); // Supprime l'élément cliqué
        positionJoueurs();
    }
}

// Sélectionne tous les éléments avec la classe 'supprimable' et ajoute un écouteur d'événement
document.querySelectorAll('.joueur').forEach(element => {
    element.addEventListener('click', supprimerJoueur)
});

let positionDealer = 0;

function positionJoueurs() {
    const joueurs = document.querySelectorAll('.joueur'); // Sélectionne tous les éléments avec la classe 'joueur'
    const nbJoueurs = joueurs.length; // Compte le nombre total de joueurs
    const incrementAngle = 360 / nbJoueurs; // Calcule l'angle entre chaque joueur
    const rayonCercle = window.innerHeight < window.innerWidth ? "30vh" : "30vw";
    const rayonDealer = window.innerHeight < window.innerWidth ? "17vh" : "17vw";
    
    joueurs.forEach((player, index) => {
        const angle = incrementAngle * index; // Calcule l'angle pour chaque joueur
        player.style.transform = `rotate(${angle - 90}deg) translate(${rayonCercle}) rotate(${-angle + 90}deg)`; // Applique les transformations CSS
    });
    const angle = incrementAngle * positionDealer;
    document.getElementById("dealer").style.transform = `rotate(${angle - 90}deg) translate(${rayonDealer}) rotate(${-angle + 90}deg)`;
}

window.addEventListener("resize", positionJoueurs);

//position des joueurs
positionJoueurs();

let mise = 0;

function majMise(somme) {
    somme = Number(somme);
    mise = somme;
    document.getElementById("mise").textContent = `mise : ${mise}`;
}

function modifierMise() {
    // Crée un champ input pour éditer le texte
    const input = document.createElement('input');
    input.type = 'number';
    const texteMise = document.getElementById("mise");
    
    // Remplace le contenu de l'élément par l'input
    texteMise.textContent = '';
    texteMise.appendChild(input);
    input.focus(); // Met le focus sur l'input pour l'édition immédiate
    
    // Gestion de la sauvegarde du texte
    input.addEventListener('blur', () => {
        if (!(input.value == "" || Number(input.value) < 0 || !Number.isInteger(Number(input.value)))){
            majMise(Number(input.value));
        }
    });
    
    // Option de sauvegarde du texte avec la touche "Enter"
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            input.blur(); // Déclenche l'événement blur pour sauvegarder
        }
    });
}

let modeCouchation = false; // Variable pour suivre l'état du mode couchation

// Fonction pour activer/désactiver le mode couchation
function toggleModeCouchation() {
    if (!modeCouchation) {resetModes();}
    modeCouchation = !modeCouchation; // Inverse l'état du mode couchation
    const button = document.getElementById('coucher');
    button.style.backgroundColor = modeCouchation ? "red" : "white";
}

function coucherJoueur() {
    if (modeCouchation) {
        pos = Array.from(document.querySelectorAll(".joueur")).indexOf(this);
        posRelativeDealer = ((pos - positionDealer) % nbJoueurs + nbJoueurs) % nbJoueurs;
        if ([1, 2].includes(posRelativeDealer)) {
            addSolde(this.id, -misePetiteBlinde * posRelativeDealer);
        }
        delete cagnotteParJoueur[this.id];
        this.style.backgroundColor = "grey";
    }
}


document.querySelectorAll('.joueur').forEach(element => {
    element.addEventListener('click', coucherJoueur);
});

function majSolde(idJoueur, somme) {
    somme = Number(somme);
    soldes[idJoueur] = somme;
    document.getElementById(idJoueur).querySelector(".solde").textContent = `${soldes[idJoueur]}`;
}

function addSolde(idJoueur, somme) {
    somme = Number(somme);
    soldes[idJoueur] += somme;
    document.getElementById(idJoueur).querySelector(".solde").textContent = `${soldes[idJoueur]}`;
}

let cagnotte = 0;

function majCagnotte(somme){
    somme = Number(somme);
    cagnotte = somme;
    document.getElementById("cagnotte").textContent = `cagnotte : ${cagnotte}`;
}

function addCagnotte(somme){
    somme = Number(somme);
    cagnotte += somme;
    document.getElementById("cagnotte").textContent = `cagnotte : ${cagnotte}`;
}

function terminerTour() {
    premierTour = false;
    const soldesJoueursAllin = {};
    for (const idJoueur in cagnotteParJoueur) {
        if (soldes[idJoueur] < mise) {
            soldesJoueursAllin[idJoueur] = soldes[idJoueur];
            addCagnotte(soldes[idJoueur]);
        }
        else{ addCagnotte(mise);}
    }
    for (const idJoueur in cagnotteParJoueur) {
        const somme = soldes[idJoueur] < mise ? soldes[idJoueur] : mise;
        for (const idJoueurAllin in soldesJoueursAllin) {
            cagnotteParJoueur[idJoueur] += soldesJoueursAllin[idJoueurAllin] < somme ? soldesJoueursAllin[idJoueurAllin] : somme;
        }
        cagnotteParJoueur[idJoueur] += somme * (Object.keys(cagnotteParJoueur).length - Object.keys(soldesJoueursAllin).length);
        addSolde(idJoueur, -somme);
    }
    majMise(0);
}

let modeGagnage = false; // Variable pour suivre l'état du mode gagnage

// Fonction pour activer/désactiver le mode suppression
function toggleModeGagnage() {
    if (!modeGagnage) {resetModes();}
    modeGagnage = !modeGagnage; // Inverse l'état du mode suppression
    const button = document.getElementById('gagnant');
    button.style.backgroundColor = modeGagnage ? "red" : "white";
}

function initialiserCPJ() {
    document.querySelectorAll(".joueur").forEach(joueur => {
        cagnotteParJoueur[joueur.id] = 0;
    });
}

let premierTour = true;

function selectionnerGagnant() {
    if (modeGagnage && this.id in cagnotteParJoueur) {
        if (!premierTour){terminerTour();}
        const somme = cagnotteParJoueur[this.id] < cagnotte ? cagnotteParJoueur[this.id] : cagnotte;
        addSolde(this.id, somme);
        addCagnotte(-somme);
        if (cagnotte == 0){
            initialiserCPJ();
            document.querySelectorAll(".joueur").forEach(joueur => {
                joueur.style.backgroundColor = "orange";
            });
            positionDealer = (positionDealer + 1) % nbJoueurs;
            positionJoueurs();
            majMise(misePetiteBlinde * 2);
            premierTour = true;
            modeGagnage = false; // Désactive le mode suppression après la suppression
            document.getElementById('gagnant').style.backgroundColor = "white"; // Met à jour la couleur du bouton
        }
    }
}

document.querySelectorAll('.joueur').forEach(element => {
    element.addEventListener('click', selectionnerGagnant)
});

function resetModes() {
    modeCouchation = false;
    modeGagnage = false;
    modeSuppression = false;
    document.querySelectorAll(".bouton").forEach(bouton => {
        bouton.style.backgroundColor = "white";
    });
    document.querySelector
}

let misePetiteBlinde = 50;
majMise(misePetiteBlinde * 2);

function changerPetiteBlinde(){
    // Crée un champ input pour éditer le texte
    const input = document.createElement('input');
    input.type = 'number';
    input.value = this.textContent; // Utilise `this` pour accéder à l'élément actuel
    
    // Remplace le contenu de l'élément par l'input
    this.appendChild(input);
    input.focus(); // Met le focus sur l'input pour l'édition immédiate

    // Gestion de la sauvegarde du texte
    input.addEventListener('blur', () => {
        if (!(input.value == "" || Number(input.value) < 0 || !Number.isInteger(Number(input.value)))){
            misePetiteBlinde = Number(input.value);
            if (premierTour) {
                majMise(Number(input.value));
            }
        }
        input.remove();
    });

    // Option de sauvegarde du texte avec la touche "Enter"
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            input.blur(); // Déclenche l'événement blur pour sauvegarder
        }
    });
}

document.getElementById("dealer").addEventListener("click", changerPetiteBlinde);