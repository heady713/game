var DF={M:{types:["shou","zuqiu","langan","lanqiu","feibiao"],moveSpeed:0,maxPath:0,scale:0.2,maxPathMile:0,scaleMile:0.4,cutImgTimeFinal:18,cutImgTime:18,cutImgIndex:0},P:{pathWidth:0,moveSpeed:0,jumpSpeedFinal:5,jumpSpeed:5,gravity:0.25,cutImgTimeFinal:12,cutImgTime:12,cutImgIndex:0},Miles:["05","10","15","20","25","30","35","40","45","50","55","60","65","70","75","80","85","90","95","100"],AddTime:1,MatchInfo:{zuqiu:"足球赛： 双流队 vs 青羊队 比赛时间： 2016年9月1日  16:00",lanqiu:"篮球赛： 双流队 vs 青羊队 比赛时间： 2016年9月1日  16:00",langan:"跨栏赛： 双流队 vs 青羊队 比赛时间： 2016年9月1日  16:00",feibiao:"飞镖赛： 双流队 vs 青羊队 比赛时间： 2016年9月1日  16:00"}};var Player=function(){GAME.Sprite.apply(this,["player","images/player0.png",DF.P.pathWidth,DF.P.pathWidth*2,4]);var a=winWidth/2;var g=winHeight-DF.M.maxPath/10*7;this.setAnchorPoint(0.5,1);this.setPosition(a,g);this.last={x:this.getPositionX(),y:this.getPositionY()};this.first={x:this.getPositionX(),y:this.getPositionY()};this.images=[];var d=2,c="player";for(var b=0;b<d;b++){var e=new Image();e.width=this.width;e.height=this.height;e.src="images/"+c+b+".png";this.images.push(e)}var f=new Image();f.width=this.width;f.height=this.height;f.src="images/player_jump.png";this.images.push(f);this.moving=false;this.moveDirect=0;this.jumping=false;this.jumpDirect=0;this.hurt=false;this.pathIndex=2};Player.prototype.update=function(){if(this.moving){this.move()}if(this.jumping){this.image=this.images[2];this.jump()}if(!this.jumping&&!this.hurt){this.image=this.cutImg()}};Player.prototype.cutImg=function(){if(DF.P.cutImgTime===0){DF.P.cutImgIndex++;if(DF.P.cutImgIndex>=2){DF.P.cutImgIndex=0}DF.P.cutImgTime=DF.P.cutImgTimeFinal}DF.P.cutImgTime--;return this.images[DF.P.cutImgIndex]};Player.prototype.jump=function(){if(this.jumpDirect==1){this.setPositionY(this.getPositionY()-DF.P.jumpSpeed);DF.P.jumpSpeed-=DF.P.gravity;if(DF.P.jumpSpeed<=0){this.jumpDirect=-1}}else{if(this.jumpDirect==-1){DF.P.jumpSpeed+=DF.P.gravity;this.setPositionY(this.getPositionY()+DF.P.jumpSpeed);if(DF.P.jumpSpeed>=DF.P.jumpSpeedFinal){this.jumpDirect=0}}else{DF.P.cutImgTime=DF.P.cutImgTimeFinal;this.jumping=false;DF.P.jumpSpeed=DF.P.jumpSpeedFinal;this.setPosition(this.last.x,this.last.y)}}};Player.prototype.move=function(){if(Math.abs(this.getPositionX()-this.last.x)>=DF.P.pathWidth){this.moveDirect=0;this.moving=false;this.last.x=this.getPositionX();if(this.last.x<this.first.x&&Math.abs(this.last.x-this.first.x)>0.01){this.pathIndex=1}else{if(this.last.x>this.first.x&&Math.abs(this.last.x-this.first.x)>0.01){this.pathIndex=3}else{this.pathIndex=2}}}if(this.moveDirect>0&&this.pathIndex<3){this.setPositionX(this.getPositionX()+DF.P.moveSpeed)}else{if(this.moveDirect<0&&this.pathIndex>1){this.setPositionX(this.getPositionX()-DF.P.moveSpeed)}else{this.moving=false}}};var Shadow=function(){GAME.Sprite.apply(this,["shadow","images/shadow.png",DF.P.pathWidth+10,DF.P.pathWidth+10,2]);var a=winWidth/2;var b=winHeight-DF.M.maxPath/10*7+40;this.setAnchorPoint(0.5,1);this.setPosition(a,b);this.last={x:this.getPositionX(),y:this.getPositionY()};this.first={x:this.getPositionX(),y:this.getPositionY()};this.moving=false;this.moveDirect=0;this.pathIndex=2};Shadow.prototype.update=function(){if(this.moving){this.move()}};Shadow.prototype.move=function(){if(Math.abs(this.getPositionX()-this.last.x)>=DF.P.pathWidth){this.moveDirect=0;this.moving=false;this.last.x=this.getPositionX();if(this.last.x<this.first.x&&Math.abs(this.last.x-this.first.x)>0.01){this.pathIndex=1}else{if(this.last.x>this.first.x&&Math.abs(this.last.x-this.first.x)>0.01){this.pathIndex=3}else{this.pathIndex=2}}}if(this.moveDirect>0&&this.pathIndex<3){this.setPositionX(this.getPositionX()+DF.P.moveSpeed)}else{if(this.moveDirect<0&&this.pathIndex>1){this.setPositionX(this.getPositionX()-DF.P.moveSpeed)}else{this.moving=false}}};var Monster=function(f,b,a,k,e){var l=2;if(f===DF.M.types[4]||f==="zhongdian"){l=cheerIndex+100}GAME.Sprite.apply(this,[f+e,"images/"+f+"0.png",a,k,l]);var j=b==1?getScaleX(xd1):(b==3?getScaleX(xd2):winWidth/2);if(f===DF.M.types[2]){j=b==1?winWidth/3:winWidth/3*2}var g=winHeight;this.setPosition(j,g);this.images=[];var h=1;if(f===DF.M.types[1]||f===DF.M.types[3]){h=4}for(var d=0;d<h;d++){var c=new Image();c.width=this.width;c.height=this.height;c.src="images/"+f+d+".png";this.images.push(c)}this.image=this.images[0];this.type=f;this.pathIndex=b;this.index=e;this.alive=true};Monster.prototype.update=function(d){var c=this.getCurrentHeight()*0.5,a=this.getCurrentWidth()*0.5;if(this.type==="zhongdian"){if(this.getPositionY()-d.first.y<c/2.5){GameStatus=3}}if(d.jumping){if(this.type===DF.M.types[4]){if(this.getPositionY()-d.getPositionY()<c&&this.getPositionY()-d.getPositionY()>0){if(Math.abs(this.getPositionX()-d.getPositionX())<a){this.crash()}}}}else{if(this.getPositionY()-d.getPositionY()<c&&this.getPositionY()-d.getPositionY()>0){if(Math.abs(this.getPositionX()-d.getPositionX())<a){this.crash()}}}if(guideStatus==0&&!isGuide){var b=this.getCurrentHeight()/2+winHeight/10;
if(this.getPositionY()-d.getPositionY()<b&&this.getPositionY()-d.getPositionY()>0){GameStatus=1;pauseTime=new Date().getTime();showGuide(monIndex);guideStatus=1}}this.move()};Monster.prototype.move=function(){if(!this.alive){return false;delete monsters[this.index];this.removeFromGlobal()}var a,c;switch(this.pathIndex){case 1:a=this.getPositionX()+DF.M.moveSpeed*this.k;break;case 2:a=this.getPositionX();break;case 3:a=this.getPositionX()-DF.M.moveSpeed*this.k;break}c=this.getPositionY()-DF.M.moveSpeed;if(winHeight-this.getPositionY()>DF.M.maxPath){this.alive=false;delete monsters[this.index];this.removeFromGlobal()}else{this.image=this.cutImg();var b=DF.M.scale+(this.getPositionY()-getScaleY(yl))*(1-DF.M.scale)/getScaleY(HEIGHT-yl);this.setScale(b,b);this.setPosition(a,c)}};Monster.prototype.cutImg=function(){if(this.type===DF.M.types[1]||this.type===DF.M.types[3]){if(DF.M.cutImgTime===0){DF.M.cutImgIndex++;if(DF.M.cutImgIndex>=3){DF.M.cutImgIndex=0}DF.M.cutImgTime=DF.M.cutImgTimeFinal}DF.M.cutImgTime--;return this.images[DF.M.cutImgIndex]}else{return this.images[0]}};Monster.prototype.crash=function(){if(this.type!="zhongdian"){this.alive=false;delete monsters[this.index];this.removeFromGlobal();if(this.type===DF.M.types[0]){popupTip("+1","fc_or");gmfCounts++;DF.AddTime=1;if(isPlayMusic){musicGmf.play()}}else{popupTip("+"+DF.AddTime.toFixed(1)+"s");DF.AddTime+=0.1;startTime-=1000*DF.AddTime;if(isPlayMusic){musicCrash.play()}DF.M.moveSpeed=winHeight*0.003;DF.P.cutImgTimeFinal=24;GameStatus=2;nextMileTime+=1000;nextCheerTime+=1000;nextCheerTime2+=1000;setTimeout(function(){DF.M.moveSpeed=winHeight*0.009;GameStatus=0;DF.P.cutImgTimeFinal=12},1000*DF.AddTime)}}};var AsideMile=function(d,c,a,b){GAME.Sprite.apply(this,[d+b,"images/number/"+d+".png",c,a,0]);this.k=Math.abs((getScaleX(xA)-getScaleX(3))/(winHeight-getScaleY(yl)));this.index=b};AsideMile.prototype.update=function(a){this.move()};AsideMile.prototype.move=function(){var a,c;a=this.getPositionX()+DF.M.moveSpeed*this.k;c=this.getPositionY()-DF.M.moveSpeed;if(winHeight-this.getPositionY()>DF.M.maxPathMile){delete asideMiles[this.index];this.removeFromGlobal()}else{var b=DF.M.scaleMile+(this.getPositionY()-getScaleY(yl))*(1-DF.M.scaleMile)/getScaleY(HEIGHT-yl);this.setScale(b,b);this.setPosition(a,c)}};var AsideCheer=function(e,b,d,a,c){GAME.Sprite.apply(this,["jiayou_"+e+"_"+c,"images/jiayou_"+e+".png",d,a,c]);this.k=Math.abs((getScaleX(xA)-getScaleX(3))/(winHeight-getScaleY(yl)));this.pathIndex=b;this.index=c};AsideCheer.prototype.update=function(a){this.move()};AsideCheer.prototype.move=function(){var a,c;switch(this.pathIndex){case 1:a=this.getPositionX()+DF.M.moveSpeed/3*2*this.k;break;case 2:a=this.getPositionX()-DF.M.moveSpeed/3*2*this.k;break}c=this.getPositionY()-DF.M.moveSpeed/3*2;if(winHeight-this.getPositionY()>DF.M.maxPathMile-getScaleY(20)){if(this.pathIndex==1){delete asideCheers[this.index]}else{delete asideCheers2[this.index]}this.removeFromGlobal()}else{var b=DF.M.scaleMile+(this.getPositionY()-getScaleY(yl))*(1-DF.M.scaleMile)/getScaleY(HEIGHT-yl);this.setScale(b,b);this.setPosition(a,c)}};