import { useNavigate } from "react-router-dom";
import "./game.css";

export default function Game() {
  const navigate = useNavigate();

  const handlePlay = (game: string) => {
    switch (game) {
      case "tictactoe":
        navigate("/tictactoe");
        break;
      case "rps":
        navigate("/rockpaperscissor");
        break;
      default:
        break;
    }
  };

  return (
    <div className="content-game">
      <h1>SP Gaming Hub</h1>
      <h2>Choose Game To Play</h2>
      <div className="cards">
        <div className="card">
          <h3>Tic Tac Toe</h3>
          <p>
            Tic-Tac-Toe is a classic two-player strategy game played on a 3x3
            grid. Players take turns marking a square with either "X" or "O."
            The goal is to get three of your marks in a row—horizontally,
            vertically, or diagonally—before your opponent. If all squares are
            filled without a winner, it's a draw. Simple, quick, and fun!
          </p>
          <button onClick={() => handlePlay("tictactoe")}>Play</button>
        </div>
        <div className="card">
          <h3>Rock Paper Scissors</h3>
          <p>
            Rock-Paper-Scissors is a simple hand game played between two people.
            Each player simultaneously chooses one of three options—rock, paper,
            or scissors—by making a hand gesture. - Rock beats scissors (it
            crushes them). - Scissors beats paper (it cuts it). - Paper beats
            rock (it covers it). If both players choose the same option, it's a
            tie. Quick, easy, and great for settling small disputes!
          </p>
          <button onClick={() => handlePlay("rps")}>Play</button>
        </div>
      </div>
    </div>
  );
}
