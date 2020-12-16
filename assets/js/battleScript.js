//Defining all our global variables 
var bottomRow = document.getElementById('bottomRow');
var stats = document.getElementsByClassName('stats');
var spidermanStats = document.getElementById('spidermanStats');
var spidermanHP = document.getElementById('spidermanHP'); // this is the HP bar
var greenGoblinHP = document.getElementById('greenGoblinHP'); //this is the HP bar
var spidermanMoves = document.getElementById('spidermanMoves'); 
var spidermanMoves = Array.from(document.getElementsByClassName('spidermanMove'));
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
var spidermanImage = document.getElementsByClassName('spiderman-battle');
var greenGoblinImage = document.getElementsByClassName('green-goblin');

//Define health variables - initial values are 100
var spiderHP = 100; 
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
var pumpkinBombSound = new Audio('assets/audio/pumpkin-bomb.mp3');
var gliderSound = new Audio('assets/audio/glider.mp3');
gliderSound.volume = 0.4;
var poisonSpraySound = new Audio('assets/audio/poison-spray.mp3');

// MODAL - Audio Settings //
var modal = document.getElementById("myModal"); 
var modal2 = document.getElementById("myModal2"); 
var audioSetting = document.getElementById("audioSettings");  
var battleInformation = document.getElementById("battleGameInformation"); 
var span = document.getElementsByClassName("close");  

audioSetting.onclick = function() {   
    modal.style.display = "block";
};

battleInformation.onclick = function() {   
    modal2.style.display = "block";
};

span[0].onclick = function() {     
    modal.style.display = "none";
};

span[1].onclick = function() {     
    modal2.style.display = "none";
};

//Volume control for background music --- taken from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
var musicVolumeSlider = document.querySelector('#music-volume-slider'); // get slider
musicVolumeSlider.addEventListener('input', () => {    // 
    battleMusic.volume = musicVolumeSlider.valueAsNumber / 100;
});

function muteMusic(){
    if (bgMusicState == "off"){
        bgMusicState = "on";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>";                      
        battleMusic.play();
    } else {
        bgMusicState = "off";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>";                           
        battleMusic.pause();
    }
}

//volume control for sound effects 
var soundEffectsSlider = document.querySelector('#effects-volume-slider'); 
soundEffectsSlider.addEventListener('input', () => {  
    soundEffectsState = "on";
    soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>"; 
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
        soundEffectsControls.innerHTML = "<p>Sound Effects (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteSoundEffects()\">ON</button></p>";                      
        webShootSound.volume = 1;
        webSwingSound.volume = 1;
        punchSound.volume = 1;
        pumpkinBombSound.volume = 1;
        gliderSound.volume = 0.4;
        poisonSpraySound.volume = 1;
    } else {
        soundEffectsState = "off";
        soundEffectsControls.innerHTML = "Sound Effects (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteSoundEffects()\">OFF</button></p>";                           
        webShootSound.volume = 0;
        webSwingSound.volume = 0;
        punchSound.volume = 0;
        pumpkinBombSound.volume = 0;
        gliderSound.volume = 0;
        poisonSpraySound.volume = 0;
    }
}

//Begin battle button, on first load the Health and Moves is not visible. Once button is clicked then they will appear.
function beginBattle() {
    bottomRow.innerHTML = "Pick Spiderman's ability by clicking the button above."; 
    for (var x=0; x < stats.length; x++) {      
        stats[x].style.visibility = "visible";
        battleMusic.play();
    }
}

//Green Goblin's Moves
function goblinAttack() {   //goblin moves - 1=glider sweep, 2=poison spray, , 3=pumpkin bomb
    var attackChoice = Math.ceil(Math.random()*3); // 3 for goblin moves, used Math.ceil so it rounds up, we don't want it to round down to 0
    if (attackChoice == 1) {  // GLIDER ATTACK
        gliderSweepAnimation();
        gliderSound.play();
        var hitChance = Math.round(Math.random() * 10);
        if (hitChance <= 7) {    //70% chance Glider attack will hit Spiderman
            var dmg = Math.round(Math.random() * 10) + 5; //Glider attack will deal 5 to 15 damage to spiderman
            spiderHP -= dmg; 
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            function gliderAttack() {
                bottomRow.innerHTML += "<br>Green Goblin attacked you with his glider, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP.";
                var spiderHPBarWidth = (spiderHP / 100) * 144; 
                spidermanHP.style.width = spiderHPBarWidth + "px";
            } 
            setTimeout(gliderAttack, 2000);
        } else {
            function gliderDodge() {
                bottomRow.innerHTML += "<br>Spiderman dodged Green Goblin's glider sweep!!";
            }
            setTimeout(gliderDodge, 2000);
        }
    } else if (attackChoice == 2) { 
        poisonGasAnimation();
        poisonSpraySound.play();
        var hitChance = Math.round(Math.random() * 10); 
        if (hitChance <= 5) {   //50% chance Poison attack will hit Spiderman
            var dmg = Math.round(Math.random() * 10) + 10; //Poison attack will deal 10 to 20 damage. 
            spiderHP -= dmg;  
            if (spiderHP < 0) {  
                spiderHP = 0;
            }
            function poisonAttack() {
                bottomRow.innerHTML += "<br>Green Goblin used poison gas, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP.";
                var spiderHPBarWidth = (spiderHP / 100) * 144; 
                spidermanHP.style.width = spiderHPBarWidth + "px"; 
            }
            setTimeout(poisonAttack, 2000);
        } else {
            function poisonDodge() {
                bottomRow.innerHTML += "<br>Spiderman avoided Green Goblin's gas!!";
            }
            setTimeout(poisonDodge, 2000);
        }
    } else {
        pumpkinBombAnimation();
        pumpkinBombSound.play();
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 4) {   //40% chance pumpkin bomb will hit Spiderman
            var dmg = Math.round(Math.random() * 10) + 15;  //Pumpkin bomb will deal 15 to 25 damage to Spiderman
            spiderHP -= dmg;     
            if (spiderHP < 0) {  
                spiderHP = 0;
            }
            function pumpkinAttack(){
                bottomRow.innerHTML += "<br>Green Goblin threw a Pumpkin Bomb, dealing " + dmg + " damage. <br>Spiderman now has " + spiderHP + " HP.";
                var spiderHPBarWidth = (spiderHP / 100) * 144; 
                spidermanHP.style.width = spiderHPBarWidth + "px";  
            }
            setTimeout(pumpkinAttack, 2000);
        } else {
            function pumpkinDodge(){
                bottomRow.innerHTML += "<br>Spiderman's spider sense helped him avoid the Pumpkin Bomb!!";
            }
            setTimeout(pumpkinDodge, 2000);
        }
    }
    if (spiderHP == 0){ // When Spiderman's health is 0, the below executes
        disableMoves();
        setTimeout(loseOverlay, 3000);
    }
}

//Spiderman's Moves
function punch () {
    var hitChance = Math.round(Math.random()*10); 
    bottomRow.innerHTML = ""; // each time a skill is selected, the text is cleared
    punchSound.play(); 
    punchAnimation();
    if (hitChance <=7){ //70% chance punch will hit Goblin
        var dmg = Math.round(Math.random()*10)+5; //Spiderman's punch will deal 5-15 damage to Goblin
        goblinHP -= dmg;  
        if(goblinHP < 0){  
            goblinHP = 0;
        }
        function punchAttack() {
            bottomRow.innerHTML = "You hit Green Goblin with a strong punch, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP.";
            var goblinHPBarWidth = (goblinHP/100)*144; 
            greenGoblinHP.style.width =  goblinHPBarWidth + "px"; 
        }
        setTimeout(punchAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
    }
    if (goblinHP == 0){ // When Goblin health is 0, the below executes
        disableMoves();
        setTimeout(victoryOverlay, 3000);
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 2500); //While goblin is still alive, each time the player uses a spiderman move, Goblin will attack back
    }
}

function webShooter() {
    var hitChance = Math.round(Math.random()*10); 
    bottomRow.innerHTML = "";
    webShootAnimation();
    webShootSound.play(); 
    if (hitChance <=5){     //50% chance Web Shooter will hit Goblin
        var dmg = Math.round(Math.random()*10)+10;  //web shooter will deal 10 to 20 damage to Goblin
        goblinHP -= dmg;     
        if(goblinHP < 0){
            goblinHP = 0;
        }
        function webShooterAttack() {
            bottomRow.innerHTML = "You hit Green Goblin with your web shooter, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP.";
            var goblinHPBarWidth = (goblinHP/100)*144; 
            greenGoblinHP.style.width =  goblinHPBarWidth + "px";  
        }
        setTimeout(webShooterAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
    }
    if (goblinHP == 0){
        disableMoves();
        setTimeout(victoryOverlay, 3500); 
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 2700);
    }
}

function webSwing () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    bottomRow.innerHTML = "";
    webSwingAnimation();
    webSwingSound.play(); 
    if (hitChance <=4){     //40% chance Web Swing will hit Goblin
        var dmg = Math.round(Math.random()*10)+15;  //Web swing will deal 15 to 25 damage to Goblin
        goblinHP -= dmg;   
        if(goblinHP < 0){ 
            goblinHP = 0;
        }
        function webSwingAttack() {
            bottomRow.innerHTML = "You swing and kick Green Goblin with force, doing " + dmg + " damage. <br>Green Goblin now has " + goblinHP + " HP.";
            var goblinHPBarWidth = (goblinHP/100)*144; 
            greenGoblinHP.style.width =  goblinHPBarWidth + "px"; 
        }
        setTimeout(webSwingAttack, 2000);
    } else {
        setTimeout(spidermanMissText, 2000);
    }
    if (goblinHP == 0){ 
        disableMoves();
        setTimeout(victoryOverlay, 3000); 
    } else {
        disableMoves();
        setTimeout(enableMoves, 5000);
        setTimeout(goblinAttack, 3000); 
    }
}

//disabling all spiderman buttons in certain scenarios.
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

function spidermanMissText() {
    bottomRow.innerHTML = "Spiderman's attack missed!";
}

//Spiderman Animations
function punchAnimation() {
    spidermanImage[0].classList.add('punchAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('punchAnimation');
    }, 1000);
}

function webShootAnimation() {
    spidermanImage[0].classList.add('webShootAnimation');
    setTimeout(function() {
        spidermanImage[0].classList.remove('webShootAnimation');
    }, 1500);
}

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

//Overlay functions on victory or loss
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
    bottomRow.innerHTML = "Use any of Spiderman's attacks to defeat Green Goblin.";
    document.getElementById('victory-text').classList.remove('visible'); 
    document.getElementById('game-over-text').classList.remove('visible');
    enableMoves();
}