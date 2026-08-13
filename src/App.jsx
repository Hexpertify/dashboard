import { ErrorBoundary } from './components/ErrorBoundary';
import { FindYourCalm } from './components/FindYourCalm';

function App() {
  return (
    <ErrorBoundary>
      <FindYourCalm />
    </ErrorBoundary>
  );
}

export default App;