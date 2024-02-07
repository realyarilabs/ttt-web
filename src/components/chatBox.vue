<template>
	<div class="flex flex-col size-full w-full overflow-hidden grow-0">
		<div
			id="chat"
			class="flex flex-col w-full bg-[#2d8078] rounded-t-lg h-[75%] max-h-[310px] overflow-y-auto scrollbar-thumb-rounded"
		>
			<div v-for="(message, index) in chatHistoryAdvanced" :key="index" class="px-2">
				<span v-if="checkIsSpectator(message.sender_id)" class="text-black">{{ message.message }}</span>
				<span v-else class="text-white">{{ message.message }}</span>
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

	import { useTicTacToeHelpers } from "../composables/tttHelper"
	const { checkIsSpectator } = useTicTacToeHelpers()
	const ticTacToeStore = useTicTacToeStore()

	interface ChatMessage {
		message: string
		sender_id: string
	}
	const chatHistoryAdvanced = ref(Array<ChatMessage>())

	const chatHistory = ref([""])
	const currentMessage = ref("")


	const matchChannel = computed(() => {
		return ticTacToeStore.matchChannel!
	})

	const sendMessage = (message: string) => {
		matchChannel.value.push("broadcast_message", { message })
		currentMessage.value = ""
	}

	onMounted(() => {
		matchChannel.value.on("game_message", (payload: { message: string; sender_id: string }) => {
			chatHistory.value.push(payload.message)
			chatHistoryAdvanced.value.push(payload)
			autoScroll()
		})
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
