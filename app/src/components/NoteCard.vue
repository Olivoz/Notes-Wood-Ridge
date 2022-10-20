<script setup>
import { Bars3Icon, TrashIcon } from "@heroicons/vue/24/outline";
</script>

<script>
export default {
  props: {
    onRemove: Function,
  },
};
</script>

<template>
  <div class="mt-10 h-8 dark:text-white">
    <button
      class="flex justify-between py-2 px-6 bg-slate-200 rounded-xl w-full dark:bg-zinc-800"
    >
      <slot />
      <TrashIcon
        class="hover:text-red-500 h-6"
        v-on:click="onRemove()"
      ></TrashIcon>
    </button>
  </div>
</template>
