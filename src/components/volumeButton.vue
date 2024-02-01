<template>
  <img v-if="isVolumeOn" :src="volumeSvg" class="ttt-icon absolute top-0 right-0 cursor-pointer" alt="volume">
  <img v-else :src="volumeOffSvg" class="ttt-icon absolute top-0 right-0 cursor-pointer" alt="volume">
</template>

<script setup lang="ts">
import { computed } from "vue";

import volumeSvg from '../assets/volume.svg'
import volumeOffSvg from '../assets/volumeOff.svg'


const isVolumeOn = computed(() => {
  return true
});
</script>
