<script setup>
import NoteCard from "../components/NoteCard.vue";
import RoundButton from "../components/RoundButton.vue";
import { TrashIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
if (noteStore.trash.length == 0) noteStore.loadTrash();
</script>

<template>
  <NoteCard v-for="note in noteStore.trash" :note="note">
    <ArrowUturnLeftIcon class="hover:text-green-500 h-6" @click="back" />
  </NoteCard>
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
