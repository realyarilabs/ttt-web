<template>
	<div class="flex flex-col size-full w-full overflow-hidden grow-0">
		<div
			id="chat"
			class="flex flex-col w-full bg-[#2d8078] rounded-t-lg h-[75%] max-h-[310px] overflow-y-auto scrollbar-thumb-rounded"
		>
			<div v-for="(message, index) in chatHistory" :key="index" class="px-2">
				<span class="text-white">{{ message }}</span>
			</div>
		</div>
		<div class="flex flex-col h-[25%]">
			<input
				class="flex items-center self-stretch ttt-input-2 rounded-none p-2"
				v-model="currentMessage"
				@keypress.enter="sendMessage(currentMessage)"
			/>
			<button class="ttt-button btn-2 rounded-none" @click="sendMessage(currentMessage)">SEND</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue"
	import { useTicTacToeStore } from "../stores/ticTacToeStore"

	// Challenge SEI 3
	// For advanced exercise uncomment these lines
	// save the whole payload into chatHistoryAdvanced and use checkIsSpectator in template to distinguish between players/spectators
	/*
 import { useTicTacToeHelpers } from "../composables/tttHelper"
 const { checkIsSpectator } = useTicTacToeHelpers()

 interface ChatMessage {
   message: string
   sender_id: string
 }
 const chatHistoryAdvanced = ref(Array<ChatMessage>())
 */

	const ticTacToeStore = useTicTacToeStore()

	const chatHistory = ref([""])
	const currentMessage = ref("")

	const matchChannel = ticTacToeStore.matchChannel!

	// Tip: To access ref and computed properties tou must use var_name.value

	const sendMessage = (message: string) => {
		// Challenge SEI 1
		//push to the match channel the "broadcast_message" event with the message as payload and clear currentMessage value
	}

	onMounted(() => {
		// Challenge SEI 2
		//listen to the "game_message" event from match channel with the message as payload: { message: string; sender_id: string } and push the message to chat history
		//optional: you can also use autoScroll function to scroll to most recent message
	})

	const autoScroll = () => {
		setTimeout(() => {
			var objDiv = document.querySelector("#chat > div:last-of-type")
			if (objDiv) objDiv.scrollIntoView()
		}, 250)
	}
</script>

<style>
	.ttt-input-2 {
		gap: 0.625rem;
		border: 1px solid var(--bg-color);
		background: white;
		/* Text */
		color: var(--bg-color);
		font-family: Gilroy-Light;
		font-size: 1.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
