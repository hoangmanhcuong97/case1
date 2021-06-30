class Board{
    constructor(game) {
      this.game = game;
      this.arrMain = [
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_],
                  [_,_,_,_,_,_,_,_,_,_]
                                        ];
      this.arrNextMain = [
                          [_,_,_,_,_,_],
                          [_,_,_,_,_,_],
                          [_,_,_,_,_,_],
                          [_,_,_,_,_,_],
                          [_,_,_,_,_,_]
                                        ];
      this.rowDestroy = 0;
      this.countSpeed = 0;
    }

    resetArrNextMain(){
        for(let r = 0; r < this.arrNextMain.length; r++){
            for(let c = 0; c < this.arrNextMain[0].length; c++){
                this.arrNextMain[r][c] = _;
            }
        }
    }

    emptyCell(c,r){
        return this.arrMain[r][c] ===_; //tra ve True neu gia tri tai cot c va dong r = null;
    }
    drawBackground(){
      this.drawNextScreen();
      this.drawMainScreen()
    }
    drawMainScreen(){
      for (let r=0;r < this.arrMain.length; r++){
         for (let c = 0;c < this.arrMain[0].length; c++){
           let cl = colorBr;
           if(this.arrMain[r][c] === a){
             cl = colorBl;
           }
           let bl = new Block(this.game,c, r, cl);
               bl.drawMainScreen1();
         }
      }
    }

    drawNextScreen(){
      for (let r=0;r < this.arrNextMain.length; r++){
        for (let c = 0;c < this.arrNextMain[0].length; c++){
          let cl = colorBr;
          if(this.arrNextMain[r][c] === a){
            cl = colorBl;
          }
          let bl = new Block(this.game,c, r, cl);
          bl.drawNextScreen1();
        }
      }
    }

    checkFullRow(r){
        let isFull = true;
        for(let c = 0; c < this.arrMain[r].length; c++){
            if(this.arrMain[r][c] === _){
                isFull = false;
                break;
            }
        }
        return isFull;
    }
    checkEndGame(){
        let endGame = false;
        for (let c = 0; c < this.arrMain[0].length; c++){
            if(this.arrMain[0][c] === a){
                endGame = true;
                break;
            }
        }
        return endGame;
    }
    updateBoard(){
        for(let r = 0; r < ROWS;r++) {
            if (this.checkFullRow(r)) {
                this.arrMain.splice(r,1);
                this.arrMain.unshift([_,_,_,_,_,_,_,_,_,_]);
                this.rowDestroy += 1000;
                this.countSpeed += 1;
            }
        }
        if(this.checkEndGame()){
            alert("End Game");
            clearInterval(this.game.status);
        }
        if(this.countSpeed == 1){
            this.game.speed -= 200;
            this.countSpeed = 0;
            clearInterval(this.game.status);
            this.game.status = this.game.StartGame();
        }
        document.getElementById("txt_level").value = (1000 - this.game.speed)/200;
        document.getElementById("txt_score").value = this.rowDestroy;
    }
}
