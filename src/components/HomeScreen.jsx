import { Clock, Heart, Mic, Play, Wind } from 'lucide-react';
import { FloatingBits, SENSE_COLORS } from './decorations';

export function HomeScreen({ senses, onStart }) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
      <FloatingBits />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: '#C4B5FD', opacity: 0.22 }}
        />
        <div
          className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#BAE6FD', opacity: 0.25 }}
        />
        <div
          className="absolute -bottom-16 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: '#A7F3D0', opacity: 0.25 }}
        />
      </div>

      <header className="flex items-center justify-between py-5">
        <a href="#" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2B2433]">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#450BC8] text-white shadow-[0_6px_18px_rgba(69,11,200,0.25)]">
            <Heart className="h-4 w-4" fill="currentColor" />
          </span>
          Find Your Calm
        </a>
        <div className="hidden items-center gap-6 text-xs font-bold text-[#8B8294] md:flex">
          <a href="#journey" className="transition-colors hover:text-[#450BC8]">
            The journey
          </a>
          <a href="#why" className="transition-colors hover:text-[#450BC8]">
            Why it works
          </a>
          <button
            type="button"
            onClick={onStart}
            className="rounded-full bg-[#450BC8] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_22px_rgba(69,11,200,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(69,11,200,0.34)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2"
          >
            Begin
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-10 py-8 lg:flex-row lg:gap-16 lg:py-10">
        <div className="max-w-xl text-center lg:text-left">
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E9E4F5] bg-white/80 px-4 py-1.5 text-xs font-bold tracking-wide text-[#450BC8] shadow-sm lg:mx-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[#450BC8] animate-glow" />
            Find Your Calm
          </p>
          <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-[#2B2433] sm:text-5xl lg:text-6xl">
            5 Senses <span className="text-[#450BC8]">Grounding</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-[#6F6580] sm:text-xl">Come back to now.</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#8B8294] lg:mx-0">
            A calm voice guides you through your senses, one gentle pause at a time. No typing,
            no judgment — just a few minutes for yourself.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#450BC8] px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(69,11,200,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(69,11,200,0.38)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2 sm:w-auto"
            >
              <Play className="h-5 w-5" fill="currentColor" /> Begin the guided journey
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#9A91A3]">
            About 3–4 minutes · Sound on recommended · Free, right in your browser
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
            {[
              { Icon: Mic, label: 'Calm voice guidance' },
              { Icon: Clock, label: 'Gentle timed pauses' },
              { Icon: Wind, label: 'Breathe between senses' },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex h-6 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[#8B8294]"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: '#450BC8' }} strokeWidth={2} />{' '}
                {label}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual senses={senses} className="hidden lg:block" />
      </main>

      <section id="journey" className="py-10">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#450BC8]">
            The journey
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#2B2433] sm:text-3xl">
            One sense at a time
          </h2>
        </div>
        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {senses.map((sense) => {
            const colors = SENSE_COLORS[sense.key];
            return (
              <div
                key={sense.key}
                className="rounded-3xl border border-[#EEE9F6] bg-white/90 p-4 text-center shadow-[0_4px_18px_rgba(69,11,200,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(69,11,200,0.12)] sm:p-5"
              >
                <span
                  className="mx-auto grid h-11 w-11 place-items-center rounded-2xl sm:h-12 sm:w-12"
                  style={{ backgroundColor: colors.soft }}
                >
                  <sense.Icon size={22} style={{ color: colors.accent }} strokeWidth={1.8} />
                </span>
                <p className="mt-3 text-sm font-extrabold tracking-wide text-[#2B2433]">
                  {sense.name}
                </p>
                <span
                  className="mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold"
                  style={{ backgroundColor: colors.soft, color: colors.accent }}
                >
                  {sense.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="why" className="mx-auto max-w-3xl py-8 text-center">
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#2B2433] sm:text-2xl">
          Why grounding works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#8B8294]">
          When your mind feels scattered, the five senses anchor you in the present. Guided by
          the gentle 5–4–3–2–1 rhythm — five things you can see, four you can hear, three you can
          feel, two you can smell, and one you can taste — this practice helps your body settle,
          breath by breath.
        </p>
      </section>

      <footer className="border-t border-[#EEE9F6] py-6 text-center text-xs leading-5 text-[#9A91A3]">
        Find Your Calm · A gentle moment for yourself · Made with care
      </footer>
    </div>
  );
}

function HeroVisual({ senses }) {
  return (
    <div
      aria-hidden="true"
      className="relative grid h-96 w-96 shrink-0 place-items-center rounded-[2.5rem] border border-white/70 bg-white/60 shadow-[0_24px_60px_rgba(69,11,200,0.1)] backdrop-blur"
    >
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#C4B5FD]/40 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#A7F3D0]/40 blur-2xl" />
      <div className="absolute -right-8 top-16 h-32 w-32 rounded-full bg-[#FBCFE8]/40 blur-2xl" />

      <div className="relative grid place-items-center">
        <span
          className="absolute h-40 w-40 rounded-full animate-breathe"
          style={{ backgroundColor: 'rgba(69,11,200,0.08)' }}
        />
        <span
          className="absolute h-56 w-56 rounded-full border border-[#E9E4F5]"
          style={{ animation: 'ring 3s ease-out infinite' }}
        />
        <span
          className="absolute h-56 w-56 rounded-full border border-[#E9E4F5]"
          style={{ animation: 'ring 3s ease-out infinite 1.5s' }}
        />
        <span className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-[0_14px_36px_rgba(69,11,200,0.16)]">
          <Heart className="h-10 w-10" style={{ color: '#450BC8' }} fill="currentColor" strokeWidth={1.6} />
        </span>
        {senses.map((sense, index) => {
          const colors = SENSE_COLORS[sense.key];
          const angle = (index / senses.length) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * 130;
          const y = Math.sin(angle) * 130;
          return (
            <span
              key={sense.key}
              className="absolute grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_8px_22px_rgba(69,11,200,0.12)] animate-float"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <sense.Icon size={24} style={{ color: colors.accent }} strokeWidth={1.8} />
            </span>
          );
        })}
      </div>
    </div>
  );
}