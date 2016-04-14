var canvasContainer, canvas, context;
var player, monsters = [];
var winWidth, winHeight;
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
    $('#gameing').on('swipeLeft', function() {
        player.direction = -1;
    }).on('swipeRight', function() {
        player.direction = 1;
    }).on('swipeUp', function() {
        //player.direction=-1;
    });
    requestAnimationFrame(loop, canvasContainer);
};
var resizeHandler = function() {
    resetStage();
};
var resetStage = function() {
    winWidth = $(canvasContainer).width();
    winHeight = $(canvasContainer).height();
    DF.M.maxPath = winHeight / 4 * 3;
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
    $('#gameBefore').on('click', '#btnStart', function() {
        $('#gameBefore').hide();
        $('#gameing').show();
        initStage();
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
        nextTime = currTime + randomTime;
        var pathIndex = getRoundVal(1, 2);
        monster = new Monster(pathIndex, 50, 50, monIndex);
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