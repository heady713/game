//========================================================================
//======================== :: DF :: ==================================
//========================================================================
var DF = {
    M: {
        //types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        types: ['shou', 'zuqiu'],
        moveSpeed: 3,
        maxPath: 0,
        pathOffset1: 0.4,
        pathOffset2: 0.24,
        pathOffset3: 0.86,
        scale: 0.99,
        maxPathMile: 0,
        pathOffset4: 0.9,
        scaleMile: 0.99,
        cutImgTimeFinal: 25,
        cutImgTime: 25,
        cutImgIndex: 0
    },
    P: {
        imgName: 'jiaose_s',
        pathWidth: 65,
        moveSpeed: 4,
        jumpSpeedFinal: 6,
        jumpSpeed: 5,
        gravity: 0.25,
        cutImgTimeFinal: 25,
        cutImgTime: 25
    },
    Miles: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95']
};
//========================================================================
//======================== :: Player :: ==================================
//========================================================================
// 创建
var Player = function() {
    this.self = document.createElement('canvas');
    this.self.width = this.width = 56;
    this.self.height = this.height = 122;
    this.self.x = this.x = (winWidth - this.width) / 2;
    this.self.y = this.y = winHeight - DF.M.maxPath / 5 * 4;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/' + DF.P.imgName + '.png';
    this.context = this.self.getContext('2d');
    var tempPlarer = this;
    this.image.onload = function() {
        tempPlarer.context.drawImage(tempPlarer.image, 0, 0);
        context.globalCompositeOperation = "source-over";
        context.drawImage(tempPlarer.self, tempPlarer.self.x, tempPlarer.self.y);
    };
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
//======================== :: Shadow :: ==================================
//========================================================================
// 创建
var Shadow = function() {
    this.self = document.createElement('canvas');
    this.self.width = this.width = 100;
    this.self.height = this.height = 96;
    this.self.x = this.x = (winWidth - this.width) / 2 + 16;
    this.self.y = this.y = winHeight - DF.M.maxPath / 5 * 4 + 90;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/shadow.png';
    this.context = this.self.getContext('2d');
    var tempPlarer = this;
    this.image.onload = function() {
        tempPlarer.context.drawImage(tempPlarer.image, 0, 0);
        context.globalCompositeOperation = "lighter";
        context.drawImage(tempPlarer.self, tempPlarer.self.x, tempPlarer.self.y);
    };
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
Shadow.prototype.update = function() {
    if (this.moving) {
        this.move();
    }
    this.context.clearRect(0, 0, this.self.width, this.self.height);
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.image, 0, 0);
    context.globalCompositeOperation = "lighter";
    context.drawImage(this.self, this.self.x, this.self.y);
};
// Move
Shadow.prototype.move = function() {
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
    this.type = type;
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
                this.crash();
            } else if (this.self.x < target.self.x && target.self.x - this.self.x < this.width / 2) {
                this.crash();
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
        case 2:
            this.self.x = this.self.x - DF.M.pathOffset2;
            break;
        case 3:
            this.self.x = this.self.x - DF.M.pathOffset3;
            break;
    }
    this.self.x += offset;
    this.self.y -= DF.M.moveSpeed;
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
// 切图
Monster.prototype.cutImg = function() {
    if (DF.M.cutImgTime === 0) {
        var scale = DF.M.cutImgScale[DF.M.cutImgIndex];
        this.context.translate(this.width, 0);
        this.context.scale(-1, 1);
        DF.M.cutImgTime = DF.M.cutImgTimeFinal;
        DF.M.cutImgIndex++
            if (DF.M.cutImgIndex >= 2) {
                DF.M.cutImgIndex = 0;
            }
    }
    DF.M.cutImgTime--;
};
//crash
Monster.prototype.crash = function() {
    this.alive = false;
    delete monsters[this.index];
    if (this.type === DF.M.types[0]) {
        dialog({
            content: 'GIVE ME FIVE!',
            mask: true,
            min: true,
            delay: 2000
        });
    } else {
        dialog({
            content: 'YOU HURT!',
            mask: true,
            min: true,
            delay: 2000
        });
    }
};
//========================================================================
//======================== :: AsideMile :: ==================================
//========================================================================
// 创建
var AsideMile = function(type, width, height, index) {
    this.self = document.createElement('canvas');
    this.self.width = this.width = width;
    this.self.height = this.height = height;
    this.self.x = this.x = -80;
    this.self.y = this.y = winHeight - this.height;
    this.image = new Image();
    this.image.width = this.width;
    this.image.height = this.height;
    this.image.src = 'images/number/' + type + '.png';
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.image, 0, 0);
    context.drawImage(this.self, this.self.x, this.self.y);
    this.index = index;
};
//更新位置
AsideMile.prototype.update = function(target) {
    this.move();
};
//MOVE
AsideMile.prototype.move = function() {
    var offset = this.width * (1 - DF.M.scale);
    this.self.x = this.self.x + DF.M.pathOffset4;
    this.self.x += offset;
    this.self.y -= DF.M.moveSpeed;
    if (winHeight - this.self.y > DF.M.maxPathMile) {
        this.self.x = this.x;
        this.self.y = this.y;
        delete asideMiles[this.index];
    } else {
        this.context.clearRect(0, 0, this.self.width, this.self.height);
        this.context.scale(DF.M.scaleMile, DF.M.scale);
        this.context.drawImage(this.image, 0, 0, this.self.width, this.self.height);
        context.globalCompositeOperation = "destination-over";
        context.drawImage(this.self, this.self.x, this.self.y);
        this.width = this.width * DF.M.scale;
        this.height = this.height * DF.M.scale;
    }
};