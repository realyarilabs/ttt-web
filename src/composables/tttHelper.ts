import { computed } from "vue"
import { useTicTacToeStore } from "../stores/ticTacToeStore"

const ticTacToeStore = useTicTacToeStore()

export function useTicTacToeHelpers() {

	const getKeyByValue = (object: any, value: string) => {
		return Object.keys(object).find((key) => object[key] === value)
	}

	const isSpectator = computed(() => {
		if (!ticTacToeStore.gameState) return
		return getKeyByValue(ticTacToeStore.gameState.players, ticTacToeStore.userID!) === undefined
	})

	const myTurn = computed(() => {
		return ticTacToeStore.gameState?.current_player === ticTacToeStore.userID
	})

	const pieceValue = computed(() => {
		if (!ticTacToeStore.gameState) return
		return getKeyByValue(ticTacToeStore.gameState.players, ticTacToeStore.gameState.current_player!)
	})

	return { getKeyByValue, isSpectator, myTurn, pieceValue }
}
