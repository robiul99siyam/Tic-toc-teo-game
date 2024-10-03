/*  
    Game ->
          ->Board
              -Square
          -> History



    lepting

*/

import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="text-lg w-12 h-12 font-bold bg-white border border-gray-400 m-1"
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setINext] = useState(false); //this use of truety and false condiction
  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const newSqare = squares.slice();
    if (!isNext) {
      newSqare[i] = "X";
      setSquares(newSqare);
    } else {
      newSqare[i] = "O";
      setSquares(newSqare);
    }
    setINext(!isNext);
  }

  return (
    <>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
