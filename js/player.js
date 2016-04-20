//========================================================================//
//======================== :: DF :: ======================================//
//========================================================================//
var DF = {
    M: {
        //types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        types: ['shou', 'zuqiu'],
        moveSpeed: 3,
        maxPath: 0,
        pathOffset1: 0.8,
        pathOffset2: 0.0,
        pathOffset3: 0.8,
        scale: 0.988,
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
    CANVAS.Sprite.apply(this, ['images/jiaose_s.png', 56, 122]);
    this.addTo(canvas);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 4;
    context.globalCompositeOperation = "source-over";
    this.setCenterPosition(new CANVAS.Point(x, y));
    this.last = {
        x: this.center.x,
        y: this.center.y
    };
    this.first = {
        x: this.center.x,
        y: this.center.y
    };
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
        this.cutImg();
    }
    this.refresh('source-over');
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
        this.setCenterPosition(new CANVAS.Point(this.center.x, this.center.y - DF.P.jumpSpeed));
        DF.P.jumpSpeed -= DF.P.gravity;
        if (DF.P.jumpSpeed <= 0) {
            this.jumpDirect = -1;
        }
    } else if (this.jumpDirect == -1) {
        DF.P.jumpSpeed += DF.P.gravity;
        this.setCenterPosition(new CANVAS.Point(this.center.x, this.center.y + DF.P.jumpSpeed));
        if (DF.P.jumpSpeed >= DF.P.jumpSpeedFinal) {
            this.jumpDirect = 0;
        }
    } else {
        this.jumping = false;
        DF.P.jumpSpeed = DF.P.jumpSpeedFinal;
        this.setCenterPosition(new CANVAS.Point(this.last.x, this.last.y));
    }
};
// Move
Player.prototype.move = function() {
    if (Math.abs(this.center.x - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.center.x;
        if (this.last.x < this.first.x) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setCenterPosition(new CANVAS.Point(this.center.x + DF.P.moveSpeed, this.center.y));
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setCenterPosition(new CANVAS.Point(this.center.x - DF.P.moveSpeed, this.center.y));
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
    CANVAS.Sprite.apply(this, ['images/shadow.png', 70, 67]);
    this.addTo(canvas);
    var x = winWidth / 2;
    var y = winHeight - DF.M.maxPath / 5 * 4 + 67;
    this.setCenterPosition(new CANVAS.Point(x, y));
    this.last = {
        x: this.center.x,
        y: this.center.y
    };
    this.first = {
        x: this.center.x,
        y: this.center.y
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
    this.refresh();
};
// Move
Shadow.prototype.move = function() {
    if (Math.abs(this.center.x - this.last.x) >= DF.P.pathWidth) {
        this.moveDirect = 0;
        this.moving = false;
        this.last.x = this.center.x;
        if (this.last.x < this.first.x) {
            this.pathIndex = 1;
        } else if (this.last.x > this.first.x) {
            this.pathIndex = 3;
        } else {
            this.pathIndex = 2;
        }
    }
    if (this.moveDirect > 0 && this.pathIndex < 3) {
        this.setCenterPosition(new CANVAS.Point(this.center.x + DF.P.moveSpeed, this.center.y));
    } else if (this.moveDirect < 0 && this.pathIndex > 1) {
        this.setCenterPosition(new CANVAS.Point(this.center.x - DF.P.moveSpeed, this.center.y));
    } else {
        this.moving = false;
    }
};
//========================================================================//
//======================== :: Monster :: =================================//
//========================================================================//
// 创建
var Monster = function(type, pathIndex, width, height, index) {
    CANVAS.Sprite.apply(this, ['images/' + type + '0.png', width, height]);
    this.addTo(canvas);
    var x = winWidth / 6 * (2 * pathIndex - 1);
    var y = winHeight;
    this.setCenterPosition(new CANVAS.Point(x, y));
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
        if (this.center.y - target.center.y < distH) {
            opt = 'destination-over';
        }
    } else {
        if (target.center.y - this.center.y > target.height * 0.5) {
            opt = 'source-over';
        } else {
            opt = 'destination-over';
        }
        if (this.center.y - target.center.y < distH && this.center.y - target.center.y > 0) {
            if (Math.abs(this.center.x - target.center.x) < distW) {
                this.crash();
            }
        }
    }
    this.move(opt);
};
//MOVE
Monster.prototype.move = function(opt) {
    if (!this.alive) {
        return false;
        delete monsters[this.index];
    }
    switch (this.pathIndex) {
        case 1:
            this.center.x = this.center.x + DF.M.pathOffset1;
            break;
        case 2:
            this.center.x = this.center.x + DF.M.pathOffset2;
            break;
        case 3:
            this.center.x = this.center.x - DF.M.pathOffset3;
            break;
    }
    this.center.y -= DF.P.moveSpeed;
    if (winHeight - this.center.y > DF.M.maxPath) {
        this.alive = false;
        delete monsters[this.index];
    } else {
        this.image = this.cutImg();
        this.setScale(DF.M.scale, DF.M.scale);
        this.setCenterPosition(new CANVAS.Point(this.center.x, this.center.y));
        this.refresh(opt);
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
    CANVAS.Sprite.apply(this, ['images/number/' + type + '.png', width, height]);
    this.addTo(canvas);
    var x = 0;
    var y = winHeight - this.height;
    this.setCenterPosition(new CANVAS.Point(x, y));
    this.index = index;
};
//更新位置
AsideMile.prototype.update = function(target) {
    this.move();
};
//MOVE
AsideMile.prototype.move = function() {
    this.center.x += DF.M.pathOffset4;
    this.center.y -= DF.M.moveSpeed;
    if (winHeight - this.center.y > DF.M.maxPathMile) {
        delete asideMiles[this.index];
    } else {
        this.setScale(DF.M.scaleMile, DF.M.scaleMile);
        this.setCenterPosition(new CANVAS.Point(this.center.x, this.center.y));
        this.refresh();
    }
};