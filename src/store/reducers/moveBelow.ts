/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { WritableDraft } from "immer";
import { formulasForMoveBelow } from "../../utils/formulas";
import { candies } from "../../utils/candyData";
import candySound from "../../assets/striped-candy-created1-101soundboards.mp3"



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
    const candyAudio = new Audio(candySound);
    candyAudio.preload = "auto"
   
    const formulaForMove: number = formulasForMoveBelow(boardSize);
    for(let i=0; i<=formulaForMove;i++){
        const firstRow = Array(boardSize).fill(0).map((_value:number, index:number)=>{return index;})
        const isFirstRow = firstRow.includes(i);
        if(isFirstRow && newBoard[i]===""){
            candyAudio.play();
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