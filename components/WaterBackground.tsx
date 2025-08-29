import React from 'react';

const WaterBackground: React.FC = () => {
    const paths = [
        "M-10 50 C 40 10, 80 100, 150 80 C 220 60, 250 150, 320 130 C 390 110, 410 200, 410 200 L 410 0 L -10 0 Z",
        "M-10 250 C 50 200, 120 300, 200 280 C 280 260, 350 350, 410 330 V 150 C 350 180, 280 120, 200 140 C 120 160, 50 100, -10 130 Z",
        "M-10 450 C 80 400, 150 500, 230 480 C 310 460, 380 550, 410 530 V 350 C 350 380, 280 320, 230 340 C 180 360, 80 300, -10 330 Z",
        "M-10 650 C 50 600, 120 700, 200 680 C 280 660, 350 750, 410 730 V 550 C 350 580, 280 520, 200 540 C 120 560, 50 500, -10 530 Z",
        "M-10 850 C 80 800, 150 900, 230 880 C 310 860, 380 950, 410 930 V 750 C 350 780, 280 720, 230 740 C 180 760, 80 700, -10 730 Z"
    ];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 400 800"
            aria-hidden="true"
        >
            <defs>
                <pattern id="halftone" patternUnits="userSpaceOnUse" width="4" height="4">
                    <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.05)" />
                </pattern>
                <style>
                    {`
                        @keyframes flow {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-400px); }
                        }
                        @keyframes flow-reverse {
                            0% { transform: translateX(-400px); }
                            100% { transform: translateX(0); }
                        }
                        .water-flow {
                            animation: flow 25s linear infinite;
                        }
                        .water-flow-reverse {
                            animation: flow-reverse 35s linear infinite;
                        }
                    `}
                </style>
            </defs>
            <rect width="400" height="800" fill="#4dd0e1" />
            <rect width="400" height="800" fill="url(#halftone)" />

            {/* Layer 1: Slower, further back */}
            <g className="water-flow-reverse" fill="#b2ebf2" stroke="#e0f7fa" strokeWidth="3" opacity="0.8">
                {paths.map((d, i) => <path key={`l1-o-${i}`} d={d} />)}
                {/* Duplicated for seamless loop */}
                {paths.map((d, i) => <path key={`l1-d-${i}`} d={d} transform="translate(400, 0)" />)}
            </g>

            {/* Layer 2: Faster, closer, slightly offset */}
            <g className="water-flow" fill="#b2ebf2" stroke="#e0f7fa" strokeWidth="2.5" opacity="0.6" transform="translate(30, 25) scale(1.1)">
                {paths.map((d, i) => <path key={`l2-o-${i}`} d={d} />)}
                {/* Duplicated for seamless loop */}
                {paths.map((d, i) => <path key={`l2-d-${i}`} d={d} transform="translate(400, 0)" />)}
            </g>
        </svg>
    );
};

export default WaterBackground;