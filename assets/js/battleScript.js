//Defining all our global variables pointing to th e different DIVs we need reference to
var bottomRow = document.getElementById('bottomRow');
var stats = document.getElementsByClassName('stats');
var spidermanStats = document.getElementById('spidermanStats');
var spidermanHP = document.getElementById('spidermanHP'); // this is the HP bar
var greenGoblinHP = document.getElementById('greenGoblinHP'); //this is the HP bar
var spidermanMoves = document.getElementById('spidermanMoves');

//Define health variables
var spiderHP = 100; // initial values for the HP, starting at 100
var goblinHP = 100;

function beginBattle() {
    bottomRow.innerHTML = "Pick Spiderman's ability by clicking the button above.";  // here we change everything inside bottomRow element into 1 text line.
    for (var x=0; x < stats.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        stats[x].style.visibility = "visible";
    }
}


function webShooter() {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+10; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        bottomRow.innerHTML = "You hit Green Goblin with your web shooter, doing " + dmg + " damage. Green Goblin now has " + goblinHP + " HP."
        var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
        greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
    } else {
        bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        bottomRow.innerHTML += "<br>You have defeated Green Goblin!!";
        spidermanMoves.style.visibility = "hidden";
    }
}



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