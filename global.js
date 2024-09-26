let nbJoueurs = 8;

let cagnotteParJoueur = {}; // Dictionnaire pour savoir quelle part de la cagnote chaque joueur peut toucher

let soldes = {};

let soldeDepart = 500;

let cagnotte = 0;

let mise = 0;

let misePetiteBlinde = 50;

let positionDealer = 0;

let premierTour = true;

let modeSuppression = false; // Booléen pour suivre l'état du mode suppression

let modeCouchation = false; // Booléen pour suivre l'état du mode couchation

let modeGagnage = false; // Booléen pour suivre l'état du mode gagnage

window.addEventListener('resize', positionJoueurs);

initialiserJeu();