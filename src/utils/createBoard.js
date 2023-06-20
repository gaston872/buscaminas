export default (row, col, bombs) => {
    let board = [];
    let mineLocation = [];
    //Crea un tablero en blanco

    //x = columna
    for (let x = 0; x < row; x++) {
        let subCol = [];
        for (let y = 0; y < col; y++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }
        board.push(subCol);
    }

    //Colocacion de bombas aleatoriamente
    let bombsCount = 0;
    while (bombsCount < bombs) {
        let x = randomNum(0, row - 1);
        let y = randomNum(0, col - 1);

        if (board[x][y].value === 0) {
            board[x][y].value = "X";
            mineLocation.push([x, y]);
            bombsCount++
        }
    }

    //Agrega numeros
    for (let roww = 0; roww < row; roww++) {
        for (let coll = 0; coll < col; coll++) {
            if (board[roww][coll].value === "X"){
                continue;
            }

            //Arriba
            if (roww > 0 && board[roww - 1][coll].value === "X") {
                board[roww][coll].value++
            }

            //Arriba a la derecha
            if (
                roww > 0 &&
                coll < col - 1 &&
                board[roww - 1][coll + 1].value === "X"
            ) {
                board[roww][coll].value++;
            }

            //Derecha
            if (coll < col - 1 && board[roww][coll + 1].value === "X"){
                board[roww][coll].value++;
            }

            //Abajo a la derecha
            if (
                roww < row - 1 &&
                coll < col -  1 &&
                board[roww + 1][coll + 1].value === "X"
            ) {
                board[roww][coll].value++;
            }

            // Abajo
      if (roww < row - 1 && board[roww + 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      // Abajo izquierda
      if (
        roww < row - 1 &&
        coll > 0 &&
        board[roww + 1][coll - 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // Izquierda
      if (coll > 0 && board[roww][coll - 1].value === "X") {
        board[roww][coll].value++;
      }

      // Arriba izquierda
      if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
        board[roww][coll].value++;
      }
    }
  }
  return { board, mineLocation };
};

function randomNum(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}