/* ==========================================================================
   AI Voice Service (Provider Abstraction)
   Handles AI Text-To-Speech audio fetching, caching, preloading, HTML Audio playback,
   and automated Web Speech API fallback.
   ========================================================================== */

const audioCache = new Map(); // text -> { blobUrl, audio, fallback: boolean }
let currentAudio = null;
let currentUtterance = null;
let activeText = '';
let _sequenceTimer = null;
let _sequenceAbort = false;
let _isPaused = false; // new: pause/resume control for sequences
let _pauseResolvers = []; // functions to call when resuming from pause

// Configurable voice parameters
const CONFIG = {
  // Slightly faster speech rate to reduce overly slow delivery while remaining natural
  rate: 0.90,
  // Reduce pause between sentences slightly for smoother flow
  pauseMs: 450,
  // When true, force using Web Speech API fallback for all speech (highest timing reliability)
  forceFallback: false,
};


// Queue of pending speech requests (avoid interrupting current sentence)
const pendingRequests = [];
function splitIntoSentences(text) {
  if (!text) return [];
  // Simple sentence split preserving punctuation. Keep short segments.
  const parts = text
    .replace(/\s+/g, ' ')
    .split(/(?<=\.|\?|!|\u201D)\s+/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [text];
}

// Warm-up speech synthesis voices early to avoid first-utterance delays/stuttering
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Trigger a getVoices() call; some browsers populate asynchronously
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  } catch (e) { /* ignore */ }
}

export const aiVoiceService = {
    /**
     * Preload TTS audio for upcoming cue in the background
     */
    async preloadSpeech(text) {
        if (!text || audioCache.has(text)) return;

        try {
            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!res.ok) {
                audioCache.set(text, { fallback: true });
                return;
            }

            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const data = await res.json();
                if (data.fallback) {
                    audioCache.set(text, { fallback: true });
                    return;
                }
            }

            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const audio = new Audio(blobUrl);
            audio.preload = 'auto';

            audioCache.set(text, { blobUrl, audio });
        } catch (err) {
            audioCache.set(text, { fallback: true });
        }
    },

    /**
     * Play speech using AI TTS audio if available, falling back to Web Speech API
     */
    // Queue for speech requests to avoid interrupting sentences
    
    async playSpeech(text, { onStart, onEnd, onError, onGenerating, onFallback, isMuted = false, force = false } = {}) {
        if (!text) {
            if (onEnd) onEnd();
            return;
        }

        // If configured to force fallback for guided sessions, bypass AI audio path
        if (CONFIG.forceFallback) {
            // Use the speech synthesis fallback for immediate timing reliability
            try {
                await this.playFallbackSequence(splitIntoSentences(text), { onStart, onEnd, onError, onFallback });
            } catch (e) {
                if (onError) onError(e);
            }
            return;
        }

        const isSpeakingNow = !!currentAudio || (typeof window !== 'undefined' && 'speechSynthesis' in window && (window.speechSynthesis.speaking || window.speechSynthesis.pending));
        if (force || (isSpeakingNow && activeText !== text)) {
            this.stopSpeech();
            pendingRequests.length = 0;
        }

        if (isSpeakingNow && !force && activeText === text) {
            pendingRequests.push({ text, opts: { onStart, onEnd, onError, onGenerating, onFallback, isMuted } });
            return;
        }

        activeText = text;
        _sequenceAbort = false;

        if (isMuted) {
            if (onEnd) onEnd();
            if (pendingRequests.length) {
                const next = pendingRequests.shift();
                setTimeout(() => this.playSpeech(next.text, next.opts), CONFIG.pauseMs);
            }
            return;
        }

        const sentences = splitIntoSentences(text);

        const playSequence = async () => {
            if (onGenerating) onGenerating();

            try {
                await Promise.all(sentences.map((s) => this.preloadSpeech(s)));
            } catch (e) {
                // continue to fallback path below
            }

            if (activeText !== text || _sequenceAbort) return;

            const cachedList = sentences.map((s) => audioCache.get(s) || { fallback: true });
            const allHaveAi = cachedList.every((c) => c && c.blobUrl && c.audio);

            if (allHaveAi) {
                if (onStart) onStart({ mode: 'ai' });

                for (let i = 0; i < sentences.length; i++) {
                    if (_sequenceAbort || activeText !== text) break;

                    if (_isPaused) {
                        await new Promise((resume) => _pauseResolvers.push(resume));
                        if (_sequenceAbort || activeText !== text) break;
                    }

                    const cached = cachedList[i];
                    try {
                        currentAudio = cached.audio;
                        currentAudio.currentTime = 0;
                        currentAudio.muted = isMuted;

                        await new Promise((resolve, reject) => {
                            let settled = false;
                            const done = (err) => {
                                if (settled) return;
                                settled = true;
                                currentAudio = null;
                                if (err) reject(err);
                                else resolve();
                            };

                            currentAudio.onended = () => done();
                            currentAudio.onerror = () => done(new Error('audio error'));

                            const p = currentAudio.play();
                            if (p && typeof p.then === 'function') p.catch(done);

                            setTimeout(() => {
                                if (currentAudio && !currentAudio.paused && currentAudio.currentTime > 0) {
                                    // Abort old browser state if it never fires onended
                                    try { currentAudio.pause(); } catch (e) {}
                                }
                                done();
                            }, 12000);
                        });

                        if (i < sentences.length - 1 && !_sequenceAbort) {
                            await new Promise((res) => {
                                _sequenceTimer = setTimeout(res, CONFIG.pauseMs);
                            });
                        }
                    } catch (err) {
                        currentAudio = null;
                        await this.playFallbackSequence(sentences.slice(i), { onStart, onEnd, onError, onFallback });
                        return;
                    }
                }

                if (!_sequenceAbort && onEnd) onEnd();
                if (pendingRequests.length) {
                    const next = pendingRequests.shift();
                    setTimeout(() => this.playSpeech(next.text, next.opts), CONFIG.pauseMs);
                }
                return;
            }

            await this.playFallbackSequence(sentences, { onStart, onEnd, onError, onFallback });

            if (pendingRequests.length) {
                const next = pendingRequests.shift();
                setTimeout(() => this.playSpeech(next.text, next.opts), CONFIG.pauseMs);
            }
        };

        playSequence().catch((e) => {
            if (onError) onError(e);
        });
    },

    /**
     * Web Speech API Fallback
     */
    playFallback(text, { onStart, onEnd, onError, onFallback } = {}) {
        if (!('speechSynthesis' in window)) {
                if (onEnd) onEnd();
                return;
        }

        if (onFallback) onFallback();

        // Clear any stale queued requests before a new guided cue starts.
        pendingRequests.length = 0;

        const synthesis = window.speechSynthesis;
        const sentences = splitIntoSentences(text);

        const playSeq = async () => {
                if (onStart) onStart({ mode: 'fallback' });

                for (let i = 0; i < sentences.length; i++) {
                    if (_sequenceAbort) break;

                    if (_isPaused) {
                        await new Promise((resume) => _pauseResolvers.push(resume));
                        if (_sequenceAbort) break;
                    }

                    const s = sentences[i];
                    await new Promise((resolve, reject) => {
                        const utterance = new SpeechSynthesisUtterance(s);
                        utterance.rate = CONFIG.rate;
                        utterance.pitch = 1.0;
                        utterance.volume = 1.0;

                        const voices = synthesis.getVoices() || [];
                        const englishVoice =
                            voices.find((v) => /neural|wave|premium|google|natural|online/i.test(v.name) && v.lang && v.lang.startsWith('en')) ||
                            voices.find((v) => v.lang && v.lang.startsWith('en')) ||
                            voices[0];

                        if (englishVoice) utterance.voice = englishVoice;

                        let settled = false;
                        const finish = (err) => {
                            if (settled) return;
                            settled = true;
                            currentUtterance = null;
                            clearTimeout(fallbackTimer);
                            if (err) reject(err);
                            else resolve();
                        };

                        const fallbackTimer = setTimeout(() => {
                            try {
                                if (synthesis.speaking || synthesis.pending) synthesis.cancel();
                            } catch (e) {}
                            finish();
                        }, 9000);

                        utterance.onstart = () => {
                            currentUtterance = utterance;
                        };
                        utterance.onend = () => finish();
                        utterance.onerror = () => finish(new Error('synthesis error'));

                        try {
                            // clear stale state first to prevent cross-browser stuck utterances
                            if (synthesis.speaking || synthesis.pending) synthesis.cancel();
                            synthesis.resume();
                            synthesis.speak(utterance);
                        } catch (err) {
                            finish(err);
                        }
                    });

                    if (i < sentences.length - 1 && !_sequenceAbort) {
                        await new Promise((res) => {
                            _sequenceTimer = setTimeout(res, CONFIG.pauseMs);
                        });
                    }
                }

                if (!_sequenceAbort && onEnd) onEnd();
        };

        playSeq().catch((e) => {
                if (onError) onError(e);
        });
    },

    /**
     * Stop all playing audio & speech synthesis
     */
    stopSpeech() {
        activeText = null;
        _sequenceAbort = true;
        _isPaused = false;
        // resolve any pause waiters
        try {
            _pauseResolvers.forEach((r) => r());
        } catch (e) {}
        _pauseResolvers = [];
        if (_sequenceTimer) {
            clearTimeout(_sequenceTimer);
            _sequenceTimer = null;
        }
        if (currentAudio) {
            try { currentAudio.pause(); } catch (e) {}
            try { currentAudio.currentTime = 0; } catch (e) {}
            currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        // clear pending requests
        try { pendingRequests.length = 0; } catch (e) {}
        currentUtterance = null;
    },


    /**
     * Pause current speech
     */
    pauseSpeech() {
        _isPaused = true;
        if (currentAudio) {
            try { currentAudio.pause(); } catch (e) {}
        }
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
            try { window.speechSynthesis.pause(); } catch (e) {}
        }
        // do not abort the sequence; we will resume where left off
    },

    /**
     * Resume paused speech
     */
    resumeSpeech() {
        _isPaused = false;
        // resolve any waiters so sequences continue
        try {
            _pauseResolvers.forEach((r) => r());
        } catch (e) {}
        _pauseResolvers = [];

        if (currentAudio && currentAudio.paused) {
            currentAudio.play().catch(() => { });
        }
        if ('speechSynthesis' in window && window.speechSynthesis.paused) {
            try { window.speechSynthesis.resume(); } catch (e) {}
        }
    },

    /**
     * Convenience: play remaining sentences via fallback (used internally)
     */
    async playFallbackSequence(sentences, { onStart, onEnd, onError, onFallback } = {}) {
        if (!('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }

        if (onFallback) onFallback();

        const synthesis = window.speechSynthesis;
        if (synthesis.speaking || synthesis.pending) synthesis.cancel();
        synthesis.resume();

        if (onStart) onStart({ mode: 'fallback' });

        for (let i = 0; i < sentences.length; i++) {
            if (_sequenceAbort) break;

            if (_isPaused) {
                await new Promise((resume) => _pauseResolvers.push(resume));
                if (_sequenceAbort) break;
            }

            const s = sentences[i];
            await new Promise((resolve, reject) => {
                const utterance = new SpeechSynthesisUtterance(s);
                utterance.rate = CONFIG.rate;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;

                const voices = synthesis.getVoices() || [];
                const englishVoice =
                    voices.find((v) => /neural|wave|premium|google|natural|online/i.test(v.name) && v.lang && v.lang.startsWith('en')) ||
                    voices.find((v) => v.lang && v.lang.startsWith('en')) ||
                    voices[0];

                if (englishVoice) utterance.voice = englishVoice;

                let settled = false;
                const finish = (err) => {
                    if (settled) return;
                    settled = true;
                    currentUtterance = null;
                    clearTimeout(fallbackTimer);
                    if (err) reject(err);
                    else resolve();
                };

                const fallbackTimer = setTimeout(() => {
                    try {
                        if (synthesis.speaking || synthesis.pending) synthesis.cancel();
                    } catch (e) {}
                    finish();
                }, 9000);

                utterance.onstart = () => { currentUtterance = utterance; };
                utterance.onend = () => finish();
                utterance.onerror = () => finish(new Error('synthesis error'));

                try {
                    if (synthesis.speaking || synthesis.pending) synthesis.cancel();
                    synthesis.resume();
                    synthesis.speak(utterance);
                } catch (err) {
                    finish(err);
                }
            });

            if (i < sentences.length - 1 && !_sequenceAbort) {
                await new Promise((res) => {
                    _sequenceTimer = setTimeout(res, CONFIG.pauseMs);
                });
            }
        }

        if (!_sequenceAbort && onEnd) onEnd();
    },

    setConfig(newConfig) {
        Object.assign(CONFIG, newConfig);
    },

    /**
     * Mute / Unmute current audio
     */
    setMuted(muted) {
        if (currentAudio) {
            currentAudio.muted = muted;
            if (muted) {
                currentAudio.pause();
            }
        }
        if (muted && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    },

    /**
     * Query whether the TTS system is fully idle (no audio, no utterance, no pending requests)
     */
    isIdle() {
        const synthesisIdle = !('speechSynthesis' in window) || (!window.speechSynthesis.speaking && !window.speechSynthesis.pending);
        const noAudio = currentAudio === null;
        const noUtterance = currentUtterance === null;
        const noPending = (typeof pendingRequests !== 'undefined' ? pendingRequests.length === 0 : true);
        return synthesisIdle && noAudio && noUtterance && noPending;
    },
};
