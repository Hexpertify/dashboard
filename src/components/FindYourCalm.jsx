import { useCallback, useState } from 'react';
import { Coffee, Eye, Flower2, Hand, Headphones } from 'lucide-react';
import { HomeScreen } from './HomeScreen';
import { GuidedJourney } from './GuidedJourney';
import { CompletionScreen } from './CompletionScreen';

export const SENSES = [
  { key: 'see', name: 'SEE', count: 5, label: '5 things', item: 'Thing', Icon: Eye },
  { key: 'hear', name: 'HEAR', count: 4, label: '4 sounds', item: 'Sound', Icon: Headphones },
  { key: 'feel', name: 'FEEL', count: 3, label: '3 sensations', item: 'Sensation', Icon: Hand },
  { key: 'smell', name: 'SMELL', count: 2, label: '2 scents', item: 'Scent', Icon: Flower2 },
  { key: 'taste', name: 'TASTE', count: 1, label: '1 taste', item: 'Taste', Icon: Coffee },
];

export function FindYourCalm() {
  const [screen, setScreen] = useState('home');

  const goHome = useCallback(() => setScreen('home'), []);
  const goJourney = useCallback(() => setScreen('journey'), []);
  const goComplete = useCallback(() => setScreen('complete'), []);

  return (
    <main
      className="min-h-[100dvh] overflow-hidden bg-[#F6F3FB] text-[#2B2433]"
      style={{
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
        backgroundImage:
          "linear-gradient(165deg, #F3EEFB 0%, #F9F6FD 30%, #F1F6FC 60%, #F5FAF7 100%)",
      }}
    >
      <div key={screen} className="animate-step">
        {screen === 'home' && <HomeScreen senses={SENSES} onStart={goJourney} />}
        {screen === 'journey' && <GuidedJourney onDone={goComplete} onExit={goHome} />}
        {screen === 'complete' && <CompletionScreen onRestart={goHome} />}
      </div>
    </main>
  );
}