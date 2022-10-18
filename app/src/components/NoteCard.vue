<script setup>
import { Bars3Icon, TrashIcon } from "@heroicons/vue/24/outline";
import { def } from "@vue/shared";
</script>

<script>
export default {
  props: {
    onRemove: Function,
  },
};
</script>

<template>
  <div class="mt-10 h-8">
    <button
      class="flex justify-between py-2 px-6 bg-slate-200 rounded-xl w-full"
    >
      <slot />
      <TrashIcon
        class="hover:text-red-500 h-6"
        v-on:click="onRemove()"
      ></TrashIcon>
    </button>
  </div>
</template>
