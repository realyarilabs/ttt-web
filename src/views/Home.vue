<script setup lang="ts">
import { usePhoenixSocketStore } from "../stores/phoenixSocketStore";
import { useRouter } from "vue-router";

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

<template>
  <div class="flex flex-col items-center">
    <div>TIC TAC TOE CHALLENGE !</div>
    <div>Ready for a game of Xs and Os ?</div>

    <button @click="createGame(true)">CREATE NEW GAME</button>
    <span> OR</span>
    <input v-model="phoenixSocketStore.gameID" placeholder="Enter Game ID" />
    <button @click="createGame()">JOIN EXISTING GAME</button>
  </div>
</template>
