import React from 'react';
import { PlayIcon } from './icons';
import WaterBackground from './WaterBackground';
import { useSounds } from '../hooks/useSounds';



interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const playSound = useSounds();

  const handleStartClick = () => {
    playSound('start');
    onStart();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-white text-center">
        <WaterBackground />
        <div className="relative z-10 bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
           <center><img src="https://i.ibb.co/hJZ6Sz8t/escudo.png" width="90" alt="escudo" border="0"></center>
            <h1 className="text-2xl font-black mb-2 drop-shadow-lg">Práctica IV</h1><h1 className="text-2xl font-black mb-2 drop-shadow-lg">Profesorado de Educación Secundaria de Química</h1><h1 className="text-4xl font-black mb-2 drop-shadow-lg">Desafío de Magnitudes</h1>
            <h2 className="text-2xl font-bold text-lime-300 mb-6 drop-shadow-lg">Atómicas y Moleculares</h2>
            <p className="mb-8 max-w-sm">
                ¡Ayuda a la rana a cruzar el estanque! Elige el nenúfar con la respuesta correcta para saltar a salvo.
            </p>
            <button
                onClick={handleStartClick}
                className="group flex items-center justify-center w-full bg-lime-500 hover:bg-lime-400 text-green-900 font-bold py-4 px-6 rounded-full text-2xl transition-transform transform hover:scale-105 shadow-lg"
            >
                <PlayIcon className="w-8 h-8 mr-3 transition-transform group-hover:rotate-12" />
                JUGAR
            </button>
 <br/>   
           <h2 color="#000">Alumnas: Cáceres Laura - Paola Rogríguez</h>   
        </div> 
    </div>
  );
};

export default StartScreen;