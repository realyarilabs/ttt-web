<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt ttt-grid">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">TIC TAC TOE CHALLENGE !</h1>
      <p class="ttt-subtext">Ready for a game of Xs and Os ?</p>
      <div class="flex flex-col justify-center items-center pt-[3.69rem]">
        <button class="ttt-button btn-1" @click="createGame(true)">CREATE NEW GAME</button>
        <span class="py-5 ttt-or">OR</span>
        <input class="flex items-center self-stretch ttt-input rounded-md" v-model="phoenixSocketStore.gameID" placeholder="Enter Game ID" />
        <button class="ttt-button btn-2 mt-[2.12rem]" @click="createGame()">JOIN EXISTING GAME</button>
      </div>
  </div>
  <div class="flex h-full w-full absolute px-14 py-5">
    <div class="relative flex h-full w-full">
      <img :src="oSvg" class="ttt-icon absolute top-0 left-0" alt="o">
      <img :src="xSvg" class="ttt-icon absolute top-0 inset-x-1/2 -translate-x-2/4" alt="x">
      <img :src="xSvg" class="ttt-icon absolute top-0 right-0" alt="x">
      <img :src="xSvg" class="ttt-icon absolute bottom-0 left-0" alt="x">
      <img :src="oSvg" class="ttt-icon absolute bottom-0 inset-x-1/2 -translate-x-2/4" alt="o">
      <img :src="oSvg" class="ttt-icon absolute bottom-0 right-0" alt="o">
    </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import { usePhoenixSocketStore } from "../stores/phoenixSocketStore";
import { useRouter } from "vue-router";

import xSvg from '../assets/x.svg'
import oSvg from '../assets/o.svg'

const phoenixSocketStore = usePhoenixSocketStore();
const router = useRouter();

const createGame = (createGameId?: boolean) => {
  const response = phoenixSocketStore.createBattleChannel(createGameId);
  if (response) {
    alert(response.error);
  } else {
    router.push({
      name: "game",
      params: { gameID: phoenixSocketStore.gameID },
    });
  }
};
</script>

<style>
.ttt-grid {
    background-image:
      repeating-linear-gradient(var(--lines) 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, var(--lines) 0 1px, transparent 1px 100%);
    background-size: 9rem 9rem;
}

.ttt-h1{
  color: var(--Light-Text);
  font-family: "Noto Sans";
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.ttt-subtext{
  color: var(--Light-Text-2);
  font-family: Gilroy-Light;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.ttt-or{
  color: var(--Light-Text);
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.ttt-input{
  padding: 1.125rem 0rem 1.125rem 1.5rem;
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

.ttt-input::placeholder {
  /* Text */
  color: var(--Light-Text-2);
  font-family: Gilroy-Light;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.ttt-icon{
  width: 2.5rem;
  height: 5.5rem;
}
</style>
