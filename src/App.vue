<script setup lang="ts">
import { usePhoenixSocketStore } from "./stores/phoenixSocketStore";

usePhoenixSocketStore();
</script>

<template>
  <router-view> </router-view>
</template>
