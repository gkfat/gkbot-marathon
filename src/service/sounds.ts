import click from '@/assets/sounds/click.wav';
import pop from '@/assets/sounds/pop.wav';
import countdown from '@/assets/sounds/countdown.wav';
import placeCard from '@/assets/sounds/placeCard.wav';
import coin from '@/assets/sounds/coin.mp3';
import robotHurt from '@/assets/sounds/robotHurt.wav';
import ouch from '@/assets/sounds/ouch.wav';
import huh from '@/assets/sounds/huh.wav';
import bell from '@/assets/sounds/bell.wav';
import equip from '@/assets/sounds/equip.wav';
import heal from '@/assets/sounds/heal.wav';
import win from '@/assets/sounds/win.wav';
// BGM
// import battle from '@/assets/sounds/battle.mp3';
// import rest from '@/assets/sounds/rest.mp3';
// import prologue from '@/assets/sounds/prologue.mp3';
// import end from '@/assets/sounds/end.mp3';

class SoundService {
  totalAssets: number = 0;
  loadedAssets: number = 0;
  sounds: {
    [key: string]: HTMLAudioElement
  } = {
    click: new Audio(click),
    pop: new Audio(pop),
    countdown: new Audio(countdown),
    placeCard: new Audio(placeCard),
    coin: new Audio(coin),
    robotHurt: new Audio(robotHurt),
    ouch: new Audio(ouch),
    huh: new Audio(huh),
    bell: new Audio(bell),
    equip: new Audio(equip),
    heal: new Audio(heal),
    win: new Audio(win),
    /** BGM */
    // battle: new Audio(battle),
    // rest: new Audio(rest),
    // prologue: new Audio(prologue),
    // end: new Audio(end),
  }

  // 開始載入素材
  loadAssets() {
    console.log('Start loading assets');
    const soundKeys = Object.keys(this.sounds);
    this.totalAssets = soundKeys.length;
    for (const key of soundKeys) {
      this.sounds[key].addEventListener('canplaythrough', () => {
        if (this.loadedAssets < this.totalAssets) {
          this.loadedAssets += 1;
          console.log(`loading process: ${this.loadedAssets}/${this.totalAssets}`);
        }
      });
    }
  }

  async playSound(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.volume = 1;
    await audio.play();
  }

  async playBGM(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.loop = true;
    await audio.play();
  };

  stop(audio: HTMLAudioElement) {
    audio.pause();
  }

}

export default new SoundService();