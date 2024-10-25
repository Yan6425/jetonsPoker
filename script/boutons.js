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
	let joueursNonCouches = [];
	premierTour = false;
	for (const id in joueurs) {
		if (!joueurs[id].couche){
			joueursNonCouches.push(joueurs[id]);
			joueurs[id].miser(mise);
			joueurs[id].perdreMise();
		}
	}
	joueursNonCouches.forEach(joueur1 => {
		joueursNonCouches.forEach(joueur2 => {
			joueur1.cagnotte += (joueur1.mise < joueur2.mise) ? joueur1.mise : joueur2.mise;
		})
	})
	for (const id in joueurs){
		joueurs[id].mise = 0;
	}
	majMise(0);
}
document.getElementById('tour').addEventListener('click', terminerTour);

// -------------------- bouton Modifier mise ---------------------
function modifierMise() {
	modifierChamp(document.getElementById('mise'), mise, 'number', function (valeurEntree){
		if (!valeurEntree == '') {
			valeurEntree = Number(valeurEntree);
			if (Number.isInteger(valeurEntree) && valeurEntree >= 0) {
				majMise(
					(premierTour && valeurEntree < (misePetiteBlinde * 2)) ? misePetiteBlinde * 2 : valeurEntree
				);
			}
		}
		majMise(mise);
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
	document.getElementById('coucher').style.backgroundColor = modeCouchation ? 'red' : 'white';
	document.querySelectorAll('.joueur').forEach(baliseJoueur => {
		const joueur = joueurs[baliseJoueur.id];
		if (modeCouchation) {
			baliseJoueur.onclick = joueur.coucher.bind(joueur);
		}
		else {
			baliseJoueur.onclick = null;
		}
	})
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
	Object.values(joueurs).forEach(joueur => {
		if (modeGagnage) {
			joueur.balise.onclick = joueur.gagnant.bind(joueur);
		}
		else {
			joueur.balise.onclick = null;
		}
	})
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
	document.querySelectorAll('.joueur').forEach(baliseJoueur => {
		const joueur = joueurs[baliseJoueur.id];
		if (modeSuppression) {
			baliseJoueur.onclick = joueur.supprimer.bind(joueur);
		}
		else {
			baliseJoueur.onclick = null;
		}
	})
}
document
	.getElementById('enleverJoueur')
	.addEventListener('click', enleverJoueur);

// -------------------- bouton petite blinde ---------------------
// Fonction pour changer la valeur de la petite blinde
function changerPetiteBlinde() {
	modifierChamp(document.getElementById('boutonPetiteBlinde'), misePetiteBlinde, 'number', function (valeurEntree){
		if (!valeurEntree == '') {
			valeurEntree = Number(valeurEntree);
			if (Number.isInteger(valeurEntree) && valeurEntree >= 0) {
				misePetiteBlinde = valeurEntree;
				if (premierTour) {
					majMise(valeurEntree * 2);
					return;
				}
			}
		}
	});
}
document.getElementById('boutonPetiteBlinde').addEventListener('click', changerPetiteBlinde);

// -------------------- bouton fermer parametres ---------------------
function fermerParametres() {
    document.getElementById('parametres').style.display = 'none';
}
document.getElementById('boutonFermerParametres').addEventListener('click', fermerParametres);

window.onclick = function(event) {
	if (event.target.id == 'parametres') {
		fermerParametres();
	}
}

// -------------------- bouton ouvrir parametres ---------------------
function ouvrirParametres() {
	let parametres = document.getElementById('parametres');
    parametres.querySelectorAll("form input").forEach(element => {
		element.value = window[element.name];
    })
    parametres.style.display = 'block';
}
document.getElementById('boutonOuvrirParametres').addEventListener('click', ouvrirParametres);

// -------------------- bouton nouvelle partie ---------------------
function nouvellePartie() {
	event.preventDefault();
    for (id in joueurs) {
		joueurs[id].supprimer();
	}
	formulaire = new FormData(document.getElementById('initialiserJeu'));
	for (let [nom, valeur] of formulaire.entries()) {
        window[nom] = +valeur;
    }
	fermerParametres();
	initialiserPartie();
}
document.getElementById('initialiserJeu').addEventListener('submit', nouvellePartie);