import React from 'react';
import {Colors} from "../models/Colors";
import {Cell} from "../models/Cell";

interface ICellComponent {
    cell: Cell;
    selected: boolean;
    click : (cell:Cell)=> void;
}


function CellComponent({cell, selected, click}:ICellComponent) {
    return (
        <div className={['cell',
            cell.color,
            selected? 'selected': '',
            cell.available && cell.figure ? 'killMove' : ''].join(' ')}
        onClick={()=> click(cell)}
        //style ={{background: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className='available'/>}
            {cell.figure?.logo && <img src={cell.figure.logo}/>}
        </div>
    );
}

export default CellComponent;