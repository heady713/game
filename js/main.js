<<<<<<< HEAD
var canvasContainer, canvas, context;
var monster1, monster2, monster3;
var winWidth, winHeight;
=======
var canvasContainer;
var mr = null,
    bg = null,
    gd = null;
>>>>>>> refs/remotes/origin/master
//空格键跳跃
var keyUpEventHandler = function(event) {
    if (event.keyCode == 32) {
        mr.jump(event);
    }
};
// 初始化
var initStage = function() {
<<<<<<< HEAD
    canvasContainer = document.getElementById('gameing');
    resetStage();
=======
    var winHeight = $(window).height();
    canvasContainer = document.getElementById('canvasContainer');
    mr = new Player('palyer', canvasContainer, 'images/1.png', 'images/2.png');
    bg = new Background('bg', canvasContainer, 'images/bg.png', 200, winHeight / 2 - 100, 40);
    gd = new Background('gd', canvasContainer, 'images/gd.png', 16, winHeight / 2 + 100, 10);
    //window.onresize = resizeHandler;
>>>>>>> refs/remotes/origin/master
    window.onresize = resizeHandler;
    window.addEventListener("keydown", keyUpEventHandler, false);
};
var resizeHandler = function() {
<<<<<<< HEAD
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
=======
    mr.remove();
    bg.remove();
    gd.remove();
    var winHeight = $(window).height();
    mr = new Player('palyer', canvasContainer, 'images/1.png', 'images/2.png');
    bg = new Background('bg', canvasContainer, 'images/bg.png', 200, winHeight / 2 - 100, 40);
    gd = new Background('gd', canvasContainer, 'images/gd.png', 16, winHeight / 2 + 100, 10);
>>>>>>> refs/remotes/origin/master
};
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initStage();
<<<<<<< HEAD
        requestAnimationFrame(loop, canvasContainer);
=======
        window.requestAnimationFrame(renderPlayer, canvasContainer);
>>>>>>> refs/remotes/origin/master
    }
}, 10);
var renderPlayer = function() {};
// 主函数
<<<<<<< HEAD
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
=======
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
>>>>>>> refs/remotes/origin/master
