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
    class="hover:animate-pulse bg-slate-200 rounded-xl w-full mt-10 py-2 px-6 dark:bg-zinc-800 dark:text-white font-semibold"
    v-if="noteStore.trash.length < noteStore.availableTrash"
    @click="noteStore.loadTrash"
  >
    Show more...
  </button>
  <RoundButton
    @click="deleteNote"
    class="bg-red-500 dark:bg-red-500 hover:animate-bounce"
    ><TrashIcon
  /></RoundButton>
</template>
