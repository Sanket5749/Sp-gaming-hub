import "./tictactoe.css";
import { useState, useRef } from "react";
import applause from "./crowd-applause-113728.mp3";

function Tictactoe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameMode, setGameMode] = useState<"computer" | "player" | null>(null);
  const audioRef = useRef(new Audio(applause));

  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      if (
        data[pattern[0]] !== "" &&
        data[pattern[0]] === data[pattern[1]] &&
        data[pattern[1]] === data[pattern[2]]
      ) {
        won(data[pattern[0]]);
        return true;
      }
    }
    return false;
  };

  const computerMove = () => {
    setLock(true);
    let emptyBoxes = data.reduce((acc: number[], curr, idx) => {
      if (curr === "") acc.push(idx);
      return acc;
    }, []);

    if (emptyBoxes.length > 0) {
      // Try to find a winning move
      for (let i of emptyBoxes) {
        let testData = [...data];
        testData[i] = "O";
        if (checkWinningCondition(testData, "O")) {
          makeMove(i);
          return;
        }
      }

      // Try to block player's winning move
      for (let i of emptyBoxes) {
        let testData = [...data];
        testData[i] = "X";
        if (checkWinningCondition(testData, "X")) {
          makeMove(i);
          return;
        }
      }

      // Take center if available
      if (emptyBoxes.includes(4)) {
        makeMove(4);
        return;
      }

      // Take a random corner or side
      const corners = [0, 2, 6, 8].filter(n => emptyBoxes.includes(n));
      if (corners.length > 0) {
        makeMove(corners[Math.floor(Math.random() * corners.length)]);
      } else {
        makeMove(emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]);
      }
    }
  };

  const makeMove = (index: number) => {
    const boxes = document.getElementsByClassName("boxes") as HTMLCollectionOf<HTMLElement>;
    const newData = [...data];
    newData[index] = "O";
    setData(newData);
    boxes[index].textContent = "O";
    boxes[index].classList.add("o");
    setCount(count + 1);
    if (!checkWinner()) {
      setLock(false);
    }
  };

  const checkWinningCondition = (board: string[], player: string) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] === player &&
        board[b] === player &&
        board[c] === ""
      ) {
        return true;
      }
      if (
        board[a] === player &&
        board[c] === player &&
        board[b] === ""
      ) {
        return true;
      }
      if (
        board[b] === player &&
        board[c] === player &&
        board[a] === ""
      ) {
        return true;
      }
    }
    return false;
  };

  const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    if (lock || data[num] !== "") return;

    const newData = [...data];
    if (count % 2 === 0) {
      e.currentTarget.textContent = "X";
      e.currentTarget.classList.add("x");
      newData[num] = "X";
      setData(newData);
      setCount(count + 1);
      
      if (!checkWinner() && gameMode === "computer") {
        setTimeout(() => {
          computerMove();
          if (!lock) {  // If computer didn't win, allow next player move
            setLock(false);
          }
        }, 500);
      }
    } else if (gameMode === "player") {
      e.currentTarget.textContent = "O";
      e.currentTarget.classList.add("o");
      newData[num] = "O";
      setData(newData);
      setCount(count + 1);
      checkWinner();
    }
  };

  const won = (winner: string) => {
    setLock(true);
    audioRef.current.play();
    if (winner === "X") {
      alert("Player X Wins!");
    } else {
      alert(gameMode === "computer" ? "Computer Wins!" : "Player O Wins!");
    }
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    const boxes = document.querySelectorAll('.boxes');
    boxes.forEach(box => {
      box.textContent = '';
      box.classList.remove('x', 'o');
    });
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  if (!gameMode) {
    return (
      <div className="container">
        <div className="content">
          <h1>Choose Game Mode</h1>
          <div className="mode-selection">
            <button onClick={() => setGameMode("computer")}>vs Computer</button>
            <button onClick={() => setGameMode("player")}>vs Player</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <h1>
          Tic Tac Toe <span>Game</span>
        </h1>
        <h2>{gameMode === "computer" ? "vs Computer" : "vs Player"}</h2>
        <div className="board">
          <div className="row1">
            {[0, 1, 2].map((num) => (
              <div
                key={num}
                className="boxes"
                onClick={(e) => toggle(e, num)}
              ></div>
            ))}
          </div>
          <div className="row2">
            {[3, 4, 5].map((num) => (
              <div
                key={num}
                className="boxes"
                onClick={(e) => toggle(e, num)}
              ></div>
            ))}
          </div>
          <div className="row3">
            {[6, 7, 8].map((num) => (
              <div
                key={num}
                className="boxes"
                onClick={(e) => toggle(e, num)}
              ></div>
            ))}
          </div>
        </div>
        <br />
        <div className="buttons">
          <button onClick={reset}>Reset</button>
          <button onClick={() => {
            setGameMode(null);
            reset();
          }}>Change Mode</button>
        </div>
      </div>
    </div>
  );
}

export default Tictactoe;
