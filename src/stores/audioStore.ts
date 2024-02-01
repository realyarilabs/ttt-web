import { defineStore } from "pinia";

export const useAudioStore = defineStore("useAudioStore", () => {
  const audio = new Audio();

  const toggleVolume = (audioSwitch: boolean) => {
    if (audioSwitch) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
  };

  const playSound = (sound: string) => {
    audio.src = sound;
    audio.play();
  };
  return { audio, toggleVolume, playSound };
});
