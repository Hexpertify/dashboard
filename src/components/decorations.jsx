import {
  Bird,
  Candy,
  Citrus,
  Coffee,
  Cookie,
  Flower2,
  Hand,
  Headphones,
  Leaf,
  Music2,
  Sparkles,
  Star,
} from 'lucide-react';

export const SENSE_COLORS = {
  see: { accent: '#0284C7', soft: '#BAE6FD', wash: '#EAF6FF' },
  hear: { accent: '#7C3AED', soft: '#C4B5FD', wash: '#F5F1FF' },
  feel: { accent: '#059669', soft: '#A7F3D0', wash: '#ECFDF5' },
  smell: { accent: '#EA580C', soft: '#FED7AA', wash: '#FFF7ED' },
  taste: { accent: '#DB2777', soft: '#FBCFE8', wash: '#FDF2F8' },
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

export function SeeIllustration() {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl sm:h-64">
      <PastelBlobs colors={SENSE_COLORS.see} />
      <div className="relative flex h-full w-full items-end justify-center pb-5">
        <div
          className="absolute left-1/2 top-6 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 animate-glow sm:top-8 sm:h-16 sm:w-16"
          aria-hidden="true"
        />
        <span className="absolute right-[18%] top-[20%] animate-float">
          <Bird size={26} style={{ color: '#C084FC' }} strokeWidth={1.7} />
        </span>
        <div className="flex items-end gap-2">
          <Tree />
          <FlowerStem />
          <Tree small />
        </div>
      </div>
    </div>
  );
}

function Tree({ small }) {
  return (
    <span className={`relative flex items-end justify-center ${small ? 'h-12 w-7' : 'h-16 w-9'}`}>
      <span className="h-full w-4 rounded-t-full bg-[#4ADE80] sm:w-5" />
      <span className="absolute -bottom-1 h-4 w-2.5 rounded-sm bg-[#B45309]" />
    </span>
  );
}

function FlowerStem() {
  return (
    <span className="relative flex h-14 w-8 items-end justify-center">
      <span className="h-full w-1 rounded-full bg-[#A3E635]" />
      <Flower2
        className="absolute -top-4"
        size={22}
        style={{ color: '#F472B6' }}
        strokeWidth={1.8}
      />
    </span>
  );
}

export function HearIllustration() {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl sm:h-64">
      <PastelBlobs colors={SENSE_COLORS.hear} />
      <div className="relative grid place-items-center">
        <span className="absolute h-28 w-28 rounded-full border-2 border-white/70 animate-ring sm:h-36 sm:w-36" />
        <span
          className="absolute h-28 w-28 rounded-full border-2 border-white/70 animate-ring sm:h-36 sm:w-36"
          style={{ animationDelay: '1.5s' }}
        />
        <span className="grid h-24 w-24 place-items-center rounded-full bg-white/80 shadow-[0_10px_30px_rgba(124,58,237,0.18)] sm:h-32 sm:w-32">
          <Headphones size={52} style={{ color: SENSE_COLORS.hear.accent }} strokeWidth={1.6} />
        </span>
        <MusicNote style={{ top: '8%', left: '12%' }} />
        <MusicNote style={{ bottom: '14%', right: '12%', animationDelay: '1.8s' }} />
        <Sparkles
          size={18}
          className="absolute right-[18%] top-[16%] animate-twinkle"
          style={{ color: '#C4B5FD' }}
        />
      </div>
    </div>
  );
}

function MusicNote({ style }) {
  return (
    <span className="absolute animate-float" style={style}>
      <Music2 size={22} style={{ color: '#8B5CF6' }} strokeWidth={1.8} />
    </span>
  );
}

export function FeelIllustration() {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl sm:h-64">
      <PastelBlobs colors={SENSE_COLORS.feel} />
      <div className="relative grid place-items-center">
        <span
          className="absolute h-36 w-36 rounded-full opacity-60 blur-xl sm:h-44 sm:w-44"
          style={{ backgroundColor: 'rgba(5,150,105,0.16)' }}
        />
        <span
          className="absolute h-28 w-28 rounded-full animate-breathe sm:h-36 sm:w-36"
          style={{ backgroundColor: 'rgba(5,150,105,0.14)' }}
        />
        <span className="grid h-24 w-24 place-items-center rounded-full bg-white/80 shadow-[0_10px_30px_rgba(5,150,105,0.18)] sm:h-32 sm:w-32">
          <Hand size={50} style={{ color: SENSE_COLORS.feel.accent }} strokeWidth={1.6} />
        </span>
        <span className="absolute -top-2 left-[12%] h-3 w-3 rounded-full bg-[#A7F3D0] animate-twinkle" />
        <span
          className="absolute -bottom-1 right-[14%] h-2.5 w-2.5 rounded-full bg-[#6EE7B7] animate-twinkle"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
    </div>
  );
}

export function SmellIllustration() {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl sm:h-64">
      <PastelBlobs colors={SENSE_COLORS.smell} />
      <div className="relative flex items-end gap-6">
        <span className="animate-sway">
          <Flower2 size={46} style={{ color: '#F97316' }} strokeWidth={1.6} />
        </span>
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-white/80 shadow-[0_10px_30px_rgba(234,88,12,0.16)] sm:h-28 sm:w-28">
          <Coffee size={44} style={{ color: SENSE_COLORS.smell.accent }} strokeWidth={1.6} />
          {[0, 0.9, 1.8].map((delay) => (
            <span
              key={delay}
              className="absolute top-[18%] h-2 w-2 rounded-full animate-rise-up"
              style={{ backgroundColor: '#FED7AA', animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        <span className="animate-sway" style={{ animationDelay: '1.4s' }}>
          <Leaf size={34} style={{ color: '#84CC16' }} strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}

export function TasteIllustration() {
  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-3xl sm:h-64">
      <PastelBlobs colors={SENSE_COLORS.taste} />
      <div className="relative grid place-items-center">
        <span className="grid h-28 w-28 place-items-center rounded-full bg-white/80 shadow-[0_10px_30px_rgba(219,39,119,0.16)] sm:h-36 sm:w-36">
          <span
            className="grid h-16 w-16 place-items-center rounded-full sm:h-20 sm:w-20"
            style={{ backgroundColor: '#FCE7F3' }}
          >
            <span
              className="block h-6 w-10 rounded-b-2xl border-b-4 sm:h-7 sm:w-12"
              style={{ borderColor: SENSE_COLORS.taste.accent }}
            />
          </span>
        </span>
        <span className="absolute left-[16%] top-[20%] animate-float">
          <Citrus size={20} style={{ color: '#FB923C' }} strokeWidth={1.8} />
        </span>
        <span className="absolute bottom-[16%] right-[14%] animate-float" style={{ animationDelay: '1.2s' }}>
          <Candy size={20} style={{ color: '#F472B6' }} strokeWidth={1.8} />
        </span>
        <span className="absolute right-[20%] top-[14%] animate-twinkle">
          <Cookie size={16} style={{ color: '#D97706' }} strokeWidth={1.8} />
        </span>
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
