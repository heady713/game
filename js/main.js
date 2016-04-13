var canvasContainer, canvas, context;
var monster1, monster2, monster3;
var winWidth, winHeight;
//空格键跳跃
var keyUpEventHandler = function(event) {
    if (event.keyCode == 32) {
        mr.jump(event);
    }
};
// 初始化
var initStage = function() {
    canvasContainer = document.getElementById('gameing');
    resetStage();
    window.onresize = resizeHandler;
    window.addEventListener("keydown", keyUpEventHandler, false);
};
var resizeHandler = function() {
    resetStage();
};
var resetStage = function() {
    winWidth = $(canvasContainer).width();
    winHeight = $(canvasContainer).height();
    if (canvas) {
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);
    monster1 = new Monster(1);
    monster2 = new Monster(2);
    monster3 = new Monster(3);
};
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initStage();
        requestAnimationFrame(loop, canvasContainer);
    }
}, 10);
var renderPlayer = function() {};
// 主函数
window.requestAnimationFrame = window.__requestAnimationFrame ||
    //
    window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    //
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
    //
    window.msRequestAnimationFrame || (function() {
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
// 循环
var loop = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    monster1.update();
    monster2.update();
    monster3.update();
    requestAnimationFrame(loop, canvasContainer);
};
//撞击物
var monsterSpeed = 1,
    //
    createMonster = function() {
        if (!monster) {
            monster = document.createElement("canvas");
        }
        monster.width = 80;
        monster.height = 120;
        monster.x = (winWidth - 3 * monster.width) / 3;
        monster.y = winHeight - monster.height;
        var monsterCtx = monster.getContext("2d");
        monsterCtx.fillStyle = '#FFCBA7';
        monsterCtx.fillRect(0, 0, monster.width, monster.height);
        context.drawImage(monster, monster.x, monster.y);
    },
    updateMonster = function() {
        monster.y -= monsterSpeed;
        context.drawImage(monster, monster.x, monster.y);
    };