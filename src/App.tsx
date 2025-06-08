import "./App.css";
import Game from "./game.tsx";
import Tictactoe from "./Tictactoe.tsx";
import RockPaperSissor from "./RockPaperSissor.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/tictactoe" element={<Tictactoe />} />
        <Route path="/rockpaperscissor" element={<RockPaperSissor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
