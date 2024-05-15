/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppSelector } from "../store/hooks"
import Tile from "./Tile";


function Board() {
    const board = useAppSelector(({candyCrush:{board}})=>board);
    const boardSize = useAppSelector(({candyCrush:{boardSize}})=>boardSize);

  return (
    <div className="flex flex-wrap justify-center rounded-lg bg-white bg-opacity-85 py-2" style={{width:`${5.6 * boardSize}rem`,...(window.innerWidth < 1000 && { width: `${5 * boardSize}rem`, marginTop:"5rem" }) ,...(window.innerWidth < 400 && { width: `${2.8 * boardSize}rem`, marginTop:"5rem" })}}>
      {
        board.map((candy:string,index:number)=>(
          <Tile candy={candy} key={index} candyId={index}/>
        ))
      }
    </div>
  )
}

export default Board