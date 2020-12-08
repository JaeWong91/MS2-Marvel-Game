
// --- Music and Sounds ---//
class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/audio/avengers-theme.mp3');
        this.flipSound = new Audio('assets/audio/card-flip.wav');
        this.matchSound = new Audio('assets/audio/match.wav');
        this.victorySound = new Audio('assets/audio/victory.wav');
        this.gameOverSound = new Audio('assets/audio/fail.wav');
        //this.bgMusicState = "on"; // added this to test audio controls
        this.bgMusic.volume = 0.2; 
        this.bgMusic.loop = true;
        this.flipSound.volume = 0.5;
    }
    startMusic() {
        this.victorySound.pause();      //ADDED THIS MYSELF
        this.victorySound.currentTime = 0;      //ADDED THIS MYSELF
        this.gameOverSound.pause();     //ADDED THIS MYSELF
        this.gameOverSound.currentTime = 0;    //ADDED THIS MYSELF
        if (bgMusicState == "on") { // To determing to play bg music
            this.bgMusic.play();
        }
        
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }

    //testing modal function og stopSound function

    stopSound() {
        this.audioController.stopMusic();
    }

    victory() {                     // on victory, it stops the background music then plays this
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {                    // on game over, it stops the background music then plays this
        this.stopMusic();
        this.gameOverSound.play();
    }

    
}


class MarvelCards {                  // creating a new class
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('attempts');    // changed from flips to attempts
        this.audioController = new AudioController();   // this audio controller belongs to this particular object
    }
    startGame() {                       // At each start of game, the below will be executed
        this.cardToCheck = null; // 
        this.totalClicks = 0;   
        this.timeRemaining = this.totalTime;  // this will reset time on each restart of the game
        this.matchedCards = [];  // the matched cards will be in this array
        this.busy = true; //starting off as true, we will put false when we start the game
        
        setTimeout(() => {  
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;          //every timeout will set 'busy' to false;
        },1000);
        this.hideCards();       //activate function hide cards
        this.timer.innerText = this.timeRemaining;   
        this.ticker.innerText = this.totalClicks;
    } 

    hideCards() {           //the hide card function
        this.cardsArray.forEach(card => {           //for all the cards in the array, each card will
            card.classList.remove('visible');       //remove visible
            card.classList.remove('matched');       // and apply matched class
        });
    }

    flipCard(card) {                            //the flip card function
        if(this.canFlipCard(card)) {            //testing if 'card' can be flipped - if yes then...
            this.audioController.flip();        //the flip sound will activate
            this.totalClicks++;                 //the number of total clicks increases by 1
            this.ticker.innerText = this.totalClicks;   //the actual inner text of the "ticker" will equal the totalClicks (which will increase by 1 per click)
            card.classList.add('visible');      //each card clicked/flipped will have the "visible" class applied to it, hence flipping it

            if(this.cardToCheck)         // if this.cardToCheck is NOT null then...
                this.checkForCardMatch(card);   //function to check for card match will activate (passing the "card" parameter into it)
            else
                this.cardToCheck = card;        //if this.cardToCheck IS null then "cardToCheck" becomes "card"
        }
    }

    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))   
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null; 
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);      //this will push the matched cards into the cards ARRAY!
        this.matchedCards.push(card2);      
        card1.classList.add('matched');     //this is the class for animation "matched" in css file
        card2.classList.add('matched');     
        this.audioController.match();       // this will play the sound for when a play matches a card
        if(this.matchedCards.length === this.cardsArray.length)   //if the number of matched cards = the number of total cards in the array then the victory song will play!
            this.victory();
    }

    cardMisMatch(card1, card2) {                // here whenever a card is not matched, it will remove the "visible" class and flip the card back facing down
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');          
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;             // [0] because its only one card-- this is checking the "card" class which is the block. within that block is the file source of the image, eg "assets/images/thor.png"
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

    //SHUFFLE ALGORITHM  --- Fisher Yates algorithm -- taken from youtube
    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {                                       
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {                                                                         // here if the below statement is true, then the player can flip the card
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck // This creates a boolean - here is if statement so if (! means is not) all 3 statements are all FALSE then the statement will be true.
    }

    //muteMusic(){              CANNOT GET THIS TO WORK
    //    let musicControls = document.getElementById('musicControls');

    //    musicControls.addEventListener('click', () => {
    //    if (bgMusicState == "off") {
     //       console.log("bgMusicState is off")
     //       bgMusicState = "on";
     //       musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>"                      //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
     //       this.audioController.bgMusic.play();
     //   } if (bgMusicState == "on") {
     //       bgMusicState = "off";
     //       musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>"                           //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
     //       this.audioController.bgMusic.pause();
     //   }
      //  })
    
}

let cardMenu = document.getElementById('card-menu');        //added this as test
let btns = Array.from(document.getElementsByClassName('card-play-button'));  //working button function
let cardGame = document.getElementById('card-game');                             //added this as test
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
let cards = Array.from(document.getElementsByClassName('card'));
let game = new MarvelCards(5, cards);


function ready() {    
    /* let cardMenu = document.getElementById('card-menu');        //added this as test
    let btns = Array.from(document.getElementsByClassName('card-play-button'));  //working button function
    let cardGame = document.getElementById('card-game');                             //added this as test
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MarvelCards(90, cards);  */

    
    btns.forEach(btn => {                     // added this as test - Trying to get the modal to close when a button is clicked!!!!
        btn.addEventListener('click', () => {
           cardMenu.classList.add('hide');
            cardGame.classList.remove('hide');
            game.startGame(); 
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();                       //here when you click on the overlay, it will start the game
        });
    });
    cards.forEach(card => {                         
        card.addEventListener('click', () => {
            game.flipCard(card);                //here when you click on a card, it will be game.flipCard
        });
    });


}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); // once everything in html file is loaded, it is going to call the function
} else {
    ready();
}

// MODAL //
var modal = document.getElementById("myModal"); // Get the modal
var audioSetting = document.getElementById("audioSettings");  // Get the button that opens the modal
var span = document.getElementsByClassName("close")[0];  // Get the <span> element that closes the modal

audioSetting.onclick = function() {     // When the user clicks music icon, open the modal
  modal.style.display = "block";
}

span.onclick = function() {     // When the user clicks on <span> (x), close the modal
  modal.style.display = "none";
}


var musicControls = document.getElementById('music-controls');
var bgMusicState = "on"; //default background music is on/unmuted
var soundEffectsControls = document.getElementById('effects-controls');
var soundEffectsState = "on";

//Volume control for background music --- taken from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
var musicVolumeSlider = document.querySelector('#music-volume-slider'); // get slider
    musicVolumeSlider.addEventListener('input', () => {    // 
    game.audioController.bgMusic.volume = musicVolumeSlider.valueAsNumber / 100;
    });



function muteMusic(){
    if (bgMusicState == "off"){
        bgMusicState = "on";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>"                      //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        game.audioController.startMusic();
    } else {
        bgMusicState = "off";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>"                           //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        game.audioController.stopMusic();
    }
} 


var soundEffectsSlider = document.querySelector('#effects-volume-slider');
    soundEffectsSlider.addEventListener('input', () => {  
    game.audioController.flipSound.volume = (soundEffectsSlider.valueAsNumber / 100) * 0.5;
    game.audioController.matchSound.volume = soundEffectsSlider.valueAsNumber / 100;
    game.audioController.victorySound.volume = soundEffectsSlider.valueAsNumber / 100;
    game.audioController.gameOverSound.volume = soundEffectsSlider.valueAsNumber / 100;
    });


function muteSoundEffects(){
    if (soundEffectsState == "off"){
        soundEffectsState = "on";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>"                      //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        game.audioController.flipSound.volume = 0.5;
        game.audioController.matchSound.volume = 1;
        game.audioController.victorySound.volume = 1;
        game.audioController.gameOverSound.volume = 1;
    } else {
        soundEffectsState = "off";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteSoundEffects()\">OFF</button></p>"                           //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        game.audioController.flipSound.volume = 0;
        game.audioController.matchSound.volume = 0;
        game.audioController.victorySound.volume = 0;
        game.audioController.gameOverSound.volume = 0;
    }
} 


