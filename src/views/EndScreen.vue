<template>
	<div class="h-screen w-screen flex items-center justify-center bg-ttt">
		<div class="flex flex-col justify-center items-center z-10">
			<h1 class="ttt-h1 pb-2">GAME OVER</h1>
			<img v-if="!isSpectator || isTie" :src="showGraphics" alt="end graphics" class="my-8 md:mt-24 md:mb-20 ttt-rem" />
			<span class="ttt-h1 pb-8" v-else> {{ winnerName }} is VICTORIOUS!</span>
			<div class="flex flex-col md:flex-row gap-4 md:gap-[3.12rem]">
				<button v-if="!isSpectator" class="sm:w-40 ttt-button btn-2" @click="playAgain">Play Again</button>
				<button class="sm:w-40 ttt-button btn-1" @click="goHome">Return Home</button>
			</div>
		</div>
		<div class="flex h-full w-full absolute px-14 py-5">
			<div class="relative flex h-full w-full">
				<volumeButton />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useRouter } from "vue-router"

	import winSvg from "../assets/end/win.svg"
	import lossSvg from "../assets/end/loss.svg"
	import tieSvg from "../assets/end/tie.svg"

	import { useAudioStore } from "../stores/audioStore"
	import { useTicTacToeStore } from "../stores/ticTacToeStore"
	import { useTicTacToeHelpers } from "../composables/tttHelper"

	import volumeButton from "../components/volumeButton.vue"

	const audioStore = useAudioStore()
	const ticTacToeStore = useTicTacToeStore()
	const router = useRouter()

	const { isSpectator, getKeyByValue } = useTicTacToeHelpers()

	const gameEndings = ref({
		win: winSvg,
		loss: lossSvg,
		tie: tieSvg,
	})

	const winner = ticTacToeStore.gameState?.winner === ticTacToeStore.userID
	const isTie = ticTacToeStore.gameState?.winner === "draw"
	const winnerName = isTie ? "" : getKeyByValue(ticTacToeStore.gameState?.players, ticTacToeStore.gameState?.winner!)

	const showGraphics = isTie ? gameEndings.value["tie"] : winner ? gameEndings.value["win"] : gameEndings.value["loss"]

	const goHome = () => {
		ticTacToeStore.endGame()
		ticTacToeStore.leaveMatchChannel()
		router.push({ name: "homepage" })
	}

	const playAgain = () => {
		ticTacToeStore.playAgain()
	}

	onMounted(() => {
		if (!ticTacToeStore.gameState || !ticTacToeStore.matchChannel) {
			router.push({ name: "homepage" })
			return
		}

    // listener rematch
		ticTacToeStore.matchChannel.on("play_again", () => {
			const gameID = ticTacToeStore.gameID
			ticTacToeStore.endGame()
			router.push({ name: "game", params: { gameID } })
		})

		audioStore.playSoundFinish(winner || isSpectator ? "win" : "loss")
	})
</script>

<style>
	.ttt-end {
		width: 24.5rem;
	}
</style>
