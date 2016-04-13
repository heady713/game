//========================================================================
//======================== :: Player :: ==================================
//========================================================================
// 创建角色
var Player = function(id, stage, runImgUrl, jumpImgUrl) {
    var self = null;
    if ($('#' + id).length == 0) {
        self = document.createElement("div");
        self.id = id;
        stage.appendChild(self);
    } else {
        self = document.getElementById(id);
    }
    this.x = 30;
    this.y = $(window).height() / 2 + 30;
    this.width = 59;
    this.height = 70;
    this.speed = 0;
    this.state = 'stay';
    this.playInterval = null;
    $(self).css({
        position: 'absolute',
        zIndex: 3,
        left: '25%',
        top: this.y,
        width: this.width,
        height: this.height
    });
    this.self = self;
    this.actives.run.imgUrl = runImgUrl;
    this.actives.jump.imgUrl = jumpImgUrl;
    this.run();
};
// 活动状态
Player.prototype.actives = {
    stay: {},
    run: {
        index: 1,
        imgUrl: null
    },
    jump: {
        index: 1,
        imgUrl: null
    }
};
//跳跃
Player.prototype.jump = function() {
    clearInterval(this.playInterval);
    this.state = this.state === 'jump' ? 'run' : 'jump';
    this.do(7, 1);
};
//停止跳跃
Player.prototype.stopJump = function() {
    clearInterval(this.playInterval);
    this.state = 'run';
};
//跑步
Player.prototype.run = function() {
    this.state = 'run';
    this.do(7, 1);
};
//停止跑步
Player.prototype.stopRun = function() {
    clearInterval(this.playInterval);
    this.state = 'stay';
};
//开始
Player.prototype.do = function(clipCount, delay) {
    var player = this;
    $(this.self).css('background-image', 'url(' + this.actives[this.state].imgUrl + ')');
    this.playInterval = setInterval(function() {
        player.cliping.apply(player, [clipCount]);
    }, (delay ? delay : 1) * 1000 / clipCount);
};
//播放帧
Player.prototype.cliping = function(clipCount) {
    var position = $(this.self).css('background-position');
    var temp = position.split(' ')[0];
    var positionX = parseInt(temp.replace('px', ''));
    positionX -= this.width;
    if (this.actives[this.state].index > clipCount) {
        this.actives[this.state].index = 0;
        positionX = 0;
    }
    $(this.self).css('background-position', positionX + 'px 0px');
    this.actives[this.state].index++;
};
//碰撞
Player.prototype.hurt = function() {
    //碰撞
};
//卸载
Player.prototype.remove = function() {
    clearInterval(this.playInterval);
    for (var key in this) {
        delete this[key];
    }
};
//========================================================================
//======================== :: Background :: ==============================
//========================================================================
// 创建角色
var Background = function(id, stage, imgUrl, height, top, delay) {
    var self = null;
    if ($('#' + id).length == 0) {
        self = document.createElement("div");
        self.id = id;
        stage.appendChild(self);
    } else {
        self = document.getElementById(id);
    }
    this.x = '';
    this.y = 0;
    this.width = $(window).width();
    this.height = height;
    this.delay = delay;
    this.playInterval = null;
    $(self).css({
        position: 'absolute',
        zIndex: 2,
        left: this.x,
        top: top,
        width: this.width,
        height: this.height,
        backgroundRepeat: 'repeat-x'
    });
    this.self = self;
    this.bgUrl = imgUrl;
    this.do(this.delay);
};
//开始
Background.prototype.do = function(delay) {
    var player = this;
    $(this.self).css('background-image', 'url(' + this.bgUrl + ')');
    this.playInterval = setInterval(function() {
        player.cliping.apply(player);
    }, delay);
};
//暂停
Background.prototype.pause = function() {
    clearInterval(this.playInterval);
};
//播放帧
Background.prototype.cliping = function() {
    var position = $(this.self).css('background-position');
    var temp = position.split(' ')[0];
    var positionX = parseInt(temp.replace('px', ''));
    positionX -= 1
    $(this.self).css('background-position', positionX + 'px 0px');
};
//卸载
Background.prototype.remove = function() {
    clearInterval(this.playInterval);
    for (var key in this) {
        delete this[key];
    }
};