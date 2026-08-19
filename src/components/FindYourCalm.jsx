import { useCallback, useState } from 'react';
import { Coffee, Eye, Flower2, Hand, Headphones } from 'lucide-react';
import { HomeScreen } from './HomeScreen';
import { GuidedJourney } from './GuidedJourney';
import { CompletionScreen } from './CompletionScreen';

export const SENSES = [
  {
    key: 'touch',
    name: 'Touch',
    duration: 30,
    label: '30 sec',
    prompt: 'Find something comfortable to touch. What do you notice?',
    shortDesc: 'Notice how something feels.',
    subtext: 'Notice the temperature, texture, softness, or weight under your fingertips.',
    Icon: Hand,
    emoji: '✋',
  },
  {
    key: 'sight',
    name: 'Sight',
    duration: 30,
    label: '30 sec',
    prompt: 'Look at something pleasant or calming. Stay with it for a few moments.',
    shortDesc: 'Focus on something calming.',
    subtext: 'Pay attention to its color, shadow, light, or shape without rushing.',
    Icon: Eye,
    emoji: '👁',
  },
  {
    key: 'sound',
    name: 'Sound',
    duration: 30,
    label: '30 sec',
    prompt: 'Listen to one sound around you. Notice its rhythm, volume, and quality.',
    shortDesc: 'Listen to one sound.',
    subtext: 'Is it near or far? Constant or soft? Let it anchor your awareness.',
    Icon: Headphones,
    emoji: '👂',
  },
  {
    key: 'smell',
    name: 'Smell',
    duration: 30,
    label: '30 sec',
    prompt: 'Notice a pleasant scent around you, or imagine one.',
    shortDesc: 'Notice a pleasant scent.',
    subtext: 'Breathe in slowly through your nose. Take in fresh air, coffee, or a cozy memory.',
    Icon: Flower2,
    emoji: '🌸',
  },
  {
    key: 'taste',
    name: 'Taste',
    duration: 30,
    label: '30 sec',
    prompt: 'Take a small sip or bite. Notice its taste and texture.',
    shortDesc: 'Notice taste and texture.',
    subtext: 'Savor the subtle sweetness, warmth, coolness, or lingering flavor.',
    Icon: Coffee,
    emoji: '☕',
  },
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
      }}
    >
      <div key={screen} className="animate-step">
        {screen === 'home' && <HomeScreen senses={SENSES} onStart={goJourney} />}
        {screen === 'journey' && <GuidedJourney senses={SENSES} onDone={goComplete} onExit={goHome} />}
        {screen === 'complete' && <CompletionScreen onDone={goHome} onRestart={goJourney} />}
      </div>
    </main>
  );
}