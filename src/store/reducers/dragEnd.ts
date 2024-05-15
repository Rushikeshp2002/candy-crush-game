/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import crushSound from "../../assets/candy-land3-101soundboards.mp3";
import { WritableDraft } from "immer";
import {
  formulasForColumn,
  formulasForThree,
  generateInvalidMoves,
} from "../../utils/formulas";

import {
  isColumnOfFour,
  isColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
} from "../../utils/moveCheckLogic";

export const dragEndReducer = (
  state: WritableDraft<{
    board: string[];
    boardSize: number;
    squareBeingDragged: Element | undefined;
    squareBeingReplaced: Element | undefined;
  }>
) => {
  const newBoard = [...state.board];
  const crushAudio = new Audio(crushSound);
  crushAudio.preload = "auto";

  let { boardSize, squareBeingDragged, squareBeingReplaced } = state;
  const squareBeingDraggedId: number = parseInt(
    squareBeingDragged?.getAttribute("candy-id") as string
  );
  const squareBeingReplacedId: number = parseInt(
    squareBeingReplaced?.getAttribute("candy-id") as string
  );

  newBoard[squareBeingReplacedId] = squareBeingDragged?.getAttribute(
    "src"
  ) as string;

  newBoard[squareBeingDraggedId] = squareBeingReplaced?.getAttribute(
    "src"
  ) as string;

  const validMoves: number[] = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - boardSize,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + boardSize,
  ];

  const validMove: boolean = validMoves.includes(squareBeingReplacedId);

  const isAColumnOfFour: boolean | undefined = isColumnOfFour(
    newBoard,
    boardSize,
    formulasForColumn(boardSize)
  );
  const isARowOfFour: boolean | undefined = checkForRowOfFour(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize, true)
  );
  const isAColumnOfThree: boolean | undefined = isColumnOfThree(
    newBoard,
    boardSize,
    formulasForThree(boardSize)
  );
  const isARowOfThree: boolean | undefined = checkForRowOfThree(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize)
  );

  if (
    squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
  ) {
    crushAudio.play();
    squareBeingDragged = undefined;
    squareBeingReplaced = undefined;
  } else {
    newBoard[squareBeingReplacedId] = squareBeingReplaced?.getAttribute(
      "src"
    ) as string;
    newBoard[squareBeingDraggedId] = squareBeingDragged?.getAttribute(
      "src"
    ) as string;
  }

  state.board = newBoard;
};
