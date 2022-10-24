<script setup>
import { Bars3Icon, HomeIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="text-center mt-24 dark:text-white dark:bg-black">
    <h1 class="semibold text-2xl mt-4">Privacy policy</h1>
    <p class="semibold text-lg mt-2">We use cookies to keep users logged in.</p>
    <p class="semibold text-lg">Press the <b>home</b> button to return.</p>
    <button
      class="mt-8 rounded-xl bg-slate-200 w-16 hover:bg-slate-300 text-black dark:text-white hover:dark:bg-zinc-500 dark:bg-zinc-700"
      @click="this.$router.push({ path: '/' })"
    >
      <HomeIcon></HomeIcon>
    </button>
  </div>
</template>
