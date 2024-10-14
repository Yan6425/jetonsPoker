var nbJoueurs = 5;

var joueurs = {};

var cagnotteParJoueur = {}; // Dictionnaire pour savoir quelle part de la cagnote chaque joueur peut toucher

var soldes = {};

var soldeDepart = 500;

var cagnotte = 0;

var mise = 0;

var misePetiteBlinde = 25;

var positionDealer = 0;

var premierTour = true;

var modeSuppression = false; // Booléen pour suivre l'état du mode suppression

var modeCouchation = false; // Booléen pour suivre l'état du mode couchation

var modeGagnage = false; // Booléen pour suivre l'état du mode gagnage

window.addEventListener('resize', positionJoueurs, {passive : true});

initialiserPartie();