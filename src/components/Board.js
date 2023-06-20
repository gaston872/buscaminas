import React, { useState, useEffect } from 'react'
import createBoard from '../utils/createBoard';
import Cell from './Cell';
import { revealed } from '../utils/reveal';
import Timer from './Timer';
import Modal from './Modal';

export default function Tablero() {

    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([])
    const [gameOver, setGameOver] = useState(false)

    //Montando componente
    useEffect(() => {
        //Creando tablero
       
        //Llamando la funcion
        freshBoard();
    }, [])

    const freshBoard = () => {
        const newBoard = createBoard(10, 10, 20);
        setNonMineCount(10*10-20);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board); 
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    }

    //Click derecho / celda de bandera
    const updateFlag = (e, x, y) => {
        //no desplegar opciones con click derecho
        e.preventDefault();
        //copia profunda de un state
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    };

    //Revelar celda
    const revealCell = (x, y) => {
        if(grid[x][y].revealed || gameOver){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === 'X'){
            for(let i = 0; i < mineLocations.length; i++){
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
        } else{
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount)
            if(newRevealedBoard.newNonMinesCount === 0){
                setGameOver(true)
            }
        }
    }


  return (
    <div>
        <p>
            Buscaminas
        </p>
        <Timer />
        <div 
            style={{
                display:"flex", 
                flexDirection:"column", 
                alignItems: "center",
                position: "relative"
                }}
        >
            {gameOver && <Modal restartGame={restartGame}/>}
            {grid.map((singleRow, index1) =>{
    return (
        <div style={{display: "flex"}} key={(index1)}>
            {singleRow.map((singleBlock, index2) => {
                return (
                <Cell 
                    revealCell={revealCell} 
                    details={singleBlock} 
                    updateFlag={updateFlag}
                    key={index2}
                />
                );
            })}
        </div>
    )
  })}
        </div>
        
    </div>
  )
}

