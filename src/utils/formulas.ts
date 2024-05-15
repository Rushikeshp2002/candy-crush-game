export const formulasForColumn = (boardSize: number) => {
  return boardSize * boardSize - (boardSize + boardSize + boardSize) - 1;
};

// boardsize = 8
// 8*8-(8+8+8)-1
// 64-(24)-1
// 39
export const formulasForThree = (boardSize: number) => {
  return boardSize * boardSize - (boardSize + boardSize) - 1;
};
export const formulasForMoveBelow = (boardSize: number) => {
  return boardSize * boardSize - boardSize  - 1;
};



export const generateInvalidMoves = (
  boardSize: number,
  isFalse: boolean = false
) => {
  const invalidMoves: Array<number> = [];
  for (let i: number = boardSize; i < boardSize * boardSize; i += boardSize) {
    if (isFalse) invalidMoves.push(i - 3);
    invalidMoves.push(i - 2);
    invalidMoves.push(i - 1);
  }
  return invalidMoves;
};
