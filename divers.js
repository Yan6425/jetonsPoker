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


function initialiserCPJ() {
	document.querySelectorAll('.joueur').forEach((joueur) => {
		cagnotteParJoueur[joueur.id] = 0;
	});
}


function resetModes() {
    modeCouchation = false;
	modeGagnage = false;
	modeSuppression = false;
	document.querySelectorAll('.bouton').forEach((bouton) => {
        bouton.style.backgroundColor = 'white';
	});
}


function nouvellePartie() {
    initialiserCPJ();
    document.querySelectorAll('.joueur').forEach((joueur) => {
            joueur.style.backgroundColor = 'orange';
        });
    positionDealer = (positionDealer + 1) % nbJoueurs;
    positionJoueurs();
    majMise(misePetiteBlinde * 2);
    premierTour = true;
    resetModes();
}


function initialiserJeu() {
    for (let i = 0; i < nbJoueurs; i++) {
        new Joueur;
    }
    initialiserCPJ();
    majCagnotte(0);
    majMise(misePetiteBlinde * 2);
    positionDealer = 0;
    premierTour = true;
    resetModes();
    positionJoueurs();
}

