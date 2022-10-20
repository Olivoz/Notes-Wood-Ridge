<script setup>
import { Bars3Icon, HomeIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="bg-blue w-full text-center mt-24">
    <h1 class="font-bold text-8xl">404</h1>
    <p class="semibold text-2xl mt-4">Whoops, something went wrong!</p>
    <p class="semibold text-lg mt-2">The page you requested was not found</p>
    <p class="semibold text-lg">Press the <b>home</b> button to return.</p>
    <button
      class="mt-8 rounded-xl bg-slate-200 w-16 hover:bg-slate-300"
      @click="this.$router.push({ path: '/' })"
    >
      <HomeIcon></HomeIcon>
    </button>
  </div>
</template>
