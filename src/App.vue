<template>
  <router-view> </router-view>
</template>

<script setup lang="ts">
import { usePhoenixSocketStore } from "./stores/phoenixSocketStore";

usePhoenixSocketStore();
</script>

<style>
:root{
  --bg-color: #1C404C;
  --Light-Text: #FFF;
  --Light-Text-2: #F4D9AE;
  --CTA: #CD4F41;
  --CTA-2: #DE9E46;
  --lines: rgba(45, 128, 120, 0.50);
}

.bg-ttt{
  background: var(--bg-color);
}

.ttt-button{
  display: flex;
  width: 20rem;
  padding: 1.125rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.375rem;
  /* Text */
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.btn-1{
  background: var(--CTA);
  color: var(--Light-Text);
}
.btn-2{
  background: var(--CTA-2);
  color: var(--Light-Text);
}
</style>
