<template>
	<button @click="switchVolume">
		<img v-if="isVolumeOn" :src="volumeSvg" class="ttt-icon absolute top-0 right-0 cursor-pointer" alt="volume" />
		<img v-else :src="volumeOffSvg" class="ttt-icon absolute top-0 right-0 cursor-pointer" alt="volume" />
	</button>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import volumeSvg from "../assets/volume.svg"
	import volumeOffSvg from "../assets/volumeOff.svg"
	import { useAudioStore } from "../stores/audioStore"

	const audioStore = useAudioStore()

	const isVolumeOn = ref(audioStore.audio.volume > 0)

	const switchVolume = () => {
		isVolumeOn.value = !isVolumeOn.value
		audioStore.toggleVolume(isVolumeOn.value)
	}
</script>
