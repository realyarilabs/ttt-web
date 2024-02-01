<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div
      v-if="ticTacToeStore.gameState"
      class="flex flex-col justify-center items-center z-10"
    >
      <h1 class="ttt-h1 pb-2">GAME ON !</h1>
      <div class="ttt-subtext flex flex-row justify-center items-center">
        Game Code
        <img :src="infoSvg" class="ttt-icon-piece mx-2" alt="info" /> :
        <span
          class="flex flex-row cursor-pointer items-center px-2 underline t-orange"
          @click="copyCodeToClipboard"
        >
          {{ ticTacToeStore.gameID }}
          <img :src="copySvg" class="ttt-icon-piece mx-2" alt="copy" />
        </span>
      </div>
      <div class="flex flex-col justify-center items-center pt-[3.69rem]">
        <div
          v-for="(row, i) of ticTacToeStore.gameState.board"
          :key="i"
          class="flex gap-[0.94rem] pb-[0.94rem]"
        >
          <button
            v-for="(value, j) of row"
            :key="j"
            class="ttt-square w-[8.125rem] h-[8.125rem] rounded-[0.625rem] flex justify-center items-center"
            @click="ticTacToeStore.executeGameMove(i, j)"
          >
            <img
              v-if="value"
              :src="getPieceByValue(value)"
              class="ttt-piece"
              :alt="value"
            />
          </button>
        </div>
      </div>
      <p
        v-if="isSpectator"
        class="ttt-subtext flex flex-row items-center ttt-turn"
      >
        Turn :
        <img
          :src="currentPiece"
          class="ttt-icon-piece ml-[0.69rem]"
          :alt="pieceValue"
        />
      </p>
      <p
        v-else-if="ticTacToeStore.gameState.current_player !== null"
        class="ttt-subtext flex flex-row items-center ttt-turn"
      >
        {{ myTurn ? "Your" : "Opponent's" }} Turn :
        <img
          :src="currentPiece"
          class="ttt-icon-piece ml-[0.69rem]"
          :alt="pieceValue"
        />
      </p>
      <p v-else class="ttt-subtext flex flex-row items-center ttt-turn">
        Waiting for opponent
      </p>
    </div>
    <div class="flex h-full w-full absolute px-14 py-5">
      <div class="relative flex h-full w-full">
        <img
          :src="exitSvg"
          class="ttt-icon absolute top-0 left-0 cursor-pointer"
          alt="exit"
          @click="router.push({ name: 'homepage' })"
        />
        <volumeButton />
      </div>
    </div>
    <!--div >
      {{ ticTacToeStore.gameState }}
    </div-->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTicTacToeStore } from "../stores/ticTacToeStore";
import xSvg from "../assets/x.svg";
import oSvg from "../assets/o.svg";
import exitSvg from "../assets/exit.svg";
import copySvg from "../assets/copy.svg";
import infoSvg from "../assets/info.svg";
import volumeButton from "../components/volumeButton.vue";

const ticTacToeStore = useTicTacToeStore();

const router = useRouter();
const route = useRoute();

const listening = ref(false);
const loading = ref(false);

const gamePieces = [
  { id: "O", icon: oSvg },
  { id: "X", icon: xSvg },
];

const isSpectator = computed(() => {
  return (
    getKeyByValue(ticTacToeStore.gameState?.players, ticTacToeStore.userID!) ===
    undefined
  );
});

const myTurn = computed(() => {
  return ticTacToeStore.gameState?.current_player === ticTacToeStore.userID;
});

const pieceValue = computed(() => {
  if (!ticTacToeStore.gameState?.players) return;
  return getKeyByValue(
    ticTacToeStore.gameState?.players,
    ticTacToeStore.gameState?.current_player!
  );
});

const currentPiece = computed(() => {
  return gamePieces.find((piece) => piece.id === pieceValue.value)?.icon;
});

const getPieceByValue = (value: string) => {
  return gamePieces.find((piece) => piece.id === value)?.icon;
};

const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const copyCodeToClipboard = () => {
  return navigator.clipboard.writeText(ticTacToeStore.gameID!);
};

watch(
  () => ticTacToeStore.matchChannel,
  () => {
    if (!ticTacToeStore.matchChannel || listening.value || loading.value)
      return;

    loading.value = true;
    listening.value = true;

    loading.value = false;
  },
  { immediate: true, deep: true }
);

watch(
  () => ticTacToeStore.gameState?.status,
  () => {
    if (ticTacToeStore.gameState?.status === "game_over")
      router.push({ name: "end" });
  },
  { immediate: true, deep: true }
);

onBeforeMount(() => {
  if (!route.params.gameID && !ticTacToeStore.gameID) {
    router.push({ name: "Home" });
  } else {
    const routeGameID = route.params.gameID as string;
    if (!routeGameID) return;
    ticTacToeStore.gameID = routeGameID;
    ticTacToeStore.createMatchChannel();
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
