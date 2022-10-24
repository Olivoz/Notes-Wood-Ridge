<script setup>
import NoteCard from "../components/NoteCard.vue";
import RoundButton from "../components/RoundButton.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
noteStore.loadTrash();
</script>

<template>
  <NoteCard v-for="note in noteStore.trash" :note="note" />
  <button
    v-if="noteStore.trash.length < noteStore.availableTrash"
    @click="noteStore.loadTrash"
  >
    More
  </button>
  <RoundButton @click="deleteNote" class="bg-red-500 dark:bg-red-500"
    ><TrashIcon
  /></RoundButton>
</template>
