var CANVAS = CANVAS || {};

// ===================================================
// =====================::POINT::=====================
// ===================================================
CANVAS.Point = function (x, y) {
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

CANVAS.Point.prototype.getDistance = function(point) {
	return Math.sqrt(Math.pow(point.x - this.x, 2), Math.pow(point.y - this.y, 2))
};

// ===================================================
// =====================::Sprite::====================
// ===================================================
CANVAS.Sprite = function(src, width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.x = this.x = 0;
	this.canvas.y = this.y = 0;
	this.context = this.canvas.getContext('2d');
	this.width = width;
	this.height = height;
	this.center = {
		x: this.x + 0.5 * this.width,
		y: this.y + 0.5 * this.height
	};

	this.parentCanvas = null;
	this.image = new Image();
	// this.image.width = this.width;
	// this.image.height = this.height;
	this.image.src = src;

	var self = this;

	this.image.onload = function() {
		self.context.drawImage(self.image, 0, 0);
		// self.context.fillRect(0,0,self.width, self.height);
		// self.context.fillStyle = 'red';
		self.refresh();
	};
};

CANVAS.Sprite.prototype.addTo = function (canvas) {
	this.parentCanvas = canvas;
};

CANVAS.Sprite.prototype.refresh = function() {
	if (this.parentCanvas) {
		var context = this.parentCanvas.getContext('2d');
		context.clearRect(0, 0, this.width, this.height);
		context.globalCompositeOperation = "source-over";
		context.drawImage(this.canvas, this.x, this.y);
	}
};

CANVAS.Sprite.prototype.setPosition = function(point) {
	this.canvas.x = this.x = point.x;
	this.canvas.y = this.y = point.y;
	this.center.x = this.x + 0.5 * this.width;
	this.center.y = this.y + 0.5 * this.height;

	this.refresh();
};

CANVAS.Sprite.prototype.setCenterPosition = function(point) {
	this.center.x = point.x;
	this.center.y = point.y;
	this.canvas.x = this.x = point.x - 0.5 * this.width;
	this.canvas.y = this.y = point.y - 0.5 * this.height;

	this.refresh();
};

CANVAS.Sprite.prototype.setScale = function() {
	
};

var canvasContainer = document.getElementById('game');
var g_canvas = document.createElement('canvas');
g_canvas.width = 300;
g_canvas.height = 800;
g_canvas.style.position = "absolute";
context = g_canvas.getContext("2d");
canvasContainer.appendChild(g_canvas);

var player = new CANVAS.Sprite('img/Soccer.png', 15, 15);
player.addTo(g_canvas);
player.setPosition(new CANVAS.Point(30,80));

var btn = document.getElementById('btn');
btn.onclick = function (e) {
	player.setPosition(new CANVAS.Point(Math.random()*100,Math.random()*80));
};
