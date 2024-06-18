function startGame(){
  gameCanvas.start();
}

function updateGame(){
  
}

var gameCanvas = {
  canvas : document.getElementById("gameLoc"),
  Gcontext : canvas.getcontext("2d"),
  start : function(){
    this.animation = setTimeout(requestAnimationFrame(updateGame),1000/30);
    updateGame();
  },
  clear : function(){
    Gcontext.clearRect(0,0,canvas.width,canvas.height);
  }
};

class component {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

gameCanvas.canvas.addEventListener("click", startGame());
