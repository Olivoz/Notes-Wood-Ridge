<script setup>
import NoteCard from "../components/NoteCard.vue";
import DeleteModal from "../components/DeleteModal.vue";
import RoundButton from "../components/RoundButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
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
    moveToTrash: function (noteStore, note) {
      this.cancelDeleteMenu();
      noteStore.moveToTrash(note);
    },
  },
};

let toDelete;
</script>

<template>
  <NoteCard
    v-for="note in noteStore.notes"
    :onRemove="
      () => {
        toDelete = note;
        openDeleteMenu();
      }
    "
    :note="note"
    :key="note.id"
  />

  <button
    class="hover:animate-pulse bg-slate-200 rounded-xl w-full mt-10 py-2 px-6 dark:bg-zinc-800 dark:text-white font-semibold"
    v-if="noteStore.notes.length < noteStore.availableNotes"
    @click="noteStore.loadNotes"
  >
    Show more...
  </button>

  <DeleteModal
    :open="deleteOpen"
    title="Remove note"
    description="Are you sure you want to remove this note? Removing this note will move it to the Recycle Bin. Press outside the box to cancel!"
    buttonText="Yes, remove!"
    :confirmButton="() => moveToTrash(noteStore, toDelete)"
    :cancelButton="cancelDeleteMenu"
  />

  <RoundButton @click="$router.push({ path: '/edit' })"
    ><PlusIcon
  /></RoundButton>
</template>
