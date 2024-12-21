import React from "react";

const Cell = ({ cell, onClick }) => {
  const handleClick = () => {
    if (!cell.visible) {
      onClick(cell);
    }
  };

  let content = "";
  if (cell.visible) {
    if (cell.hasMine) {
      content = "💣"; // Show bomb emoji
    } else if (cell.numberOfNeighbouringMines > 0) {
      content = cell.numberOfNeighbouringMines;
    }
  }

  return (
    <div
      className={`cell ${cell.visible ? "visible" : ""}`}
      onClick={handleClick}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: cell.visible ? "default" : "pointer",
        backgroundColor: cell.visible ? "#ddd" : "#ccc",
        color: 'Black'
      }}
    >
      {content}
    </div>
  );
};

export default Cell;
