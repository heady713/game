var canvasContainer, canvas, context;
var player, monsters = [];
var winWidth, winHeight, isGuide = false;
var startTouchPoint, touchCache = 0.2;
var startTime, countDown = 60000,
    refreshDelay = 24;
// 初始化页面
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
    $('.dialog').on('touchstart', '.close', function(event) {
        $(this).closest('.dialog').hide();
        event.preventDefault();
    });
    $('#gameAfter').on('touchstart', '#btnReStart', function(event) {
        $('#gameAfter').hide();
        countDown = 60000;
        resetStage(); //重置舞台
        startGame();
        stopPropagation(event);
    });
});
//引导页
var firstGuide = function() {
    $('#guide').on('touchstart', function() {
        $(this).hide();
        startGame();
    }).show();
};
// 初始化舞台
var initStage = function() {
    canvasContainer = document.getElementById('gameing');
    window.onresize = resizeHandler;
    resetStage(); //重置舞台
    var myTouch = util.toucher(document.getElementById('gameing'));
    myTouch.on('swipe', function(e) {
        if (e.moveX >= winWidth * touchCache) { //right
            if (!player.moving) {
                player.moving = true;
                player.moveDirect = 1;
            }
        } else if (e.moveX <= -winWidth * touchCache) { //left
            if (!player.moving) {
                player.moving = true;
                player.moveDirect = -1;
            }
        }
        if (e.moveY <= -winWidth * touchCache) { //up
            if (!player.jumping) {
                player.jumping = true;
                player.jumpDirect = 1;
            }
        }
        stopPropagation(e);
    });
    if (!isGuide) {
        firstGuide();
        isGuide = true;
    } else {
        startGame();
    }
};
var startGame = function() {
    startTime = new Date().getTime();
    requestAnimationFrame(loop, canvasContainer);
};
//改变窗口尺寸
var resizeHandler = function() {
    resetStage();
};
//重置舞台
var resetStage = function() {
    winWidth = $(canvasContainer).width();
    winHeight = $(canvasContainer).height();
    DF.M.maxPath = winHeight / 12 * 7;
    if (canvas) {
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);
    player = null;
    monsters = [];
    player = new Player();
};
// 主函数
window.requestAnimationFrame = window.__requestAnimationFrame ||
    //
    window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    //
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
    //
    window.msRequestAnimationFrame || (function() {
        return function(callback) {
            window.setTimeout(callback, refreshDelay);
        };
    })();
// 循环
var loop = function() {
    currTime = new Date().getTime();
    var runingTime = currTime - startTime;
    countDown -= refreshDelay;
    var isContinue = true;
    if (countDown <= 0) {
        countDown = 0;
        isContinue = false;
    }
    document.getElementById('timer').innerText = formatMilli(countDown);
    document.getElementById('miles').innerText = formatMiles(runingTime);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (isContinue) {
        player.update();
        renderMonster();
        requestAnimationFrame(loop, canvasContainer);
    } else {
        $('#gameAfter').show();
    }
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
        monsters[key].update(player);
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
// formatMilli
var formatMilli = function(milli) {
    var s = parseInt(milli / 1000),
        m = milli % 1000;
    m = parseInt(m / 100);
    return (s < 10 ? '0' + s : s) + '\'' + m;
};
// formatMiles
var formatMiles = function(milli) {
    return parseInt(5 * milli / 1000) + 'm';
};
// 弹出框 参数(min:是否是小号, bgImg:背景图, mask:遮罩, content:内容, delay:延时自动关闭)
var dialog = function(options) {
    var dialog = $('#dialog');
    if (options.min) {
        dialog.css({
            top: '10%',
            height: '35%'
        });
    }
    if (options.bgImg) {
        options.mask = false;
        dialog.css('background-image', 'url(' + options.bgImg + ')');
    }
    if (options.mask) {
        dialog.find('.mask').show();
    } else {
        dialog.find('.mask').hide();
    }
    dialog.find('.content').html(options.content);
    dialog.show()
    if (options.delay) {
        setTimeout(function() {
            dialog.hide();
        }, options.delay)
    }
};