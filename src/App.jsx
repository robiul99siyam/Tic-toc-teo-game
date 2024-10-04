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
      className="text-lg w-12 h-12 font-bold  border border-gray-400 m-1"
    >
      {value}
    </button>
  );
}

function Board({ handlePlay, isNext, squares }) {
  const winner = calculationWinner(squares);
  console.log(winner);
  let status;

  if (winner) {
    status = `Congrass Winner: ${winner} `;
  } else {
    status = "NextPlayer : " + (isNext ? "X" : "O");
  }
  function handleClick(i) {
    if (squares[i] || calculationWinner(squares)) {
      return;
    }
    const newSqare = [...squares];
    // console.log(newSqare);
    if (isNext) {
      newSqare[i] = "X";
    } else {
      newSqare[i] = "O";
    }
    handlePlay(newSqare);
  }

  return (
    <>
      {/* <div>{status}</div> */}
      <div className="w-72 mx-auto my-60">
        <div> {status}</div>
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
      </div>
      {/* <h1>How to learn this pazile game !</h1> */}
    </>
  );
}

function calculationWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const len = lines.length;
  for (let i = 0; i < len; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHirstory] = useState([Array(9).fill(null)]);
  const [isNext, setINext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentHistory = history[currentMove];

  function handlePlay(newSqare) {
    setINext(!isNext);
    const nextHistory = [...history.slice(0, currentMove + 1), newSqare];
    setHirstory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setINext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move #${move}`;
    } else {
      description = "Go to the Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        {" "}
        <Board
          isNext={isNext}
          squares={currentHistory}
          handlePlay={handlePlay}
        />{" "}
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
