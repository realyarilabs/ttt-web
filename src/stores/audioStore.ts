import { defineStore } from "pinia";

import soundX from "../assets/audio/soundx.wav";
import soundO from "../assets/audio/soundo.wav";

export const useAudioStore = defineStore("useAudioStore", () => {
  const audio = new Audio();

  const toggleVolume = (audioSwitch: boolean) => {
    if (audioSwitch) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
  };

  const playSound = (symbol: string) => {
    audio.src = symbol === 'X' ? soundX : soundO;
    audio.play();
  };

  return { audio, toggleVolume, playSound };
});
