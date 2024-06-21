var character;
var gravityStrength = 0.09;
var gravitySpeed = 0;

function startGame(){
  character = new component(100,100,20,20,"rgb(124 120 102 / 100%)","black",2,false);
  gameCanvas.start();
  character.update();
  updateGame();
}

function updateGame(){
  gameCanvas.clear();
  if (gameCanvas.key && (gameCanvas.key == "ArrowLeft" || gameCanvas.key == "ArrowRight" || gameCanvas.key == "ArrowUp")){
    if (gameCanvas.key && gameCanvas.key == "ArrowLeft"){
      character.xMove -= 1;
    }
    if (gameCanvas.key && gameCanvas.key == "ArrowRight"){
      character.xMove += 1;
    }
    if (gameCanvas.key && gameCanvas.key == "ArrowUp"){
      character.jump();
    }
  }
  else{
    character.slowDown();
  }
  character.move();
  character.update();
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
    });
    window.addEventListener("keyup", function(event){
      gameCanvas.key = false;
    })
  },
  clear : function(){
    this.Gcontext.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
};

class component {
  constructor(x,y,width,height,fillColor,strokeColor,strokeWidth,radiusBool){
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
    this.xMove = 0;
    this.touchingSurface = false;
    this.touchingGroundOrSurface = function(){
      
    }
    this.move = function(){
      this.x += this.xMove;
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
      if (gravitySpeed >= 0 && this.touchingSurface){
        gravitySpeed = -20;
      }
    }
    this.gravity = function(){
      this.y += gravityStrength + gravitySpeed - 1
      this.y = Math.round(this.y);
      gravitySpeed++;
      gravitySpeed = Math.round(gravitySpeed * 0.96);
      if(this.y + this.height >= gameCanvas.canvas.height){
        this.y = gameCanvas.canvas.height - this.height;
        this.touchingSurface = true;
        gravitySpeed = 0; 
      }
      else {
        this.touchingSurface = false;
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
      this.gravity(gravityStrength);
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
