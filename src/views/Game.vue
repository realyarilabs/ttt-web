<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">GAME ON !</h1>
      <div class="ttt-subtext flex flex-row justify-center items-center">
        Game Code
        <img :src="infoSvg" class="ttt-icon-piece mx-2" alt="info"> :
        <span class="flex flex-row cursor-pointer items-center px-2 underline t-orange" @click="copyCodeToClipboard">
          {{ phoenixSocketStore.gameID }}
          <img :src="copySvg" class="ttt-icon-piece mx-2" alt="copy">
        </span>
      </div>
      <div v-if="phoenixSocketStore.gameState" class="flex flex-col justify-center items-center pt-[3.69rem]">
        <div v-for="(row, i) of phoenixSocketStore.gameState.board" :key="i" class="flex gap-[0.94rem] pb-[0.94rem]">
          <button v-for="(value, j) of row" :key="j"
            class="ttt-square w-[8.125rem] h-[8.125rem] rounded-[0.625rem] flex justify-center items-center"
            @click="phoenixSocketStore.executeGameMove(i, j)">
            <img v-if="value" :src="getPieceByValue(value)" class="ttt-piece" :alt="value">
          </button>
        </div>
      </div>
      <p v-if="myTurn" class="ttt-subtext flex flex-row items-center ttt-turn">Your Turn : <img :src="myPiece"
          class="ttt-icon-piece ml-[0.69rem]" :alt="myPieceValue"> </p>
      <p v-else class="ttt-subtext flex flex-row items-center ttt-turn"> Opponent's TurN : <img :src="enemyPiece"
          class="ttt-icon-piece ml-[0.69rem]" :alt="myPieceValue"> </p>
    </div>
    <div class="flex h-full w-full absolute px-14 py-5">
      <div class="relative flex h-full w-full">
        <img :src="exitSvg" class="ttt-icon absolute top-0 left-0 cursor-pointer" alt="o" @click="router.back()">
        <img :src="volumeSvg" class="ttt-icon absolute top-0 right-0 cursor-pointer" alt="x">
      </div>
    </div>
    <!--div >
      {{ phoenixSocketStore.gameState }}
    </div-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePhoenixSocketStore } from "../stores/phoenixSocketStore";

import xSvg from '../assets/x.svg'
import oSvg from '../assets/o.svg'
import volumeSvg from '../assets/volume.svg'
import exitSvg from '../assets/exit.svg'
import copySvg from '../assets/copy.svg'
import infoSvg from '../assets/info.svg'

const phoenixSocketStore = usePhoenixSocketStore();

const router = useRouter();
const route = useRoute();

const listening = ref(false);
const loading = ref(false);

const gamePieces = ref([
  { id: "O", icon: oSvg },
  { id: "X", icon: xSvg }
]);

const myTurn = computed(() => {
  return phoenixSocketStore.gameState?.current_player === phoenixSocketStore.userID
});

const myPieceValue = computed(() => {
  return getKeyByValue(phoenixSocketStore.gameState?.players, phoenixSocketStore.userID!);
});

const myPiece = computed(() => {
  return gamePieces.value.find(piece => piece.id === myPieceValue.value)?.icon;
});

const enemyPiece = computed(() => {
  return gamePieces.value.find(piece => piece.id !== myPieceValue.value)?.icon;
});

const getPieceByValue = (value: string) => {
  return gamePieces.value.find(piece => piece.id === value)?.icon;
}

const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find(key => object[key] === value);
}

const copyCodeToClipboard = () => {
  return navigator.clipboard.writeText(phoenixSocketStore.gameID!);
}

watch(
  () => phoenixSocketStore.battleChannel,
  () => {
    if (!phoenixSocketStore.battleChannel || listening.value || loading.value)
      return;

    loading.value = true;
    listening.value = true;

    loading.value = false;
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (!route.params.gameID && !phoenixSocketStore.gameID) {
    router.push({ name: "Home" });
  } else {
    const routeGameID = route.params.gameID as string;
    if (!routeGameID) return;
    phoenixSocketStore.gameID = routeGameID;
    phoenixSocketStore.createBattleChannel();
  }
});
</script>

<style>
.ttt-square {
  background: var(--Game-Board-BG);
}

.ttt-piece {
  width: 3.75rem;
  height: 7.0625rem;
}

.ttt-icon-piece {
  width: 1.0625rem;
  height: 2.4375rem;
}

.ttt-turn {
  color: var(--Light-Text);
  font-family: Gilroy-Light;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
}
</style>
