var CANVAS = CANVAS || {};
// ===================================================
// =====================::POINT::=====================
// ===================================================
CANVAS.Point = function(x, y) {
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
}
CANVAS.Point.prototype.clone = function() {
    return new CANVAS.Point(this.x, this.y);
};
CANVAS.Point.prototype.setPosition = function(x, y) {
    this.x = isNaN(x) ? this.x : x;
    this.y = isNaN(y) ? this.y : y;
};
CANVAS.Point.prototype.equals = function(point) {
    return this.x == point.x && this.y == point.y;
};
CANVAS.Point.prototype.toString = function() {
    return "{x:" + this.x + " , y:" + this.y + "}";
};
// ===================================================
// =====================::Sprite::====================
// ===================================================
CANVAS.Sprite = function(src, width, height) {
    for (var key in CANVAS.Sprite.prototype) {
        this.__proto__[key] = CANVAS.Sprite.prototype[key];
    }
    this.canvas = document.createElement('canvas');
    this.canvas.x = this.x = 0;
    this.canvas.y = this.y = 0;
    this.context = this.canvas.getContext('2d');
    this.canvas.widht = this.width = width;
    this.canvas.height = this.height = height;
    this.center = {
        x: this.x + 0.5 * this.width,
        y: this.y + 0.5 * this.height
    };
    this.parentCanvas = null;
    this.image = new Image();
    this.image.src = src;
    var self = this;
    this.image.onload = function() {
        self.context.drawImage(self.image, 0, 0);
        self.refresh();
    };
};
CANVAS.Sprite.prototype.addTo = function(canvas) {
    this.parentCanvas = canvas;
};
CANVAS.Sprite.prototype.refresh = function() {
    if (this.parentCanvas) {
        var context = this.parentCanvas.getContext('2d');
        context.globalCompositeOperation = "source-over";
        context.drawImage(this.canvas, this.x, this.y);
    }
};
CANVAS.Sprite.prototype.setPosition = function(point) {
    this.canvas.x = this.x = point.x;
    this.canvas.y = this.y = point.y;
    this.center.x = this.x + 0.5 * this.width;
    this.center.y = this.y + 0.5 * this.height;
};
CANVAS.Sprite.prototype.setCenterPosition = function(point) {
    this.center.x = point.x;
    this.center.y = point.y;
    this.canvas.x = this.x = point.x - 0.5 * this.width;
    this.canvas.y = this.y = point.y - 0.5 * this.height;
};
CANVAS.Sprite.prototype.setScale = function(scaleX, scaleY) {
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.widht, this.canvas.height);
    this.context.scale(scaleX, scaleY);
    this.context.drawImage(this.image, 0, 0);
    var newWidth = this.width * scaleX;
    var newHeight = this.height * scaleX;
    var offsetX = (this.width - newWidth) / 4;
    var offsetY = (this.height - newHeight) / 4;
    this.width = newWidth;
    this.height = newHeight;
    this.setCenterPosition(new CANVAS.Point(this.center.x, this.center.y));
};