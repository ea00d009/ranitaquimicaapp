import React from 'react';

interface FrogProps {
  style: React.CSSProperties;
  isSinking: boolean;
  isJumping: boolean;
}

const Frog: React.FC<FrogProps> = ({ style, isSinking, isJumping }) => {
    const frogClasses = [
        'w-20', 'h-20', 'md:w-24', 'md:h-24', 'absolute', 'z-20',
        'transition-all', 'duration-500', 'ease-in-out',
        isSinking ? 'opacity-0 scale-50 rotate-90' : '',
    ].join(' ');

    const getAnimationClass = (part: 'body' | 'back-legs' | 'front-legs') => {
        if (!isJumping) return '';
        switch (part) {
            case 'body': return 'animate-jump-body';
            case 'back-legs': return 'animate-jump-back-legs';
            case 'front-legs': return 'animate-jump-front-legs';
            default: return '';
        }
    };

    return (
        <div className={frogClasses} style={style}>
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <g className={`origin-bottom ${getAnimationClass('back-legs')}`}>
                    {/* Left Leg */}
                    <path d="M70 160 C 40 180, 20 150, 40 120" fill="#689F38" stroke="#33691E" strokeWidth="4" />
                    <path d="M40 120 C 50 100, 70 110, 80 130" fill="#8BC34A" stroke="#33691E" strokeWidth="4" />
                    {/* Right Leg */}
                    <path d="M130 160 C 160 180, 180 150, 160 120" fill="#689F38" stroke="#33691E" strokeWidth="4" />
                    <path d="M160 120 C 150 100, 130 110, 120 130" fill="#8BC34A" stroke="#33691E" strokeWidth="4" />
                </g>
                <g className={`origin-center ${getAnimationClass('body')}`}>
                    {/* Body */}
                    <ellipse cx="100" cy="120" rx="55" ry="50" fill="#8BC34A" stroke="#33691E" strokeWidth="4" />
                    <ellipse cx="100" cy="115" rx="45" ry="40" fill="#AED581" />
                    {/* Eyes */}
                    <ellipse cx="70" cy="70" rx="25" ry="28" fill="#8BC34A" stroke="#33691E" strokeWidth="4" />
                    <ellipse cx="130" cy="70" rx="25" ry="28" fill="#8BC34A" stroke="#33691E" strokeWidth="4" />
                    <ellipse cx="70" cy="70" rx="18" ry="20" fill="white" />
                    <ellipse cx="130" cy="70" rx="18" ry="20" fill="white" />
                    <circle cx="75" cy="75" r="10" fill="black" />
                    <circle cx="125" cy="75" r="10" fill="black" />
                    <circle cx="72" cy="70" r="3" fill="white" />
                    <circle cx="122" cy="70" r="3" fill="white" />
                    {/* Mouth */}
                    <path d="M80 135 Q 100 150, 120 135" stroke="#33691E" strokeWidth="3" fill="none" strokeLinecap="round" />
                    {/* Backpack */}
                    <rect x="85" y="100" width="30" height="35" fill="#9575CD" rx="5" stroke="#4527A0" strokeWidth="3" />
                    <text x="100" y="125" fontSize="24" textAnchor="middle" fill="#EDE7F6" fontWeight="bold">E</text>
                </g>
                <g className={`origin-top ${getAnimationClass('front-legs')}`}>
                    {/* Front Legs */}
                    <path d="M70 120 C 60 140, 65 160, 75 160" fill="none" stroke="#689F38" strokeWidth="8" strokeLinecap="round" />
                    <path d="M130 120 C 140 140, 135 160, 125 160" fill="none" stroke="#689F38" strokeWidth="8" strokeLinecap="round" />
                </g>
            </svg>
        </div>
    );
};

export default Frog;
