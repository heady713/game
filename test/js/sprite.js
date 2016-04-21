var GAME = GAME || {};
// ===================================================
// =====================::GLOBAL::====================
// ===================================================
GAME.canvas = document.createElement('canvas');
GAME.canvas.width = 320;
GAME.canvas.height = 640;
GAME.context = GAME.canvas.getContext('2d');

//保存所有Sprite
GAME.children = {};
GAME.childCount = 0;

GAME.updateChildren = function() {
    if (GAME.childCount > 0) {
        GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
        var zorderList = [];
        for (var k in GAME.children) {
            var child = GAME.children[k];
            zorderList.push({sprite: child, zorder: child.zorder});
        };
        zorderList.sort(function(a, b){
            return a.zorder >= b.zorder ? 1 : -1;
        });
        for (var i = 0; i < zorderList.length; ++i) {
            var child = zorderList[i].sprite;
            GAME.context.drawImage(child.image, child.pos.x, child.pos.y, child.width*child.scale.x, child.height*child.scale.y);
        };
    }
};

GAME.getDistance = function(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2), Math.pow(pointA.y - pointB.y, 2))
};

// ===================================================
// =====================::Sprite::====================
// ===================================================
GAME.Sprite = function(tag, src, width, height, zorder) {
    this.tag = tag;
    this.zorder = zorder || 0;
    this.src = src;
    this.width = width;
    this.height = height;
    this.pos = {
        x: 0,
        y: 0
    };
    this.center = {
        x: this.pos.x + 0.5 * this.width,
        y: this.pos.y + 0.5 * this.height
    };
    this.scale = {
        x: 1,
        y: 1
    };

    this.image = new Image();
    this.image.src = this.src;
    var self = this;
    this.image.onload = function() {
        GAME.children[tag] = self;
        GAME.childCount++;
        GAME.updateChildren();
    };
}

GAME.Sprite.prototype.removeFromGlobal = function() {
    if (GAME.children[this.tag] == undefined) {
        console.log("tag:", this.tag, "isnot exists");
        return;
    }
    delete GAME.children[this.tag];
    GAME.childCount--;
    // GAME.updateChildren();
};

GAME.Sprite.prototype.setPosition = function(x, y) {
    this.pos.x = x;
    this.pos.y = y;
    this.center.x = this.pos.x + 0.5 * this.width;
    this.center.y = this.pos.y + 0.5 * this.height;
};

GAME.Sprite.prototype.setCenterPosition = function(x, y) {
    this.center.x = x;
    this.center.y = y;
    this.pos.x = x - 0.5 * this.width;
    this.pos.y = y - 0.5 * this.height;
};

GAME.Sprite.prototype.setScale = function(scaleX, scaleY) {
    this.scale.x = scaleX;
    this.scale.y = scaleY;
};


// ===================================================
// =====================::Demo::======================
// ===================================================
refreshDelay = 1000;
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

var canvasContainer = document.getElementById('game');
canvasContainer.appendChild(GAME.canvas);

var bg = new GAME.Sprite('bg','img/bg.jpg', 320, 640, 0);


var Player = function(tag, src, width, height) {
   GAME.Sprite.apply(this, arguments);
};
var F = new Function();
F.prototype = GAME.Sprite.prototype;
Player.prototype = new F();
Player.prototype.getX = function() {
    return {x:this.pos.x, y:this.pos.y, cx:this.center.x, cy:this.center.y};
};

var player = new Player('player', 'img/jiaose_s.png', 56, 122, 2);
player.setCenterPosition(160, 320);


var xl = 292,
    yl = 308;
var xd1 = 128,
    xd2 = 592;
var k = Math.abs((xl-xd1)/(yl-1280));

var soccer1 = new GAME.Sprite('soccer1', 'img/Soccer.png', 40, 40, 1);
soccer1.setCenterPosition(160, 640);

var soccer2 = new GAME.Sprite('soccer2', 'img/Soccer.png', 40, 40, 1);
soccer2.setCenterPosition(xd1*320/720, 640);

var soccer3 = new GAME.Sprite('soccer3', 'img/Soccer.png', 40, 40, 1);
soccer3.setCenterPosition(xd2*320/720, 640);

var step = 4;
var minHeight = 180;

var loop = function() {
    if (soccer1) {
        soccer1.setCenterPosition(soccer1.center.x, soccer1.center.y - step);
        if (soccer1.center.y < minHeight) {
            soccer1.removeFromGlobal();
            soccer1 = null;
        }
    }
    if (soccer2) {
        soccer2.setCenterPosition(soccer2.center.x + step * k, soccer2.center.y - step);
        if (soccer2.center.y < minHeight) {
            soccer2.removeFromGlobal();
            soccer2 = null;
        }
    }

    if (soccer3) {
        soccer3.setCenterPosition(soccer3.center.x - step * k, soccer3.center.y - step);
        if (soccer3.center.y < minHeight) {
            soccer3.removeFromGlobal();
            soccer3 = null;
        }
    }
    GAME.updateChildren();
    requestAnimationFrame(loop);
}

var btn = document.getElementById('btn');
btn.onclick = function(e) {
    requestAnimationFrame(loop);
};

var Player = function(tag, src, width, height) {
   GAME.Sprite.apply(this, arguments);
};
var F = new Function();
F.prototype = GAME.Sprite.prototype;
Player.prototype = new F();
Player.prototype.getX = function() {
    return {x:this.pos.x, y:this.pos.y, cx:this.center.x, cy:this.center.y};
};

var player2 = new Player('player2', 'img/jiaose_s.png', 38, 100, 2);
player2.setCenterPosition(180, 320);
console.log(player2.getX());

//TODO  增加zorder 改变元素绘制的先后顺序 影响其层级