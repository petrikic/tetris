let canvas, ctx;

function createMatrix(x, y) {
    let lineArr = [];
    for(let i = 0; i < y; i++) {
        lineArr.push(new Array(x));
    }
    return lineArr;
}

function drawField(field, x, y, size){
    for(let i = 0; i < x; i++){
        for(let j = 0; j < y; j++){
            if(field[i][j] === undefined) {
                ctx.fillRect((i*(size+1)), (j*(size+1)), size, size);
            }
        }
    }
}

function main() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext('2d');
    let field = createMatrix(10, 20);
    drawField(field, 10, 20, 30);
}

main();