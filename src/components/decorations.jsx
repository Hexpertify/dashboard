import {
  Bird,
  Flower2,
  Leaf,
  Sparkles,
  Star,
} from 'lucide-react';

export const SENSE_COLORS = {
  touch: { accent: '#059669', soft: '#A7F3D0', wash: '#ECFDF5', border: '#6EE7B7', lightBg: 'rgba(167,243,208,0.25)' },
  sight: { accent: '#0284C7', soft: '#BAE6FD', wash: '#EAF6FF', border: '#7DD3FC', lightBg: 'rgba(186,230,253,0.25)' },
  sound: { accent: '#7C3AED', soft: '#C4B5FD', wash: '#F5F1FF', border: '#DDD6FE', lightBg: 'rgba(196,181,253,0.25)' },
  smell: { accent: '#EA580C', soft: '#FED7AA', wash: '#FFF7ED', border: '#FDBA74', lightBg: 'rgba(254,215,170,0.25)' },
  taste: { accent: '#DB2777', soft: '#FBCFE8', wash: '#FDF2F8', border: '#F9A8D4', lightBg: 'rgba(251,207,232,0.25)' },
};

const FLOATERS = [
  { Icon: Leaf, size: 18, top: '10%', left: '5%', color: '#A7F3D0', delay: 0 },
  { Icon: Bird, size: 22, top: '16%', right: '8%', color: '#C4B5FD', delay: 0.8 },
  { Icon: Star, size: 14, top: '6%', right: '22%', color: '#FDE68A', delay: 1.6, twinkle: true },
  { Icon: Flower2, size: 20, top: '42%', left: '3%', color: '#FBCFE8', delay: 2.2 },
  { Icon: Sparkles, size: 16, top: '30%', right: '4%', color: '#BAE6FD', delay: 0.4, twinkle: true },
  { Icon: Leaf, size: 16, bottom: '12%', left: '8%', color: '#C4B5FD', delay: 1.2 },
  { Icon: Star, size: 12, bottom: '20%', right: '10%', color: '#FED7AA', delay: 2.8, twinkle: true },
  { Icon: Flower2, size: 18, bottom: '8%', right: '24%', color: '#BAE6FD', delay: 1.9 },
];

export function FloatingBits({ items = FLOATERS }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ Icon, size, top, left, right, bottom, color, delay, twinkle }, index) => (
        <span
          key={index}
          className={`absolute ${twinkle ? 'animate-twinkle' : 'animate-float'}`}
          style={{ top, left, right, bottom, animationDelay: `${delay}s` }}
        >
          <Icon size={size} style={{ color }} strokeWidth={1.8} />
        </span>
      ))}
    </div>
  );
}

function PastelBlobs({ colors }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-2xl"
        style={{ backgroundColor: colors.soft }}
      />
      <div
        className="absolute -bottom-20 -right-14 h-64 w-64 rounded-full opacity-50 blur-2xl"
        style={{ backgroundColor: colors.wash }}
      />
    </div>
  );
}

/* ==========================================================================
   1. TOUCH ILLUSTRATION
   Action: A natural human's hand reaching toward and physically touching a soft leaf.
   ========================================================================== */
export function TouchIllustration() {
  return (
    <div
      role="img"
      aria-label="Human gently touching a comfortable object"
      className="relative flex h-56 sm:h-72 w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white bg-white/60 shadow-sm backdrop-blur p-4 pb-5"
      style={{ backgroundColor: SENSE_COLORS.touch.wash }}
    >
      <PastelBlobs colors={SENSE_COLORS.touch} />

      <div className="absolute top-[15%] left-[10%] animate-sway hidden sm:block z-0 opacity-70">
        <Leaf className="text-[#059669]" size={42} fill="#A7F3D0" />
      </div>

      <div className="relative z-10 flex flex-1 w-full items-center justify-center animate-gentle-breathe">
        <img
          src="/images/touch.png"
          alt="Friendly transparent 3D character touching object"
          className="max-h-[140px] sm:max-h-[190px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative z-20 mt-3 rounded-full bg-white/95 backdrop-blur-xl border border-[#6EE7B7]/50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#059669] shadow-sm">
        Touch Object
      </div>
    </div>
  );
}

/* ==========================================================================
   2. SIGHT ILLUSTRATION
   Action: A natural human observing calming scenery, eyes explicitly focused.
   ========================================================================== */
export function SightIllustration() {
  return (
    <div
      role="img"
      aria-label="Human observing calming scenery"
      className="relative flex h-56 sm:h-72 w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white bg-white/60 shadow-sm backdrop-blur p-4 pb-5"
      style={{ backgroundColor: SENSE_COLORS.sight.wash }}
    >
      <PastelBlobs colors={SENSE_COLORS.sight} />

      <div className="absolute top-[15%] right-[15%] animate-pulse hidden sm:block z-0 opacity-70">
        <Sparkles className="text-[#0284C7]" size={36} fill="#BAE6FD" />
      </div>

      <div className="relative z-10 flex flex-1 w-full items-center justify-center animate-gentle-breathe">
        <img
          src="/images/sight.png"
          alt="Friendly transparent 3D character observing scenery"
          className="max-h-[140px] sm:max-h-[190px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative z-20 mt-3 rounded-full bg-white/95 backdrop-blur-xl border border-[#7DD3FC]/50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#0284C7] shadow-sm">
        Look & Observe
      </div>
    </div>
  );
}

/* ==========================================================================
   3. SOUND ILLUSTRATION
   Action: A natural human with head turned toward sound waves to show listening.
   ========================================================================== */
export function SoundIllustration() {
  return (
    <div
      role="img"
      aria-label="Human explicitly listening to sounds"
      className="relative flex h-56 sm:h-72 w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white bg-white/60 shadow-sm backdrop-blur p-4 pb-5"
      style={{ backgroundColor: SENSE_COLORS.sound.wash }}
    >
      <PastelBlobs colors={SENSE_COLORS.sound} />

      {/* Decorative animated sound waves elegantly blended */}
      <div className="absolute top-[20%] left-[15%] flex flex-col items-center gap-1.5 hidden sm:flex animate-aroma z-0 opacity-60">
        <div className="h-8 w-1.5 rounded-full bg-[#7C3AED] animate-soundbar-1" />
        <div className="h-12 w-1.5 rounded-full bg-[#C4B5FD] animate-soundbar-2" />
        <div className="h-6 w-1.5 rounded-full bg-[#7C3AED] animate-soundbar-3" />
      </div>

      <div className="absolute top-[18%] right-[15%] animate-float hidden sm:block z-0 opacity-70">
        <Bird className="text-[#7C3AED]" size={36} fill="#E9D5FF" />
      </div>

      <div className="relative z-10 flex flex-1 w-full items-center justify-center animate-gentle-breathe">
        <img
          src="/images/sound.png"
          alt="Friendly transparent 3D character listening"
          className="max-h-[140px] sm:max-h-[190px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative z-20 mt-3 rounded-full bg-white/95 backdrop-blur-xl border border-[#DDD6FE]/50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#7C3AED] shadow-sm">
        Listen Closely
      </div>
    </div>
  );
}

/* ==========================================================================
   4. SMELL ILLUSTRATION
   Action: A natural human holding a flower near their nose and smelling it.
   ========================================================================== */
export function SmellIllustration() {
  return (
    <div
      role="img"
      aria-label="Human explicitly smelling a flower near nose"
      className="relative flex h-56 sm:h-72 w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white bg-white/60 shadow-sm backdrop-blur p-4 pb-5"
      style={{ backgroundColor: SENSE_COLORS.smell.wash }}
    >
      <PastelBlobs colors={SENSE_COLORS.smell} />

      {/* Animated aroma particles */}
      <div className="absolute top-[25%] right-[15%] animate-sway hidden sm:block z-0 opacity-70">
        <Flower2 className="text-[#EA580C]" size={36} fill="#FED7AA" />
      </div>

      <div className="relative z-10 flex flex-1 w-full items-center justify-center animate-gentle-breathe">
        <img
          src="/images/smell.png"
          alt="Friendly transparent 3D character smelling a flower"
          className="max-h-[140px] sm:max-h-[190px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative z-20 mt-3 rounded-full bg-white/95 backdrop-blur-xl border border-[#FDBA74]/50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#EA580C] shadow-sm">
        Smell Scent
      </div>
    </div>
  );
}

/* ==========================================================================
   5. TASTE ILLUSTRATION
   Action: A natural human bringing a comforting cup to their visible mouth.
   ========================================================================== */
export function TasteIllustration() {
  return (
    <div
      role="img"
      aria-label="Human explicitly bringing a warm cup to their mouth"
      className="relative flex h-56 sm:h-72 w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white bg-white/60 shadow-sm backdrop-blur p-4 pb-5"
      style={{ backgroundColor: SENSE_COLORS.taste.wash }}
    >
      <PastelBlobs colors={SENSE_COLORS.taste} />

      <div className="relative z-10 flex flex-1 w-full items-center justify-center animate-gentle-breathe">
        <img
          src="/images/taste.png"
          alt="Friendly transparent 3D character tasting warm drink"
          className="max-h-[140px] sm:max-h-[190px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative z-20 mt-3 rounded-full bg-white/95 backdrop-blur-xl border border-[#F9A8D4]/50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#DB2777] shadow-sm">
        Taste Mindfully
      </div>
    </div>
  );
}

export function CompletionIllustration() {
  return (
    <div className="relative mx-auto grid h-48 w-48 place-items-center sm:h-56 sm:w-56">
      <span
        className="absolute inset-6 rounded-full blur-2xl animate-glow"
        style={{ backgroundColor: 'rgba(124,58,237,0.22)' }}
      />
      <div className="relative flex flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(69,11,200,0.18)] animate-pop sm:h-14 sm:w-14">
          <Flower2 size={26} style={{ color: '#7C3AED' }} strokeWidth={1.7} />
        </span>
        <span
          className="mt-1 h-14 w-1 rounded-full sm:h-16"
          style={{ background: 'linear-gradient(to bottom, #7C3AED, #A7F3D0)' }}
        />
        <span className="absolute -left-6 top-8 animate-sway">
          <Leaf size={18} style={{ color: '#84CC16' }} strokeWidth={1.8} />
        </span>
        <span className="absolute -right-5 top-12 animate-sway" style={{ animationDelay: '1.2s' }}>
          <Leaf size={15} style={{ color: '#34D399' }} strokeWidth={1.8} />
        </span>
        <span className="absolute left-1 top-3 h-2.5 w-2.5 rounded-full bg-[#FDE68A] animate-twinkle" />
        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#FBCFE8] animate-twinkle" style={{ animationDelay: '1.4s' }} />
        <span className="absolute left-8 -bottom-1 h-2 w-2 rounded-full bg-[#BAE6FD] animate-twinkle" style={{ animationDelay: '0.7s' }} />
      </div>
    </div>
  );
}

export const STEP_ILLUSTRATIONS = {
  touch: TouchIllustration,
  sight: SightIllustration,
  sound: SoundIllustration,
  smell: SmellIllustration,
  taste: TasteIllustration,
};
