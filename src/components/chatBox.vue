<template>
	<div class="flex flex-col size-full w-full overflow-hidden grow-0">
		<div
			id="chat"
			class="flex flex-col w-full bg-[#2d8078] rounded-t-lg h-[75%] max-h-[310px] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
		>
			<div v-for="(message, index) in chatHistory" :key="index" class="px-2">
				{{ message }}
			</div>
		</div>
		<div class="flex flex-col h-[25%]">
			<input class="flex items-center self-stretch ttt-input-2 rounded-none p-2" v-model="currentMessage" />
			<button class="ttt-button btn-2 rounded-none" @click="sendMessage(currentMessage)">SEND</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useTicTacToeStore } from "../stores/ticTacToeStore"

	const ticTacToeStore = useTicTacToeStore()

	const chatHistory = ref([""])
	const currentMessage = ref("")

	const sendMessage = (message: string) => {
		ticTacToeStore.matchChannel?.push("broadcast_message", { message })
	}

	onMounted(() => {
		ticTacToeStore.matchChannel?.on("game_message", (payload: { message: string; sender_id: string }) => {
			chatHistory.value.push(payload.message)
      autoScroll()
		})
	})

	const autoScroll = () => {
		setTimeout(() => {
			var objDiv = document.querySelector("#chat > div:last-of-type") // document.getElementById("your_div");
			if (objDiv) {
				objDiv.scrollIntoView()
			}
		}, 250)
	}

</script>

<style>
	.ttt-input-2 {
		gap: 0.625rem;
		border: 1px solid var(--Light-Text-2);
		background: var(--bg-color);
		/* Text */
		color: var(--Light-Text-2);
		font-family: Gilroy-Light;
		font-size: 1.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
