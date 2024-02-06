import { computed } from "vue"
import { useTicTacToeStore } from "../stores/ticTacToeStore"

export function useTicTacToeHelpers() {
	const ticTacToeStore = useTicTacToeStore()

	const winCombinations = [
		[
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 0, y: 2 },
		],
		[
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
		],
		[
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
		],
		[
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
		],
		[
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
		],
		[
			{ x: 0, y: 2 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 },
		],
		[
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 },
		],
		[
			{ x: 0, y: 2 },
			{ x: 1, y: 1 },
			{ x: 2, y: 0 },
		],
	]

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

	const getKeyByValue = (object: any, value: string) => {
		return Object.keys(object).find((key) => object[key] === value)
	}

	const getWinningLine = (board: string[][]) => {
		 return winCombinations.find((line) => {
      // return true on winning line
		})
	}

	return { getKeyByValue, isSpectator, myTurn, pieceValue, getWinningLine }
}
