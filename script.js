function fermerFenetre() {
    Array.from(document.getElementsByClassName('modal')).forEach(element => {
        element.style.display = 'none';
    });
}

function ouvrirFenetre() {
    Array.from(document.getElementsByClassName('modal')).forEach(element => {
        element.style.display = 'block';
    });
}

window.onclick = function(event) {
    if (event.target.className == 'modal') {
        fermerFenetre();
    }
}