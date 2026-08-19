import { useState, useEffect } from 'react';
import { Check, RotateCcw, Hand, Eye, Headphones, Flower2, Coffee } from 'lucide-react';
import { aiVoiceService } from '../services/aiVoiceService';
import { SENSE_COLORS } from './decorations';

const SENSES_LIST = [
  { key: 'touch', name: 'Touch', Icon: Hand },
  { key: 'sight', name: 'Sight', Icon: Eye },
  { key: 'sound', name: 'Sound', Icon: Headphones },
  { key: 'smell', name: 'Smell', Icon: Flower2 },
  { key: 'taste', name: 'Taste', Icon: Coffee },
];

const REFLECT_OPTIONS = [
  'Calm',
  'A little lighter',
  'Still restless',
  'Not sure',
];

function PeacefulIllustration() {
  return (
    <div className="relative mx-auto grid h-48 w-48 place-items-center">
      {/* Soft Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E9E4F5] to-[#F8F5FD] blur-2xl opacity-70" />
      {/* SVG Art */}
      <svg
        className="relative z-10 w-36 h-36 drop-shadow-sm"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Sun/Moon */}
        <circle cx="150" cy="50" r="24" fill="#F8F5FD" />
        <circle cx="150" cy="50" r="16" fill="#E9E4F5" />

        {/* Gentle Hills / Ground */}
        <path d="M10 160 Q 60 140 100 160 T 190 160 L 190 200 L 10 200 Z" fill="#F6F3FB" />
        <path d="M0 180 Q 80 150 200 170 L 200 200 L 0 200 Z" fill="#E9E4F5" />

        {/* Plant Element */}
        <path d="M160 170 C 160 150 150 140 140 140" stroke="#8B8294" strokeWidth="2" strokeLinecap="round" />
        <path d="M150 153 C 155 155 158 152 155 148 C 152 145 148 148 150 153 Z" fill="#A79FBB" />
        <path d="M145 145 C 148 146 150 144 148 140 C 146 138 143 140 145 145 Z" fill="#A79FBB" />

        {/* Minimal Sitting Figure */}
        {/* Body */}
        <path d="M85 165 C 80 120 120 120 115 165" fill="#450BC8" opacity="0.8" />
        {/* Head */}
        <circle cx="100" cy="100" r="14" fill="#450BC8" opacity="0.9" />
        {/* Gentle Aura */}
        <path d="M70 165 C 60 80 140 80 130 165" stroke="#450BC8" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" fill="none" />
      </svg>
    </div>
  );
}

export function CompletionScreen({ onDone, onRestart }) {
  const [reflection, setReflection] = useState(null);
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    // Stop any previous speech and start the final message
    aiVoiceService.stopSpeech();

    const FINAL_MESSAGE = "You've completed your five senses journey. Take this calm moment with you.";

    // Small delay to allow screen transition effects
    const timer = setTimeout(() => {
      aiVoiceService.playSpeech(FINAL_MESSAGE, {
        onStart: () => {},
        onEnd: () => {
          // reveal the reflection card shortly after speech finishes
          setTimeout(() => setShowReflection(true), 300);
        },
        onError: () => {
          // still reveal the reflection if speech fails
          setTimeout(() => setShowReflection(true), 300);
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      aiVoiceService.stopSpeech();
    };
  }, []);

  const handleDone = () => {
    aiVoiceService.stopSpeech();
    onDone();
  };

  const handleRestart = () => {
    aiVoiceService.stopSpeech();
    onRestart();
  };

  return (
    <div className="relative mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="animate-pop w-full mb-4">
        <PeacefulIllustration />
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#2B2433] sm:text-4xl text-balance">
        You're here.
      </h1>

      <p className="mt-3 max-w-md text-sm text-[#6F6580] leading-relaxed text-balance">
        You took a few quiet moments to reconnect with yourself.
      </p>

      {/* 5-Senses Completed Checklist */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md">
        {SENSES_LIST.map((s) => (
          <span
            key={s.key}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold text-[#6F6580]"
            style={{ background: SENSE_COLORS[s.key]?.wash || '#F6F3FB', color: '#4B3F63' }}
          >
            <s.Icon className="h-4 w-4 text-[#6F6580]" />
            <Check className="h-3 w-3 text-[#450BC8]" strokeWidth={3} />
            <span className="ml-1">{s.name}</span>
          </span>
        ))}
      </div>

      {/* Reflection & Actions - revealed after final message finishes */}
      <div className={`mt-10 w-full max-w-sm transition-all duration-500 ${showReflection ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
        <div className="rounded-3xl border border-[#EEE9F6] bg-white p-5 shadow-xs">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B8294] mb-3">
            How do you feel now?
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {REFLECT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setReflection(option)}
                className={`rounded-2xl border px-4 py-2 text-[11px] font-extrabold transition-all duration-200 ${reflection === option
                  ? 'bg-[#450BC8] text-white border-[#450BC8]'
                  : 'bg-[#F6F3FB] text-[#6F6580] border-transparent hover:border-[#DCD2F0]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
            <button
              type="button"
              onClick={handleDone}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#450BC8] px-7 py-3.5 text-xs font-extrabold text-white shadow-md hover:bg-[#3909A6] transition-colors"
            >
              Done
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#EEE9F6] bg-white px-7 py-3.5 text-xs font-extrabold text-[#6F6580] shadow-2xs hover:bg-[#F8F5FD] hover:text-[#450BC8] transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Start Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}