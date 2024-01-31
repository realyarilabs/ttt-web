<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">GAME OVER</h1>
        <img :src="winSvg" alt="" class="mt-24 mb-20 ttt-rem">
        <div class="flex flex-row gap-[3.12rem]">
          <button class="ttt-button btn-2" @click="">Play Again</button>
          <button class="ttt-button btn-1" @click="router.push({name: 'homepage'})">Return Home</button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import winSvg from '../assets/end/win.svg'
import lossSvg from '../assets/end/loss.svg'
import tieSvg from '../assets/end/tie.svg'

const router = useRouter();
</script>

<style>
.ttt-end{
  width: 24.5rem;
}
</style>


