import { useCallback, useState } from 'react';
import { Coffee, Eye, Flower2, Hand, Headphones } from 'lucide-react';
import { HomeScreen } from './HomeScreen';
import { ActivityScreen } from './ActivityScreen';
import { CompletionScreen } from './CompletionScreen';
import {
  FeelIllustration,
  HearIllustration,
  SeeIllustration,
  SmellIllustration,
  TasteIllustration,
} from './decorations';

const SENSES = [
  {
    key: 'see',
    name: 'SEE',
    noun: 'thing',
    count: 5,
    circles: 5,
    title: 'What can you see?',
    subtitle: 'Look around you and notice 5 things.',
    placeholder: 'I can see…',
    Icon: Eye,
    Illustration: SeeIllustration,
  },
  {
    key: 'hear',
    name: 'HEAR',
    noun: 'sound',
    count: 4,
    circles: 4,
    title: 'What can you hear?',
    subtitle: 'Pause and listen for 4 sounds.',
    placeholder: 'I can hear…',
    Icon: Headphones,
    Illustration: HearIllustration,
  },
  {
    key: 'feel',
    name: 'FEEL',
    noun: 'sensation',
    count: 3,
    circles: 3,
    title: 'What can you feel?',
    subtitle: 'Notice 3 sensations in your body.',
    placeholder: 'I can feel…',
    Icon: Hand,
    Illustration: FeelIllustration,
  },
  {
    key: 'smell',
    name: 'SMELL',
    noun: 'scent',
    count: 2,
    circles: 2,
    title: 'What can you smell?',
    subtitle: 'Take a slow breath and notice any scent.',
    placeholder: 'I can smell…',
    skipLabel: 'I can’t notice a scent right now',
    Icon: Flower2,
    Illustration: SmellIllustration,
  },
  {
    key: 'taste',
    name: 'TASTE',
    noun: 'taste',
    count: 1,
    circles: 1,
    title: 'What can you taste?',
    subtitle: 'Notice the taste in your mouth.',
    placeholder: 'I can taste…',
    Icon: Coffee,
    Illustration: TasteIllustration,
  },
];

const SCREENS = ['home', ...SENSES.map((sense) => sense.key), 'complete'];

export function FindYourCalm() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [completed, setCompleted] = useState({});
  const [observations, setObservations] = useState({});

  const currentScreen = SCREENS[screenIndex];
  const currentSense = SENSES.find((sense) => sense.key === currentScreen);

  const handleComplete = useCallback(
    (items) => {
      if (currentSense) {
        setCompleted((current) => ({ ...current, [currentSense.key]: true }));
        setObservations((current) => ({ ...current, [currentSense.key]: items }));
      }
      setScreenIndex((index) => Math.min(index + 1, SCREENS.length - 1));
    },
    [currentSense],
  );

  const goBack = useCallback(() => {
    setScreenIndex((index) => Math.max(index - 1, 0));
  }, []);

  const restart = useCallback(() => {
    setCompleted({});
    setObservations({});
    setScreenIndex(0);
  }, []);

  const goTo = useCallback((key) => {
    const index = SCREENS.indexOf(key);
    if (index !== -1) setScreenIndex(index);
  }, []);

  const isLast = screenIndex === SCREENS.length - 2;
  const totalNoticed = Object.values(observations).reduce(
    (sum, items) => sum + (items ? items.length : 0),
    0,
  );

  return (
    <main
      className="min-h-[100dvh] overflow-hidden bg-[#F6F3FB] text-[#2B2433]"
      style={{
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
        backgroundImage:
          "linear-gradient(165deg, #F3EEFB 0%, #F9F6FD 30%, #F1F6FC 60%, #F5FAF7 100%)",
      }}
    >
      <div key={currentScreen} className="animate-step">
        {currentScreen === 'home' && (
          <HomeScreen senses={SENSES} completed={completed} onSelect={goTo} />
        )}
        {currentSense && (
          <ActivityScreen
            key={`activity-${currentSense.key}`}
            sense={currentSense}
            isLast={isLast}
            onBack={goBack}
            onComplete={handleComplete}
          />
        )}
        {currentScreen === 'complete' && (
          <CompletionScreen
            onRestart={restart}
            total={totalNoticed}
            observations={observations}
          />
        )}
      </div>
    </main>
  );
}