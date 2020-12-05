//Defining all our global variables pointing to th e different DIVs we need reference to
var bottomRow = document.getElementById('bottomRow');
var stats = document.getElementsByClassName('stats');
var spidermanStats = document.getElementById('spidermanStats');
var spidermanHP = document.getElementById('spidermanHP'); // this is the HP bar
var greenGoblinHP = document.getElementById('greenGoblinHP'); //this is the HP bar
var spidermanMoves = document.getElementById('spidermanMoves'); // the buttons for spiderman's moves NOT WORKING
var spidermanMoves = Array.from(document.getElementsByClassName('spidermanMove'));
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
var spidermanImage = document.getElementsByClassName('spiderman-battle'); // TESTING TO GET SPIDERMAN TO ANIMATE FOR EACH CLICK OF A MOVE
var greenGoblinImage = document.getElementsByClassName('green-goblin');

//Define health variables
var spiderHP = 100; // initial values for the HP, starting at 100
var goblinHP = 100;

//music and sound controls
var musicControls = document.getElementById('music-controls');
var bgMusicState = "on"; //default background music is on/unmuted
var soundEffectsControls = document.getElementById('effects-controls');
var soundEffectsState = "on";

//Background Music
var battleMusic = document.getElementById('spidermanMusic');
battleMusic.loop = true;
battleMusic.volume = 0.2;

//Sound Effects
var webShootSound = new Audio('assets/audio/web-shoot.wav');
var webSwingSound = new Audio('assets/audio/swing-kick.wav');
var punchSound = new Audio('assets/audio/punch.wav');
var pumpkinBombSound = new Audio('assets/audio/pumpkin-bomb.mp3')
var gliderSound = new Audio('assets/audio/glider.mp3');
gliderSound.volume = 0.4;
var poisonSpraySound = new Audio('assets/audio/poison-spray.mp3')

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

//Volume control for background music --- taken from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
var musicVolumeSlider = document.querySelector('#music-volume-slider'); // get slider
    musicVolumeSlider.addEventListener('input', () => {    // 
    battleMusic.volume = musicVolumeSlider.valueAsNumber / 100;
    });

function muteMusic(){
    if (bgMusicState == "off"){
        bgMusicState = "on";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>"                      //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        battleMusic.play();
    } else {
        bgMusicState = "off";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>"                           //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        battleMusic.pause();
    }
}

//volume control for sound effects 
var soundEffectsSlider = document.querySelector('#effects-volume-slider'); // get slider
    soundEffectsSlider.addEventListener('input', () => {    // 
    webShootSound.volume = soundEffectsSlider.valueAsNumber / 100;
    webSwingSound.volume = soundEffectsSlider.valueAsNumber / 100;
    punchSound.volume = soundEffectsSlider.valueAsNumber / 100;
    pumpkinBombSound.volume = soundEffectsSlider.valueAsNumber / 100;
    gliderSound.volume = (soundEffectsSlider.valueAsNumber / 100) * 0.4;
    poisonSpraySound.volume = soundEffectsSlider.valueAsNumber / 100;
    });

function muteSoundEffects(){
    if (soundEffectsState == "off"){
        soundEffectsState = "on";
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>"                      //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        webShootSound.volume = 1;
        webSwingSound.volume = 1;
        punchSound.volume = 1;
        pumpkinBombSound.volume = 1;
        gliderSound.volume = 0.4;
        poisonSpraySound.volume = 1;
    } else {
        soundEffectsState = "off";
        soundEffectsControls.innerHTML = "Sound Effects (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteSoundEffects()\">OFF</button></p>"                           //"<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        webShootSound.volume = 0;
        webSwingSound.volume = 0;
        punchSound.volume = 0;
        pumpkinBombSound.volume = 0;
        gliderSound.volume = 0;
        poisonSpraySound.volume = 0;
    }
}




//disabling all spiderman in certain scenarios.
function disableMoves(){
    for (var x=0; x < spidermanMoves.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        spidermanMoves[x].disabled = true;
    }
}

//re-enable spiderman's moves
function enableMoves() {
    for (var y=0; y <spidermanMoves.length; y++) {
        spidermanMoves[y].disabled = false;
    }
}


//Battle functions

function beginBattle() {
    bottomRow.innerHTML = "Pick Spiderman's ability by clicking the button above.";  // here we change everything inside bottomRow element into 1 text line.
    for (var x=0; x < stats.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        stats[x].style.visibility = "visible";
        battleMusic.play();
    }
}

function goblinAttack() {   //goblin moves - 1=glider sweep, 2=poison spray, , 3=pumpkin bomb
    var attackChoice = Math.ceil(Math.random()*3) // 3 for goblin moves, used Math.ceil so it rounds up, we don't want it to round down to 0
    if (attackChoice == 1) {  // GLIDER ATTACK
        gliderSweepAnimation();
        gliderSound.play();
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 9) { 
            var dmg = Math.round(Math.random() * 10) + 10; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            function gliderAttack() {
                bottomRow.innerHTML += "<br>Green Goblin attacked you with his glider, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP."
                var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
                spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
            } 
            setTimeout(gliderAttack, 2000);
        } else {
            function gliderDodge() {
                bottomRow.innerHTML += "<br>Spiderman dodged Green Goblin's glider sweep!!"
            }
            setTimeout(gliderDodge, 2000);
        }
    } else if (attackChoice == 2) { 
        poisonGasAnimation()
        poisonSpraySound.play();
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 6) {
            var dmg = Math.round(Math.random() * 10) + 15; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // 
            if (spiderHP < 0) {  
                spiderHP = 0;
            }
            function poisonAttack() {
                bottomRow.innerHTML += "<br>Green Goblin used poison gas, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP."
                var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
                spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
            }
            setTimeout(poisonAttack, 2000);
        } else {
            function poisonDodge() {
                bottomRow.innerHTML += "<br>Spiderman avoided Green Goblin's gas!!"
            }
            setTimeout(poisonDodge, 2000);
        }
    } else {
        pumpkinBombAnimation();
        pumpkinBombSound.play();
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 5) { //PUMKPIN BOMB
            
            var dmg = Math.round(Math.random() * 10) + 20; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     
            if (spiderHP < 0) {  
                spiderHP = 0;
            }
            function pumpkinAttack(){
                bottomRow.innerHTML += "<br>Green Goblin threw a Pumpkin Bomb, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP."
                var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
                spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
            }
            setTimeout(pumpkinAttack, 2000);
        } else {
            function pumpkinDodge(){
                bottomRow.innerHTML += "<br>Spiderman's spider sense helped him avoid the Pumpkin Bomb!!"
            }
            setTimeout(pumpkinDodge, 2000);
            }
        }
        if (spiderHP == 0){ // When the health is 0, the below executes
            disableMoves();
            setTimeout(loseOverlay, 3000);  //TESTING
            //document.getElementById('game-over-text').classList.add('visible');
            //bottomRow.innerHTML += "<br>Spiderman has fallen! Green Goblin is victorious!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        }
    }

function webShooter() {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    bottomRow.innerHTML = "";
    webShootAnimation();
    webShootSound.play(); 
    if (hitChance <=6){      
        var dmg = Math.round(Math.random()*10)+6; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        function webShooterAttack() {
            bottomRow.innerHTML = "You hit Green Goblin with your web shooter, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP.";
            var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        }
        setTimeout(webShooterAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
        //bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 3500);
        //document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 2700); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function webSwing () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    bottomRow.innerHTML = "";
    webSwingAnimation();
    webSwingSound.play(); 
    if (hitChance <=4){      
        var dmg = Math.round(Math.random()*10)+13; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        function webSwingAttack() {
            bottomRow.innerHTML = "You swing and kick Green Goblin with force, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP."
            var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        }
        setTimeout(webSwingAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
        //bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 3000);
        //document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        //spidermanMoves.style.visibility = "hidden";
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 3000); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function punch () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    bottomRow.innerHTML = "";
    punchSound.play(); 
    punchAnimation();
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+8; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
        goblinHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
        if(goblinHP < 0){  // if hp goes negative, it will bring it to 0
            goblinHP = 0;
        }
        function punchAttack() {
            bottomRow.innerHTML = "You hit Green Goblin with a strong punch, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP.";
            var goblinHPBarWidth = (goblinHP/100)*144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            greenGoblinHP.style.width =  goblinHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        }
        setTimeout(punchAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
        //bottomRow.innerHTML = "Spiderman's attack missed!"
    }
    if (goblinHP == 0){ // When the health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 3000);
        //document.getElementById('victory-text').classList.add('visible');
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        //spidermanMoves.style.visibility = "hidden"; Removes this as may not need again
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 2500); // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function spidermanMissText() {
    bottomRow.innerHTML = "Spiderman's attack missed!";
};


//Spiderman Animations //

//punch animation
function punchAnimation() {
    spidermanImage[0].classList.add('punchAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('punchAnimation');
        }, 1000);
}

//Webshoot animation
function webShootAnimation() {
    spidermanImage[0].classList.add('webShootAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('webShootAnimation');
        }, 1500);
}

//web swing animation
function webSwingAnimation() {
    spidermanImage[0].classList.add('webSwingAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('webSwingAnimation');
        }, 1700);
}

//Green Goblin Animations
function gliderSweepAnimation() {
    greenGoblinImage[0].classList.add('gliderSweepAnimation');
    setTimeout(function() {
        greenGoblinImage[0].classList.remove('gliderSweepAnimation');
        }, 1700);
}

function pumpkinBombAnimation() {
    greenGoblinImage[0].classList.add('pumpkinBombAnimation');
    setTimeout(function() {
        greenGoblinImage[0].classList.remove('pumpkinBombAnimation');
        }, 1000);
}

function poisonGasAnimation() {
    greenGoblinImage[0].classList.add('poisonGasAnimation');
    setTimeout(function() {
        greenGoblinImage[0].classList.remove('poisonGasAnimation');
        }, 1500);
}

function victoryOverlay() {
    document.getElementById('victory-text').classList.add('visible');
}

function loseOverlay () {
    document.getElementById('game-over-text').classList.add('visible');
}

function restartGame() {
    spiderHP = 100;
    goblinHP = 100;
    var spiderHPBarWidth = (spiderHP / 100) * 144; 
    spidermanHP.style.width = spiderHPBarWidth + "px";
    var goblinHPBarWidth = (goblinHP/100)*144; 
    greenGoblinHP.style.width =  goblinHPBarWidth + "px";
    //spidermanMoves.style.visibility = "visible";
    //document.getElementById('victory-text').classList.remove('visible'); 
    //document.getElementById('game-over-text').classList.remove('visible'); 
    bottomRow.innerHTML = "Use any of Spiderman's attacks to defeat Green Goblin.";
    document.getElementById('victory-text').classList.remove('visible'); 
    document.getElementById('game-over-text').classList.remove('visible');
    enableMoves();
}