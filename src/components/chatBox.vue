<template>
	<div class="flex flex-col size-full w-full overflow-hidden grow-0">
		<div
			id="chat"
			class="flex flex-col w-full bg-chat-green rounded-t-lg h-[75%] max-h-[310px] overflow-y-auto scrollbar-thumb-rounded"
		>
			<div v-for="(message, index) in chatHistory" :key="index" class="px-2">
				<span id="message" class="text-white">{{ message }}</span>
			</div>
		</div>
		<div class="flex flex-col h-[25%] items-center">
			<input
				class="flex items-center self-stretch ttt-input-2 rounded-none p-2"
				v-model="currentMessage"
				@keypress.enter="sendMessage(currentMessage)"
			/>
			<button
				class="ttt-button btn-3 rounded-none bg-chat-green"
				@click="sendMessage(currentMessage)"
			>
				SEND
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useTicTacToeStore } from "../stores/ticTacToeStore";

	// Challenge SEI 3
	// Update the "game_message" listener function to save the whole payload into the chatHistoryAdvanced variable instead of just the message to chatHistory
	// Inside the component's template :
	//     update v-for to use chatHistoryAdvanced instead of chatHistory
	//     update the message span by using v-if to check the message sender_id using the helper method checkIsSpectator
	//       if sender_id is from a spectator changed the message class from 'text-white' to 'text-black'
	// useful links: https://vuejs.org/guide/essentials/conditional.html#v-else

	// For exercise 3 uncomment the lines below
	/*
import { useTicTacToeHelpers } from "../composables/tttHelper"
const { checkIsSpectator } = useTicTacToeHelpers()

interface ChatMessage {
 message: string
 sender_id: string
}
const chatHistoryAdvanced = ref(Array<ChatMessage>())
*/

	const ticTacToeStore = useTicTacToeStore();

	const chatHistory = ref([""]);
	const currentMessage = ref("");

	const matchChannel = ticTacToeStore.matchChannel!;

	const sendMessage = (message: string) => {
		// Challenge SEI 1
		// Use the matchChannel to broadcast an event with the topic "broadcast_message" as the first parameter
		// on the second parameter send an object containing the message received as argument to this function
		// after pushing the event clear the currentMessage value by setting it as an empty string
		// Tip: To access ref and computed properties you must use var_name.value
		/*
    if extra help is needed check help tips below
  */
	};

	onMounted(() => {
		// Challenge SEI 2
		// Use the matchChannel to listen an event with the topic "game_message"
		// you will receive a payload with the current format
		// payload: { message: string; sender_id: string }
		// the listener function will take the message from the payload and push it to the chatHistory variable
		// optional: you can also call autoScroll function at the end to force chat window scroll to most recent message
		/*
    if extra help is needed check help tips below
  */
	});

	const autoScroll = () => {
		setTimeout(() => {
			var objDiv = document.querySelector("#chat > div:last-of-type");
			if (objDiv) objDiv.scrollIntoView();
		}, 250);
	};

	// EXTRA
	// Challenge SEI 4
	// In the template , inside the message's span add the sender_id alongside the message
	// so it becomes USERID: message
	// Use this method to clip the id since it is too long
	// useful links: https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation
	const clipID = (userID: string) => {
		return userID.slice(0, 6);
	};

	// HELP TIPS
	// 1
	// channel.push("event_topic", { variables })
	//
	// 2
	/*
    channel.on("event_topic", (payload: { variable1: string; variable2: string }) => {
      ...do stuff
    })
  */
</script>

<style>
	.ttt-input-2 {
		gap: 0.625rem;
		border: 1px solid var(--bg-color);
		background: var(--Light-Text-2);
		/* Text */
		color: var(--bg-color);
		font-family: Gilroy-Light;
		font-size: 1.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
