// -------------------- bouton Ajouter joueur --------------------
function ajouterJoueur() {
	if (nbJoueurs < 10) {
		nbJoueurs++;
		new Joueur();
	}
}
document
	.getElementById('ajouterJoueur')
	.addEventListener('click', ajouterJoueur);

// -------------------- bouton Terminer tour ---------------------
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
		joueurs[idJoueur].addSolde(-somme);
	}
	majMise(0);
}
document.getElementById('tour').addEventListener('click', terminerTour);

// -------------------- bouton Modifier mise ---------------------
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
document.getElementById('miser').addEventListener('click', modifierMise);

// -------------------- bouton Coucher joueur ---------------------
// Fonction pour activer/désactiver le mode couchation
function coucherJoueur() {
	if (!modeCouchation) {
		resetModes();
	}
	modeCouchation = !modeCouchation; // Inverse l'état du mode couchation
	const button = document.getElementById('coucher');
	button.style.backgroundColor = modeCouchation ? 'red' : 'white';
}
document.getElementById('coucher').addEventListener('click', coucherJoueur);

// -------------------- bouton Sélectionner gagnant ---------------------
// Fonction pour activer/désactiver le mode gagnage
function selectionnerGagnant() {
	if (!modeGagnage) {
		resetModes();
	}
	modeGagnage = !modeGagnage; // Inverse l'état du mode suppression
	const button = document.getElementById('gagnant');
	button.style.backgroundColor = modeGagnage ? 'red' : 'white';
}
document
	.getElementById('gagnant')
	.addEventListener('click', selectionnerGagnant);

// -------------------- bouton Supprimer joueur ---------------------
// Fonction pour activer/désactiver le mode suppression
function enleverJoueur() {
	if (!modeSuppression) {
		resetModes();
	}
	modeSuppression = !modeSuppression; // Inverse l'état du mode suppression
	const button = document.getElementById('enleverJoueur');
	button.style.backgroundColor = modeSuppression ? 'red' : 'white';
}
document
	.getElementById('enleverJoueur')
	.addEventListener('click', enleverJoueur);

// -------------------- bouton Dealer ---------------------
// Fonction pour changer la valeur de la petite blinde
function changerPetiteMise() {
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
document.getElementById('dealer').addEventListener('click', changerPetiteMise);
