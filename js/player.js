//========================================================================//
//======================== :: DF :: ======================================//
//========================================================================//
var DF = {
    M: {
        //types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        types: ['shou', 'zuqiu', 'langan'],
        moveSpeed: 0,
        maxPath: 0,
        scale: 0.2,
        maxPathMile: 0,
        scaleMile: 0.4,
        cutImgTimeFinal: 15,
        cutImgTime: 15,
        cutImgIndex: 0
    },
    P: {
        pathWidth: 0,
        moveSpeed: 0,
        jumpSpeedFinal: 5,
        jumpSpeed: 5,
        gravity: 0.25,
        cutImgTimeFinal: 25,
        cutImgTime: 25,
        cutImgIndex: 0
    },
    Miles: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
};
//========================================================================//
//======================== :: Player :: ==================================//
//========================================================================//
// 创建
var Player = function() {
    GAME.Sprite.apply(this, ['player', 'images/player0.png', 66, 122, 3]);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 3;
    this.setAnchorPoint(0.5, 1);
    this.setPosition(x, y);
    this.last = {
        x: this.getPositionX(),
        y: this.getPositionY()
    };
    this.first = {
        x: this.getPositionX(),
        y: this.getPositionY()
    };
    this.images = [];
    var imageLength = 2,
        imageName = 'player';
    for (var i = 0; i < imageLength; i++) {
        var image = new Image();
        image.width = this.width;
        image.height = this.height;
        image.src = 'images/' + imageName + i + '.png';
        this.images.push(image);
    }
    var jImage = new Image();
    jImage.width = this.width;
    jImage.height = this.height;
    jImage.src = 'images/player_jump.png';
    this.images.push(jImage);
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
        this.image = this.images[2];
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
        this.setPositionY(this.getPositionY() - DF.P.jumpSpeed);
        DF.P.jumpSpeed -= DF.P.gravity;
        if (DF.P.jumpSpeed <= 0) {
            this.jumpDirect = -1;
        }
    } else if (this.jumpDirect == -1) {
        DF.P.jumpSpeed += DF.P.gravity;
        this.setPositionY(this.getPositionY() + DF.P.jumpSpeed);
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
    if (Math.abs(this.getPositionX() - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.getPositionX();
        if (this.last.x < this.first.x && Math.abs(this.last.x - this.first.x) > 0.01) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x && Math.abs(this.last.x - this.first.x) > 0.01) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setPositionX(this.getPositionX() + DF.P.moveSpeed);
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setPositionX(this.getPositionX() - DF.P.moveSpeed);
    } else {
        this.moving = false;
    }
};
//========================================================================//
//======================== :: Shadow :: ==================================//
//========================================================================//
var Shadow = function() {
    GAME.Sprite.apply(this, ['shadow', 'images/shadow.png', 70, 67, 1]);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 3 + 40;
    this.setAnchorPoint(0.5, 1);
    this.setPosition(x, y);
    this.last = {
        x: this.getPositionX(),
        y: this.getPositionY()
    };
    this.first = {
        x: this.getPositionX(),
        y: this.getPositionY()
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
    if (Math.abs(this.getPositionX() - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.getPositionX();
        if (this.last.x < this.first.x && Math.abs(this.last.x - this.first.x) > 0.01) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x && Math.abs(this.last.x - this.first.x) > 0.01) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setPositionX(this.getPositionX() + DF.P.moveSpeed);
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setPositionX(this.getPositionX() - DF.P.moveSpeed);
    } else {
        this.moving = false;
    }
};
//========================================================================//
//======================== :: Monster :: =================================//
//========================================================================//
// 创建
var Monster = function(type, pathIndex, width, height, index) {
    GAME.Sprite.apply(this, [type + index, 'images/' + type + '0.png', width, height, 2]);
    var x = pathIndex == 1 ? getScaleX(xd1) : (pathIndex == 3 ? getScaleX(xd2) : winWidth / 2);
    if (type === 'langan') {
        x = pathIndex == 1 ? winWidth / 3 : winWidth / 3 * 2;
    }
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
    var distH = (this.getCurrentHeight()) * 0.5,
        distW = (this.getCurrentWidth()) * 0.5;
    if (target.jumping) {
        if (this.getPositionY() - target.getPositionY() < target.getCurrentHeight() * 0.5) {}
    } else {
        if (target.getPositionY() - this.getPositionY() > target.getCurrentHeight() * 0.5) {} else {}
        if (this.getPositionY() - target.getPositionY() < distH && this.getPositionY() - target.getPositionY() > 0) {
            if (Math.abs(this.getPositionX() - target.getPositionX()) < distW) {
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
        this.removeFromGlobal();
    }
    var x, y;
    switch (this.pathIndex) {
        case 1:
            x = this.getPositionX() + DF.M.moveSpeed * this.k;
            break;
        case 2:
            x = this.getPositionX();
            break;
        case 3:
            x = this.getPositionX() - DF.M.moveSpeed * this.k;
            break;
    }
    y = this.getPositionY() - DF.M.moveSpeed;
    if (winHeight - this.getPositionY() > DF.M.maxPath) {
        this.alive = false;
        delete monsters[this.index];
        this.removeFromGlobal();
    } else {
        this.image = this.cutImg();
        var ks = DF.M.scale + (this.getPositionY() - getScaleY(yl)) * (1 - DF.M.scale) / getScaleY(HEIGHT - yl);
        this.setScale(ks, ks);
        this.setPosition(x, y);
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
        popupTip('gmf+1', 'fc_or');
        gmfCounts++;
        if (isPlayMusic) {
            musicGmf.play();
        }
    } else {
        startTime -= 1000;
        popupTip('+1s');
        if (isPlayMusic) {
            musicCrash.play();
        }
    }
};
//========================================================================//
//======================== :: AsideMile :: ===============================//
//========================================================================//
// 创建
var AsideMile = function(type, width, height, index) {
    GAME.Sprite.apply(this, [type + index, 'images/number/' + type + '.png', width, height, 0]);
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
        var ks = DF.M.scaleMile + (this.getPositionY() - getScaleY(yl)) * (1 - DF.M.scaleMile) / getScaleY(HEIGHT - yl);
        this.setScale(ks, ks);
        this.setPosition(x, y);
    }
};