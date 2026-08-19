import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CirclePause,
  CirclePlay,
  Heart,
  HeartHandshake,
  Mic,
  RotateCcw,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  Wind,
  X,
} from 'lucide-react';
import { SENSE_COLORS, STEP_ILLUSTRATIONS } from './decorations';

import { GUIDANCE_SCHEDULE, TRANSITION_SPEECH } from './guidanceData';
import { aiVoiceService } from '../services/aiVoiceService';

function playGentleChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    // Ignore audio context restrictions
  }
}

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function GuidedJourney({ senses, onDone, onExit }) {
  const steps = senses || [];
  const [phase, setPhase] = useState('sense'); // 'sense' | 'rest' | 'reflect'
  const [senseIdx, setSenseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [dynamicSubtext, setDynamicSubtext] = useState('');
  const [reflection, setReflection] = useState(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const mutedRef = useRef(muted);
  const pausedRef = useRef(paused);
  const countdownDoneRef = useRef(false);
  const spokenCueIndicesRef = useRef(new Set());
  const previousGuidanceRef = useRef([]);
  const sessionIdRef = useRef(0);
  const isTransitioningRef = useRef(false);

  mutedRef.current = muted;
  pausedRef.current = paused;

  const currentStep = steps[senseIdx] || steps[0];
  const colors = (currentStep && SENSE_COLORS[currentStep.key]) || SENSE_COLORS.touch;
  const IllustrationComponent = (currentStep && STEP_ILLUSTRATIONS[currentStep.key]) || STEP_ILLUSTRATIONS.touch;

  const duration = 30;
  const fraction = Math.max(0, Math.min(1, secondsLeft / duration));

  // Speech wrapper
  const speak = useCallback((text) => {
    if (!text || mutedRef.current || pausedRef.current) {
      setIsSpeaking(false);
      setIsGenerating(false);
      return;
    }

    aiVoiceService.playSpeech(text, {
      onGenerating: () => {
        setIsGenerating(true);
        setIsSpeaking(false);
      },
      onStart: ({ mode }) => {
        setIsGenerating(false);
        setIsSpeaking(true);
        setIsFallback(mode === 'fallback');
      },
      onEnd: () => {
        setIsGenerating(false);
        setIsSpeaking(false);
      },
      onError: () => {
        setIsGenerating(false);
        setIsSpeaking(false);
      },
      onFallback: () => {
        setIsFallback(true);
      },
      isMuted: mutedRef.current,
    });
  }, []);

  // Process and play scheduled cue
  const triggerGuidanceCue = useCallback(
    (cueIndex) => {
      if (!currentStep) return;
      const cues = GUIDANCE_SCHEDULE[currentStep.key];
      if (!cues || !cues[cueIndex]) return;

      const text = cues[cueIndex].text;

      previousGuidanceRef.current.push(text);
      setDynamicSubtext(text);

      if (!mutedRef.current && !pausedRef.current) {
        speak(text);
      }
    },
    [currentStep, speak],
  );

  const finishJourney = useCallback(
    () => {
      aiVoiceService.stopSpeech();
      onDone();
    },
    [onDone],
  );

  const advance = useCallback(() => {
  isTransitioningRef.current = false;
  sessionIdRef.current++;
  // stop any current speech and queued requests so the next sense starts cleanly
  aiVoiceService.stopSpeech();
  setIsSpeaking(false);
  setIsGenerating(false);

  if (senseIdx + 1 < steps.length) {
    // Move to next sense immediately. Initial guidance for the new sense
    // will be triggered by the sense initialization effect (which runs on senseIdx change)
    setSenseIdx((index) => index + 1);
    setSecondsLeft(30);
  } else {
    finishJourney();
  }
  }, [senseIdx, steps, finishJourney]);

  const skip = useCallback(() => {
    sessionIdRef.current++;
    aiVoiceService.stopSpeech();
    setIsSpeaking(false);
    setIsGenerating(false);
    advance();
  }, [advance]);

  // When this component mounts, force the voice service to use speechSynthesis fallback for timing reliability
  useEffect(() => {
    const prev = aiVoiceService.isFallbackForced;
    aiVoiceService.setConfig({ forceFallback: true });
    return () => {
      aiVoiceService.setConfig({ forceFallback: false });
    };
  }, []);

  // Handle new step initialization
  useEffect(() => {
    sessionIdRef.current++;
    setSecondsLeft(duration);
    setPaused(false);
    countdownDoneRef.current = false;
    spokenCueIndicesRef.current.clear();
    previousGuidanceRef.current = [];
    if (currentStep) {
      setDynamicSubtext(currentStep.subtext || '');
    }
    playGentleChime();

    // Helper: pick a clear, native/neural English voice when available
    const selectPreferredVoice = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices() || [];
      // prefer modern neural / high quality voices by name hints, then any en-* voice
      const preferred = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en') && /neural|wavenet|google|samantha|alloy|aria|joanna|matthew|amy|brian|zira|david|jenny/i.test((v.name || '') + ' ' + (v.voiceURI || '')));
      if (preferred) return preferred;
      const anyEn = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
      return anyEn || voices[0] || null;
    };

    // Helper: direct low-level speechSynthesis play for maximum timing reliability
    const speakNow = (text) => {
      if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      try {
        // stop any prior speech
        try { window.speechSynthesis.cancel(); } catch (e) {}

        const sentences = text.split(/(?<=\.|\?|!|\u201D)\s+/).filter(Boolean);
        const preferredVoice = selectPreferredVoice();
        sentences.forEach((s, i) => {
          const utt = new SpeechSynthesisUtterance(s);
          utt.lang = 'en-US';
          utt.rate = 0.98; // slightly faster but clear
          utt.pitch = 1.05; // slightly warmer
          utt.volume = 1.0;
          if (preferredVoice) utt.voice = preferredVoice;
          // mark speaking state: set true on first utterance, clear on last
          if (i === 0) {
            utt.onstart = () => {
              setIsSpeaking(true);
              setIsGenerating(false);
              setIsFallback(true);
            };
          }
          if (i === sentences.length - 1) {
            utt.onend = () => {
              setIsSpeaking(false);
            };
          }
          // speak immediately; browser will queue utterances in order
          window.speechSynthesis.speak(utt);
        });
      } catch (e) {
        // ignore
      }
    };

    // Immediately trigger time-0 guidance (if any) so voice starts exactly with the timer
    try {
      if (typeof window !== 'undefined' && currentStep) {
        const cues = GUIDANCE_SCHEDULE[currentStep.key] || [];
        if (cues.length && cues[0] && !mutedRef.current && !pausedRef.current) {
          // ensure DOM updated before playing voice
          window.requestAnimationFrame(() => {
            // mark index 0 as spoken and trigger
            if (!spokenCueIndicesRef.current.has(0)) {
              spokenCueIndicesRef.current.add(0);
              previousGuidanceRef.current.push(cues[0].text);
              setDynamicSubtext(cues[0].text);

              // Ensure any previous speech is stopped so new cue can start cleanly
              try { aiVoiceService.stopSpeech(); } catch (e) {}

              // Play immediately via direct speechSynthesis for lowest latency
              try {
                speakNow(cues[0].text);
              } catch (e) {
                // fallback to existing service
                try { aiVoiceService.playFallback(cues[0].text); } catch (e2) { speak(cues[0].text); }
              }

              // Preload remaining cues' AI audio in background (don't block)
              if (cues.length > 1) {
                cues.slice(1).forEach((c) => aiVoiceService.preloadSpeech(c.text));
              }
            }
          });
        }
      }
    } catch (e) {
      // silent fail-safe
    }
  }, [senseIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pause / Mute listeners
  useEffect(() => {
    if (paused) {
      aiVoiceService.pauseSpeech();
      setIsSpeaking(false);
      setIsGenerating(false);
    } else {
      aiVoiceService.resumeSpeech();
    }
  }, [paused]);

  useEffect(() => {
    aiVoiceService.setMuted(muted);
    if (muted) {
      setIsSpeaking(false);
      setIsGenerating(false);
    }
  }, [muted]);

  // Guidance Scheduler Loop (React Timer controls timing strictly)
  useEffect(() => {
    if (paused || phase !== 'sense' || !currentStep) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0.1) {
          if (!countdownDoneRef.current) {
            countdownDoneRef.current = true;
          }
          return 0;
        }

        const newSecondsLeft = prev - 0.1;
        const elapsedTime = 30 - newSecondsLeft;
        const cues = GUIDANCE_SCHEDULE[currentStep.key] || [];

        cues.forEach((cue, index) => {
          if (elapsedTime >= cue.time && !spokenCueIndicesRef.current.has(index)) {
            spokenCueIndicesRef.current.add(index);
              // Use low-latency fallback playback to keep timing tight
              if (!mutedRef.current && !pausedRef.current) {
                try {
                  // stop any lingering speech to avoid stuck state and ensure immediate playback
                  aiVoiceService.stopSpeech();
                  // direct speak for high reliability
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    try { window.speechSynthesis.cancel(); } catch (e) {}
                    const utt = new SpeechSynthesisUtterance(cue.text);
                    utt.lang = 'en-US';
                    utt.rate = 0.98;
                    utt.pitch = 1.05;
                    utt.volume = 1.0;
                    const preferred = selectPreferredVoice();
                    if (preferred) {
                      utt.voice = preferred;
                    } else {
                      const voices = window.speechSynthesis.getVoices() || [];
                      const eng = voices.find((v) => v.lang && v.lang.startsWith('en')) || voices[0];
                      if (eng) utt.voice = eng;
                    }
                    // reflect speaking state for UI
                    utt.onstart = () => {
                      setIsSpeaking(true);
                      setIsGenerating(false);
                      setIsFallback(true);
                      setDynamicSubtext(cue.text);
                    };
                    utt.onend = () => {
                      setIsSpeaking(false);
                    };
                    window.speechSynthesis.speak(utt);
                  } else {
                    aiVoiceService.playFallback(cue.text, { onStart: () => { setIsSpeaking(true); setIsFallback(true); }, onEnd: () => { setIsSpeaking(false); }, onError: () => { setIsSpeaking(false); } });
                  }
                } catch (e) {
                  // fallback to original trigger
                  triggerGuidanceCue(index);
                }
              } else {
                // still update dynamic subtext even if muted
                previousGuidanceRef.current.push(cue.text);
                setDynamicSubtext(cue.text);
              }
            }
        });

        return newSecondsLeft;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [paused, phase, senseIdx, currentStep, triggerGuidanceCue]);

  // Transition safely only when countdown is explicitly done and voice is completely idle.
  // Add a fallback watcher for browsers where TTS events can be unreliable (Edge).
  useEffect(() => {
    if (secondsLeft !== 0 || !countdownDoneRef.current || isTransitioningRef.current || phase !== 'sense') return;

    let cancelled = false;
    isTransitioningRef.current = true;

    const proceed = () => {
      if (cancelled) return;
      advance();
    };

    // If UI reports not speaking and not generating, proceed after a short pause
    if (!isSpeaking && !isGenerating) {
      const timer = setTimeout(proceed, 600);
      return () => {
        cancelled = true;
        isTransitioningRef.current = false;
        clearTimeout(timer);
      };
    }

    // Otherwise, poll the aiVoiceService.isIdle() for up to 2s, then proceed regardless to avoid getting stuck
    let elapsed = 0;
    const pollInterval = 150;
    const maxWait = 2000;

    const poller = setInterval(() => {
      elapsed += pollInterval;
      try {
        if (aiVoiceService.isIdle()) {
          clearInterval(poller);
          if (!cancelled) proceed();
        } else if (elapsed >= maxWait) {
          // give up waiting and proceed to avoid stuck state
          clearInterval(poller);
          if (!cancelled) proceed();
        }
      } catch (e) {
        // on error, proceed to avoid blocking
        clearInterval(poller);
        if (!cancelled) proceed();
      }
    }, pollInterval);

    return () => {
      cancelled = true;
      isTransitioningRef.current = false;
      clearInterval(poller);
    };
  }, [secondsLeft, isSpeaking, isGenerating, phase, advance]);

  const secondsShown = Math.ceil(secondsLeft);


  return (
    <div className="relative mx-auto overflow-x-hidden flex min-h-[100dvh] w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8 pb-8 pt-5">
      {/* Background Soft Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-2xl transition-colors duration-700 opacity-20"
          style={{ backgroundColor: colors.soft }}
        />
      </div>

      {/* TOP HEADER */}
      <header className="flex items-center justify-between border-b border-[#EEE9F6]/80 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#450BC8] text-white shadow-xs">
            <Heart className="h-4.5 w-4.5 fill-current" />
          </span>
          <span className="text-base font-extrabold text-[#2B2433]">Find Your Calm</span>
        </div>

        <button
          type="button"
          onClick={() => {
            sessionIdRef.current++;
            aiVoiceService.stopSpeech();
            onExit();
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#EEE9F6] bg-white px-4 py-2 text-xs font-bold text-[#6F6580] transition-all hover:bg-[#F8F5FD] hover:text-[#450BC8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Exit Journey
        </button>
      </header>

      {/* Mobile Horizontal Progress Bar */}
      <div className="py-3 lg:hidden">
        <MobileJourneyProgress steps={steps} senseIdx={senseIdx} phase={phase} />
      </div>

      {/* STEP BADGE: centered above the 3-column grid */}
      <div className="mb-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="hidden lg:grid lg:grid-cols-12">
            <div className="lg:col-span-3" />
            <div className="lg:col-span-6 flex justify-center">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-2xs"
                style={{ backgroundColor: colors.soft, color: colors.accent }}
              >
                <span>{currentStep?.emoji}</span> {currentStep?.name} · Step {senseIdx + 1} of {steps.length}
              </span>
            </div>
            <div className="lg:col-span-3" />
          </div>

          <div className="lg:hidden flex justify-center">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-2xs"
              style={{ backgroundColor: colors.soft, color: colors.accent }}
            >
              <span>{currentStep?.emoji}</span> {currentStep?.name} · Step {senseIdx + 1} of {steps.length}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD STRUCTURE */}
      {/* Grid: left 25% / center 50% / right 25% — responsive */}
      <div className="grid flex-1 grid-cols-1 items-start gap-6 py-4 lg:grid-cols-12 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR (Desktop) */}
       <aside className="hidden lg:block lg:col-span-3 rounded-3xl border border-[#EEE9F6] bg-white p-5 shadow-xs">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#450BC8] mb-4">
            Your Journey
          </h2>
          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isCurrent = idx === senseIdx;
              const isCompleted = idx < senseIdx;

              return (
                <div
                  key={step.key}
                  className={`flex items-center justify-between rounded-2xl px-3.5 py-3 transition-all ${isCurrent
                    ? 'bg-[#450BC8] text-white shadow-xs'
                    : isCompleted
                      ? 'bg-[#F4EFFC] text-[#450BC8]'
                      : 'bg-white border border-[#EEE9F6] text-[#8B8294]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{step.emoji}</span>
                    <span className="text-xs font-extrabold">
                      0{idx + 1} {step.name}
                    </span>
                  </div>

                  {isCompleted ? (
                    <Check className="h-4 w-4 text-[#059669]" />
                  ) : (
                    <span className="text-[10px] font-extrabold opacity-75">30s</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-[#F3EFEA] pt-4 text-center">
            <p className="text-[11px] text-[#8B8294] leading-relaxed">
              Focus purely on the current sense. Take silence as active rest.
            </p>
          </div>
        </aside>

        {/* CENTER MAIN ACTIVITY AREA */}
        <main className="lg:col-span-6 flex flex-col items-start text-center">
          {/* Large Clear Action Illustration */}
          <div className="w-full animate-pop my-0">
            <div className="relative mx-auto" style={{ maxWidth: 560 }}>
              {/* Outer pastel container: compact and proportional */}
              <div
                className="relative mx-auto flex items-center justify-center"
                style={{
                  minHeight: 360,               // moderate outer height
                  padding: 28,                  // 24–32px padding around inner image
                  backgroundColor: colors.soft,
                  border: 'none',
                  outline: 'none',
                  borderRadius: 24,
                  boxShadow: '0 8px 24px rgba(20,20,40,0.035)'
                }}
              >
                {/* Inner image area ~82–86% of outer; centered with balanced padding */}
                <div style={{ width: '85%', height: '85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IllustrationComponent style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instruction & Subtitle: centered under the center card */}
          <div style={{ maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', width: '100%' }}>
            <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-[#2B2433] sm:text-3xl leading-snug text-center" style={{ margin: 0 }}>
              “{currentStep?.prompt}”
            </h1>

            {!isSpeaking && (
              <p className="mt-6 min-h-[44px] text-xs sm:text-sm leading-relaxed text-[#6F6580] transition-all duration-300" style={{ margin: '8px auto 0' }}>
                {dynamicSubtext || currentStep?.subtext}
              </p>
            )}
          </div>
        </main>

        {/* RIGHT PANEL (AI Guide & Timer & Controls) */}
       <aside className="lg:col-span-3 flex flex-col gap-5">
          {/* Calm Guide Card */}
          <div className="rounded-3xl border border-[#EEE9F6] bg-white p-5 shadow-xs flex flex-col items-center justify-center text-center order-5 lg:order-1">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F3FB] text-lg shadow-inner border border-[#E9E4F5]">
              🌿
            </div>
            <h3 className="text-[13px] font-extrabold tracking-wide text-[#450BC8] mb-1">
              Calm Guide
            </h3>
            <p className="text-[11px] text-[#8B8294]">
              Guiding you gently
            </p>
          </div>

          {/* Timer Panel */}
          <div className="rounded-3xl border border-[#EEE9F6] bg-white p-5 shadow-xs text-center order-4 lg:order-2">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B8294] mb-2">
              Time Remaining
            </h3>
            <div className="relative mx-auto grid place-items-center">
              <svg width="90" height="90" viewBox="0 0 90 90" role="timer">
                <circle cx="45" cy="45" r={RADIUS} fill="none" stroke="#EFEAF6" strokeWidth="6" />
                <circle
                  cx="45"
                  cy="45"
                  r={RADIUS}
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - fraction)}
                  transform="rotate(-90 45 45)"
                  style={{ transition: 'stroke-dashoffset 100ms linear' }}
                />
                <text
                  x="45"
                  y="45"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-[#2B2433]"
                  fontSize="22"
                  fontWeight="800"
                >
                  {secondsShown}
                </text>
              </svg>
            </div>
            <p className="mt-2 text-[11px] font-extrabold text-[#554C61]">30 SECONDS STEP</p>
          </div>

          {/* Dashboard Control Buttons */}
          <div className="rounded-3xl border border-[#EEE9F6] bg-white p-4 shadow-xs flex items-center justify-center gap-2 order-6 lg:order-3">
            <button
              type="button"
              onClick={() => setMuted((val) => !val)}
              aria-label={muted ? 'Unmute voice' : 'Mute voice'}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#E3DCF0] bg-white text-[#6F6580] transition-all hover:bg-[#F6F3FB]"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => setPaused((val) => !val)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#450BC8] py-3 text-xs font-extrabold text-white shadow-xs transition-all hover:bg-[#3909A6]"
            >
              {paused ? (
                <>
                  <CirclePlay className="h-4 w-4" /> Resume
                </>
              ) : (
                <>
                  <CirclePause className="h-4 w-4" /> Pause
                </>
              )}
            </button>

            <button
              type="button"
              onClick={skip}
              aria-label="Skip to next step"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#E3DCF0] bg-white text-[#6F6580] transition-all hover:bg-[#F6F3FB]"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </aside>
      </div>

      {/* Voice Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-rise">
          <div className="w-full max-w-md rounded-3xl border border-[#EEE9F6] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EBF8]">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#450BC8] text-white">
                  <Mic className="h-4 w-4" />
                </span>
                <h3 className="text-base font-extrabold text-[#2B2433]">AI Calm Guide System</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-[#8B8294] hover:bg-[#F6F3FB] hover:text-[#2B2433]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4">
              <p className="text-xs text-[#8B8294] mb-3">
                Dynamic AI Text Generation & Natural Speech System.
              </p>
              <p className="text-xs text-[#6F6580] bg-[#F6F3FB] p-3.5 rounded-xl border border-[#EEE9F6] leading-relaxed">
                When <code className="font-mono text-[#450BC8]">AI_API_KEY</code> is set, short contextual grounding instructions are generated on the fly via server API. Otherwise, the app falls back to approved fixed guidance and browser neural voices.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F0EBF8]">
              <button
                type="button"
                onClick={() => speak('This is your calm AI guide speaking.')}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EEE9F6] bg-[#F6F3FB] px-4 py-2 text-xs font-bold text-[#450BC8] hover:bg-[#EFEAF9]"
              >
                <Volume2 className="h-3.5 w-3.5" /> Test Voice
              </button>
              <button
                type="button"
                onClick={() => setShowVoiceModal(false)}
                className="rounded-full bg-[#450BC8] px-5 py-2 text-xs font-extrabold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileJourneyProgress({ steps, senseIdx }) {
  const allDone = false;
  const journeySteps = steps || [];

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold" aria-label="Mobile step progress">
      {journeySteps.map((step, idx) => {
        const done = allDone || idx < senseIdx;
        const current = idx === senseIdx && !allDone;
        return (
          <div key={step.key} className="flex items-center gap-1">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-all ${current
                ? 'bg-[#450BC8] text-white shadow-xs'
                : done
                  ? 'bg-[#E9E4F5] text-[#450BC8]'
                  : 'bg-white border border-[#EEE9F6] text-[#8B8294]'
                }`}
            >
              <span>{step.emoji}</span>
              <span className="hidden sm:inline">{step.name}</span>
            </span>
            {idx < journeySteps.length - 1 && <span className="text-[#9A91A3] text-[9px]">→</span>}
          </div>
        );
      })}
    </div>
  );
}