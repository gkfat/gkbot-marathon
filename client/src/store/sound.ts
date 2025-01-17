import { ref } from 'vue';

import { defineStore } from 'pinia';

const host = 'https://storage.googleapis.com/logicard_duel/sounds';
const urls: {
    effect: { [key: string]: string };
    bgm: { [key: string]: string };
} = {
    effect: {
        click: `${host}/click.wav`,
        pop: `${host}/pop.wav`,
        countdown: `${host}/countdown.wav`,
        placeCard: `${host}/placeCard.wav`,
        coin: `${host}/coin.mp3`,
        opponentHurt: `${host}/robotHurt.wav`,
        playerHurt: `${host}/ouch.wav`,
        huh: `${host}/huh.wav`,
        bell: `${host}/bell.wav`,
        equip: `${host}/equip.wav`,
        heal: `${host}/heal.wav`,
        win: `${host}/win.wav`,
    },
    bgm: {
        battle: `${host}/battle.mp3`,
        rest: `${host}/rest.mp3`,
        prologue: `${host}/prologue.mp3`,
        end: `${host}/end.mp3`,
    },
};

export const useSoundStore = defineStore('sound', () => {
    const sounds: {
        effect: {
            click: HTMLAudioElement | null;
            pop: HTMLAudioElement | null;
            countdown: HTMLAudioElement | null;
            placeCard: HTMLAudioElement | null;
            coin: HTMLAudioElement | null;
            opponentHurt: HTMLAudioElement | null;
            playerHurt: HTMLAudioElement | null;
            huh: HTMLAudioElement | null;
            bell: HTMLAudioElement | null;
            equip: HTMLAudioElement | null;
            heal: HTMLAudioElement | null;
            win: HTMLAudioElement | null;
        };
        bgm: {
            battle: HTMLAudioElement | null;
            rest: HTMLAudioElement | null;
            prologue: HTMLAudioElement | null;
            end: HTMLAudioElement | null;
        };
    } = {
        effect: {
            click: null,
            pop: null,
            countdown: null,
            placeCard: null,
            coin: null,
            opponentHurt: null,
            playerHurt: null,
            huh: null,
            bell: null,
            equip: null,
            heal: null,
            win: null,
        },
        bgm: {
            battle: null,
            rest: null,
            prologue: null,
            end: null,
        },
    };

    const totalAssets = ref(0);
    const loadedAssets = ref(0);
    const nowPlaying = ref<HTMLAudioElement | null>();

    /** 是否在視窗內 */
    const isVisible = ref(true);

    /** 靜音模式 */
    const muteMode = ref(false);

    // 開始載入素材
    const loadAssets = () => {
        const soundEffectKeys = Object.keys(urls.effect);
        const soundBgmKeys = Object.keys(urls.bgm);
        totalAssets.value = soundEffectKeys.length + soundBgmKeys.length;

        // Load sound effects
        soundEffectKeys.forEach((key) => {
            const audio = new Audio(urls.effect[key]);
            audio.addEventListener('canplaythrough', () => {
                loadedAssets.value += 1;
                if (loadedAssets.value === totalAssets.value) {
                    console.log('All assets loaded');
                }
            });
            sounds.effect[key] = audio;
            audio.load();
        });

        // Load BGM
        soundBgmKeys.forEach((key) => {
            const audio = new Audio(urls.bgm[key]);
            audio.addEventListener('canplaythrough', () => {
                loadedAssets.value += 1;
                if (loadedAssets.value === totalAssets.value) {
                    console.log('All assets loaded');
                }
            });
            sounds.bgm[key] = audio;
            audio.load();
        });

        nowPlaying.value = sounds.bgm.prologue;
    };

    const playSound = async (audio: HTMLAudioElement | null) => {
        if (isVisible.value && !muteMode.value && audio) {
            audio.currentTime = 0;
            audio.volume = 1;
            await audio.play();
        }
    };

    const pause = (audio: HTMLAudioElement | null) => {
        if (audio) {
            audio.pause();
        }
    };

    const playBGM = async (audio: HTMLAudioElement | null) => {
        if (nowPlaying.value) {
            pause(nowPlaying.value);
        }

        nowPlaying.value = audio;

        if (isVisible.value && !muteMode.value && audio) {
            audio.currentTime = 0;
            audio.muted = false;
            audio.volume = 0.5;
            audio.loop = true;
            await audio.play();
        }
    };

    const pauseAllSounds = () => {
        Object.values(sounds.effect).forEach((audio) => pause(audio));
        Object.values(sounds.bgm).forEach((audio) => pause(audio));

        if (nowPlaying.value) {
            pause(nowPlaying.value);
        }
    };

    const resume = async () => {
        if (!muteMode.value && nowPlaying.value) {
            await nowPlaying.value.play();
        }
    };

    const toggleMute = () => {
        muteMode.value = !muteMode.value;

        if (muteMode.value) {
            pauseAllSounds();
        } else {
            resume();
        }
    };

    const listenVisibility = () => {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                isVisible.value = false;
                pauseAllSounds();
            } else {
                isVisible.value = true;
                resume();
            }
        });
    };

    const playAllInMute = async () => {
        const soundEffectKeys = Object.keys(urls.effect).filter((v) => v !== 'click');
        const soundBgmKeys = Object.keys(urls.bgm).filter((v) => v !== 'prologue');

        soundEffectKeys.forEach(async (key) => {
            const audio: HTMLAudioElement | null = sounds.effect[key];
            if (audio) {
                audio.volume = 0;
                audio.muted = true;
                await audio.play();
                setTimeout(() => {
                    audio.pause();
                    audio.volume = 1;
                    audio.muted = false;
                }, 10);
            }
        });

        soundBgmKeys.forEach(async (key) => {
            const audio: HTMLAudioElement | null = sounds.bgm[key];
            if (audio) {
                audio.volume = 0;
                audio.muted = true;
                await audio.play();
                setTimeout(() => {
                    audio.pause();
                    audio.volume = 0.5;
                    audio.muted = false;
                }, 10);
            }
        });
    };

    /** 初始化 */
    const init = () => {
        loadAssets();
        listenVisibility();
    };

    return {
        muteMode,
        sounds,
        loadAssets,
        playSound,
        playBGM,
        pause,
        pauseAllSounds,
        resume,
        toggleMute,
        listenVisibility,
        init,
        playAllInMute,
    };
});
