<script setup>
import NoteCard from "../components/NoteCard.vue";
import RoundButton from "../components/RoundButton.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
</script>

<template>
  <NoteCard v-for="note in noteStore.notes" :note="note" />
  <RoundButton @click="deleteNote" class="bg-red-500 dark:bg-red-500"
    ><TrashIcon
  /></RoundButton>
</template>
