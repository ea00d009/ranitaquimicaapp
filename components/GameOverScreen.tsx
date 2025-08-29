import React, { useEffect } from 'react';
import { ReplayIcon } from './icons';
import WaterBackground from './WaterBackground';
import { useSounds } from '../hooks/useSounds';

interface GameOverScreenProps {
  score: number;
  time: number;
  onRestart: () => void;
  title?: string;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, time, onRestart, title = "¡Juego Terminado!" }) => {
  const playSound = useSounds();

  useEffect(() => {
    playSound('gameOver');
  }, [playSound]);

  const handleRestartClick = () => {
    playSound('click');
    onRestart();
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-white text-center">
        <WaterBackground />
        <div className="relative z-10 bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
            <h1 className="text-4xl font-black mb-4 drop-shadow-lg">{title}</h1>
            <div className="text-left bg-black/30 p-4 rounded-lg mb-8 space-y-2">
                <p className="text-xl">Puntaje Final: <span className="font-bold text-lime-300">{score.toLocaleString('es-ES')}</span></p>
                <p className="text-xl">Tiempo Total: <span className="font-bold text-lime-300">{formatTime(time)}</span></p>
            </div>
            <button
                onClick={handleRestartClick}
                className="group flex items-center justify-center w-full bg-lime-500 hover:bg-lime-400 text-green-900 font-bold py-4 px-6 rounded-full text-2xl transition-transform transform hover:scale-105 shadow-lg"
            >
                <ReplayIcon className="w-8 h-8 mr-3 transition-transform group-hover:rotate-[-45deg]" />
                JUGAR DE NUEVO
            </button>
        </div>
    </div>
  );
};

export default GameOverScreen;