import React, { useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";


interface IBoardComponent {
    board: Board;
    setBoard: (board:Board)=> void;
    currentPlayer: Player| null;
    swapPlayer: ()=>void;
}


function BoardComponent  ({board, setBoard, currentPlayer, swapPlayer}:IBoardComponent) {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(()=> {highLightCell()},[selectedCell])

    function click (cell: Cell){
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color)
            setSelectedCell(cell)
        }
    }

    function highLightCell() {
        board.highLightCell(selectedCell);
        updateBoard()
    }

    function updateBoard (){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard);
    }


    return (
       <div className={'windowContainer'}>
           <h2 className={'playerInfo'}>
               Turn {currentPlayer?.color} player
           </h2>
           <div className='board'>
               {board.cells.map((row, index) =>
                   <React.Fragment key={index}>
                       {
                           row.map(cell =>
                               <CellComponent click={click}
                                              cell={cell}
                                              key = {cell.id}
                                              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                               />
                           )
                       }
                   </React.Fragment>
               )}
           </div>
       </div>
    );
}

export default BoardComponent;