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

        this.balise.addEventListener('click', this.coucher.bind(this));
        this.balise.addEventListener('click', this.gagnant.bind(this));
        this.balise.addEventListener('click', this.supprimer.bind(this));
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
        if (!modeSuppression && !modeCouchation && !modeGagnage) {
            // Crée un champ input pour éditer le texte
            const input = document.createElement('input');
            input.type = 'text';
            input.value = this.nom.textContent; // Utilise `this` pour accéder à l'élément actuel
    
            // Remplace le contenu de l'élément par l'input
            this.nom.textContent = '';
            this.nom.appendChild(input);
            input.focus(); // Met le focus sur l'input pour l'édition immédiate
    
            // Gestion de la sauvegarde du texte
            input.addEventListener('blur', () => {
                this.nom.textContent = input.value; // Utilise `this` pour l'élément actuel
            });
    
            // Option de sauvegarde du texte avec la touche "Enter"
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    input.blur(); // Déclenche l'événement blur pour sauvegarder
                }
            });
        }
    }

    modifierSolde() {
        if (!modeSuppression && !modeCouchation && !modeGagnage) {
            // Crée un champ input pour éditer le texte
            const input = document.createElement('input');
            input.type = 'number';
            input.value = this.solde.textContent; // Utilise `this` pour accéder à l'élément actuel
    
            // Remplace le contenu de l'élément par l'input
            this.solde.textContent = '';
            this.solde.appendChild(input);
            input.focus(); // Met le focus sur l'input pour l'édition immédiate
    
            // Gestion de la sauvegarde du texte
            input.addEventListener('blur', () => {
                if (
                    input.value == '' ||
                    Number(input.value) < 0 ||
                    !Number.isInteger(Number(input.value))
                ) {
                    this.majSolde(0);
                } else {
                    this.majSolde(Number(input.value));
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

    majSolde(somme) {
        soldes[this.balise.id] = Number(somme);
        this.solde.textContent = `${soldes[this.balise.id]}`;
    }

    addSolde(somme) {
        soldes[this.balise.id] += Number(somme);
        this.solde.textContent = `${soldes[this.balise.id]}`;
    }

    coucher() {
        if (modeCouchation) {
            let pos = Array.from(document.querySelectorAll('.joueur')).indexOf(this.balise);
            let posRelativeDealer =
                (((pos - positionDealer) % nbJoueurs) + nbJoueurs) % nbJoueurs;
            if ([1, 2].includes(posRelativeDealer)) {
                this.addSolde(-misePetiteBlinde * posRelativeDealer);
            }
            delete cagnotteParJoueur[this.balise.id];
            this.balise.style.backgroundColor = 'grey';
        }
    }

    gagnant() {
        if (modeGagnage && this.balise.id in cagnotteParJoueur){
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
                nouvellePartie();
            }
        }
    }

    supprimer() {
        if (modeSuppression) {
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
}
