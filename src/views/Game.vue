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
        <button
          class="flex flex-row cursor-pointer items-center px-2 underline t-orange"
          @click="copy()"
        >
          {{ copied ? "Copied" : ticTacToeStore.gameID }}
          <img :src="copySvg" class="ttt-icon-piece mx-2" alt="copy" />
        </button>
        /
        <button
          class="flex flex-row cursor-pointer items-center px-2 underline t-orange"
          @click="linkCopy()"
        >
          {{ linkCopied ? "Copied" : "Link" }}
          <img :src="copySvg" class="ttt-icon-piece mx-2" alt="copy" />
        </button>
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
            class="w-20 h-20 ttt-square md:w-[8.125rem] md:h-[8.125rem] rounded-[0.625rem] flex justify-center items-center"
            @click="ticTacToeStore.executeGameMove(i, j)"
          >
            <img
              v-if="value"
              :src="getPieceByValue(value)"
              class="sm:h-8 sm:w-8 md:h-28 md:w-[3.75rem]"
              :alt="value"
            />
          </button>
        </div>
      </div>
      <p
        v-if="isSpectator"
        class="ttt-subtext flex flex-row items-center ttt-turn"
      >
        {{ currentPlayerName }}'s Turn :
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
        {{ myTurn ? "Your" : currentPlayerName + "'s" }} Turn :
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
        <button @click="leaveMatch">
          <img
            :src="exitSvg"
            class="ttt-icon absolute top-0 left-0 cursor-pointer"
            alt="exit"
          />
        </button>
        <volumeButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTicTacToeStore } from "../stores/ticTacToeStore";
import xSvg from "../assets/x.svg";
import oSvg from "../assets/o.svg";
import exitSvg from "../assets/exit.svg";
import copySvg from "../assets/copy.svg";
import infoSvg from "../assets/info.svg";
import volumeButton from "../components/volumeButton.vue";
import { useClipboard } from "@vueuse/core";

const ticTacToeStore = useTicTacToeStore();

const router = useRouter();
const route = useRoute();

const { copy, copied } = useClipboard({
  source: ticTacToeStore.gameID!,
  legacy: true,
});

const { copy: linkCopy, copied: linkCopied } = useClipboard({
  source: window.location.href,
  legacy: true,
});

const gamePieces: {
  id: string;
  icon: string;
  player_number: "player_2" | "player_1";
}[] = [
  { id: "O", icon: oSvg, player_number: "player_2" },
  { id: "X", icon: xSvg, player_number: "player_1" },
];

const isSpectator = computed(() => {
  if (!ticTacToeStore.gameState) return;
  return (
    getKeyByValue(ticTacToeStore.gameState.players, ticTacToeStore.userID!) ===
    undefined
  );
});

const myTurn = computed(() => {
  return ticTacToeStore.gameState?.current_player === ticTacToeStore.userID;
});

const pieceValue = computed(() => {
  if (!ticTacToeStore.gameState) return;
  return getKeyByValue(
    ticTacToeStore.gameState.players,
    ticTacToeStore.gameState.current_player!
  );
});

const currentPlayerInfo = computed(() => {
  return gamePieces.find((piece) => piece.id === pieceValue.value);
});

const currentPiece = computed(() => {
  return currentPlayerInfo.value?.icon;
});

const currentPlayerName = computed<string>(() => {
  if (!currentPlayerInfo.value || !ticTacToeStore.gameState) return "";
  return ticTacToeStore.gameState[currentPlayerInfo.value.player_number];
});

const getPieceByValue = (value: string) => {
  return gamePieces.find((piece) => piece.id === value)?.icon;
};

const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const leaveMatch = () => {
  ticTacToeStore.leaveMatch();
  router.push({ name: "homepage" });
};

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
