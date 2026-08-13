import { useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { SENSE_COLORS } from './decorations';

export function ActivityScreen({ sense, onBack, onComplete, isLast }) {
  const colors = SENSE_COLORS[sense.key];
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [skipped, setSkipped] = useState(false);

  const finished = items.length >= sense.circles;
  const remaining = Math.max(sense.circles - items.length, 0);

  const addItem = () => {
    const text = value.trim();
    if (!text || finished) return;
    setItems((current) => (current.length < sense.circles ? [...current, text] : current));
    setValue('');
  };

  const removeItem = (index) => {
    if (finished) return;
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const skipSense = () => {
    if (finished || skipped) return;
    setSkipped(true);
    setItems((current) => [...current, sense.skipLabel]);
  };

  return (
    <div className="relative mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.soft, opacity: 0.4 }}
        />
        <div
          className="absolute -bottom-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.wash, opacity: 0.45 }}
        />
      </div>

      <div className="relative text-center">
        <div className="mx-auto w-full max-w-lg animate-pop">
          <sense.Illustration />
        </div>

        <p
          className="mx-auto mt-7 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em]"
          style={{ backgroundColor: colors.soft, color: colors.accent }}
        >
          {sense.name} · {sense.count} {sense.noun}
          {sense.count === 1 ? '' : 's'}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#2B2433] sm:text-4xl">
          {sense.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8B8294] sm:text-base">
          {sense.subtitle}
        </p>

        <div
          className="mt-6 flex items-center justify-center gap-2.5"
          role="group"
          aria-label={`${sense.circles} to notice for ${sense.name}`}
        >
          {Array.from({ length: sense.circles }).map((_, index) => (
            <span
              key={index}
              className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                index < items.length ? 'scale-110' : ''
              }`}
              style={{
                backgroundColor: index < items.length ? colors.accent : '#EFEAF6',
                boxShadow: index < items.length ? `0 0 12px ${colors.soft}` : 'none',
              }}
              aria-hidden="true"
            />
          ))}
          <span className="ml-1 text-xs font-bold" style={{ color: colors.accent }}>
            {items.length} / {sense.circles}
          </span>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addItem();
          }}
          className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
        >
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={sense.placeholder}
            aria-label={sense.placeholder}
            disabled={finished}
            autoComplete="off"
            className="flex-1 rounded-2xl border bg-white px-4 py-3 text-center text-sm font-medium text-[#2B2433] shadow-[0_2px_10px_rgba(69,11,200,0.04)] outline-none transition-all duration-200 placeholder:text-[#BDB6CC] focus:border-[#450BC8] focus:ring-2 focus:ring-[#450BC8]/20 disabled:opacity-50 sm:text-left"
            style={{ borderColor: '#E7E0F1' }}
          />
          <button
            type="submit"
            disabled={finished}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
            style={{ backgroundColor: colors.accent, boxShadow: `0 8px 22px ${colors.soft}` }}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Add
          </button>
        </form>

        {!finished && sense.skipLabel && (
          <button
            type="button"
            onClick={skipSense}
            className="mt-3 rounded text-xs font-semibold text-[#8B8294] underline-offset-4 transition-colors hover:text-[#554C61] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
          >
            {sense.skipLabel}
          </button>
        )}

        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          aria-live="polite"
        >
          {items.map((item, index) => {
            const isSkipped = item === sense.skipLabel;
            return (
              <span
                key={`${item}-${index}`}
                className="inline-flex animate-pop items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: colors.soft,
                  backgroundColor: isSkipped ? '#FAFAFC' : '#FFFFFF',
                  color: isSkipped ? '#B5AEC4' : '#4A4354',
                }}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: isSkipped ? '#C9C1D6' : colors.accent }}
                />
                {item}
                {!finished && !isSkipped && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item}`}
                    className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-[#B5AEC4] transition-colors hover:bg-[#F1EDF7] hover:text-[#554C61] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
                  >
                    <X className="h-3 w-3" strokeWidth={2.5} />
                  </button>
                )}
              </span>
            );
          })}
          {!finished && remaining > 0 && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs font-semibold text-[#B5AEC4]"
              style={{ borderColor: colors.soft }}
            >
              {remaining} more…
            </span>
          )}
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {finished && (
            <button
              type="button"
              onClick={() => onComplete(items)}
              className="inline-flex animate-pop items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: '#450BC8', boxShadow: '0 10px 26px rgba(69, 11, 200, 0.24)' }}
            >
              {isLast ? 'Finish' : 'Continue'} <ArrowRight className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#6F6580] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#450BC8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </div>
        {finished && (
          <p className="mt-2 text-xs text-[#8B8294] animate-rise">
            Beautifully noticed. Continue whenever you feel ready.
          </p>
        )}
      </div>
    </div>
  );
}