export const GUIDANCE_SCHEDULE = {
    touch: [
        { time: 0, text: "Let's begin with touch." },
        { time: 3, text: "Find something comfortable to touch. What do you notice?" },
        { time: 10, text: "Notice its texture." },
        { time: 18, text: "Is it soft, smooth, rough, or firm?" },
        { time: 25, text: "Stay with that sensation for a moment." },
    ],
    sight: [
        { time: 0, text: "Now let's focus on sight." },
        { time: 3, text: "Look at something pleasant or calming. Stay with it for a few moments." },
        { time: 10, text: "Notice its colors." },
        { time: 17, text: "Look at its shape." },
        { time: 22, text: "Notice the light and shadows." },
        { time: 26, text: "Let your eyes rest there." },
    ],
    sound: [
        { time: 0, text: "Now bring your attention to sound." },
        { time: 3, text: "Listen to one sound around you. Notice its rhythm, volume, and quality." },
        { time: 10, text: "Is the sound near or far?" },
        { time: 17, text: "Is it loud or soft?" },
        { time: 23, text: "Notice its rhythm." },
        { time: 27, text: "Keep listening for a few more moments." },
    ],
    smell: [
        { time: 0, text: "Now bring your attention to smell." },
        { time: 3, text: "Notice a pleasant scent around you, or imagine one." },
        { time: 10, text: "Take a slow breath in." },
        { time: 20, text: "Notice whether it feels fresh, sweet, or familiar." },
        { time: 27, text: "Let yourself stay with that sensation." },
    ],
    taste: [
        { time: 0, text: "Let's finish with taste." },
        { time: 3, text: "Take a small sip or bite. Notice its taste and texture." },
        { time: 11, text: "Notice the first taste." },
        { time: 19, text: "Notice the texture." },
        { time: 25, text: "Take your time." },
    ],
};

export const TRANSITION_SPEECH = {
    touch: "Nice. Now let's bring your attention to sight.",
    sight: "Good. Now let's listen.",
    sound: "Nice. Now let's notice scent.",
    smell: "Good. One last sense: taste.",
    taste: "You've completed all five senses.",
};
