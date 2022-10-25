<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
</script>

<script>
export default {
  props: {
    note: Object,
    onRemove: Function,
  },
  methods: {
    editNote() {
      this.$router.push({ path: `/edit/${this.note.id}` });
    },
  },
};
</script>

<template>
  <div @click="editNote" class="mt-10 h-8 dark:text-white">
    <button
      class="flex justify-between py-2 px-6 bg-slate-200 rounded-xl w-full dark:bg-zinc-800"
    >
      <p class="font-semibold">{{ note.title }}</p>
      <div class="flex justify-end">
        <TrashIcon class="hover:text-red-500 h-6" @click="onRemove" />
        <slot />
      </div>
    </button>
  </div>
</template>
