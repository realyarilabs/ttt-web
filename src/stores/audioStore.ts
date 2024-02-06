import { defineStore } from "pinia"

import soundX from "../assets/audio/soundx.wav"
import soundO from "../assets/audio/soundo.wav"

import soundWin from "../assets/audio/soundWin.wav"
import soundLose from "../assets/audio/soundLose.wav"

export const useAudioStore = defineStore("useAudioStore", () => {

	const audio = new Audio()

	const toggleVolume = (audioSwitch: boolean) => {
    audio.volume = audioSwitch ? 1 : 0
	}

	const playSoundPlay = (symbol: string) => {
		audio.src = symbol === "X" ? soundX : soundO
		audio.play()
	}

	const playSoundFinish = (match_status: string) => {
		audio.src = match_status === "win" ? soundWin : soundLose
		audio.play()
	}

	return { audio, toggleVolume, playSoundPlay, playSoundFinish }
})
