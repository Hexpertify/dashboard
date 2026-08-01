import React from 'react';
import SEOSettings from './pages/SEOSettings';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />
            <SEOSettings />
        </div>
    );
}

export default App;
