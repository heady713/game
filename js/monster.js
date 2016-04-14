//========================================================================
//======================== :: DF :: ==================================
//========================================================================
var DF = {
    M: {
        maxPath: 0,
        pathOffset: 0.3,
        wOffset: 0.1,
        hOffset: 0.1
    },
    P: {
        pathWidth: 60,
        moveSpeed: 2,
        jumpSpeedFinal: 6,
        jumpSpeed: 6,
        gravity: 0.2
    }
};
//========================================================================
//======================== :: Player :: ==================================
//========================================================================
// 创建
var Player = function() {
    this.self = {};
    this.width = 56;
    this.height = 80;
    this.self.x = this.x = (winWidth - this.width) / 2;
    this.self.y = this.y = (winHeight - this.height) / 2;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/player_s.png';
    context.drawImage(this.image, this.self.x, this.self.y);
    this.moving = false;
    this.moveDirect = 0;
    this.jumping = false;
    this.jumpDirect = 0;
    this.pathIndex = 2;
    this.center = {
        x: this.x,
        y: this.y
    };
};
//更新位置
Player.prototype.update = function() {
    if (this.moving) {
        this.move();
    }
    if (this.jumping) {
        this.jump();
    }
    context.drawImage(this.image, this.self.x, this.self.y);
};
// Jump
Player.prototype.jump = function() {
    if (this.jumpDirect == 1) {
        this.self.y -= DF.P.jumpSpeed;
        DF.P.jumpSpeed -= DF.P.gravity;
        if (DF.P.jumpSpeed <= 0) {
            this.jumpDirect = -1;
        }
    } else if (this.jumpDirect == -1) {
        DF.P.jumpSpeed += DF.P.gravity;
        this.self.y += DF.P.jumpSpeed;
        if (DF.P.jumpSpeed >= DF.P.jumpSpeedFinal) {
            this.jumpDirect = 0;
        }
    } else {
        this.jumping = false;
        DF.P.jumpSpeed = DF.P.jumpSpeedFinal;
        this.self.y = this.y;
    }
};
// Move
Player.prototype.move = function() {
    if (Math.abs(this.self.x - this.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.x = this.self.x;
        if (this.x < this.center.x) {
            this.pathIndex = 1;
        } else if (this.x > this.center.x) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.self.x = this.self.x + DF.P.moveSpeed;
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.self.x = this.self.x - DF.P.moveSpeed;
    }
};
//========================================================================
//======================== :: Monster :: ==================================
//========================================================================
// 创建
var Monster = function(pathIndex, width, height, index) {
    this.self = {};
    this.width = width;
    this.height = height;
    var gap = (winWidth - 3 * this.width) / 4;
    this.self.x = this.x = gap * pathIndex + this.width * (pathIndex - 1);
    this.self.y = this.y = winHeight - this.height;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/coin_s.png';
    context.drawImage(this.image, this.self.x, this.self.y);
    this.speed = 3;
    this.pathIndex = pathIndex;
    this.index = index;
    this.alive = true;
};
//更新位置
Monster.prototype.update = function() {
    if (!this.alive) {
        return false;
    }
    switch (this.pathIndex) {
        case 1:
            this.self.x = this.self.x + DF.M.pathOffset;
            break;
        case 3:
            this.self.x = this.self.x - DF.M.pathOffset;
            break;
    }
    this.image.width -= DF.M.wOffset;
    this.image.height -= DF.M.hOffset;
    this.self.y -= this.speed;
    if (winHeight - this.self.y > DF.M.maxPath) {
        this.self.x = this.x;
        this.self.y = this.y;
        this.alive = false;
        delete monsters[this.index];
    } else {
        context.drawImage(this.image, this.self.x, this.self.y);
    }
};