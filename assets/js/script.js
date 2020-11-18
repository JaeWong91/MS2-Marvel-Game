class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/audio/The-Avengers-Theme-Song.mp3');
        this.flipSound = new Audio('assets/audio/card-flip.wav');
        this.matchSound = new Audio('assets/audio/match.wav');
        this.victorySound = new Audio('assets/audio/victory.wav');
        this.gameOverSound = new Audio('assets/audio/fail.wav');
        this.bgMusic.volume = 0.5; 
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
                // game.startGame();
                let audioController = new AudioController();
                audioController.startMusic();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); // once everything in html file is loaded, it is going to call the function
} else {
    ready();
}



// get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";   
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    this.modal.style.display = "none";    
    }
}


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); // once everything in html file is loaded, it is going to call the function
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        })
    });
}


