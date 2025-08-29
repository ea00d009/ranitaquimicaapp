import React from 'react';
import WaterBackground from './WaterBackground';
import { useSounds } from '../hooks/useSounds';

interface QuitScreenProps {
  score: number;
  time: number;
  onReturnToStart: () => void;
}

const QuitScreen: React.FC<QuitScreenProps> = ({ score, time, onReturnToStart }) => {
  const playSound = useSounds();

  const handleReturnClick = () => {
    playSound('click');
    onReturnToStart();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div 
        className="relative w-full h-full flex flex-col items-center justify-center p-8 text-white text-center cursor-pointer" 
        onClick={handleReturnClick}
        role="button"
        tabIndex={0}
        aria-label="Volver a la pantalla de inicio"
    >
        <WaterBackground />
        <div className="relative z-10 bg-black/50 p-8 rounded-2xl backdrop-blur-sm pointer-events-none">
            <h1 className="text-4xl font-black mb-4 drop-shadow-lg">Partida Terminada</h1>
            <p className="mb-6 max-w-sm text-lg">
                Saliste del desafío. Tu progreso no se ha guardado.
            </p>
            <div className="text-left bg-black/30 p-4 rounded-lg mb-8 space-y-2">
                <p className="text-xl">Puntaje Acumulado: <span className="font-bold text-lime-300">{score.toLocaleString('es-ES')}</span></p>
                <p className="text-xl">Tiempo de Juego: <span className="font-bold text-lime-300">{formatTime(time)}</span></p>
            </div>

            <div className="mt-4 p-3 bg-lime-500/20 border-2 border-lime-400 rounded-lg animate-pulse">
                <p className="text-lime-200 font-bold">Haz clic en cualquier lugar para volver al inicio</p>
            </div>
        </div>
    </div>
  );
};

export default QuitScreen;