//========================================================================//
//======================== :: DF :: ======================================//
//========================================================================//
var DF = {
    M: {
        //types: ['Coin', 'Badminton', 'Baseball', 'Basketball', 'Soccer', 'Tennis', 'Volleyball'],
        types: ['shou', 'zuqiu'],
        moveSpeed: 3,
        maxPath: 0,
        pathOffset1: 0.4,
        pathOffset2: 0.24,
        pathOffset3: 0.86,
        scale: 0.999,
        maxPathMile: 0,
        pathOffset4: 0.9,
        scaleMile: 0.99,
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
    this.refresh();
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
var WIDTH = 720,
    HEIGHT = 1280;
var xl = 292,
    yl = 308,
    xr = 435;
var xd1 = 128,
    xd2 = 592;

function getScaleX(x) {
    return winWidth * x / WIDTH;
}

function getScaleY(y) {
    return winHeight * y / HEIGHT;
}

function k(x, y, idx) {
    var x1 = getScaleX(xl);
    var x2 = getScaleX(xr);
    var y1 = getScaleY(yl);
    var p1_x = 0;
    switch (idx) {
        case 1:
            p1_x = getScaleX(xd1);
        case 2:
            p1_x = getScaleX(360);
        case 3:
            p1_x = getScaleX(xd2);
    }
    var p1_y = y1;
    return (x - p1_x) / (y - p1_y);
}
//========================================================================//
//======================== :: Monster :: =================================//
//========================================================================//
// 创建
var Monster = function(type, pathIndex, width, height, index) {
    this.self = document.createElement('canvas');
    this.self.width = this.width = width;
    this.self.height = this.height = height;
    this.setCenterX(winWidth / 6 * (2 * pathIndex - 1));
    this.setCenterY(winHeight);
    this.images = [];
    var imageLength = type === DF.M.types[1] ? 4 : 1;
    for (var i = 0; i < imageLength; i++) {
        var image = new Image();
        image.width = this.width;
        image.height = this.height;
        image.src = 'images/' + type + i + '.png';
        this.images.push(image);
    }
    this.context = this.self.getContext('2d');
    this.context.drawImage(this.images[0], 0, 0);
    context.drawImage(this.self, this.self.x, this.self.y);
    this.type = type;
    this.pathIndex = pathIndex;
    this.index = index;
    this.alive = true;
};
Monster.prototype.setCenterX = function(x) {
    this.centerX = x;
    this.self.x = x - 1 / 2 * this.width;
};
Monster.prototype.setCenterY = function(y) {
    this.centerY = y;
    this.self.y = y - 1 / 2 * this.height;
};
//更新位置
Monster.prototype.update = function(target) {
    if (target.jumping) {
        if (this.self.y - target.center.y < target.height) {
            context.globalCompositeOperation = "destination-over";
        }
    } else {
        if (this.self.y + this.height < target.center.y) {
            context.globalCompositeOperation = "source-over";
        } else {
            context.globalCompositeOperation = "destination-over";
        }
        if (this.self.y - target.center.y < target.height && this.self.y - target.center.y > (target.height - 0.5 * this.self.height)) {
            if (this.self.x > target.center.x && this.self.x - target.center.x < target.width) {
                this.crash();
            } else if (this.self.x < target.center.x && target.center.x - this.self.x < this.width / 2) {
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
    var kv = k(this.centerX, this.centerY, this.pathIndex);
    var offsetY = DF.M.moveSpeed;
    var center_x = this.centerX - offsetY * kv;
    var center_y = this.centerY - offsetY;
    this.setCenterX(center_x);
    this.setCenterY(center_y);
    if (winHeight - this.self.y > DF.M.maxPath) {
        this.alive = false;
        delete monsters[this.index];
    } else {
        this.context.clearRect(0, 0, this.self.width + 1, this.self.height + 1);
        this.context.scale(DF.M.scale, DF.M.scale);
        var image = this.cutImg();
        this.context.drawImage(image, 0, 0, this.self.width, this.self.height);
        context.drawImage(this.self, this.self.x, this.self.y);
        this.width = this.width * DF.M.scale;
        this.height = this.height * DF.M.scale;
        switch (this.pathIndex) {
            case 1:
                center_x = center_x + this.width * (1 - DF.M.scale);
                this.setCenterX(center_x);
                center_y = center_y + this.height * (1 - DF.M.scale);
                this.setCenterY(center_y);
                break;
            case 2:
                break;
            case 3:
                center_x = center_x + this.width * (1 - DF.M.scale);
                this.setCenterX(center_x);
                center_y = center_y + this.height * (1 - DF.M.scale);
                this.setCenterY(center_y);
                break;
        }
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