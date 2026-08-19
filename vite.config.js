import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function ttsApiPlugin() {
  return {
    name: 'tts-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { text } = JSON.parse(body || '{}');
            if (!text) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Text prompt required' }));
              return;
            }

            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ fallback: true, message: 'AI_TTS_API_KEY not set. Using browser voice.' }));
              return;
            }

            const ttsEndpoint = process.env.AI_TTS_URL || 'https://api.openai.com/v1/audio/speech';
            const model = process.env.AI_TTS_MODEL || 'tts-1';
            const voice = process.env.AI_TTS_VOICE || 'nova';

            const apiResponse = await fetch(ttsEndpoint, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                input: text,
                voice,
                speed: 0.9, // Clear human pace
              }),
            });

            if (!apiResponse.ok) {
              const errText = await apiResponse.text();
              console.warn('[TTS Backend Warning]', apiResponse.status, errText);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ fallback: true, error: errText }));
              return;
            }

            const arrayBuffer = await apiResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            res.end(buffer);
          } catch (err) {
            console.error('[TTS Backend Exception]', err);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ fallback: true, error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ttsApiPlugin()],
  server: {
    host: '0.0.0.0',
  },
});