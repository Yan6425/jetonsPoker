class Joueur {
	constructor() {
        const cercle = document.getElementById('cercle');
        this.balise = document.createElement('div');
        this.balise.className = 'joueur';
        this.mise = 0;
        this.solde = 0;
        this.cagnotte = 0;
        this.couche = false;
        this.genererId();

        this.baliseNom = document.createElement('div');
        this.baliseNom.className = 'nom';
        this.baliseNom.textContent = 'Entrez un nom';
        this.baliseNom.addEventListener('click', this.modifierNom.bind(this));
        this.balise.appendChild(this.baliseNom);

        this.baliseSolde = document.createElement('div');
        this.baliseSolde.className = 'solde';
        this.majSolde(soldeDepart);
        this.baliseSolde.addEventListener('click', this.modifierSolde.bind(this));
        this.balise.appendChild(this.baliseSolde);

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
            modifierChamp(this.baliseNom, this.baliseNom.textContent, 'text', function (valeurEntree){
                this.baliseNom.textContent = valeurEntree;
            }.bind(this));
        }
    }

    modifierSolde() {
        if (!modeCouchation && !modeGagnage & !modeSuppression){
            modifierChamp(this.baliseSolde, this.solde, 'number', function (valeurEntree){
                if (valeurEntree != ''){
                    valeurEntree = Number(valeurEntree);
                    if (Number.isInteger(valeurEntree) && valeurEntree >= 0) {
                        this.majSolde(valeurEntree);
                    }
                }
                this.majSolde(this.solde);
            }.bind(this));
        }
    }

    majSolde(somme) {
        this.solde = Number(somme);
        this.baliseSolde.textContent = `${this.solde}`;
    }

    addSolde(somme) {
        this.solde += Number(somme);
        this.baliseSolde.textContent = `${this.solde}`;
    }

    coucher() {
        let position = Array.from(document.querySelectorAll('.joueur')).indexOf(this.balise);
        let positionRelativeDealer = (((position - positionDealer) % nbJoueurs) + nbJoueurs) % nbJoueurs;
        if (premierTour && [1, 2].includes(positionRelativeDealer)) {
            const blinde = misePetiteBlinde * positionRelativeDealer;
            addCagnotte(blinde);
            for (const id in cagnotteParJoueur) {
                cagnotteParJoueur[id] += blinde;
            }
            this.addSolde(-blinde);
        }
        this.couche = true;
        this.balise.style.backgroundColor = 'grey';
    }

    gagnant() {
        if (!premierTour) {
            terminerTour();
        }
        const somme =
            this.cagnotte < cagnotte
                ? this.cagnotte
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
        delete this.cagnotte;
        this.balise.remove(); // Supprime l'élément cliqué
        positionJoueurs();
    }
}
