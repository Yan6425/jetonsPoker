function positionJoueurs() {
	const joueurs = document.querySelectorAll('.joueur'); // Sélectionne tous les éléments avec la classe 'joueur'
	const nbJoueurs = joueurs.length; // Compte le nombre total de joueurs
	const incrementAngle = 360 / nbJoueurs; // Calcule l'angle entre chaque joueur
	const rayonCercle = window.innerHeight < window.innerWidth ? '30vh' : '30vw';
	const rayonDealer = window.innerHeight < window.innerWidth ? '17vh' : '17vw';

	joueurs.forEach((player, index) => {
		const angle = incrementAngle * index; // Calcule l'angle pour chaque joueur
		player.style.transform = `rotate(${angle - 90}deg) translate(${rayonCercle}) rotate(${-angle + 90}deg)`; // Applique les transformations CSS
	});
	const angle = incrementAngle * positionDealer;
	document.getElementById('dealer').style.transform = `rotate(${
		angle - 90
	}deg) translate(${rayonDealer}) rotate(${-angle + 90}deg)`;
}


function modifierChamp(balise, valeurDepart, type, fonction){
	// Crée un champ input pour éditer le texte
	const input = document.createElement('input');
	input.type = type;
	input.value = valeurDepart;

	// Remplace le contenu de l'élément par l'input
	balise.textContent = '';
	balise.appendChild(input);
	input.focus(); // Met le focus sur l'input pour l'édition immédiate

	// Gestion de la sauvegarde du texte
	input.addEventListener('blur', () => {
		fonction(input.value);
		input.remove();
	});

	// Option de sauvegarde du texte avec la touche "Enter"
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			input.blur(); // Déclenche l'événement blur pour sauvegarder
		}
	});
}


function majMise(somme) {
	somme = Number(somme);
	mise = somme;
	document.getElementById('mise').textContent = `mise : ${mise}`;
}

function majCagnotte(somme) {
	somme = Number(somme);
	cagnotte = somme;
	document.getElementById('cagnotte').textContent = `cagnotte : ${cagnotte}`;
}

function addCagnotte(somme) {
	somme = Number(somme);
	cagnotte += somme;
	document.getElementById('cagnotte').textContent = `cagnotte : ${cagnotte}`;
}


function resetModes() {
    modeCouchation = false;
	modeGagnage = false;
	modeSuppression = false;
	document.querySelectorAll('.bouton').forEach((bouton) => {
        bouton.style.backgroundColor = 'white';
	});
}

window.onclick = function(event) {
	if (!Object.keys(joueurs).includes(event.target.parentElement.id) && !['coucherJoueur', 'choisirGagnant', 'enleverJoueur'].includes(event.target.id)) {
		resetModes();
	}
}


function initialiserMise() {
    Object.values(joueurs).forEach(joueur => {
		joueur.cagnotte = 0;
        joueur.balise.style.backgroundColor = 'orange';
    });
    positionDealer = (positionDealer + 1) % nbJoueurs;
    positionJoueurs();
    majMise(misePetiteBlinde * 2);
    premierTour = true;
    resetModes();
}


function initialiserPartie() {
    for (let i = 0; i < nbJoueurs; i++) {
        new Joueur;
    }
    majCagnotte(0);
    majMise(misePetiteBlinde * 2);
    positionDealer = 0;
    premierTour = true;
    resetModes();
    positionJoueurs();
}
