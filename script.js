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
  Gcontext : this.canvas.getcontext("2d"),
  start : function(){
    this.animation = setTimeout(requestAnimationFrame(updateGame),1000/30);
    updateGame();
  },
  clear : function(){
    Gcontext.clearRect(0,0,canvas.width,canvas.height);
  }
};

class component {
  constructor(x,y,width,height,fillColor,strokeColor,strokeWidth,radiusBool){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    gameCanvas.Gcontext.fillStyle = this.fillColor;
    this.strokeColor = strokeColor;
    gameCanvas.Gcontext.strokeStyle = this.strokeColor;
    this.strokeWidth = strokeWidth;
    gameCanvas.gContext.lineWidth = this.strokeWidth;
    this.radiusBool = radiusBool;
    this.rectConstructor = function(){
      gameCanvas.Gcontext.fillRect(this.x,this.y,this.width,this.height);
      if (fillColor != false){
        gameCanvas.Gcontext.strokeRect(this.x,this.y,this.width,this.height);
      }
    }
    this.arcConstructor = function(){
      gameCanvas.Gcontext.beginPath();
      gameCanvas.Gcontext.arc(x,y,width,height,360);
      gameCanvas.Gcontext.closePath();
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
