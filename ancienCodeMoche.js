let nbJoueurs = 8;

let soldeDepart = 500;

let cagnotteParJoueur = {};

let soldes = {};

initialiserPartie();

let modeSuppression = false; // Variable pour suivre l'état du mode suppression

// Fonction pour activer/désactiver le mode suppression
function toggleModeSuppression() {
	if (!modeSuppression) {
		resetModes();
	}
	modeSuppression = !modeSuppression; // Inverse l'état du mode suppression
	const button = document.getElementById('enleverJoueur');
	button.style.backgroundColor = modeSuppression ? 'red' : 'white';
}

// Sélectionne tous les éléments avec la classe 'supprimable' et ajoute un écouteur d'événement
document.querySelectorAll('.joueur').forEach((element) => {
	element.addEventListener('click', supprimerJoueur);
});

let positionDealer = 0;

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

window.addEventListener('resize', positionJoueurs);

//position des joueurs
positionJoueurs();

let mise = 0;

function majMise(somme) {
	somme = Number(somme);
	mise = somme;
	document.getElementById('mise').textContent = `mise : ${mise}`;
}

function modifierMise() {
	// Crée un champ input pour éditer le texte
	const input = document.createElement('input');
	input.type = 'number';
	const texteMise = document.getElementById('mise');

	// Remplace le contenu de l'élément par l'input
	texteMise.textContent = '';
	texteMise.appendChild(input);
	input.focus(); // Met le focus sur l'input pour l'édition immédiate
	
	// Gestion de la sauvegarde du texte
	input.addEventListener('blur', () => {
		if (
			!(
				input.value == '' ||
				Number(input.value) < 0 ||
				!Number.isInteger(Number(input.value))
			)
		) {
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
	if (!modeCouchation) {
		resetModes();
	}
	modeCouchation = !modeCouchation; // Inverse l'état du mode couchation
	const button = document.getElementById('coucher');
	button.style.backgroundColor = modeCouchation ? 'red' : 'white';
}

document.querySelectorAll('.joueur').forEach((element) => {
	element.addEventListener('click', coucherJoueur);
});

let cagnotte = 0;

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

function terminerTour() {
	premierTour = false;
	const soldesJoueursAllin = {};
	for (const idJoueur in cagnotteParJoueur) {
		if (soldes[idJoueur] < mise) {
			soldesJoueursAllin[idJoueur] = soldes[idJoueur];
			addCagnotte(soldes[idJoueur]);
		} else {
			addCagnotte(mise);
		}
	}
	for (const idJoueur in cagnotteParJoueur) {
		const somme = soldes[idJoueur] < mise ? soldes[idJoueur] : mise;
		for (const idJoueurAllin in soldesJoueursAllin) {
			cagnotteParJoueur[idJoueur] +=
			soldesJoueursAllin[idJoueurAllin] < somme
					? soldesJoueursAllin[idJoueurAllin]
					: somme;
				}
				cagnotteParJoueur[idJoueur] +=
				somme *
				(Object.keys(cagnotteParJoueur).length -
				Object.keys(soldesJoueursAllin).length);
				addSolde(idJoueur, -somme);
	}
	majMise(0);
}

let modeGagnage = false; // Variable pour suivre l'état du mode gagnage

// Fonction pour activer/désactiver le mode suppression
function toggleModeGagnage() {
	if (!modeGagnage) {
		resetModes();
	}
	modeGagnage = !modeGagnage; // Inverse l'état du mode suppression
	const button = document.getElementById('gagnant');
	button.style.backgroundColor = modeGagnage ? 'red' : 'white';
}

function initialiserCPJ() {
	document.querySelectorAll('.joueur').forEach((joueur) => {
		cagnotteParJoueur[joueur.id] = 0;
	});
}

let premierTour = true;

function initialiserPartie() {
	document.querySelectorAll('.joueur').forEach((joueur) => {
		joueur.id = genererId();
		cagnotteParJoueur[joueur.id] = 0;
		majSolde(joueur.id, soldeDepart);
	});
}

// initialiserCPJ();
// document.querySelectorAll('.joueur').forEach((joueur) => {
	// 	joueur.style.backgroundColor = 'orange';
// });
// positionDealer = (positionDealer + 1) % nbJoueurs;
// positionJoueurs();
// majMise(misePetiteBlinde * 2);
// premierTour = true;
// modeGagnage = false; // Désactive le mode suppression après la suppression
// document.getElementById('gagnant').style.backgroundColor = 'white'; // Met à jour la couleur du bouton

initialiserPartie
document.querySelectorAll('.joueur').forEach((element) => {
	element.addEventListener('click', selectionnerGagnant);
});

function resetModes() {
	modeCouchation = false;
	modeGagnage = false;
	modeSuppression = false;
	document.querySelectorAll('.bouton').forEach((bouton) => {
		bouton.style.backgroundColor = 'white';
	});
	document.querySelector;
}

let misePetiteBlinde = 50;
majMise(misePetiteBlinde * 2);

function changerPetiteBlinde() {
	// Crée un champ input pour éditer le texte
	const input = document.createElement('input');
	input.type = 'number';
	input.value = this.textContent; // Utilise `this` pour accéder à l'élément actuel

	// Remplace le contenu de l'élément par l'input
	this.appendChild(input);
	input.focus(); // Met le focus sur l'input pour l'édition immédiate

	// Gestion de la sauvegarde du texte
	input.addEventListener('blur', () => {
		if (
			!(
				input.value == '' ||
				Number(input.value) < 0 ||
				!Number.isInteger(Number(input.value))
			)
		) {
			misePetiteBlinde = Number(input.value);
			if (premierTour) {
				majMise(Number(input.value) * 2);
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

document
	.getElementById('dealer')
	.addEventListener('click', changerPetiteBlinde);