var musicBg,musicGmf;
var initAudio = function() {
    musicBg = document.createElement("audio");
    musicBg.loop = 'loop';
    // musicBg.controls = 'controls';
    musicBg.autoplay = 'autoplay';
    musicBg.src = 'mp3/bg.mp3';
    document.body.appendChild(musicBg);
    musicGmf = document.createElement("audio");
    musicGmf.src = 'mp3/bg.mp3';
    document.body.appendChild(musicGmf);
};
var playAll = function() {
    musicBg.play();
    musicGmf.play();
};
var pauseAll = function() {
    musicBg.pause();
    musicGmf.pause();
};
var muted = function() {
    if (musicBg.muted) {
        musicBg.muted = false;
        musicGmf.muted = false;
    } else {
        musicBg.muted = true;
        musicGmf.muted = true;
    }
};