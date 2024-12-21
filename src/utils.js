export const createBoard = (size, numberOfMines) => {
    const board = [];
    const minePositions = new Set();
  
    while (minePositions.size < numberOfMines) {
      const position = Math.floor(Math.random() * size * size);
      minePositions.add(position);
    }
  
    for (let i = 0; i < size * size; i++) {
      const hasMine = minePositions.has(i);
      board.push({
        index: i,
        hasMine,
        numberOfNeighbouringMines: 0,
        visible: false,
      });
    }
  
    const directions = [-1, 1, -size, size, -size - 1, -size + 1, size - 1, size + 1];
    board.forEach((cell, index) => {
      if (!cell.hasMine) {
        cell.numberOfNeighbouringMines = directions.reduce((count, offset) => {
          const neighborIndex = index + offset;
          if (
            neighborIndex >= 0 &&
            neighborIndex < size * size &&
            Math.abs((neighborIndex % size) - (index % size)) <= 1 &&
            board[neighborIndex]?.hasMine
          ) {
            count++;
          }
          return count;
        }, 0);
      }
    });
  
    return board;
  };
  