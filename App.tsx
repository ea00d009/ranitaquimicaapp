import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Question } from './types';
import { QUESTIONS, INITIAL_LIVES } from './constants';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import QuitScreen from './components/QuitScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [lives, setLives] = useState<number>(INITIAL_LIVES);
  const [score, setScore] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [frogPosition, setFrogPosition] = useState<{ row: number; col: number }>({ row: 5, col: 1 });
  const [gameOverMessage, setGameOverMessage] = useState<string>("¡Juego Terminado!");

  const currentQuestion: Question | undefined = QUESTIONS[questionIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === GameState.Playing) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = useCallback(() => {
    setLives(INITIAL_LIVES);
    setScore(0);
    setQuestionIndex(0);
    setTime(0);
    setFrogPosition({ row: 5, col: 1 }); // Reset frog position to start
    setGameState(GameState.Playing);
    setGameOverMessage("¡Juego Terminado!");
  }, []);

  const quitGame = useCallback(() => {
    setGameState(GameState.Quit);
  }, []);

  const returnToStart = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean, newPosition: { row: number; col: number } | null) => {
    if (isCorrect && newPosition) {
      setScore(prevScore => prevScore + 1337);
      setFrogPosition(newPosition);

      // Win condition: frog has reached the top row
      if (newPosition.row <= 0) {
        setGameOverMessage("¡Has cruzado el estanque!");
        setGameState(GameState.GameOver);
        return;
      }
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setGameState(GameState.GameOver);
        return;
      }
    }

    // Go to the next question, looping if necessary
    const nextQuestionIndex = (questionIndex + 1) % QUESTIONS.length;
    setQuestionIndex(nextQuestionIndex);

  }, [lives, questionIndex]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        if (!currentQuestion) {
          // This case is unlikely if questions loop, but good for safety
          return <GameOverScreen score={score} time={time} onRestart={startGame} title="¡Error al cargar la pregunta!" />;
        }
        return (
          <GameScreen
            question={currentQuestion}
            lives={lives}
            score={score}
            time={time}
            onAnswer={handleAnswer}
            frogPosition={frogPosition}
            onQuit={quitGame}
          />
        );
      case GameState.GameOver:
        return <GameOverScreen score={score} time={time} onRestart={startGame} title={gameOverMessage} />;
      case GameState.Quit:
        return <QuitScreen score={score} time={time} onReturnToStart={returnToStart} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0077be] flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;