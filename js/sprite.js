var GAME = GAME || {};
// ===================================================
// =====================::GLOBAL::====================
// ===================================================
var WIDTH = 720,
    HEIGHT = 1280;
var xl = 292,
    yl = 308,
    xr = 435,
    xA = 290;
var xd1 = 128,
    xd2 = 592;
var getScaleX = function(x) {
    return winWidth * x / WIDTH;
};
var getScaleY = function(y) {
    return winHeight * y / HEIGHT;
};
var k = Math.abs((xl - xd1) / (HEIGHT - yl));
/// ==================================================
GAME.children = {};
GAME.childCount = 0;
GAME.updateChildren = function() {
    if (GAME.childCount > 0) {
        // GAME.context.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
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
            var x = child.pos.x;
            if (child.fixX) {
                x = child.fixX();
            };
            GAME.context.drawImage(child.image, x, child.pos.y, child.cur.width, child.cur.height);
        };
    }
};
GAME.getDistance = function(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2), Math.pow(pointA.y - pointB.y, 2))
};
// function f (sprite) {
//     return sprite.pos.x + (sprite.width - sprite.cur.width)/2;
// }
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
    //保存当前长宽
    this.cur = {
        width: width,
        height: height
    };
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
    this.center.x = this.pos.x + 0.5 * this.cur.width;
    this.center.y = this.pos.y + 0.5 * this.cur.height;
};
GAME.Sprite.prototype.setCenterPosition = function(x, y) {
    this.center.x = x;
    this.center.y = y;
    this.pos.x = x - 0.5 * this.cur.width;
    this.pos.y = y - 0.5 * this.cur.height;
};
GAME.Sprite.prototype.setScale = function(scaleX, scaleY) {
    var delta_x = (this.cur.width - this.width * scaleX)/2;
    var delta_y = (this.cur.height - this.height * scaleY)/2;
    this.setCenterPosition(this.center.x + delta_x, this.center.y + delta_y);
    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.cur.width = this.scale.x * this.width;
    this.cur.height = this.scale.y * this.height;
};