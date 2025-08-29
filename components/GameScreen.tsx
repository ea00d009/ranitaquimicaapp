import React, { useState, useEffect, useMemo } from 'react';
import { Question } from '../types';
import { HeartIcon, TargetIcon, ExitIcon } from './icons';
import Frog from './Frog';
import WaterBackground from './WaterBackground';
import { useSounds } from '../hooks/useSounds';

// Component for a single Lily Pad
interface LilyPadProps {
    option?: string;
    optionLetter?: string;
    onClick?: () => void;
    isAnswer: boolean;
}
const LilyPad: React.FC<LilyPadProps> = ({ option, optionLetter, onClick, isAnswer }) => (
    <div
        className={`relative aspect-square transition-transform duration-300 p-2 ${isAnswer ? 'hover:scale-105 cursor-pointer' : ''}`}
        onClick={onClick}
        role={isAnswer ? 'button' : undefined}
        aria-label={option ? `Opción ${optionLetter}: ${option}` : 'Nenúfar Vacío'}
        tabIndex={isAnswer ? 0 : -1}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
                </filter>
            </defs>

            <g filter="url(#shadow)">
                {/* Main Shape composed of 4 parts */}
                <path d="M 50,50 L 48,5 A 45,45 0 0 1 95,48 Z" fill="#43A047" />
                <path d="M 50,50 L 5,48 A 45,45 0 0 1 48,5 Z" fill="#43A047" />
                <path d="M 50,50 L 52,95 A 45,45 0 0 1 5,52 Z" fill="#43A047" />
                <path d="M 50,50 L 95,52 A 45,45 0 0 1 52,95 Z" fill="#43A047" />
            </g>
            
            {/* Outline */}
            <g stroke="#2E7D32" strokeWidth="1" fill="none">
                 <path d="M 48,5 A 45,45 0 0 1 95,48" />
                 <path d="M 5,48 A 45,45 0 0 1 48,5" />
                 <path d="M 52,95 A 45,45 0 0 1 5,52" />
                 <path d="M 95,52 A 45,45 0 0 1 52,95" />
            </g>

            {/* Veins */}
            <g stroke="#66BB6A" strokeWidth="0.8" fill="none" opacity="0.9">
                <path d="M 50,50 C 60,40, 70,25, 73,12" />
                <path d="M 50,50 C 60,35, 75,25, 87,18" />
                <path d="M 50,50 C 60,60, 70,75, 73,88" />
                <path d="M 50,50 C 60,65, 75,75, 87,82" />
                <path d="M 50,50 C 40,40, 30,25, 27,12" />
                <path d="M 50,50 C 40,35, 25,25, 13,18" />
                <path d="M 50,50 C 40,60, 30,75, 27,88" />
                <path d="M 50,50 C 40,65, 25,75, 13,82" />

                 {/* Branching veins */}
                <path d="M 61 38 C 64 33 69 28 72 25" />
                <path d="M 39 38 C 36 33 31 28 28 25" />
                <path d="M 61 62 C 64 67 69 72 72 75" />
                <path d="M 39 62 C 36 67 31 72 28 75" />
            </g>
        </svg>
        {option && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-black font-mono text-[10px] md:text-xs leading-tight">
                <span className="bg-lime-300 text-black rounded-full w-6 h-6 flex items-center justify-center mb-1 font-semibold text-base shadow-sm">
                    {optionLetter}
                </span>
                <span className="max-w-full">{option}</span>
            </div>
        )}
    </div>
);

// Header Component
interface HeaderProps {
    lives: number;
    score: number;
}
const Header: React.FC<HeaderProps> = ({ lives, score }) => (
    <header className="bg-green-900/80 text-white p-2 flex justify-between items-center text-sm font-bold shadow-md relative z-30">
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
            <span>VIDAS</span>
            <HeartIcon className="w-5 h-5 text-red-500" />
            <span>{lives}</span>
        </div>
        <div className="flex-1 text-center px-2 truncate">
            Desafío de Magnitudes
        </div>
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
            <TargetIcon className="w-5 h-5 text-yellow-400" />
            <span>{score.toLocaleString('es-ES')}</span>
        </div>
    </header>
);

// Main Game Screen
interface GameScreenProps {
    question: Question;
    lives: number;
    score: number;
    time: number;
    onAnswer: (isCorrect: boolean, newPosition: { row: number; col: number } | null) => void;
    frogPosition: { row: number; col: number };
    onQuit: () => void;
}
const GameScreen: React.FC<GameScreenProps> = ({ question, lives, score, time, onAnswer, frogPosition, onQuit }) => {
    const playSound = useSounds();
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isJumping, setIsJumping] = useState(false);
    const [jumpTarget, setJumpTarget] = useState<{ row: number; col: number } | null>(null);

    // Reset animation states when the question changes
    useEffect(() => {
        setIsJumping(false);
        setJumpTarget(null);
        setFeedback(null);
    }, [question]);

    const answerPositions = useMemo(() => {
        const answerRow = frogPosition.row - 1; // Answers are always one row in front of the frog
        return [
            { row: answerRow, col: 0, optionIndex: 0 },
            { row: answerRow, col: 1, optionIndex: 1 },
            { row: answerRow, col: 2, optionIndex: 2 },
        ];
    }, [frogPosition]);

    const handleOptionClick = (selectedIndex: number, targetRow: number, targetCol: number) => {
        if (isJumping) return;

        playSound('jump');
        setIsJumping(true);
        setJumpTarget({ row: targetRow, col: targetCol });

        setTimeout(() => {
            const isCorrect = selectedIndex === question.correctAnswerIndex;
            setFeedback(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {
                playSound('correct');
            } else {
                playSound('incorrect');
            }

            setTimeout(() => {
                onAnswer(isCorrect, isCorrect ? { row: targetRow, col: targetCol } : null);
            }, 800);
        }, 500); // Jump animation duration
    };

    const handleQuitClick = () => {
        playSound('click');
        onQuit();
    };
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const getPositionStyles = (row: number, col: number): React.CSSProperties => {
        const rowHeight = 100 / 6; // 6 rows for positioning
        const top = `${row * rowHeight + rowHeight / 2}%`;
        const left = `${col * (100 / 3) + (100 / 6)}%`;
        return { top, left, transform: 'translate(-50%, -50%)' };
    };

    const frogCurrentVisualPosition = jumpTarget || frogPosition;

    return (
        <div className="w-full h-full flex flex-col">
            <Header lives={lives} score={score} />

            <div className="flex-1 relative">
                {/* Background water */}
                <WaterBackground />

                {/* Question display at the top */}
                <div className="absolute top-0 left-0 right-0 p-3 z-20">
                    <div className="bg-black/50 rounded-lg p-3 text-center text-white backdrop-blur-sm">
                        <p className="font-bold text-lg leading-tight">{question.question}</p>
                    </div>
                </div>

                {/* Feedback overlay */}
                {feedback && (
                    <div className={`absolute inset-0 z-40 flex items-center justify-center text-5xl md:text-6xl font-black transition-opacity duration-300 ${feedback === 'correct' ? 'text-green-400' : 'text-red-500'}`} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {feedback === 'correct' ? '¡CORRECTO!' : '¡INCORRECTO!'}
                    </div>
                )}

                {/* The Pond Area (where grid and frog live) */}
                <div className="absolute top-20 bottom-24 left-4 right-4 z-10">
                    <div className="relative w-full h-full">
                        {/* Lily pad grid */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-6 gap-6">
                            {Array.from({ length: 15 }).map((_, index) => {
                                const row = Math.floor(index / 3);
                                const col = index % 3;
                                const answerInfo = answerPositions.find(p => p.row === row && p.col === col);
                                return (
                                    <LilyPad
                                        key={index}
                                        option={answerInfo ? question.options[answerInfo.optionIndex] : undefined}
                                        optionLetter={answerInfo ? String.fromCharCode(65 + answerInfo.optionIndex) : undefined}
                                        isAnswer={!!answerInfo}
                                        onClick={answerInfo ? () => handleOptionClick(answerInfo.optionIndex, answerInfo.row, answerInfo.col) : undefined}
                                    />
                                );
                            })}
                        </div>
                        
                        {/* The Frog */}
                        <Frog 
                            style={getPositionStyles(frogCurrentVisualPosition.row, frogCurrentVisualPosition.col)} 
                            isSinking={feedback === 'incorrect'} 
                            isJumping={isJumping}
                        />
                    </div>
                </div>

                {/* Footer UI as an overlay */}
                <footer className="absolute bottom-0 left-0 right-0 bg-green-900/80 backdrop-blur-sm p-4 h-24 flex justify-between items-center z-30">
                    <div className="bg-lime-500 text-green-900 font-bold px-5 py-2 rounded-full text-xl shadow-lg">
                        {formatTime(time)}
                    </div>
                    <button 
                        onClick={handleQuitClick}
                        className="bg-red-500 hover:bg-red-600 transition-colors p-4 rounded-full shadow-lg" 
                        aria-label="Salir del juego"
                    >
                        <ExitIcon className="w-8 h-8 text-white" />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default GameScreen;