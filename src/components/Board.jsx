import React, { Component } from "react";
import Cell from "./Cell";
import { createBoard } from "../utils";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(5, 7), // 5x5 grid with 7 mines
      gameOver: false,
      gameWon: false,
    };
  }

  handleCellClick = (cell) => {
    if (this.state.gameOver || this.state.gameWon || cell.visible) {
      return;
    }

    if (cell.hasMine) {
      const updatedBoard = this.state.board.map((c) =>
        c.hasMine ? { ...c, visible: true } : c
      );
      this.setState({ board: updatedBoard, gameOver: true });
      return;
    }

    const updatedBoard = [...this.state.board];
    updatedBoard[cell.index].visible = true;

    const nonMineCells = updatedBoard.filter((c) => !c.hasMine).length;
    const revealedCells = updatedBoard.filter((c) => c.visible).length;

    this.setState({
      board: updatedBoard,
      gameWon: revealedCells === nonMineCells,
    });
  };

  restartGame = () => {
    this.setState({
      board: createBoard(5, 7),
      gameOver: false,
      gameWon: false,
    });
  };

  render() {
    const { board, gameOver, gameWon } = this.state;

    return (
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column-reverse" }}>
        {gameOver && <h2 style={{ color: "red" }}>Game Over!</h2>}
        {gameWon && <h2 style={{ color: "green" }}>You Won!</h2>}
        {gameOver || gameWon ? (
          <button
            onClick={this.restartGame}
            style={{
              margin: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Restart
          </button>
        ) : null}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 40px)",
            gap: "2px",
            margin: "20px auto",
          }}
        >
          {board.map((cell) => (
            <Cell key={cell.index} cell={cell} onClick={this.handleCellClick} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
