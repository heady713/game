var canvasContainer, canvas, context;
var player, shadow, monsters = [],
    asideMiles = [];
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
                shadow.moving = true;
                shadow.moveDirect = 1;
            }
        } else if (e.moveX <= -winWidth * touchCache) { //left
            if (!player.moving) {
                player.moving = true;
                player.moveDirect = -1;
                shadow.moving = true;
                shadow.moveDirect = -1;
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
    DF.M.maxPath = winHeight / 80 * 63;
    DF.M.maxPathMile = winHeight / 80 * 61;
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
    shadow = null;
    monsters = [];
    mileIndex = 0;
    asideMiles = [];
    shadow = new Shadow();
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
        shadow.update();
        renderMonster();
        renderAsideMile();
        requestAnimationFrame(loop, canvasContainer);
    } else {
        $('#gameAfter').show();
    }
};
var nextMonster = false,
    monIndex = 0,
    nextMonTime = null,
    currTime = null;
// 随机加载障碍
var renderMonster = function() {
    if (!nextMonster) {
        var randomTime = getRoundVal(1000, 3000);
        var pathIndex = getRoundVal(1, 2);
        var type = getRoundVal(0, DF.M.types.length - 1);
        nextMonTime = currTime + randomTime;
        temp = new Monster(DF.M.types[type], pathIndex, 90, 90, monIndex);
        monsters[monIndex] = temp;
        nextMonster = true;
        monIndex++;
    }
    if (currTime > nextMonTime) {
        nextMonster = false;
    }
    for (var key in monsters) {
        monsters[key].update(player);
    }
};
var nextAsideMile = false,
    mileIndex = 0,
    nextMileTime = null;
// 顺序加载数字
var renderAsideMile = function() {
    if (!nextAsideMile) {
        nextMileTime = currTime + 3000;
        var temp = new AsideMile(DF.Miles[mileIndex], 100, 100, mileIndex);
        asideMiles[mileIndex] = temp;
        nextAsideMile = true;
        mileIndex++;
    }
    if (currTime > nextMileTime) {
        nextAsideMile = false;
    }
    for (var key in asideMiles) {
        asideMiles[key].update(player);
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