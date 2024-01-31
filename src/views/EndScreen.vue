<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">GAME OVER</h1>
      <img :src="showGraphics" alt="end graphics" class="mt-24 mb-20 ttt-rem">
      <div class="flex flex-row gap-[3.12rem]">
        <button class="ttt-button btn-2" @click="">Play Again</button>
        <button class="ttt-button btn-1" @click="router.push({ name: 'homepage' })">Return Home</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { usePhoenixSocketStore } from "../stores/phoenixSocketStore";

import winSvg from '../assets/end/win.svg'
import lossSvg from '../assets/end/loss.svg'
import tieSvg from '../assets/end/tie.svg'

const phoenixSocketStore = usePhoenixSocketStore();
const router = useRouter();

const gameEndings = ref({
  "win": winSvg,
  "loss": lossSvg,
  "tie": tieSvg
});

const isWinner = computed(() => {
  return phoenixSocketStore.gameState?.winner === phoenixSocketStore.userID
});

const isTie = computed(() => {
  return false
});

const showGraphics = computed(() => {
  if(isTie.value)
    return gameEndings.value["tie"]
  return isWinner.value ? gameEndings.value["win"] : gameEndings.value["loss"]
});

</script>

<style>
.ttt-end {
  width: 24.5rem;
}
</style>


