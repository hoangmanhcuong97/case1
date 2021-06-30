class Game{
  constructor() {
    this.context = null;
    this.canvas = null;

    this.nextcontext = null;
    this.nextcanvas = null;

    this.btnStart = null;
    this.status = null;
    this.speed = 1000;
    this.init();
    this.eventListen();
    this.loop();
    // this.StartGame();

  }
  eventListen(){
    document.addEventListener("keydown",(event)=>{
      if(this.status != null){
        switch (event.key){
          case "ArrowUp":
            console.log("up");
            this.brick.rotateBrick();
            break;
          case "ArrowDown":
            console.log("Down");
            this.brick.down();
            break;
          case "ArrowLeft":
            console.log("Left");
            this.brick.moveLeft();
            break;
          case "ArrowRight":
            console.log("Right");
            this.brick.moveRight();
            break;
        };
      }
    });
    this.btnStart.addEventListener("click",(event)=>{
        let status = event.srcElement.attributes.status.value;
        switch (status){
          case "start":
            this.status = this.StartGame();
            this.btnStart.attributes.status.value = "stop";
            this.btnStart.value = "STOP";
            break;
          case "stop":
            clearInterval(this.status);
            this.status = null;
            this.btnStart.attributes.status.value = "start";
            this.btnStart.value = "START";
            break;
        }
    });
  }

  init(){
    this.btnStart = document.getElementById("btn_start");
    //khoi tao the canvas cho man 2
    this.canvas = document.createElement("canvas");
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.context = this.canvas.getContext("2d");
    document.getElementById("mainScreen").appendChild(this.canvas);

    //khoi tao th canvas cho man 1
    this.nextcanvas = document.createElement("canvas");
    this.nextcanvas.width = NEXTWIDTH;
    this.nextcanvas.height = NEXTHEIGHT;
    this.nextcontext = this.nextcanvas.getContext("2d");
    document.getElementById("nextScreen").appendChild(this.nextcanvas);

    this.board = new Board(this);
    this.board.drawBackground();


    this.brick = new Brick(this,3,0);
    this.brick.drawBrickMainScreen();

     this.nextBrick = new Brick(this,3,0);
     this.nextBrick.drawBrickToNextScreen();
  }

  creatNextBrick(){
     this.nextBrick = new Brick(this,3,0);
     this.nextBrick.drawBrickToNextScreen();
  }
  startNextBrick(){
    this.brick = this.nextBrick;
  }
  StartGame(){
    return setInterval(()=>{

      this.brick.fall();
        },this.speed);
  }
  clearScreen(){
      this.context.clearRect(0,0,WIDTH,HEIGHT);
      this.board.drawBackground();
  }
  draw(){
     this.clearScreen();
    this.brick.drawBrickMainScreen();
  }
  loop(){
    this.draw();
    setTimeout(()=>this.loop(),30);
  }
}
let g = new Game();


