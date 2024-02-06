import { onBeforeMount, ref } from "vue"
import { defineStore } from "pinia"

import { Channel, Socket } from "phoenix"
import { v4 as uuidv4 } from "uuid"

import { Move } from "../models/move.model"
import { GameState } from "../models/gameState.model"

import { useAudioStore } from "./audioStore"

const serverUrl = import.meta.env.VITE_SERVER_URL ? import.meta.env.VITE_SERVER_URL : "ws://localhost:4000/socket"

export const useTicTacToeStore = defineStore("useTicTacToeStore", () => {

	const audioStore = useAudioStore()

	const socket = ref<Socket>()
	const matchChannel = ref<Channel>()

	const userID = ref<string>()
	const userName = ref<string>()

	const gameID = ref<string>()
	const gameState = ref<GameState>()

	onBeforeMount(() => {
		// Criacao de user ID
		const savedBrowserID = localStorage.getItem("browser_id")

		if (savedBrowserID) {
			userID.value = savedBrowserID
		} else {
			userID.value = uuidv4()
			localStorage.setItem("browser_id", userID.value)
		}

		// Inicializacao do socket
		socket.value = new Socket(serverUrl, {
			params: { user_id: userID.value },
		})
		// coneccao ao socket
		socket.value.connect()
	})

	const createMatchChannel = (createGameId?: boolean) => {
		if (!socket.value) return { error: "No Socket" }
		if (createGameId) {
			gameID.value = uuidv4().slice(0, 6)
		}

		if (!gameID.value) return { error: "No Game ID" }

		// Inicializacao do canal match
		matchChannel.value = socket.value.channel("games:match:" + gameID.value, {
			name: userName.value,
		})

		// listener atualizacao do estado do jogo
		matchChannel.value.on("game_state_sent", (payload) => {
			gameState.value = payload
		})

		// listener sound cues
		matchChannel.value.on("move_made", (payload: Move) => {
			audioStore.playSoundPlay(payload.symbol)
		})

		// coneccao ao canal da match
		matchChannel.value.join()
	}

	const leaveMatchChannel = () => {
		if (!matchChannel.value) {
			throw new Error("No Matchmaking channel")
		}
		matchChannel.value.leave()
		matchChannel.value = undefined
	}

	const leaveMatch = () => {
		matchChannel.value?.push("surrender", {})
		leaveMatchChannel()
		gameID.value = undefined
		gameState.value = undefined
	}

	const executeGameMove = (x: number, y: number) => {
		if (!matchChannel.value) {
			throw new Error("No Matchmaking channel")
		}
		matchChannel.value.push("move", { x, y })
	}

	const playAgain = () => {
		if (!matchChannel.value) {
			throw new Error("No Matchmaking channel")
		}
		matchChannel.value.push("play_again", {})
	}

	const endGame = () => {
		gameID.value = undefined
		gameState.value = undefined
	}

	return {
		userID,
		userName,
		matchChannel,
		createMatchChannel,
		leaveMatchChannel,
		gameID,
		gameState,
		executeGameMove,
		playAgain,
		leaveMatch,
		endGame,
	}
})
