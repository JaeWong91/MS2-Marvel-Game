// --- Music and Sounds ---//
class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/audio/avengers-theme.mp3');
        this.flipSound = new Audio('assets/audio/card-flip.wav');
        this.matchSound = new Audio('assets/audio/match.wav');
        this.victorySound = new Audio('assets/audio/victory.wav');
        this.gameOverSound = new Audio('assets/audio/fail.wav');
        this.bgMusic.volume = 0.2; 
        this.bgMusic.loop = true;
        this.flipSound.volume = 0.5;
    }
    startMusic() {
        this.victorySound.pause();      
        this.victorySound.currentTime = 0;      
        this.gameOverSound.pause();     
        this.gameOverSound.currentTime = 0;    
        if (bgMusicState == "on") {
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

    stopSound() {
        this.audioController.stopMusic();
    }

    victory() {                     // on victory, it stops the background music then plays this
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {                    // on game over, background music stops, then game over music plays
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MarvelCards { 
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('attempts');    
        this.audioController = new AudioController();   
    }
    // At each start of game, the below will be executed
    startGame() {
        this.cardToCheck = null; 
        this.totalClicks = 0;   
        this.timeRemaining = this.totalTime;  
        this.matchedCards = [];  
        this.busy = true; 
        
        setTimeout(() => {  
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;          
        },1000);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;   
        this.ticker.innerText = this.totalClicks;
    } 

    hideCards() {           //the hide card function
        this.cardsArray.forEach(card => {           
            card.classList.remove('visible');       
            card.classList.remove('matched');       
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
        return card.getElementsByClassName('card-value')[0].src; // [0] because its only one card-- this is checking the "card" class which is the block. within that block is the file source of the image, eg "assets/images/thor.png"
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
    // here if the below statement is true, then the player can flip the card
    canFlipCard(card) {                                                                         
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck // This creates a boolean - here is if statement so if (! means is not) all 3 statements are all FALSE then the statement will be true.
    }
}

//global declarations in order for audio settings to function correctly
let cardMenu = document.getElementById('card-menu');   
let btns = Array.from(document.getElementsByClassName('card-play-button')); 
let cardGame = document.getElementById('card-game');  
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
let cards = Array.from(document.getElementsByClassName('card'));
let game = new MarvelCards(90, cards);

function ready() {        
    //Card game main menu
    btns.forEach(btn => {                     
        btn.addEventListener('click', () => {
           cardMenu.classList.add('hide');
            cardGame.classList.remove('hide');
            game.startGame(); 
        });
    });
    //Overlay - restarts the game on click
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();                       
        });
    });
    //Each card flip will play the flip sound
    cards.forEach(card => {                         
        card.addEventListener('click', () => {
            game.flipCard(card);                //here when you click on a card, it will be game.flipCard
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); 
} else {
    ready();
}

// MODAL - Audio Settings //
var modal = document.getElementById("myModal"); 
var audioSetting = document.getElementById("audioSettings");  
var span = document.getElementsByClassName("close")[0];  

audioSetting.onclick = function() { 
  modal.style.display = "block";
}

span.onclick = function() {  
  modal.style.display = "none";
}

var musicControls = document.getElementById('music-controls');
var bgMusicState = "on"; 
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
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>"                      
        game.audioController.startMusic();
    } else {
        bgMusicState = "off";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>"                           
        game.audioController.stopMusic();
    }
} 

var soundEffectsSlider = document.querySelector('#effects-volume-slider');
    soundEffectsSlider.addEventListener('input', () => {  
        soundEffectsState = "on";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>"                      
        game.audioController.flipSound.volume = (soundEffectsSlider.valueAsNumber / 100) * 0.5;
        game.audioController.matchSound.volume = soundEffectsSlider.valueAsNumber / 100;
        game.audioController.victorySound.volume = soundEffectsSlider.valueAsNumber / 100;
        game.audioController.gameOverSound.volume = soundEffectsSlider.valueAsNumber / 100;
    });

function muteSoundEffects(){
    if (soundEffectsState == "off"){
        soundEffectsState = "on";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>"                      
        game.audioController.flipSound.volume = 0.5;
        game.audioController.matchSound.volume = 1;
        game.audioController.victorySound.volume = 1;
        game.audioController.gameOverSound.volume = 1;
    } else {
        soundEffectsState = "off";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteSoundEffects()\">OFF</button></p>"                           
        game.audioController.flipSound.volume = 0;
        game.audioController.matchSound.volume = 0;
        game.audioController.victorySound.volume = 0;
        game.audioController.gameOverSound.volume = 0;
    }
} 


