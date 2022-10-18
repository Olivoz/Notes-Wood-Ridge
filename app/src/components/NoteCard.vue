<script setup>
import { Bars3Icon, TrashIcon } from "@heroicons/vue/24/outline";
</script>

<script>
function deleteNote() {
  console.log("deleted note");
}
</script>

<template>
  <div class="mt-10 mx-12 h-8">
    <slot />
    <button
      class="flex justify-between text-white py-2 px-6 bg-slate-500 rounded-xl w-full"
    >
      <p>Title</p>
      <TrashIcon
        class="hover:text-red-500 h-6"
        v-on:click="deleteNote()"
      ></TrashIcon>
    </button>
  </div>
</template>
