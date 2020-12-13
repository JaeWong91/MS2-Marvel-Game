//Home page Modal and Music functions
var marvelTheme = new Audio ('assets/audio/marvel-intro.mp3')

window.onload = function() {
    marvelTheme.play();
    marvelTheme.loop = true;
    marvelTheme.volume = 0.2;  
};

var musicControls = document.getElementById('music-controls');
var marvelThemeState = "on"; //default background music is on/unmuted

// MODAL //
var modal = document.getElementById("myModal"); 
var audioSetting = document.getElementById("audioSettings");  
var span = document.getElementsByClassName("close")[0];  

audioSetting.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {   
  modal.style.display = "none";
}

//Volume control for background music --- taken from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
var musicVolumeSlider = document.querySelector('#music-volume-slider'); // get slider
    musicVolumeSlider.addEventListener('input', () => {    // 
    marvelTheme.volume = musicVolumeSlider.valueAsNumber / 100;
    });

function muteMusic(){
    if (marvelThemeState == "off"){
        marvelThemeState = "on";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon sound-on\" onclick=\"muteMusic()\">ON</button></p>"                      
        marvelTheme.play();
    } else {
        marvelThemeState = "off";
        musicControls.innerHTML = "<p>Background Music (click to turn on/off): <br><button class=\"volume-icon\" onclick=\"muteMusic()\">OFF</button></p>"                          
        marvelTheme.pause();
    }
}

