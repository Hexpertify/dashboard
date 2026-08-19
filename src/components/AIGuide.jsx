import { Sparkles } from 'lucide-react';

export function AIGuide({ state = 'ready', customText, onClick, className = '' }) {
    // state: 'ready' | 'generating' | 'speaking' | 'guiding' | 'paused' | 'muted' | 'fallback'
    const isSpeaking = state === 'speaking';
    const isGenerating = state === 'generating';
    const isMuted = state === 'muted';
    const isPaused = state === 'paused';
    const isGuiding = state === 'guiding';
    const isFallback = state === 'fallback';

    const statusLabel = customText
        ? customText
        : isMuted
            ? 'Voice off'
            : isPaused
                ? 'Paused'
                : isGenerating
                    ? 'Preparing voice...'
                    : isSpeaking
                        ? 'Speaking...'
                        : isFallback
                            ? 'Using backup voice'
                            : isGuiding
                                ? 'Guiding you...'
                                : 'Ready';

    return (
        <div
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-full border border-[#E9E4F5] bg-white/90 px-3.5 py-1.5 text-xs font-extrabold text-[#450BC8] shadow-sm backdrop-blur transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white hover:shadow-md' : ''
                } ${className}`}
        >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                {(isSpeaking || isGenerating) && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#450BC8] opacity-75" />
                )}
                <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${isMuted
                            ? 'bg-[#9A91A3]'
                            : isPaused
                                ? 'bg-[#F59E0B]'
                                : isGenerating
                                    ? 'bg-[#3B82F6]'
                                    : isSpeaking
                                        ? 'bg-[#450BC8]'
                                        : isFallback
                                            ? 'bg-[#8B5CF6]'
                                            : isGuiding
                                                ? 'bg-[#059669]'
                                                : 'bg-[#450BC8]'
                        }`}
                />
            </span>

            <span className="flex items-center gap-1.5 tracking-wide">
                <Sparkles className="h-3.5 w-3.5 text-[#450BC8]" />
               
                <span className="text-[#8B8294] font-semibold">·</span>
                <span className="text-[#554C61] font-semibold">{statusLabel}</span>
            </span>
        </div>
    );
}
