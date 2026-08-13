import { ArrowRight, Check } from 'lucide-react';
import { FloatingBits, SENSE_COLORS } from './decorations';

export function HomeScreen({ senses, completed, onSelect }) {
  return (
    <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
      <FloatingBits />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: '#C4B5FD', opacity: 0.2 }}
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

      <div className="relative text-center">
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E9E4F5] bg-white/80 px-4 py-1.5 text-xs font-bold tracking-wide text-[#450BC8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#450BC8] animate-glow" />
          Find Your Calm
        </p>
        <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#2B2433] sm:text-5xl">
          5 Senses <span className="text-[#450BC8]">Grounding</span>
        </h1>
        <p className="mt-2 text-lg font-semibold text-[#6F6580] sm:text-xl">Come back to now.</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8B8294]">
          Take a moment. Notice what is around you, one sense at a time.
        </p>
      </div>

      <ProgressDots senses={senses} completed={completed} />

      <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
        {senses.map((sense) => {
          const colors = SENSE_COLORS[sense.key];
          const done = completed[sense.key];

          return (
            <button
              key={sense.key}
              type="button"
              onClick={() => onSelect(sense.key)}
              aria-label={`${sense.name}, notice ${sense.count} ${sense.noun}${sense.count === 1 ? '' : 's'}`}
              className={`group relative w-[calc(50%-0.375rem)] rounded-3xl border p-4 text-left shadow-[0_4px_18px_rgba(69,11,200,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(69,11,200,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8] focus-visible:ring-offset-2 sm:w-[calc(33.333%-0.667rem)] sm:p-5 lg:w-[calc(20%-0.8rem)]`}
              style={{
                borderColor: done ? colors.soft : '#EEE9F6',
                background: done
                  ? `linear-gradient(135deg, ${colors.wash}, #FFFFFF)`
                  : '#FFFFFF',
              }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12"
                style={{ backgroundColor: colors.soft }}
              >
                <sense.Icon size={22} style={{ color: colors.accent }} strokeWidth={1.8} />
              </span>
              <span className="mt-3 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-wide text-[#2B2433]">
                  {sense.name}
                </span>
                <span
                  className={`text-[11px] font-bold ${done ? 'text-[#3F7C67]' : 'text-[#8B8294]'}`}
                >
                  {done ? <Check className="h-4 w-4 text-[#059669]" strokeWidth={3} /> : `× ${sense.count}`}
                </span>
              </span>
              <span className="mt-0.5 block text-xs text-[#8B8294]">
                {done ? 'Done' : `${sense.count} to notice`}
              </span>
              <ArrowRight
                className={`absolute right-3 top-3 h-4 w-4 text-[#C9C1D6] transition-all duration-200 ${
                  done ? '' : 'opacity-0 group-hover:opacity-100'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProgressDots({ senses, completed }) {
  const doneCount = senses.filter((sense) => completed[sense.key]).length;

  return (
    <div className="relative mx-auto mt-8 max-w-xl" aria-label="Progress through the five senses">
      <div className="flex items-center justify-between">
        {senses.map((sense, index) => (
          <div key={sense.key} className="flex flex-1 items-center">
            <span
              className={`grid h-3 w-3 shrink-0 place-items-center rounded-full transition-colors duration-300 sm:h-3.5 sm:w-3.5 ${
                completed[sense.key] ? '' : 'bg-[#E7E1F0]'
              }`}
              style={completed[sense.key] ? { backgroundColor: SENSE_COLORS[sense.key].accent } : {}}
            />
            {index < senses.length - 1 && (
              <span
                className="mx-1 h-1 flex-1 rounded-full transition-colors duration-300 sm:mx-1.5"
                style={{
                  backgroundColor: completed[senses[index + 1].key]
                    ? SENSE_COLORS[senses[index + 1].key].accent
                    : '#E7E1F0',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-[#8B8294]">
        {doneCount} of {senses.length} senses{' '}
        <span className="text-[#450BC8]">{doneCount === senses.length ? '· beautifully done' : '· gently begun'}</span>
      </p>
    </div>
  );
}
