var character;

function startGame(){
  character = new component(100,100,20,20,"rgb(124,120,102)","black",2,false);
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
    this.Gcontext = this.canvas.getcontext("2d"),
    this.animation = setTimeout(requestAnimationFrame(updateGame),1000/30);
    updateGame();
  },
  clear : function(){
    this.Gcontext.clearRect(0,0,canvas.width,canvas.height);
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
    this.rectConstructor = function(){
      context.fillRect(this.x,this.y,this.width,this.height);
      if (strokeColor != false){
        context.strokeRect(this.x,this.y,this.width,this.height);
      }
    }
    this.arcConstructor = function(){
      context.beginPath();
      context.arc(x,y,width,height,360);
      context.fill();
      if (strokeColor != false){
        context.arc(x,y,width,height,360);
        context.stroke();
      }
      context.closePath();
    }
    this.update = function(){
      if (radiusBool){
        arcConstructor();
      }
      else {
        rectConstructor();
      }
    }
  }
}

gameCanvas.canvas.addEventListener("click", startGame());
