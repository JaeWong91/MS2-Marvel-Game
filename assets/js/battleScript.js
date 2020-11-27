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
        this.victorySound.pause();      //ADDED THIS MYSELF
        this.victorySound.currentTime = 0;      //ADDED THIS MYSELF
        this.gameOverSound.pause();     //ADDED THIS MYSELF
        this.gameOverSound.currentTime = 0;    //ADDED THIS MYSELF
        this.bgMusic.play();
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
    victory() {                     // on victory, it stops the background music then plays this
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {                    // on game over, it stops the background music then plays this
        this.stopMusic();
        this.gameOverSound.play();
    }
}


function beginBattle() {
    
}


function webShooter() {

}
