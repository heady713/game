var GAME = GAME || {};
// ===================================================
// =====================::GLOBAL::====================
// ===================================================
var WIDTH = 720,
    HEIGHT = 1280;
var xl = 292,
    yl = 308,
    xr = 435;
var xd1 = 128,
    xd2 = 592;
var getScaleX = function(x) {
    return winWidth * x / WIDTH;
};
var getScaleY = function(y) {
    return winHeight * y / HEIGHT;
};
var k = Math.abs((xl - xd1) / (yl - WIDTH));
/// ==================================================
GAME.children = {};
GAME.childCount = 0;
GAME.updateChildren = function() {
    if (GAME.childCount > 0) {
        GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
        var zorderList = [];
        for (var k in GAME.children) {
            var child = GAME.children[k];
            zorderList.push({
                sprite: child,
                zorder: child.zorder
            });
        };
        zorderList.sort(function(a, b) {
            return a.zorder >= b.zorder ? 1 : -1;
        });
        for (var i = 0; i < zorderList.length; ++i) {
            var child = zorderList[i].sprite;
            GAME.context.drawImage(child.image, child.pos.x, child.pos.y, child.width * child.scale.x, child.height * child.scale.y);
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
    for (var key in GAME.Sprite.prototype) {
        this.__proto__[key] = GAME.Sprite.prototype[key];
    }
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