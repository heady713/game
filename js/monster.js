//========================================================================
//======================== :: DF :: ==================================
//========================================================================
var DF = {
    M: {
        types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        maxPath: 0,
        pathOffset1: 0.6,
        pathOffset2: 0.3,
        pathOffset3: 0.8,
        scale: 0.99,
        rotate: 1
    },
    P: {
        pathWidth: 70,
        moveSpeed: 4,
        jumpSpeedFinal: 6,
        jumpSpeed: 5,
<<<<<<< HEAD
        gravity: 0.25
=======
        gravity: 0.2,
        cutImgTimeFinal: 20,
        cutImgTime: 20
>>>>>>> shyeun/master
    }
};
//========================================================================
//======================== :: Player :: ==================================
//========================================================================
// 创建
var Player = function() {
    this.self = document.createElement('canvas');
    this.self.width = this.width = 56;
    this.self.height = this.height = 80;
    this.self.x = this.x = (winWidth - this.width) / 2;
    this.self.y = this.y = winHeight - DF.M.maxPath / 5 * 4;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/Player.png';
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.image, 0, 0);
    context.drawImage(this.self, this.self.x, this.self.y);
    this.moving = false;
    this.moveDirect = 0;
    this.jumping = false;
    this.jumpDirect = 0;
    this.hurt = false;
    this.pathIndex = 2;
    this.center = {
        x: this.x,
        y: this.y
    };
};
// 更新位置
Player.prototype.update = function() {
    if (this.moving) {
        this.move();
    }
    if (this.jumping) {
        this.jump();
    }
    this.context.clearRect(0, 0, this.self.width, this.self.height);
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.image, 0, 0);
    if (!this.jumping && !this.hurt) {
        this.cutImg();
    }
    context.globalCompositeOperation = "source-over";
    context.drawImage(this.self, this.self.x, this.self.y);
};
// 切图
Player.prototype.cutImg = function() {
    if (DF.P.cutImgTime === 0) {
        this.context.translate(this.width, 0);
        this.context.scale(-1, 1);
        DF.P.cutImgTime = DF.P.cutImgTimeFinal;
    }
    DF.P.cutImgTime--;
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
    } else {
        this.moving = false;
    }
};
//========================================================================
//======================== :: Monster :: ==================================
//========================================================================
// 创建
var Monster = function(type, pathIndex, width, height, index) {
    this.self = document.createElement('canvas');
    this.self.width = this.width = width;
    this.self.height = this.height = height;
    var gap = (winWidth - 3 * this.width) / 4;
    this.self.x = this.x = gap * pathIndex + this.width * (pathIndex - 1);
    this.self.y = this.y = winHeight - this.height;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/' + type + '.png';
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.image, 0, 0);
    context.drawImage(this.self, this.self.x, this.self.y);
    this.speed = 3;
    this.pathIndex = pathIndex;
    this.index = index;
    this.alive = true;
};
//更新位置
Monster.prototype.update = function(target) {
    if (target.jumping) {
        if (this.self.y - target.self.y < target.height) {
            context.globalCompositeOperation = "destination-over";
        }
    } else {
        context.globalCompositeOperation = "source-over";
        if (this.self.y - target.self.y < target.height && this.self.y - target.self.y > 0) {
            if (this.self.x > target.self.x && this.self.x - target.self.x < target.width) {
                this.alive = false;
            } else if (this.self.x < target.self.x && target.self.x - this.self.x < this.width) {
                this.alive = false;
            }
        }
    }
    this.move();
};
//MOVE
Monster.prototype.move = function() {
    if (!this.alive) {
        return false;
        delete monsters[this.index];
    }
    var offset = this.width * (1 - DF.M.scale);
    switch (this.pathIndex) {
        case 1:
            this.self.x = this.self.x + DF.M.pathOffset1;
            break;
        case 1:
            this.self.x = this.self.x - DF.M.pathOffset2;
            break;
        case 3:
            this.self.x = this.self.x - DF.M.pathOffset3;
            break;
    }
    this.self.x += offset;
    this.self.y -= this.speed;
    if (winHeight - this.self.y > DF.M.maxPath) {
        this.self.x = this.x;
        this.self.y = this.y;
        this.alive = false;
        delete monsters[this.index];
    } else {
        this.context.clearRect(0, 0, this.self.width, this.self.height);
        this.context.scale(DF.M.scale, DF.M.scale);
        this.context.drawImage(this.image, 0, 0, this.self.width, this.self.height);
        context.drawImage(this.self, this.self.x, this.self.y);
        this.width = this.width * DF.M.scale;
        this.height = this.height * DF.M.scale;
    }
};