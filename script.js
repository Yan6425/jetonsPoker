function fermerFenetre() {
    Array.from(document.getElementsByClassName('modal')).forEach(element => {
        element.style.display = 'none';
    });
}

window.onclick = function(event) {
    if (event.target.className == 'modal') {
        fermerFenetre();
    }
}