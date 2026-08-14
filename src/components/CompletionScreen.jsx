import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { CompletionIllustration, FloatingBits } from './decorations';

export function CompletionScreen({ onRestart }) {
  const [staying, setStaying] = useState(false);

  if (staying) {
    return (
      <div className="relative mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-6 py-12 text-center">
        <FloatingBits />
        <div className="relative grid h-56 w-56 place-items-center">
          <span
            className="absolute inset-0 rounded-full blur-2xl animate-glow"
            style={{ backgroundColor: 'rgba(124,58,237,0.2)' }}
          />
          <span
            className="absolute inset-4 rounded-full animate-breathe"
            style={{ backgroundColor: 'rgba(167,243,208,0.4)' }}
          />
          <span className="relative grid h-36 w-36 place-items-center rounded-full bg-white/80 shadow-[0_14px_40px_rgba(69,11,200,0.14)]">
            <span
              className="block h-16 w-16 rounded-full border-4"
              style={{ borderColor: '#7C3AED', borderRightColor: '#A7F3D0' }}
            />
          </span>
        </div>
        <h2 className="mt-8 text-2xl font-extrabold tracking-[-0.03em] text-[#2B2433]">
          Breathe with the glow
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#8B8294]">In… and out… just for a little while.</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-8 rounded-full border border-[#E3DCF0] bg-white px-6 py-2.5 text-xs font-bold text-[#450BC8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2"
        >
          Back to the beginning
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-6 py-12 text-center">
      <FloatingBits />
      <div className="animate-pop">
        <CompletionIllustration />
      </div>

      <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.04em] text-[#2B2433] animate-rise sm:text-5xl">
        You are <span className="text-[#450BC8]">here.</span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[#8B8294] animate-rise" style={{ animationDelay: '150ms' }}>
        You paused, breathed, and noticed the world around you through all five senses.
      </p>
      <p className="mt-6 text-sm font-bold text-[#450BC8] animate-rise" style={{ animationDelay: '300ms' }}>
        Take one more slow breath.
      </p>

      <div className="mt-9 flex w-full max-w-xs flex-col gap-3 animate-rise" style={{ animationDelay: '450ms' }}>
        <button
          type="button"
          onClick={onRestart}
          className="w-full rounded-full bg-[#450BC8] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(69,11,200,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(69,11,200,0.34)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2"
        >
          Do it again
        </button>
        <button
          type="button"
          onClick={() => setStaying(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E3DCF0] bg-white px-6 py-3.5 text-sm font-bold text-[#450BC8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(69,11,200,0.1)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-4 w-4" /> Stay here a little longer
        </button>
      </div>
    </div>
  );
}