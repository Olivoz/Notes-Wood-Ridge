<script setup>
import NoteCard from "../components/NoteCard.vue";
import DeleteModal from "../components/DeleteModal.vue";
import RoundButton from "../components/RoundButton.vue";
import CookiesModal from "../components/CookiesModal.vue";
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
    ><h1 class="font-semibold">{{ note.title }}</h1></NoteCard
  >

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

  <CookiesModal></CookiesModal>
</template>
