var canvasContainer;
var mr = null,
    bg = null,
    gd = null;
//空格键跳跃
var keyUpEventHandler = function(event) {
    if (event.keyCode == 32) {
        mr.jump(event);
    }
};
// 初始化
var initStage = function() {
    var winHeight = $(window).height();
    canvasContainer = document.getElementById('canvasContainer');
    mr = new Player('palyer', canvasContainer, 'images/1.png', 'images/2.png');
    bg = new Background('bg', canvasContainer, 'images/bg.png', 200, winHeight / 2 - 100, 40);
    gd = new Background('gd', canvasContainer, 'images/gd.png', 16, winHeight / 2 + 100, 10);
    //window.onresize = resizeHandler;
    window.onresize = resizeHandler;
    window.addEventListener("keydown", keyUpEventHandler, false);
};
var resizeHandler = function() {
    mr.remove();
    bg.remove();
    gd.remove();
    var winHeight = $(window).height();
    mr = new Player('palyer', canvasContainer, 'images/1.png', 'images/2.png');
    bg = new Background('bg', canvasContainer, 'images/bg.png', 200, winHeight / 2 - 100, 40);
    gd = new Background('gd', canvasContainer, 'images/gd.png', 16, winHeight / 2 + 100, 10);
};
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initStage();
        window.requestAnimationFrame(renderPlayer, canvasContainer);
    }
}, 10);
var renderPlayer = function() {};
// 主函数
window.requestAnimationFrame = window.__requestAnimationFrame || window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (function() {
    return function(callback, element) {
        var lastTime = element.__lastTime;
        if (lastTime === undefined) {
            lastTime = 0;
        }
        var currTime = Date.now();
        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
        window.setTimeout(callback, timeToCall);
        element.__lastTime = currTime + timeToCall;
    };
})();