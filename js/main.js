var canvasContainer, canvas, context;
var player, monsters = [];
var winWidth, winHeight;
var startTouchPoint, touchCache = 0.2;
//空格键跳跃
var keyUpEventHandler = function(event) {
    if (event.keyCode == 32) {
        //
    }
};
// 初始化
var initStage = function() {
    canvasContainer = document.getElementById('gameing');
    window.onresize = resizeHandler;
    resetStage();
    var myTouch = util.toucher(document.getElementById('gameing'));
    myTouch.on('swipe', function(e) {
        if (e.moveX >= winWidth * touchCache) { //right
            player.moving = true;
            player.moveDirect = 1;
        } else if (e.moveX <= -winWidth * touchCache) { //left
            player.moving = true;
            player.moveDirect = -1;
        }
        if (e.moveY <= -winWidth * touchCache) { //up
            player.jumping = true;
            player.jumpDirect = 1;
        }
        stopPropagation(e);
    });
    requestAnimationFrame(loop, canvasContainer);
};
var resizeHandler = function() {
    resetStage();
};
var resetStage = function() {
    winWidth = $(canvasContainer).width();
    winHeight = $(canvasContainer).height();
    DF.M.maxPath = winHeight / 5 * 4;
    if (canvas) {
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);
    player = new Player();
};
$(function() {
    $('#gameBefore').on('touchstart', '#btnStart', function(event) {
        $('#gameBefore').hide();
        $('#gameing').show();
        initStage();
        stopPropagation(event);
    });
    $('body').on('touchmove touchstart', function(event) {
        event.preventDefault();
    });
});
// 主函数
window.requestAnimationFrame = window.__requestAnimationFrame ||
    //
    window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    //
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
    //
    window.msRequestAnimationFrame || (function() {
        return function(callback) {
            window.setTimeout(callback, 24);
        };
    })();
// 循环
var loop = function() {
    currTime = new Date().getTime();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    renderMonster();
    requestAnimationFrame(loop, canvasContainer);
};
var nextMonster = false,
    monIndex = 0,
    nextTime = null,
    currTime = null;
// 随机加载
var renderMonster = function() {
    if (!nextMonster) {
        var randomTime = getRoundVal(1000, 3000);
        var pathIndex = getRoundVal(1, 2);
        var type = getRoundVal(0, 5);
        nextTime = currTime + randomTime;
        monster = new Monster(DF.M.types[type], pathIndex, 50, 50, monIndex);
        monsters[monIndex] = monster;
        nextMonster = true;
        monIndex++;
    }
    if (currTime > nextTime) {
        nextMonster = false;
    }
    for (var key in monsters) {
        monsters[key].update();
    }
};
// 获取随机数
var getRoundVal = function(base, round) {
    return (Math.round(Math.random() * round) + base);
};
// Stop Propagation
var stopPropagation = function(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
};