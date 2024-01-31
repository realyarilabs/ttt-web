<template>
  <router-view> </router-view>
</template>

<script setup lang="ts">
import { usePhoenixSocketStore } from "./stores/phoenixSocketStore";

usePhoenixSocketStore();
</script>

