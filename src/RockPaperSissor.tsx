import { useState } from 'react';
import './RockPaperSissor.css';

export default function RockPaperSissor() {
    const [userChoice, setUserChoice] = useState<string>('');
    const [player2Choice, setPlayer2Choice] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [gameMode, setGameMode] = useState<"computer" | "player" | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

    const choices = [
        { name: 'rock', emoji: '✊' },
        { name: 'paper', emoji: '✋' },
        { name: 'scissors', emoji: '✌️' }
    ];

    const getEmoji = (choice: string) => {
        return choices.find(c => c.name === choice)?.emoji || '';
    };

    const handleChoice = (choice: string) => {
        if (gameMode === "computer") {
            const computerChoice = choices[Math.floor(Math.random() * choices.length)].name;
            setUserChoice(choice);
            setPlayer2Choice(computerChoice);
            determineWinner(choice, computerChoice);
        } else {
            if (currentPlayer === 1) {
                setUserChoice(choice);
                setCurrentPlayer(2);
            } else {
                setPlayer2Choice(choice);
                determineWinner(userChoice, choice);
                setCurrentPlayer(1);
            }
        }
    };

    const determineWinner = (user: string, opponent: string) => {
        if (user === opponent) {
            setResult("It's a tie!");
            return;
        }

        if (
            (user === 'rock' && opponent === 'scissors') ||
            (user === 'paper' && opponent === 'rock') ||
            (user === 'scissors' && opponent === 'paper')
        ) {
            setResult(gameMode === "computer" ? 'You win!' : 'Player 1 wins!');
            setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
        } else {
            setResult(gameMode === "computer" ? 'Computer wins!' : 'Player 2 wins!');
            setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
        }
    };

    const resetGame = () => {
        setUserChoice('');
        setPlayer2Choice('');
        setResult('');
        setScore({ player1: 0, player2: 0 });
        setCurrentPlayer(1);
    };

    if (!gameMode) {
        return (
            <div className="rps-container">
                <h1>Choose Game Mode</h1>
                <div className="mode-selection">
                    <button onClick={() => setGameMode("computer")}>vs Computer</button>
                    <button onClick={() => setGameMode("player")}>vs Player</button>
                </div>
            </div>
        );
    }

    return (
        <div className="rps-container">
            <h1>Rock Paper Scissors</h1>
            <h2>{gameMode === "computer" ? "vs Computer" : "vs Player"}</h2>
            
            <div className="score-board">
                <div className="score">
                    <h3>{gameMode === "computer" ? "Your Score" : "Player 1 Score"}: {score.player1}</h3>
                    <h3>{gameMode === "computer" ? "Computer Score" : "Player 2 Score"}: {score.player2}</h3>
                </div>
            </div>

            {gameMode === "player" && (
                <h3 className="current-player">Current Player: {currentPlayer}</h3>
            )}

            <div className="choices">
                {choices.map(choice => (
                    <button 
                        key={choice.name}
                        className={`choice-btn ${
                            (currentPlayer === 1 && userChoice === choice.name) ||
                            (currentPlayer === 2 && player2Choice === choice.name)
                                ? 'selected'
                                : ''
                        }`}
                        onClick={() => handleChoice(choice.name)}
                    >
                        <span className="choice-emoji">{choice.emoji}</span>
                        <span className="choice-text">{choice.name.toUpperCase()}</span>
                    </button>
                ))}
            </div>

            {((gameMode === "computer" && userChoice && player2Choice) ||
              (gameMode === "player" && player2Choice)) && (
                <div className="result">
                    <h2>Player 1 choice: {getEmoji(userChoice)} {userChoice}</h2>
                    <h2>{gameMode === "computer" ? "Computer" : "Player 2"}'s choice: {getEmoji(player2Choice)} {player2Choice}</h2>
                    <h1 className={`result-text ${
                        result.includes('Player 1') || result.includes('You win') ? 'win' : 
                        result.includes('Player 2') || result.includes('Computer') ? 'lose' : 'tie'
                    }`}>
                        {result}
                    </h1>
                </div>
            )}

            <div className="buttons">
                <button className="reset-btn" onClick={resetGame}>Reset Game</button>
                <button className="mode-btn" onClick={() => {
                    setGameMode(null);
                    resetGame();
                }}>Change Mode</button>
            </div>
        </div>
    );
}