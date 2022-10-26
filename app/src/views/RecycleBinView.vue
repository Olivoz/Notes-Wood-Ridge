<script setup>
import NoteCard from "../components/NoteCard.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
</script>

<script>
export default {
  data() {
    return {
      deleteOpen: false,
    };
  },
  methods: {
    openDeleteMenu: function () {
      this.deleteOpen = true;
    },
    cancelDeleteMenu: function () {
      this.deleteOpen = false;
    },
    deleteNote(noteStore, note) {
      this.cancelDeleteMenu();
      noteStore.deleteNote(note);
    },
    back(note) {
      useNoteStore().restoreNote(note);
    },
  },
};

let toDelete;
</script>

<template>
  <NoteCard
    v-for="note in noteStore.trash"
    :onRemove="
      () => {
        toDelete = note;
        openDeleteMenu();
      }
    "
    :note="note"
    :key="note.id"
  >
    <ArrowUturnLeftIcon class="hover:text-green-500 h-6" @click="back(note)" />
  </NoteCard>

  <button
    class="hover:animate-pulse bg-slate-200 rounded-xl w-full mt-10 py-2 px-6 dark:bg-zinc-800 dark:text-white font-semibold"
    v-if="noteStore.trash.length < noteStore.availableTrash"
    @click="noteStore.loadTrash"
  >
    Show more...
  </button>

  <DeleteModal
    :open="deleteOpen"
    title="Permanently delete note"
    description="Are you sure you want to permanently delete this note? This action CANNOT be undone! Press outside the box to cancel!"
    buttonText="Yes, delete!"
    :confirmButton="() => deleteNote(noteStore, toDelete)"
    :cancelButton="cancelDeleteMenu"
  />
</template>
