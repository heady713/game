//========================================================================//
//======================== :: DF :: ======================================//
//========================================================================//
var DF = {
    M: {
        //types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        types: ['shou', 'zuqiu'],
        moveSpeed: 0.01,
        maxPath: 0,
        pathOffset1: 0.8,
        pathOffset2: 0.0,
        pathOffset3: 0.8,
        scale: 0.5,
        maxPathMile: 0,
        pathOffset4: 1,
        scaleMile: 0.992,
        cutImgTimeFinal: 15,
        cutImgTime: 15,
        cutImgIndex: 0
    },
    P: {
        pathWidth: 65,
        moveSpeed: 4,
        jumpSpeedFinal: 6,
        jumpSpeed: 5,
        gravity: 0.25,
        cutImgTimeFinal: 25,
        cutImgTime: 25,
        cutImgIndex: 0,
        cutHurtTimeFinal: 25,
        cutHurtTime: 25,
        cutHurtIndex: 0
    },
    Miles: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
};
//========================================================================//
//======================== :: Player :: ==================================//
//========================================================================//
// 创建
var Player = function() {
    GAME.Sprite.apply(this, ['player', 'images/jiaose0.png', 56, 122, 1]);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 4;
    this.setPosition(x, y);
    this.last = {
        x: this.pos.x,
        y: this.pos.y
    };
    this.first = {
        x: this.pos.x,
        y: this.pos.y
    };
    this.images = [];
    var imageLength = 2,
        imageName = 'jiaose';
    for (var i = 0; i < imageLength; i++) {
        var image = new Image();
        image.width = this.width;
        image.height = this.height;
        image.src = 'images/' + imageName + i + '.png';
        this.images.push(image);
    }
    this.moving = false;
    this.moveDirect = 0;
    this.jumping = false;
    this.jumpDirect = 0;
    this.hurt = false;
    this.pathIndex = 2;
};
// 更新位置
Player.prototype.update = function() {
    if (this.moving) {
        this.move();
    }
    if (this.jumping) {
        this.jump();
    }
    if (!this.jumping && !this.hurt) {
        this.image = this.cutImg();
    }
};
// 切图
Player.prototype.cutImg = function() {
    if (DF.P.cutImgTime === 0) {
        DF.P.cutImgIndex++;
        if (DF.P.cutImgIndex >= 2) {
            DF.P.cutImgIndex = 0;
        }
        DF.P.cutImgTime = DF.P.cutImgTimeFinal;
    }
    DF.P.cutImgTime--;
    return this.images[DF.P.cutImgIndex];
};
// Jump
Player.prototype.jump = function() {
    if (this.jumpDirect == 1) {
        this.setPosition(this.pos.x, this.pos.y - DF.P.jumpSpeed);
        DF.P.jumpSpeed -= DF.P.gravity;
        if (DF.P.jumpSpeed <= 0) {
            this.jumpDirect = -1;
        }
    } else if (this.jumpDirect == -1) {
        DF.P.jumpSpeed += DF.P.gravity;
        this.setPosition(this.pos.x, this.pos.y + DF.P.jumpSpeed);
        if (DF.P.jumpSpeed >= DF.P.jumpSpeedFinal) {
            this.jumpDirect = 0;
        }
    } else {
        this.jumping = false;
        DF.P.jumpSpeed = DF.P.jumpSpeedFinal;
        this.setPosition(this.last.x, this.last.y);
    }
};
// Move
Player.prototype.move = function() {
    if (Math.abs(this.pos.x - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.pos.x;
        if (this.last.x < this.first.x) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setPosition(this.pos.x + DF.P.moveSpeed, this.pos.y);
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setPosition(this.pos.x - DF.P.moveSpeed, this.pos.y);
    } else {
        this.moving = false;
    }
};
//受伤
Player.prototype.hurting = function() {
    this.hurt = true;
    var target = this;
    setTimeout(function() {
        target.hurt = false;
    }, 1000);
};
//受伤效果
Player.prototype.hurtUpdate = function() {
    if (DF.P.cutHurtTime === 0) {
        if (DF.P.cutHurtIndex === 0) {
            DF.P.cutHurtIndex = 1;
        } else {
            DF.P.cutHurtIndex = 0;
        }
        DF.P.cutHurtTime = DF.P.cutImgTimeFinal;
    }
    DF.P.cutHurtTime--;
};
//========================================================================//
//======================== :: Shadow :: ==================================//
//========================================================================//
var Shadow = function() {
    GAME.Sprite.apply(this, ['shadow', 'images/shadow.png', 70, 67, 1]);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 4 + 67;
    this.setPosition(x, y);
    this.last = {
        x: this.pos.x,
        y: this.pos.y
    };
    this.first = {
        x: this.pos.x,
        y: this.pos.y
    };
    this.moving = false;
    this.moveDirect = 0;
    this.pathIndex = 2;
};
// 更新位置
Shadow.prototype.update = function() {
    if (this.moving) {
        this.move();
    }
};
// Move
Shadow.prototype.move = function() {
    if (Math.abs(this.pos.x - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.pos.x;
        if (this.last.x < this.first.x) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setPosition(this.pos.x + DF.P.moveSpeed, this.pos.y);
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setPosition(this.pos.x - DF.P.moveSpeed, this.pos.y);
    } else {
        this.moving = false;
    }
};
//========================================================================//
//======================== :: Monster :: =================================//
//========================================================================//
// 创建
var Monster = function(type, pathIndex, width, height, index) {
    GAME.Sprite.apply(this, [type + index, 'images/' + type + '0.png', width, height, 3]);
    var x = winWidth / 6 * (2 * pathIndex - 1);
    var y = winHeight;
    this.setPosition(x, y);
    this.images = [];
    var imageLength = type === DF.M.types[1] ? 4 : 1;
    for (var i = 0; i < imageLength; i++) {
        var image = new Image();
        image.width = this.width;
        image.height = this.height;
        image.src = 'images/' + type + i + '.png';
        this.images.push(image);
    }
    this.image = this.images[0];
    this.type = type;
    this.pathIndex = pathIndex;
    this.index = index;
    this.alive = true;
};
//更新位置
Monster.prototype.update = function(target) {
    var opt = 'destination-over',
        distH = target.height * 0.5 + this.height * 0.5,
        distW = target.width * 0.5 + this.width * 0.5;
    if (target.jumping) {
        if (this.pos.y - target.pos.y < distH) {}
    } else {
        if (target.pos.y - this.pos.y > target.height * 0.5) {} else {}
        if (this.pos.y - target.pos.y < distH && this.pos.y - target.pos.y > 0) {
            if (Math.abs(this.pos.x - target.pos.x) < distW) {
                //this.crash();
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
        this.removeFromGlobal();
    }
    switch (this.pathIndex) {
        case 1:
            this.pos.x += DF.M.moveSpeed * k;
            break;
        case 2:
            break;
        case 3:
            this.pos.x -= DF.M.moveSpeed * k;
            break;
    }
    this.pos.y -= DF.P.moveSpeed;
    if (winHeight - this.pos.y > DF.M.maxPath) {
        this.alive = false;
        delete monsters[this.index];
        this.removeFromGlobal();
    } else {
        this.image = this.cutImg();
        var maxPathY = getScaleY(yl);
        this.setScale(DF.M.scale, DF.M.scale);
        this.setPosition(this.pos.x, this.pos.y);
    }
};
// 切图
Monster.prototype.cutImg = function() {
    if (this.type === DF.M.types[1]) {
        if (DF.M.cutImgTime === 0) {
            DF.M.cutImgIndex++;
            if (DF.M.cutImgIndex >= 3) {
                DF.M.cutImgIndex = 0;
            }
            DF.M.cutImgTime = DF.M.cutImgTimeFinal;
        }
        DF.M.cutImgTime--;
        return this.images[DF.M.cutImgIndex];
    } else {
        return this.images[0];
    }
};
//crash
Monster.prototype.crash = function() {
    this.alive = false;
    delete monsters[this.index];
    this.removeFromGlobal();
    if (this.type === DF.M.types[0]) {
        // dialog({
        //     content: 'GIVE ME FIVE!',
        //     mask: true,
        //     min: true,
        //     delay: 2000
        // });
        gmfCounts++;
    } else {
        player.hurting();
        // dialog({
        //     content: 'YOU HURT!',
        //     mask: true,
        //     min: true,
        //     delay: 2000
        // });
    }
};
//========================================================================//
//======================== :: AsideMile :: ===============================//
//========================================================================//
// 创建
var AsideMile = function(type, width, height, index) {
    GAME.Sprite.apply(this, [type + index, 'images/number/' + type + '.png', width, height, 3]);
    this.k = Math.abs((getScaleX(xA) - getScaleX(3)) / (winHeight - getScaleY(yl)));
    this.index = index;
};
//更新位置
AsideMile.prototype.update = function(target) {
    this.move();
};
//MOVE
AsideMile.prototype.move = function() {
    var x, y;
    x = this.getPositionX() + DF.M.moveSpeed * this.k;
    y = this.getPositionY() - DF.M.moveSpeed;
    if (winHeight - this.getPositionY() > DF.M.maxPathMile) {
        delete asideMiles[this.index];
        this.removeFromGlobal();
    } else {
        var ks = DF.M.scale + (this.getPositionY() - getScaleY(yl)) * (1 - DF.M.scale) / getScaleY(HEIGHT - yl);
        this.setScale(ks, ks);
        this.setPosition(x, y);
    }
};