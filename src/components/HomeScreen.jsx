import { useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Eye,
  Hand,
  Heart,
  HelpCircle,
  Info,
  Mic,
  Music,
  Play,
  Smile,
  Sparkles,
  Utensils,
  Volume2,
  Wind,
} from 'lucide-react';
import { FloatingBits, SENSE_COLORS, STEP_ILLUSTRATIONS } from './decorations';
import { AIGuide } from './AIGuide';

export function HomeScreen({ senses, onStart }) {
  const [selectedPreview, setSelectedPreview] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <FloatingBits />

      {/* Atmospheric Soft Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: '#C4B5FD' }}
        />
        <div
          className="absolute top-1/3 right-10 h-[380px] w-[380px] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#BAE6FD' }}
        />
        <div
          className="absolute bottom-10 left-10 h-[350px] w-[350px] rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: '#FBCFE8' }}
        />
      </div>

      {/* 1. NAVIGATION HEADER */}
      <header className="flex items-center justify-between border-b border-[#EEE9F6]/80 py-5">
        <div className="flex items-center gap-8">
          <a href="#" className="inline-flex items-center gap-2.5 text-base font-extrabold text-[#2B2433]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#450BC8] text-white shadow-[0_6px_20px_rgba(69,11,200,0.25)]">
              <Heart className="h-5 w-5 fill-current" />
            </span>
            <span className="tracking-tight text-lg font-extrabold text-[#2B2433]">Find Your Calm</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#6F6580]">
            <a href="#hero" className="transition-colors hover:text-[#450BC8]">Home</a>
            <button type="button" onClick={() => scrollToSection('timeline')} className="transition-colors hover:text-[#450BC8]">Journey</button>
            <button type="button" onClick={() => scrollToSection('how-it-works')} className="transition-colors hover:text-[#450BC8]">How It Works</button>

          </nav>
        </div>

       
      </header>

      {/* 2. HERO SPLIT SECTION */}
      <section id="hero" className="grid grid-cols-1 items-center gap-12 py-10 lg:grid-cols-12 lg:py-16">
        {/* Left Column: Context & Action */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9E4F5] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#450BC8] shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>YOUR PERSONAL CALM GUIDE</span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-[#2B2433] sm:text-5xl lg:text-6xl leading-[1.12]">
            Find Your <span className="text-[#450BC8]">Calm</span>
          </h1>

          <p className="mt-4 max-w-xl text-base font-semibold text-[#6F6580] sm:text-lg leading-relaxed">
            Reconnect with the present moment through a gentle 5-senses grounding journey guided by natural AI voice.
          </p>

          {/* Feature Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-extrabold text-[#554C61]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EEE9F6] px-3.5 py-1.5 shadow-2xs">
              <Clock className="h-3.5 w-3.5 text-[#450BC8]" /> 5 Senses · 30s Each
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EEE9F6] px-3.5 py-1.5 shadow-2xs">
              <Mic className="h-3.5 w-3.5 text-[#059669]" /> Clear Voice
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#EEE9F6] px-3.5 py-1.5 shadow-2xs">
              <Brain className="h-3.5 w-3.5 text-[#8B5CF6]" /> Grounding Mindfulness
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#450BC8] px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_rgba(69,11,200,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(69,11,200,0.35)] active:scale-95 focus:outline-none"
            >
              <Play className="h-5 w-5 fill-current" /> Begin Your Calm Journey
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E3DCF0] bg-white px-6 py-4 text-sm font-extrabold text-[#554C61] shadow-2xs transition-all hover:bg-[#F8F5FD] hover:text-[#450BC8]"
            >
              How it works <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Composite Visual Composition */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl border border-[#EEE9F6] bg-white p-6 shadow-xl">
            <div className="absolute -top-3 -right-3 rounded-full bg-[#450BC8] px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
              ✦ 5-Senses Flow
            </div>

            {/* Central Glow Composition */}
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-[#F5F2FC]">
              <span className="absolute inset-0 rounded-full bg-[#450BC8]/10 blur-xl animate-glow" />
              <div className="relative text-center">
                <span className="text-3xl">🧘</span>
                <p className="mt-1 text-xs font-extrabold text-[#450BC8]">Grounding</p>
                <p className="text-[10px] text-[#8B8294]">2 min 30 sec total</p>
              </div>

              {/* Surrounding Sense Cards */}
              <div className="absolute -top-3 left-0 rounded-xl bg-white border border-[#EEE9F6] px-2.5 py-1.5 text-xs font-extrabold text-[#10B981] shadow-xs">
                ✋ Touch
              </div>
              <div className="absolute top-4 -right-4 rounded-xl bg-white border border-[#EEE9F6] px-2.5 py-1.5 text-xs font-extrabold text-[#3B82F6] shadow-xs">
                👁 Sight
              </div>
              <div className="absolute bottom-2 -left-4 rounded-xl bg-white border border-[#EEE9F6] px-2.5 py-1.5 text-xs font-extrabold text-[#8B5CF6] shadow-xs">
                👂 Sound
              </div>
              <div className="absolute -bottom-3 right-4 rounded-xl bg-white border border-[#EEE9F6] px-2.5 py-1.5 text-xs font-extrabold text-[#F59E0B] shadow-xs">
                🌸 Smell
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 rounded-xl bg-white border border-[#EEE9F6] px-2 py-1 text-[10px] font-extrabold text-[#EC4899] shadow-xs hidden sm:block">
                ☕ Taste
              </div>
            </div>

            <div className="mt-6 border-t border-[#F3EFEA] pt-4 text-center">
              <p className="text-xs font-extrabold text-[#2B2433]">A Guided Mindfulness Journey</p>
              <p className="mt-1 text-[11px] text-[#6F6580]">
                Timed prompts with silent observation breaks to steady your breath.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOURNEY TIMELINE SECTION */}
      <section id="timeline" className="py-14 border-t border-[#EEE9F6]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex rounded-full bg-[#E9E4F5] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#450BC8]">
            Step-by-Step Experience
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[#2B2433] sm:text-3xl">
            The 5-Senses Sequence
          </h2>
          <p className="mt-2 text-xs font-semibold text-[#6F6580]">
            Each sense is spent in 30 seconds of gentle, focused awareness.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#EAE4F5] sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-6">
            {senses.map((sense, idx) => {
              const colors = SENSE_COLORS[sense.key];
              const isEven = idx % 2 === 0;
              const isSelected = selectedPreview === sense.key;

              return (
                <div
                  key={sense.key}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 ${isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                >
                  {/* Timeline Badge/Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#450BC8] text-white shadow-md text-xs font-extrabold">
                    0{idx + 1}
                  </div>

                  {/* Card Content */}
                  <div
                    onClick={() => setSelectedPreview(isSelected ? null : sense.key)}
                    className={`ml-14 sm:ml-0 w-full sm:w-[calc(50%-2rem)] cursor-pointer rounded-2xl border p-4 transition-all duration-200 bg-white hover:shadow-md ${isSelected ? 'border-[#450BC8] shadow-md' : 'border-[#EEE9F6]'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="grid h-9 w-9 place-items-center rounded-xl"
                          style={{ backgroundColor: colors.soft }}
                        >
                          <sense.Icon size={18} style={{ color: colors.accent }} />
                        </span>
                        <div>
                          <h3 className="text-sm font-extrabold text-[#2B2433]">
                            {sense.emoji} {sense.name}
                          </h3>
                          <span className="text-[10px] font-extrabold text-[#8B8294]">
                            30 seconds
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-[#450BC8]">Preview ↗</span>
                    </div>

                    <p className="mt-2.5 text-xs text-[#6F6580] leading-relaxed">
                      "{sense.shortDesc}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Illustration Preview Card */}
        {selectedPreview && (
          <div className="mx-auto mt-8 max-w-md animate-pop">
            <div className="rounded-3xl border border-[#EEE9F6] bg-white p-6 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#450BC8]">
                  Illustration Preview
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="text-xs font-bold text-[#8B8294] hover:text-[#2B2433]"
                >
                  Close ✕
                </button>
              </div>
              {(() => {
                const Component = STEP_ILLUSTRATIONS[selectedPreview];
                return <Component />;
              })()}
              <p className="mt-3 text-center text-xs font-bold text-[#2B2433]">
                “{senses.find((s) => s.key === selectedPreview)?.prompt}”
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-14 border-t border-[#EEE9F6]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex rounded-full bg-[#E9E4F5] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#450BC8]">
            Simple & Accessible
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[#2B2433] sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-2 text-xs font-semibold text-[#6F6580]">
            Three effortless steps to restore your focus and calm.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#EEE9F6] bg-white p-6 text-center shadow-xs">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#E9E4F5] text-[#450BC8] font-extrabold text-base mb-4">
              01
            </div>
            <h3 className="text-sm font-extrabold text-[#2B2433]">Choose Your Focus</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6F6580]">
              Start the journey. Each sense invites you to notice your immediate environment without pressure.
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEE9F6] bg-white p-6 text-center shadow-xs">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#E9E4F5] text-[#450BC8] font-extrabold text-base mb-4">
              02
            </div>
            <h3 className="text-sm font-extrabold text-[#2B2433]">Follow Your Guide</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6F6580]">
              Listen to warm, spoken guidance with quiet periods left for personal observation and rest.
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEE9F6] bg-white p-6 text-center shadow-xs">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#E9E4F5] text-[#450BC8] font-extrabold text-base mb-4">
              03
            </div>
            <h3 className="text-sm font-extrabold text-[#2B2433]">Reconnect Present</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6F6580]">
              In under 3 minutes, your nervous system settles, leaving you grounded, steady, and clear.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DEDICATED AI GUIDE COMPANION SECTION */}
      
             

      {/* FOOTER */}
      <footer className="mt-auto py-8 border-t border-[#EEE9F6] text-center text-xs font-bold text-[#8B8294]">
        <p>Find Your Calm · Gentle AI-Guided 5-Senses Experience</p>
      </footer>
    </div>
  );
}