/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { WritableDraft } from "immer";
import { formulasForMoveBelow } from "../../utils/formulas";
import { candies } from "../../utils/candyData";



export const moveBelowReducer=(
    state: WritableDraft<{
        board: string[],
        boardSize: number,
        squareBeingReplaced: Element | undefined
        squareBeingDragged: Element | undefined
    }>
)=>{
    const newBoard: string[] = [...state.board];
    const {boardSize} = state;
    let boardChanges: boolean = false;
   
    const formulaForMove: number = formulasForMoveBelow(boardSize);
    for(let i=0; i<=formulaForMove;i++){
        const firstRow = Array(boardSize).fill(0).map((_value:number, index:number)=>{return index;})
        const isFirstRow = firstRow.includes(i);
        if(isFirstRow && newBoard[i]===""){
            let randomNumber = Math.floor(Math.random()*candies.length);
            newBoard[i] = candies[randomNumber];
    
            boardChanges = true;
            
        }
        
        if(newBoard[i+boardSize] === ""){
          
            newBoard[i+boardSize] = newBoard[i];
            newBoard[i]="";
            boardChanges = true
        }

        if(boardChanges) state.board = newBoard;


    }



}