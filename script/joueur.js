class Joueur {
	constructor() {
        const cercle = document.getElementById('cercle');
        this.balise = document.createElement('div');
        this.balise.className = 'joueur';
        this.genererId();
        cagnotteParJoueur[this.balise.id] = 0;

        this.nom = document.createElement('div');
        this.nom.className = 'nom';
        this.nom.textContent = 'Entrez un nom';
        this.nom.addEventListener('click', this.modifierNom.bind(this));
        this.balise.appendChild(this.nom);

        this.solde = document.createElement('div');
        this.solde.className = 'solde';
        this.majSolde(soldeDepart);
        this.solde.addEventListener('click', this.modifierSolde.bind(this));
        this.balise.appendChild(this.solde);

        cercle.appendChild(this.balise);
        positionJoueurs();

        joueurs[this.balise.id] = this;
    }

    genererId() {
        let id = '';
        do {
            for (let i = 0; i < 8; i++) {
                id += Math.floor(Math.random() * 10);
            }
        } while (document.getElementById(id) !== null);
        this.balise.id = id;
        return id;
    }

    modifierNom() {
        if (!modeCouchation && !modeGagnage & !modeSuppression){
            modifierChamp(this.nom, this.nom.textContent, 'text', function (valeurEntree){
                this.nom.textContent = valeurEntree;
            }.bind(this));
        }
    }

    modifierSolde() {
        if (!modeCouchation && !modeGagnage & !modeSuppression){
            modifierChamp(this.solde, this.solde.textContent, 'number', function (valeurEntree){
                if (valeurEntree != ''){
                    valeurEntree = Number(valeurEntree);
                    if (Number.isInteger(valeurEntree) && valeurEntree >= 0) {
                        this.majSolde(valeurEntree);
                    }
                }
                this.majSolde(soldes[this.balise.id]);
            }.bind(this));
        }
    }

    majSolde(somme) {
        soldes[this.balise.id] = Number(somme);
        this.solde.textContent = `${soldes[this.balise.id]}`;
    }

    addSolde(somme) {
        soldes[this.balise.id] += Number(somme);
        this.solde.textContent = `${soldes[this.balise.id]}`;
    }

    coucher() {
        let position = Array.from(document.querySelectorAll('.joueur')).indexOf(this.balise);
        let positionRelativeDealer = (((position - positionDealer) % nbJoueurs) + nbJoueurs) % nbJoueurs;
        delete cagnotteParJoueur[this.balise.id];
        if ([1, 2].includes(positionRelativeDealer)) {
            const blinde = misePetiteBlinde * positionRelativeDealer;
            addCagnotte(blinde);
            for (const id in cagnotteParJoueur) {
                cagnotteParJoueur[id] += blinde;
            }
            this.addSolde(-blinde);
        }
        this.balise.style.backgroundColor = 'grey';
    }

    gagnant() {
        if (!premierTour) {
            terminerTour();
        }
        const somme =
            cagnotteParJoueur[this.balise.id] < cagnotte
                ? cagnotteParJoueur[this.balise.id]
                : cagnotte;
        this.addSolde(somme);
        addCagnotte(-somme);
        if (cagnotte == 0) {
            initialiserMise();
        }
    }

    supprimer() {
        nbJoueurs = nbJoueurs - 1;
        if (
            positionDealer >
            Array.from(document.querySelectorAll('.joueur')).indexOf(this.balise)
        ) {
            positionDealer = (positionDealer - 1) % nbJoueurs;
        }
        delete cagnotteParJoueur[this.balise.id];
        this.balise.remove(); // Supprime l'élément cliqué
        positionJoueurs();
    }
}
