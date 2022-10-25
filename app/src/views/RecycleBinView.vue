<script setup>
import NoteCard from "../components/NoteCard.vue";
import RoundButton from "../components/RoundButton.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
if (noteStore.trash.length == 0) noteStore.loadTrash();
</script>

<script>
const noteStore = useNoteStore();
function deleteNote(note) {
  noteStore.deleteNote(note);
}
</script>

<template>
  <NoteCard
    v-for="note in noteStore.trash"
    :note="note"
    :onRemove="() => deleteNote(note)"
  />
  <button
    v-if="noteStore.trash.length < noteStore.availableTrash"
    @click="noteStore.loadTrash"
  >
    More
  </button>
  <RoundButton @click="deleteNotes" class="bg-red-500 dark:bg-red-500"
    ><TrashIcon
  /></RoundButton>
</template>
