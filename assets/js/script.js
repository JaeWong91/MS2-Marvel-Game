let audio = {
    marvelTheme: document.getElementById('marvel-intro')
}

window.onload = function() {
    document.getElementById('marvel-intro').play();
    audio.themeMusic.loop = true;
    audio.themeMusic.volume = 0.1;  
};


