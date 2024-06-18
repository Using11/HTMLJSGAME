var character;

function startGame(){
  character = new component(100,100,20,20,"rgb(124 120 102 / 100%)","black",2,false);
  gameCanvas.start();
  character.update();
}

function updateGame(){
  gameCanvas.clear();
  character.update();
}

var gameCanvas = {
  canvas : document.getElementById("gameLoc"),
  start : function(){
    this.Gcontext = this.canvas.getContext("2d"),
    this.animation = setTimeout(requestAnimationFrame(updateGame),1000/30);
    updateGame();
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

gameCanvas.canvas.addEventListener("click", startGame());
