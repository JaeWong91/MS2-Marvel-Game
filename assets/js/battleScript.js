//Defining all our global variables pointing to th e different DIVs we need reference to
var bottomRow = document.getElementById('bottomRow');
var stats = document.getElementsByClassName('stats');
var spidermanStats = document.getElementById('spidermanStats');
var spidermanHP = document.getElementById('spidermanHP'); // this is the HP bar
var greenGoblinHP = document.getElementById('greenGoblinHP'); //this is the HP bar
var spidermanMoves = document.getElementById('spidermanMoves');
let overlays = Array.from(document.getElementsByClassName('overlay-text'));

//Define health variables
var spiderHP = 100; // initial values for the HP, starting at 100
var goblinHP = 100;

//music controls
var battleMusic = document.getElementById('spidermanMusic');

var musicControls = document.getElementById('music-controls');
var state = "on"; //default music is on/unmuted


function mute(){
    if (state == "off"){
        state = "on";
        musicControls.innerHTML = "<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-up\"></i></button>";
        battleMusic.play();
    } else {
        state = "off";
        musicControls.innerHTML = "<button class=\"volume-icon\" onclick=\"mute()\"><i class=\"fas fa-volume-mute\"></i></button>";
        battleMusic.pause();
    }
}



//Battle functions

function beginBattle() {
    bottomRow.innerHTML = "Pick Spiderman's ability by clicking the button above.";  // here we change everything inside bottomRow element into 1 text line.
    for (var x=0; x < stats.length; x++) {      // loop to change all stats elements (there are 2 of them, 1 for spiderman and 1 for green goblin) from hidden to visible
        stats[x].style.visibility = "visible";
        battleMusic.play();
        battleMusic.volume = 0.2;
        
    }
    
}

function goblinAttack() {   //goblin moves - glider sweep, pumpkin bomb, , poison gas
    var attackChoice = Math.ceil(Math.random()*3) // 3 for goblin moves, used Math.ceil so it rounds up, we don't want it to round down to 0
    if (attackChoice == 1) {
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 7) {
            var dmg = Math.round(Math.random() * 10) + 10; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin attacked you with his glider, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman dodged Green Goblin's glider sweep!!"
        }
    } else if (attackChoice == 2) {
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 4) {
            var dmg = Math.round(Math.random() * 10) + 15; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin used poison gas, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman avoided Green Goblin's gas!!"
        }
    } else {
        var hitChance = Math.round(Math.random() * 10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
        if (hitChance <= 3) {
            var dmg = Math.round(Math.random() * 10) + 20; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
            spiderHP -= dmg;     // -= means that goblinHP less dmg value, and now this will become the new value for goblinHP
            if (spiderHP < 0) {  // if hp goes negative, it will bring it to 0
                spiderHP = 0;
            }
            bottomRow.innerHTML += "<br>Green Goblin threw a Pumpkin Bomb, dealing " + dmg + " damage. Spiderman now has " + spiderHP + " HP."
            var spiderHPBarWidth = (spiderHP / 100) * 144; // in css, the width for hp bar is 144px - this will calculate how many pixels to deduct from the hp bar width
            spidermanHP.style.width = spiderHPBarWidth + "px"; // this is altering the width style in css for the hp bar width!! 
        } else {
            bottomRow.innerHTML += "<br>Spiderman's spider sense helped him avoid the Pumpkin Bomb!!"
        }
    }
    if (spiderHP == 0){ // When the health is 0, the below executes
        document.getElementById('game-over-text').classList.add('visible');
        //bottomRow.innerHTML += "<br>Spiderman has fallen! Green Goblin is victorious!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        spidermanMoves.style.visibility = "hidden";
    }
}

function webShooter() {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+6; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
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
        document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        spidermanMoves.style.visibility = "hidden";
    } else {
        goblinAttack() // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function webSwing () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    if (hitChance <=5){      
        var dmg = Math.round(Math.random()*10)+13; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
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
        document.getElementById('victory-text').classList.add('visible'); 
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        spidermanMoves.style.visibility = "hidden";
    } else {
        goblinAttack() // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function punch () {
    var hitChance = Math.round(Math.random()*10); // "Match.random()*10" will give us a random number between 0 and 10, then "Math.round" round down or up to nearest whole number.
    if (hitChance <=7){      
        var dmg = Math.round(Math.random()*10)+8; //this will give us a random number in between 10 and 20. "Math.round(Math.random()*10)" will give us a number between 1 and 10. We add 10 so that the hit amount will be between 10 and 20!
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
        document.getElementById('victory-text').classList.add('visible');
        //bottomRow.innerHTML += "<br>You have defeated Green Goblin!!<br><br><button onclick='restartGame()'>Play Again?</button>";
        spidermanMoves.style.visibility = "hidden";
    } else {
        goblinAttack() // while Green Goblin is alive, each time user clicks a spiderman move, green goblin will also attack.
    }
}

function restartGame() {
    spiderHP = 100;
    goblinHP = 100;
    var spiderHPBarWidth = (spiderHP / 100) * 144; 
    spidermanHP.style.width = spiderHPBarWidth + "px";
    var goblinHPBarWidth = (goblinHP/100)*144; 
    greenGoblinHP.style.width =  goblinHPBarWidth + "px";
    spidermanMoves.style.visibility = "visible";
    document.getElementById('victory-text').classList.remove('visible'); 
    document.getElementById('game-over-text').classList.remove('visible'); 
    bottomRow.innerHTML = "Use any of Spiderman's attacks to defeat Green Goblin.";

}