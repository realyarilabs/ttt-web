<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">GAME OVER</h1>
      <img
        :src="showGraphics"
        alt="end graphics"
        class="my-8 md:mt-24 md:mb-20 ttt-rem"
      />
      <div class="flex flex-col md:flex-row gap-4 md:gap-[3.12rem]">
        <button
          class="sm:w-40 ttt-button btn-2"
          @click="ticTacToeStore.playAgain()"
        >
          Play Again
        </button>
        <button
          class="sm:w-40 ttt-button btn-1"
          @click="$router.push({ name: 'homepage' })"
        >
          Return Home
        </button>
      </div>
    </div>
    <div class="flex h-full w-full absolute px-14 py-5">
      <div class="relative flex h-full w-full">
        <volumeButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTicTacToeStore } from "../stores/ticTacToeStore";
import { useAudioStore } from "../stores/audioStore";
import soundWin from "../assets/audio/soundWin.wav";
import soundLose from "../assets/audio/soundLose.wav";
import winSvg from "../assets/end/win.svg";
import lossSvg from "../assets/end/loss.svg";
import tieSvg from "../assets/end/tie.svg";
import volumeButton from "../components/volumeButton.vue";

const audioStore = useAudioStore();
const ticTacToeStore = useTicTacToeStore();
const router = useRouter();

const gameEndings = ref({
  win: winSvg,
  loss: lossSvg,
  tie: tieSvg,
});

const winner = ticTacToeStore.gameState?.winner === ticTacToeStore.userID;
const isTie = ticTacToeStore.gameState?.winner === "draw";

const showGraphics = isTie
  ? gameEndings.value["tie"]
  : winner
  ? gameEndings.value["win"]
  : gameEndings.value["loss"];

onMounted(() => {
  if (!ticTacToeStore.gameState || !ticTacToeStore.matchChannel) {
    router.push({ name: "homepage" });
    return;
  }
  const gameID = ticTacToeStore.gameID;

  ticTacToeStore.endGame();

  ticTacToeStore.matchChannel.on("play_again", () => {
    router.push({ name: "game", params: { gameID } });
  });

  if (winner) audioStore.playSound(soundWin);
  else audioStore.playSound(soundLose);
});
</script>

<style>
.ttt-end {
  width: 24.5rem;
}
</style>
