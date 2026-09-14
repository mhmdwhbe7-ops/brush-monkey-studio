import React, { useEffect, useRef, useState } from 'react';
import { MASCOT_QUIPS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface MascotProps {
  interactiveBubble?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ interactiveBubble = true }) => {
  const { language } = useLanguage();
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [quipIndex, setQuipIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const eyeGroupRef = useRef<SVGGElement | null>(null);

  // Mouse eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeGroupRef.current) return;
      const rect = eyeGroupRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(5.5, Math.hypot(deltaX, deltaY) / 25);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPupilOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMascotClick = () => {
    setIsWaving(true);
    setQuipIndex((prev) => (prev + 1) % MASCOT_QUIPS.length);
    setTimeout(() => setIsWaving(false), 700);
  };

  const currentQuip = MASCOT_QUIPS[quipIndex] || MASCOT_QUIPS[0];

  return (
    <div
      id="mascot-interactive-container"
      className="relative flex justify-center items-center select-none cursor-pointer group"
      onClick={handleMascotClick}
      title={language === 'AR' ? 'انقر على بروش مونكي للتفاعل!' : 'Click Brush Monkey to hear something fun!'}
    >
      {/* Speech Bubble */}
      {interactiveBubble && (
        <div
          id="mascot-speech-bubble"
          className="absolute -top-6 right-4 md:right-8 bg-[#EE9007] text-[#111409] border-2 border-[#111409] px-4 py-2 rounded-2xl font-display font-bold text-sm md:text-base shadow-brutal-sm animate-wiggle z-20 transition-transform hover:scale-105 active:scale-95"
        >
          <span data-en={currentQuip.en} data-ar={currentQuip.ar}>
            {language === 'AR' ? currentQuip.ar : currentQuip.en}
          </span>
          {/* Speech bubble beak */}
          <div className="absolute -bottom-2.5 left-5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#EE9007]" />
          <div className="absolute -bottom-3.5 left-5 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#111409] -z-10" />
        </div>
      )}

      {/* Floating Accent Doodles */}
      <div className="absolute -top-4 -left-4 text-2xl animate-float-slow select-none pointer-events-none text-[#EE9007]">
        ✦
      </div>
      <div className="absolute bottom-6 -right-2 text-2xl animate-wiggle select-none pointer-events-none text-[#111409]">
        ★
      </div>

      {/* Contemporary 2D Character & Vector Brush Illustration */}
      <svg
        id="brush-monkey-vector"
        className={`w-full max-w-[380px] md:max-w-[430px] h-auto drop-shadow-sm transition-transform duration-300 ${
          isWaving ? 'scale-105 -rotate-1' : 'group-hover:scale-102'
        }`}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dynamic Tangerine Hand-Drawn Brush Stroke */}
        <path
          d="M 40 330 C 100 310, 160 360, 260 345 C 330 335, 365 290, 380 260"
          stroke="#EE9007"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 90 345 C 150 340, 220 370, 310 355"
          stroke="#EE9007"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Monkey Head Base Outer (Deep Forest) */}
        <circle cx="200" cy="190" r="95" fill="#111409" />
        {/* Left Ear */}
        <circle cx="108" cy="180" r="32" fill="#111409" />
        <circle cx="112" cy="180" r="18" fill="#EDE1D1" />
        {/* Right Ear */}
        <circle cx="292" cy="180" r="32" fill="#111409" />
        <circle cx="288" cy="180" r="18" fill="#EDE1D1" />

        {/* Monkey Face Mask (Warm Cream) */}
        <path
          d="M 140 180 C 140 135, 175 125, 200 145 C 225 125, 260 135, 260 180 C 260 235, 245 255, 200 255 C 155 255, 140 235, 140 180 Z"
          fill="#EDE1D1"
          stroke="#111409"
          strokeWidth="3"
        />

        {/* Snout & Cute Nose */}
        <ellipse cx="200" cy="225" rx="36" ry="24" fill="#EDE1D1" />
        <path
          d="M 194 216 C 197 213, 203 213, 206 216 L 202 222 C 201 223, 199 223, 198 222 Z"
          fill="#111409"
        />
        {/* Playful Smile */}
        <path
          d="M 190 232 C 196 238, 204 238, 210 232"
          stroke="#111409"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheerful Blush in Tangerine */}
        <circle cx="152" cy="215" r="7" fill="#EE9007" opacity="0.8" />
        <circle cx="248" cy="215" r="7" fill="#EE9007" opacity="0.8" />

        {/* Eyes Group with Interactive Eye Tracking */}
        <g ref={eyeGroupRef} id="mascot-eyes">
          {isBlinking ? (
            // Blinking happy closed eyes
            <>
              <path
                d="M 166 182 C 174 190, 184 190, 192 182"
                stroke="#111409"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 208 182 C 216 190, 226 190, 234 182"
                stroke="#111409"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            // Open, expressive rounded cartoon eyes
            <>
              {/* Left Eye Sclera */}
              <circle cx="178" cy="180" r="14" fill="#FFFFFF" stroke="#111409" strokeWidth="2.5" />
              {/* Right Eye Sclera */}
              <circle cx="222" cy="180" r="14" fill="#FFFFFF" stroke="#111409" strokeWidth="2.5" />

              {/* Left Pupil */}
              <g
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  transition: 'transform 0.04s ease-out',
                }}
              >
                <circle cx="178" cy="180" r="8" fill="#111409" />
                <circle cx="175" cy="177" r="2.5" fill="#FFFFFF" />
              </g>

              {/* Right Pupil */}
              <g
                style={{
                  transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                  transition: 'transform 0.04s ease-out',
                }}
              >
                <circle cx="222" cy="180" r="8" fill="#111409" />
                <circle cx="219" cy="177" r="2.5" fill="#FFFFFF" />
              </g>
            </>
          )}
        </g>

        {/* Studio Artist Paintbrush in Hand */}
        <g id="mascot-paintbrush">
          {/* Hand holding brush */}
          <circle cx="280" cy="275" r="18" fill="#111409" />
          <path
            d="M 270 268 C 285 262, 305 285, 290 295"
            stroke="#EDE1D1"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Wooden Brush Handle */}
          <path
            d="M 245 325 L 315 220"
            stroke="#111409"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Metal Ferrule */}
          <path
            d="M 312 225 L 324 207"
            stroke="#EDE1D1"
            strokeWidth="12"
            strokeLinecap="square"
          />
          {/* Tangerine Brush Bristle with Paint */}
          <path
            d="M 324 207 C 328 200, 335 185, 345 178 C 342 195, 338 205, 330 215 Z"
            fill="#EE9007"
            stroke="#111409"
            strokeWidth="2.5"
          />
          {/* Paint Droplet */}
          <circle cx="355" cy="172" r="4.5" fill="#EE9007" />
        </g>
      </svg>
    </div>
  );
};
