import { useSoundStore } from '@/store/sound';

export const useSoundEffect = () => {
    const soundStore = useSoundStore();

    const executeFunction = (fn?: Function) => {
        if (fn && typeof fn === 'function') {
            fn();
        }
    };

    /** 點擊聲 */
    const soundClick = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.click);
        executeFunction(fn);
    };

    /** 裝備聲 */
    const soundEquip = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.equip);
        executeFunction(fn);
    };

    /** 波聲 */
    const soundPop = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.pop);
        executeFunction(fn);
    };

    const soundPlayerHurt = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.playerHurt);
        executeFunction(fn);
    };

    const soundOpponentHurt = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.opponentHurt);
        executeFunction(fn);
    };

    const soundPlaceCard = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.placeCard);
        executeFunction(fn);
    };

    const soundCountdown = async (fn?: Function) => {
        await soundStore.playSound(soundStore.sounds.effect.countdown);
        executeFunction(fn);
    };

    const bgmPrologue = async (fn?: Function) => {
        await soundStore.playBGM(soundStore.sounds.bgm.prologue);
        executeFunction(fn);
    };

    const bgmRest = async (fn?: Function) => {
        await soundStore.playBGM(soundStore.sounds.bgm.rest);
        executeFunction(fn);
    };

    const bgmEnd = async (fn?: Function) => {
        await soundStore.playBGM(soundStore.sounds.bgm.end);
        executeFunction(fn);
    };

    const bgmBattle = async (fn?: Function) => {
        await soundStore.playBGM(soundStore.sounds.bgm.battle);
        executeFunction(fn);
    };

    return {
        soundClick,
        soundEquip,
        soundPop,
        soundCountdown,
        soundPlaceCard,
        soundPlayerHurt,
        soundOpponentHurt,

        bgmPrologue,
        bgmBattle,
        bgmRest,
        bgmEnd,
    };
};