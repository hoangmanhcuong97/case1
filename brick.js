class Brick{
    constructor(game,col,row) {
        this.game = game;
        this.col = col;
        this.row = row;
        this.data = [];
        this.blocks =[];
        this.randomBrick();

    }
    randomBrick(){
        this.data =[];
        let index = Math.round(Math.random()*8);
        this.data = baseBrick[index];
    }
    buildBrick(){
        this.blocks = [];
        for(let r = 0; r<this.data.length; r++){
            for(let c =0;c < this.data[0].length; c++){
                if(this.data[r][c] === a){
                    let bl = new Block(this.game,this.col+c,this.row+r, colorBl);
                    this.blocks.push(bl);
                }
            }
        }
    }
    //ve doi tuong len man hinh phu
    drawBrickToNextScreen(){
        this.game.board.resetArrNextMain();
        for (let r = 0; r < this.data.length; r++){
            for( let c = 0; c < this.data[0].length; c++){
              if(this.data[r][c] === a){
                  this.game.board.arrNextMain[r + 1 ][c + 1] = a;
              }
            }
        }
    }
    //ve doi tuong len man hinh chinh
    drawBrickMainScreen() {
        this.buildBrick();
        this.blocks.forEach((bl) => bl.drawMainScreen1());
    }

    rotateBrick(){
        let canRotate = true;
        let newBrick = [];
        for (let c = 0; c < this.data[0].length; c++){
            let hang = [];
            for(let r = this.data.length -1; r>= 0;r--){
                hang.push(this.data[r][c]);
            }
            newBrick.push(hang);
        }
        let oddcol = this.col;
        if(this.col + newBrick[0].length > COLS - 1){
            this.col = COLS - newBrick[0].length;
        }
        if(this.row + newBrick.length < ROWS){
            for(let r = 0; r < newBrick.length;r++){
                for(let c = 0; c< newBrick[0].length; c++){
                    if(newBrick[r][c] === a){
                        if(!this.game.board.emptyCell(this.col +c, this.row + r)){
                            canRotate = false;
                            break;
                        }
                    }
                }
            }
        }else{
            canRotate = false;
        }
        if(canRotate){
            this.data = newBrick;
        }else {
            this.col = oddcol;
        }
        this.buildBrick();
    }

    canMoveRight(){
        let canmoveright = true;
        for(let i = 0; i < this.blocks.length;i++){
            if(!this.blocks[i].canMoveRight()){
                canmoveright = false;
                break;
            }
        }
        return canmoveright;
    }

    moveRight(){
        if(this.canMoveRight()){
            this.col++;
            this.buildBrick();
        }
    }
    canMoveLeft(){
        let canmoveleft = true;
        for(let i = 0; i < this.blocks.length;i++){
            if(!this.blocks[i].canMoveLeft()){
                canmoveleft = false;
                break;
            }
        }
        return canmoveleft;
    }

    moveLeft(){
        if(this.canMoveLeft()){
            this.col--;
            this.buildBrick();
        }
    }

    canFall(){
        let canfall = true;
        for(let i = 0; i < this.blocks.length;i++){
            if(!this.blocks[i].canMoveDown()){
                canfall = false;
                break;
            }
        }
        return canfall;
    }

    fall(){
        if(this.canFall() === true){
            this.row++;
            this.buildBrick();
        }else {
            this.appendToBoard();
            this.game.board.updateBoard();

            this.game.startNextBrick();
            this.game.creatNextBrick();
        }
    }

    down(){
        while (this.canFall()){
            this.fall();
        }
    }
    appendToBoard(){
        for(let i =0; i < this.blocks.length; i++){
            let c = this.blocks[i].col;
            let r = this.blocks[i].row;
            this.game.board.arrMain[r][c] = a;
        }
    }
}