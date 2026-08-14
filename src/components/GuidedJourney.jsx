import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, CirclePause, CirclePlay, HeartHandshake, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { SENSE_COLORS } from './decorations';
import {
  FeelIllustration,
  HearIllustration,
  SeeIllustration,
  SmellIllustration,
  TasteIllustration,
} from './decorations';

const PAUSE_SECONDS = 10;
const SENSE_DURATIONS = { see: 10, hear: 10, feel: 12, smell: 12, taste: 15 };
const REST_SECONDS = 10;
const INTRO_EXTRA_SECONDS = 2.5;

function speechSeconds(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(5, Math.min(12, 1.5 + words * 0.45));
}
const JOURNEY = [
  {
    key: 'see',
    name: 'SEE',
    count: 5,
    label: '5 things',
    item: 'Thing',
    prompt: 'What can you see?',
    line: 'Look around you and notice five things.',
    cues: [
      'Find something green.',
      'Notice a bright colour.',
      'Look at something with an interesting shape.',
      'Find a small detail nearby.',
      'Choose one thing you enjoy looking at.',
    ],
    Illustration: SeeIllustration,
  },

  {
    key: 'hear',
    name: 'HEAR',
    count: 4,
    label: '4 sounds',
    item: 'Sound',
    prompt: 'What can you hear?',
    line: 'Pause and listen for four sounds.',
    cues: [
      'Listen for a sound nearby.',
      'Notice a sound in the distance.',
      'Listen for a quiet sound.',
      'Notice all the sounds around you.',
    ],
    Illustration: HearIllustration,
  },

  {
    key: 'feel',
    name: 'FEEL',
    count: 3,
    label: '3 sensations',
    item: 'Sensation',
    prompt: 'What can you feel?',
    line: 'Notice three sensations in your body.',
    cues: [
      'Feel the surface supporting you.',
      'Notice the air on your skin.',
      'Feel your hands and feet.',
    ],
    Illustration: FeelIllustration,
  },

  {
    key: 'smell',
    name: 'SMELL',
    count: 2,
    label: '2 scents',
    item: 'Scent',
    prompt: 'What can you smell?',
    line: 'Take a slow breath and notice two scents.',
    cues: [
      'Notice any scent around you.',
      'Take another slow breath.',
    ],
    Illustration: SmellIllustration,
  },

  {
    key: 'taste',
    name: 'TASTE',
    count: 1,
    label: '1 taste',
    item: 'Taste',
    prompt: 'What can you taste?',
    line: 'Notice the taste in your mouth.',
    cues: [
      'Notice the taste you can feel.',
    ],
    Illustration: TasteIllustration,
  },
];

const REST_SPEECH =
  'Take one slow breath in... and gently breathe out.';

const REFLECT_SPEECH =
  'How do you feel right now? There is no wrong answer.';

const REFLECT_OPTIONS = [
  'Feeling calmer',
  'A little lighter',
  'About the same',
  'Still heavy',
];

const THANKS_SPEECH =
  'You did it. Take one more slow breath. You are here, and you are okay.';
function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferred = voices.find((voice) =>
    /Samantha|Aria|Zira|Jenny|Google US English|Google UK English Female/i.test(voice.name),
  );
  return preferred || voices.find((voice) => voice.lang.startsWith('en')) || voices[0];
}

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function GuidedJourney({ onDone, onExit }) {
  const [phase, setPhase] = useState('sense');
  const [senseIdx, setSenseIdx] = useState(0);
  const [pauseIdx, setPauseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PAUSE_SECONDS);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [reflection, setReflection] = useState(null);
  const mutedRef = useRef(muted);
  const countdownDoneRef = useRef(false);
  mutedRef.current = muted;

  const sense = JOURNEY[senseIdx];
  const colors = SENSE_COLORS[sense.key];
  const stageCount = sense.count + 1;
  const isIntro = pauseIdx === 0;
  const displayCue = isIntro ? sense.line : sense.cues[(pauseIdx - 1) % sense.cues.length];
  const spokenCue = isIntro ? `${sense.name}. ${sense.prompt} ${sense.line}` : sense.cues[(pauseIdx - 1) % sense.cues.length];
  const spokenText =
    phase === 'rest' ? REST_SPEECH : phase === 'reflect' ? REFLECT_SPEECH : phase === 'sense' ? spokenCue : null;
  const duration =
    phase === 'rest'
      ? REST_SECONDS
      : phase === 'sense'
        ? isIntro
          ? speechSeconds(spokenCue) + INTRO_EXTRA_SECONDS
          : SENSE_DURATIONS[sense.key]
        : PAUSE_SECONDS;
  const fraction = Math.max(0, Math.min(1, secondsLeft / duration));

  const speak = useCallback((text) => {
    if (mutedRef.current) return;
    if (!('speechSynthesis' in window)) return;
    const synthesis = window.speechSynthesis;
    if (synthesis.speaking || synthesis.pending) synthesis.cancel();
    synthesis.resume();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.02;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    synthesis.speak(utterance);
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => pickVoice();
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const finishJourney = useCallback(
    (option) => {
      speak(option ? `${THANKS_SPEECH}` : THANKS_SPEECH);
      window.setTimeout(onDone, 3500);
    },
    [speak, onDone],
  );

  const advance = useCallback(() => {
    if (phase === 'sense') {
      if (pauseIdx + 1 < stageCount) {
        setPauseIdx((index) => index + 1);
      } else if (senseIdx + 1 < JOURNEY.length) {
        setSenseIdx((index) => index + 1);
        setPauseIdx(0);
      } else {
        setPhase('rest');
      }
    } else if (phase === 'rest') {
      setPhase('reflect');
    }
  }, [phase, senseIdx, pauseIdx, stageCount]);

  const selectReflection = useCallback(
    (option) => {
      if (reflection) return;
      setReflection(option);
      window.speechSynthesis.cancel();
      finishJourney(option);
    },
    [reflection, finishJourney],
  );

  const skip = useCallback(() => {
    window.speechSynthesis.cancel();
    advance();
  }, [advance]);

  useEffect(() => {
    if (secondsLeft > 0 || paused || phase === 'done' || phase === 'reflect') return;
    if (countdownDoneRef.current) return;
    countdownDoneRef.current = true;
    advance();
  }, [secondsLeft, paused, phase, advance]);

  useEffect(() => {
    setSecondsLeft(duration);
    setPaused(false);
    countdownDoneRef.current = false;
    const text =
      phase === 'rest' ? REST_SPEECH : phase === 'reflect' ? REFLECT_SPEECH : phase === 'sense' ? spokenCue : null;
    if (!text) return;
    const timer = window.setTimeout(() => speak(text), 150);
    return () => window.clearTimeout(timer);
  }, [phase, senseIdx, pauseIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (paused || phase === 'done' || phase === 'reflect') return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 0.1));
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, phase, senseIdx, pauseIdx]);

  useEffect(() => {
    if (phase !== 'sense' || !isIntro || paused) return;
    const timer = window.setTimeout(() => {
      if (countdownDoneRef.current) return;
      countdownDoneRef.current = true;
      advance();
    }, duration * 1000);
    return () => window.clearTimeout(timer);
  }, [phase, isIntro, paused, duration, advance]);

  const secondsShown = Math.ceil(secondsLeft);

  return (
    <div className="relative mx-auto flex min-h-[100dvh] max-w-2xl flex-col px-4 pb-10 pt-6 sm:px-8 sm:pt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.soft, opacity: 0.45 }}
        />
        <div
          className="absolute -bottom-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.wash, opacity: 0.5 }}
        />
      </div>

      <JourneyProgress senseIdx={senseIdx} phase={phase} />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {phase === 'reflect' ? (
          <>
            <div className="relative mx-auto grid h-36 w-36 place-items-center">
              <span
                className="absolute inset-0 rounded-full blur-2xl animate-glow"
                style={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
              />
              <span
                className="absolute inset-2 rounded-full animate-breathe"
                style={{ backgroundColor: 'rgba(251,207,232,0.5)' }}
              />
              <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white/85 shadow-[0_14px_40px_rgba(69,11,200,0.12)]">
                <HeartHandshake size={40} style={{ color: '#450BC8' }} strokeWidth={1.7} />
              </span>
            </div>
            <p
              className="mt-6 inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em]"
              style={{ backgroundColor: '#E9E4F5', color: '#450BC8' }}
            >
              A gentle check-in
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#2B2433]">
              How did that feel?
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#8B8294]">
              Tap whichever feels closest. There is no wrong answer.
            </p>
            <div className="mt-7 grid w-full max-w-sm grid-cols-2 gap-2.5">
              {REFLECT_OPTIONS.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectReflection(option)}
                  aria-pressed={reflection === option}
                  disabled={reflection !== null}
                  className={`rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2 disabled:opacity-60 ${
                    reflection === option ? 'text-white' : 'bg-white text-[#554C61]'
                  }`}
                  style={{
                    borderColor: reflection === option ? '#450BC8' : '#EEE9F6',
                    backgroundColor:
                      reflection === option ? '#450BC8' : 'rgba(255,255,255,0.9)',
                    boxShadow:
                      reflection === option
                        ? '0 10px 26px rgba(69,11,200,0.28)'
                        : '0 2px 10px rgba(69,11,200,0.05)',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {reflection && (
              <p className="mt-4 text-xs font-semibold text-[#450BC8] animate-rise">
                Thank you. However you feel is exactly right.
              </p>
            )}
          </>
        ) : phase === 'rest' ? (
          <>
            <div className="relative mx-auto grid h-52 w-52 place-items-center">
              <span
                className="absolute inset-0 rounded-full blur-2xl animate-glow"
                style={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
              />
              <span
                className="absolute inset-3 rounded-full animate-breathe"
                style={{ backgroundColor: 'rgba(167,243,208,0.45)' }}
              />
              <span className="relative grid h-32 w-32 place-items-center rounded-full bg-white/85 shadow-[0_14px_40px_rgba(69,11,200,0.12)]">
                <span
                  className="block h-12 w-12 rounded-full border-4"
                  style={{ borderColor: '#7C3AED', borderRightColor: '#A7F3D0' }}
                />
              </span>
            </div>
            <p
              className="mt-6 inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em]"
              style={{ backgroundColor: '#E9E4F5', color: '#450BC8' }}
            >
              One last breath
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#2B2433]">
              Breathe with the glow
            </h1>
            <p className="mt-2 text-sm text-[#8B8294]">In… and out… just for a little while.</p>
            <p className="mt-6 font-mono text-sm font-bold text-[#450BC8]">{secondsShown}s</p>
          </>
        ) : (
          <div className="flex w-full max-w-lg min-h-[440px] flex-col items-center justify-center">
            <div className="mx-auto w-full max-w-md animate-pop">
              <sense.Illustration />
            </div>
            <p
              className="mx-auto mt-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em]"
              style={{ backgroundColor: colors.soft, color: colors.accent }}
            >
              {isIntro
                ? `${sense.name} · ${sense.label}`
                : `${sense.name} · ${sense.item} ${pauseIdx} of ${sense.count}`}
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#2B2433] sm:text-4xl">
              {sense.prompt}
            </h1>
            <p className="mx-auto mt-2 max-w-md break-words text-sm leading-6 text-[#8B8294] [overflow-wrap:anywhere]">
              {sense.line}
            </p>

            <div
              aria-hidden={isIntro}
              className={`mx-auto mt-8 flex w-fit max-w-full items-center gap-4 ${isIntro ? 'invisible' : ''}`}
            >
                <svg
                    width="112"
                    height="112"
                    viewBox="0 0 112 112"
                    role="timer"
                    aria-label={`${secondsShown} seconds remaining`}
                  >
                    <circle cx="56" cy="56" r={RADIUS} fill="none" stroke="#EFEAF6" strokeWidth="7" />
                    <circle
                      cx="56"
                      cy="56"
                      r={RADIUS}
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={CIRCUMFERENCE * (1 - fraction)}
                      transform="rotate(-90 56 56)"
                      style={{ transition: 'stroke-dashoffset 100ms linear' }}
                    />
                    <text
                      x="56"
                      y="56"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-[#2B2433]"
                      fontSize="22"
                      fontWeight="800"
                    >
                      {secondsShown}
                    </text>
                  </svg>
                  <div className="min-w-0 whitespace-normal text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8B8294]">
                      Just notice
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold leading-6 text-[#554C61] [overflow-wrap:anywhere]">
                      {displayCue}
                    </p>
                  </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        {phase === 'reflect' ? (
          <button
            type="button"
            onClick={() => {
              window.speechSynthesis.cancel();
              onExit();
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#9A91A3] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Leave the journey
          </button>
        ) : (
          <>
            <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMuted((value) => !value);
              if (!muted) window.speechSynthesis.cancel();
            }}
            aria-pressed={muted}
            aria-label={muted ? 'Turn voice on' : 'Turn voice off'}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#E3DCF0] bg-white text-[#6F6580] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className="inline-flex items-center gap-2 rounded-full bg-[#450BC8] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(69,11,200,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(69,11,200,0.34)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2"
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
            className="grid h-11 w-11 place-items-center rounded-full border border-[#E3DCF0] bg-white text-[#6F6580] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onExit();
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#9A91A3] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Leave the journey
        </button>
          </>
        )}
      </div>
    </div>
  );
}

function JourneyProgress({ senseIdx, phase }) {
  const allDone = phase === 'rest' || phase === 'reflect' || phase === 'done';
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between" aria-hidden="true">
      {JOURNEY.map((item, index) => {
        const done = allDone || index < senseIdx;
        const current = index === senseIdx && !allDone;
        return (
          <div key={item.key} className="flex flex-1 items-center">
            <span
              className={`grid h-3 w-3 place-items-center rounded-full transition-colors duration-300 ${
                current ? 'animate-glow' : ''
              }`}
              style={{
                backgroundColor: done ? SENSE_COLORS[item.key].accent : '#E7E1F0',
                boxShadow: current ? `0 0 0 4px ${SENSE_COLORS[item.key].soft}` : 'none',
              }}
            />
            {index < JOURNEY.length - 1 && (
              <span
                className="mx-1 h-1 flex-1 rounded-full sm:mx-1.5"
                style={{
                  backgroundColor: done ? SENSE_COLORS[JOURNEY[index + 1].key].accent : '#E7E1F0',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}