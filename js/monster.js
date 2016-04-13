//========================================================================
//======================== :: Monster :: ==================================
//========================================================================
// 创建角色
var Monster = function(index) {
    if (!this.self) {
        this.self = document.createElement("canvas");
    }
    this.self.width = 80;
    this.self.height = 120;
    var gap = (winWidth - 3 * this.self.width) / 4;
    this.self.x = gap * index + this.self.width * (index - 1);
    this.self.y = winHeight - this.self.height;
    var monsterCtx = this.self.getContext("2d");
    monsterCtx.fillStyle = '#FFCBA7';
    monsterCtx.fillRect(0, 0, this.self.width, this.self.height);
    context.drawImage(this.self, this.self.x, this.self.y);
    this.speed = 2;
};
//跳跃
Monster.prototype.update = function() {
    this.self.y -= this.speed;
    context.drawImage(this.self, this.self.x, this.self.y);
};