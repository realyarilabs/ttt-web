<template>
  <div class="h-screen w-screen flex items-center justify-center bg-ttt">
    <div class="flex flex-col justify-center items-center z-10">
      <h1 class="ttt-h1 pb-2">GAME ON!</h1>
      <p class="ttt-subtext">Game code</p>
      <div v-if="phoenixSocketStore.gameState" class="flex flex-col justify-center items-center pt-[3.69rem]">
        <div
          v-for="(row, i) of phoenixSocketStore.gameState.board"
          :key="i"
          class="flex gap-[0.94rem] pb-[0.94rem]"
        >
          <button
            v-for="(value, j) of row"
            :key="j"
            class="ttt-square w-[8.125rem] h-[8.125rem] rounded-[0.625rem]"
            @click="phoenixSocketStore.executeGameMove(i, j)"
          >
            {{ value || "*" }}
          </button>
        </div>
      </div>
  </div>

    <!--div >

    here is the game
    {{ phoenixSocketStore.gameState }}
    </div-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePhoenixSocketStore } from "../stores/phoenixSocketStore";

const phoenixSocketStore = usePhoenixSocketStore();

const router = useRouter();
const route = useRoute();

const listening = ref(false);
const loading = ref(false);

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
</script>

<style>
.ttt-square{
  background: var(--Game-Board-BG, rgba(45, 128, 120, 0.20));
}
</style>
