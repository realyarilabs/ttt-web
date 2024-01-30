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

<template>
  here is the game
  {{ phoenixSocketStore.gameState }}

  <div v-if="phoenixSocketStore.gameState">
    <div
      v-for="(row, i) of phoenixSocketStore.gameState.board"
      :key="i"
      class="flex gap-2"
    >
      <button
        v-for="(value, j) of row"
        :key="j"
        @click="phoenixSocketStore.executeGameMove(i, j)"
      >
        {{ value || "*" }}
      </button>
    </div>
  </div>
</template>
