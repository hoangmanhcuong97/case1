class Block{
  constructor(game, col, row, color ) {
     this.col = col;
     this.game = game;
     this.row = row;
     this.color = color;
    }
  drawMainScreen1(){
    let x = this.col*SIZE;
    let y = this.row*SIZE;
    this.game.context.beginPath();
    this.game.context.strokeStyle = this.color;
    this.game.context.rect(x, y, SIZE, SIZE);
    this.game.context.stroke();

    this.game.context.fillStyle = this.color;
    this.game.context.fillRect(x+2,y+2,SIZE-4,SIZE-4);
  }
  drawNextScreen1(){
    let x = this.col*NEXTSIZE;
    let y = this.row*NEXTSIZE;
    this.game.nextcontext.beginPath();
    this.game.nextcontext.strokeStyle = this.color;
    this.game.nextcontext.rect(x, y, NEXTSIZE, NEXTSIZE);
    this.game.nextcontext.stroke();

    this.game.nextcontext.fillStyle = this.color;
    this.game.nextcontext.fillRect(x+2,y+2,NEXTSIZE-4,NEXTSIZE-4)
  }
  // khong the di chuyen qua vien trai
  hitLeft(){
    return this.col === COLS - 1;
  }
  canMoveLeft(){
    if (!this.hitLeft() && this.game.board.emptyCell(this.col - 1,this.row)){
      return true;
    }else return false;
  }

  // Khong the di chuyen qua vien phai
  hitRight(){
    return this.col === COLS + 1;
  }

  canMoveRight(){
    if (!this.hitRight() && this.game.board.emptyCell(this.col + 1,this.row)){
      return true;
    }else return false;
  }

  hitBottom(){
    return this.row === ROWS - 1; //tra ve gia tri "true" neu ham row = tong so hang - 1
  }

  canMoveDown(){
    if(!this.hitBottom() && this.game.board.emptyCell(this.col,this.row + 1)){
      return true;
    }else {
      return false;
    }
  }
}

