var character;
var gravityStrength = 0.09;
var gravitySpeed = 0;

function startGame(){
  character = new component(100,100,20,20,"rgb(124 120 102 / 100%)","black",2,false,false);
  object1 = new component(150,350,100,150,"rgb(10 125 249 / 100%)","black",2,false,false);
  gameCanvas.start();
  character.update();
  object1.update();
  updateGame();
}

function updateGame(){
  gameCanvas.clear();
  if ((keys.left || keys.right || keys.up) && !character.stopMove){
    if (keys.left){
      character.xMove -= 1;
    }
    if (keys.right){
      character.xMove += 1;
    }
    if (keys.up){
      character.jump();
    }
  }
  if (!keys.left && !keys.right){
    character.slowDown();
  }
  character.sideCollisionCheck(object1);
  character.touchingGroundFunc();
  character.touchingSurfaceDownFunc(object1);
  character.gravity(gravityStrength);
  character.move();
  character.update();
  object1.update();
  paint();
}

var gameCanvas = {
  canvas : document.getElementById("gameLoc"),
  start : function(){
    this.Gcontext = this.canvas.getContext("2d"),
    this.animation = paint();
    updateGame();
    window.addEventListener("keydown", function(event){
      gameCanvas.key = event.key;
      if (gameCanvas.key === "ArrowLeft"){
        keys.left = true;
      }
      if (gameCanvas.key === "ArrowRight"){
        keys.right = true;
      }
      if (gameCanvas.key === "ArrowUp"){
        keys.up = true;
      }
    });
    window.addEventListener("keyup", function(event){
      gameCanvas.key = event.key;
      if (gameCanvas.key === "ArrowLeft"){
        keys.left = false;
      }
      if (gameCanvas.key === "ArrowRight"){
        keys.right = false;
      }
      if (gameCanvas.key === "ArrowUp"){
        keys.up = false;
      }})
  },
  clear : function(){
    this.Gcontext.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
};

var keys = {
  left : false,
  right : false,
  up : false
};

class component {
  constructor(x,y,width,height,fillColor,strokeColor,strokeWidth,radiusBool,isCoin){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    var context = gameCanvas.canvas.getContext("2d");
    context.fillStyle = this.fillColor;
    this.strokeColor = strokeColor;
    context.strokeStyle = this.strokeColor;
    this.strokeWidth = strokeWidth;
    context.lineWidth = this.strokeWidth;
    this.radiusBool = radiusBool;
    this.isCoin = isCoin;
    this.xMove = 0;
    this.stopMove = false;
    this.touchingLeft = false;
    this.touchingRight = false;
    this.touchingSurfaceDown = false;
    this.touchingGround = false;
    this.touchingGroundFunc = function(){
      if(this.y + this.height >= gameCanvas.canvas.height){
        this.y = gameCanvas.canvas.height - this.height;
        this.touchingGround = true;
      }
      else {
        this.touchingGround = false;
      }
    }
    this.touchingSurfaceDownFunc = function(obj){
      if(this.y + this.height + 2 >= obj.y && (this.x + this.width + 1 >= obj.x && this.x - 1 <= obj.x + obj.width)){
        this.touchingSurfaceDown = true;
        if(this.y + this.height + 2 > obj.y && (this.touchingLeft && keys.left || this.touchingRight && keys.right)){
          this.inhibit();
        }
        else if(this.y + this.height + 2 > obj.y){
          this.y = obj.y - this.height - 2;
        }
      }
      else{
        this.touchingSurfaceDown = false;
      }
    }
    this.sideCollisionCheck = function(obj){
      if((this.x + this.width + 2 >= obj.x && (this.y - this.height >= obj.y && this.y <= obj.y + obj.height)) && this.x <= obj.x + obj.width + 2){
        this.xMove = 0;
        this.x = obj.x - this.width - 2;
        this.touchingLeft = true;
        this.stopMove = true;
      }
      else{
        this.touchingLeft = false;
        this.stopMove = false;
      }
      if(this.x <= obj.x + obj.width + 2 && (this.y - this.height >= obj.y && this.y <= obj.y + obj.height) && this.x + this.width + 2 >= obj.x){
        this.xMove = 0;
        this.x = obj.x + obj.width + 2;
        this.touchingRight = true;
        this.stopMove = true;
      }
      else{
        this.touchingRight = false;
        this.stopMove = false;
      }
      if(this.touchingLeft || this.touchingRight){
        if(this.touchingLeft){
          this.x = obj.x - this.width - 2;
        }
        else if(this.touchingRight){
          this.x = obj.x + obj.width + 2;
        }
        this.xMove = 0;
      }
      if(this.touchingLeft && keys.right){
        this.x = obj.x - this.width - 2;
        this.xMove = 0;
      }
      if(this.touchingRight && keys.left){
        this.x = obj.x + obj.width + 2;
        this.xMove = 0;
      }
    }
    this.inhibit = function(){
      if((this.touchingLeft && keys.left) || (this.touchingRight && keys.right)){
        this.xMove = 0
      }
    }
    this.move = function(){
      if (Math.abs(this.xMove) >= 10){
        this.slowDown();
      }
      this.inhibit();
      if(!this.stopMove){
        this.x += this.xMove;
      }
      else{
        this.xMove = 0;
      }
    }
    this.slowDown = function(){
      if(this.xMove > 0){
        this.xMove -= 1;
      }
      else if(this.xMove < 0){
        this.xMove += 1;
      }
    }
    this.jump = function(){
      if (gravitySpeed >= 0 && (this.touchingSurfaceDown || this.touchingGround)){
        gravitySpeed = -20;
      }
    }
    this.gravity = function(){
      gravitySpeed++;
      this.y += gravityStrength + gravitySpeed - 1
      this.y = Math.round(this.y);
      if(this.touchingGround || this.touchingSurfaceDown){
        gravitySpeed = 0; 
      }
    }
    this.update = function(){
      if (radiusBool){
        if (strokeColor){
          this.arcConstructor(true);
        }
        else{
          this.arcConstructor(false);
        }
      }
      else {
        if (strokeColor){
          this.rectConstructor(true);
        }
        else{
          this.rectConstructor(false);
        }
      }
    }
  }
  rectConstructor = function(stroke){
    var context = gameCanvas.canvas.getContext("2d");
    context.fillStyle = this.fillColor;
    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.fillRect(this.x,this.y,this.width,this.height);
    if (stroke != false){
      context.strokeRect(this.x,this.y,this.width,this.height);
    }
  }
  arcConstructor = function(){
    var context = gameCanvas.canvas.getContext("2d");
    context.fillStyle = this.fillColor;
    context.strokeStyle = this.strokeColor;
    context.lineWidth = this.strokeWidth;
    context.beginPath();
    context.arc(x,y,width,height,360);
    context.fill();
    if (stroke != false){
      context.arc(x,y,width,height,360);
      context.stroke();
    }
    context.closePath();
  }
}

function paint(){
  setTimeout(() => {
    requestAnimationFrame(updateGame);
  }, 1000 / 30);
}

gameCanvas.canvas.addEventListener("click", startGame());
