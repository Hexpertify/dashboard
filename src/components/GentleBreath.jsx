import { useState, useEffect, useCallback, useRef } from 'react';
import { CirclePause, CirclePlay } from 'lucide-react';
import { aiVoiceService } from '../services/aiVoiceService';

const TOTAL_CYCLES = 3;
const PHASES = [
  { phase: 'inhale', duration: 4, displayText: 'Breathe in', voiceText: 'Breathe in slowly.' },
  { phase: 'hold', duration: 4, displayText: 'Hold', voiceText: 'Hold gently.' },
  { phase: 'exhale', duration: 6, displayText: 'Breathe out', voiceText: 'Breathe out slowly.' },
  { phase: 'rest', duration: 2, displayText: 'Rest', voiceText: 'Rest for a moment.' },
];

export function GentleBreath({ onComplete, onExit }) {
  const [breath, setBreath] = useState(1);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [paused, setPaused] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const breathRef = useRef(1);
  const phaseIdxRef = useRef(0);
  const pausedRef = useRef(paused);

  const phase = PHASES[phaseIdx] || PHASES[0];
  const phaseKey = `${breath}-${phaseIdx}`;

  const speakSentence = useCallback((text) => {
   if (!text) return Promise.resolve();

   return new Promise((resolve) => {
     aiVoiceService.playSpeech(text, {
       isMuted: false,
       force: true,
       onStart: () => {},
       onEnd: () => resolve(),
       onError: () => resolve(),
     });
   });
  }, []);

  const advancePhase = useCallback(() => {
   let nextBreath = breathRef.current;
   let nextPhaseIdx = phaseIdxRef.current + 1;

   if (nextPhaseIdx >= PHASES.length) {
     nextBreath += 1;
     nextPhaseIdx = 0;
   }

   if (nextBreath > TOTAL_CYCLES) {
     aiVoiceService.stopSpeech();
     setShowCompletion(true);
     return;
   }

   breathRef.current = nextBreath;
   phaseIdxRef.current = nextPhaseIdx;
   setBreath(nextBreath);
   setPhaseIdx(nextPhaseIdx);
   setSecondsLeft(PHASES[nextPhaseIdx].duration);
  }, []);

  useEffect(() => {
   pausedRef.current = paused;
   if (paused) {
     aiVoiceService.pauseSpeech();
   } else {
     aiVoiceService.resumeSpeech();
   }
  }, [paused]);

  useEffect(() => {
   return () => {
     aiVoiceService.stopSpeech();
   };
  }, []);

  useEffect(() => {
   let active = true;

   const runIntro = async () => {
     if (!active) return;
     await speakSentence("Let's begin.");
     await new Promise((resolve) => setTimeout(resolve, 500));
     await speakSentence('Take a moment to settle in.');
     if (!active) return;
     setIntroComplete(true);
     setBreath(1);
     setPhaseIdx(0);
     breathRef.current = 1;
     phaseIdxRef.current = 0;
     setSecondsLeft(PHASES[0].duration);
   };

   runIntro();
   return () => {
     active = false;
   };
  }, [speakSentence]);

  useEffect(() => {
   if (!introComplete || paused || showCompletion) return;

   const tick = setInterval(() => {
     setSecondsLeft((prev) => {
       if (prev <= 0.1) {
         advancePhase();
         return PHASES[phaseIdxRef.current].duration;
       }
       return prev - 0.1;
     });
   }, 100);

   return () => clearInterval(tick);
  }, [introComplete, paused, showCompletion, advancePhase]);

  useEffect(() => {
   if (!introComplete || showCompletion) return;

   const phaseText = PHASES[phaseIdx].voiceText || PHASES[phaseIdx].displayText;
   const frame = window.requestAnimationFrame(() => {
     aiVoiceService.playSpeech(phaseText, {
       isMuted: false,
       force: true,
     });
   });

   return () => window.cancelAnimationFrame(frame);
  }, [phaseKey, introComplete, showCompletion, phaseIdx]);

  useEffect(() => {
   if (!showCompletion) return;
   const timer = setTimeout(() => onComplete(), 1600);
   return () => clearTimeout(timer);
  }, [showCompletion, onComplete]);

  const remaining = Math.max(0, Math.ceil(secondsLeft));
  const isExpanded = phase.phase === 'inhale' || phase.phase === 'hold';
  const isContracting = phase.phase === 'exhale';
  const scaleValue = isExpanded ? 1.16 : isContracting ? 0.92 : 0.96;
  const transitionDuration = `${phase.duration}s`;

  if (showCompletion) {
   return (
     <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-xl items-center justify-center px-6 py-10 text-center">
       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#F6F3FB]">
         <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EDE7FB] blur-[120px] opacity-70" />
       </div>

       <div className="relative z-10 flex max-w-md flex-col items-center">
         <h1 className="text-3xl font-extrabold tracking-tight text-[#2B2433]">You're here.</h1>
         <p className="mt-4 text-sm leading-relaxed text-[#6F6580]">
           You took a few quiet moments to reconnect with yourself.
         </p>
       </div>
     </div>
   );
  }

  return (
   <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-xl items-center justify-center px-6 py-8 text-center">
     <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#F6F3FB]">
       <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EDE7FB] blur-[120px] opacity-70" />
     </div>

     <div className="relative z-10 w-full max-w-md">
       <div className="flex flex-col items-center gap-2">
         <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#450BC8]">ONE GENTLE BREATH</p>
         <h1 className="text-[2rem] font-extrabold tracking-tight text-[#2B2433]">Closing your journey</h1>
         <p className="text-sm text-[#6F6580]">Breath {Math.min(breath, TOTAL_CYCLES)} of {TOTAL_CYCLES}</p>
       </div>

       <div className="mt-8 flex justify-center">
         <div
           className="relative flex items-center justify-center rounded-[50%] border border-white/40"
           style={{
             width: 220,
             height: 220,
             background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(198,183,245,0.52) 35%, rgba(69,11,200,0.12) 100%)',
             boxShadow: '0 25px 60px rgba(69,11,200,0.08), inset 0 0 25px rgba(255,255,255,0.4)',
             transform: `scale(${scaleValue})`,
             transition: `transform ${transitionDuration} ease-in-out`,
           }}
         >
           <div className="flex flex-col items-center justify-center text-center px-5">
             <div className="text-[2rem] font-extrabold leading-none tracking-tight text-[#2B2433]">{phase.displayText}</div>
             <div className="mt-3 text-sm font-medium text-[#6F6580]">{remaining} second{remaining === 1 ? '' : 's'}</div>
           </div>
         </div>
       </div>

       <div className="mt-8 flex items-center justify-center gap-2">
         {Array.from({ length: TOTAL_CYCLES }).map((_, index) => (
           <span
             key={index}
             className="inline-block rounded-full"
             style={{
               width: index < breath ? 11 : 9,
               height: index < breath ? 11 : 9,
               background: index < breath ? '#450BC8' : '#DED5F2',
               opacity: index < breath ? 1 : 0.8,
             }}
           />
         ))}
       </div>

       <div className="mt-8 flex justify-center">
         <button
           type="button"
           onClick={() => setPaused((current) => !current)}
           className="inline-flex items-center justify-center rounded-full bg-[#450BC8] px-6 py-2.5 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-[#3909A6]"
         >
           {paused ? (
             <>
               <CirclePlay className="mr-2 h-4 w-4" /> Resume
             </>
           ) : (
             <>
               <CirclePause className="mr-2 h-4 w-4" /> Pause
             </>
           )}
         </button>
       </div>
     </div>
   </div>
  );
}
