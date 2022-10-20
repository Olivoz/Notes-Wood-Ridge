<script setup>
import NoteCard from "../components/NoteCard.vue";
import DeleteModal from "../components/DeleteModal.vue";
import RoundButton from "../components/RoundButton.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";
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
    closeDeleteMenu: function (note) {
      this.cancelDeleteMenu();
      notes.splice(notes.indexOf(note), 1);
    },
  },
};

let notes = [
  {
    title: "Hello, World!",
  },
  {
    title: "Hello",
  },
  {
    title: "World!",
  },
  {
    title: "Hello, World!!!!",
  },
];

let toDelete;
</script>

<template>
  <NoteCard
    v-for="note in notes"
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
    description="Are you sure you want to remove this note? Removing this note will move it to the Recycle Bin"
    buttonText="Yes, remove!"
    :confirmButton="() => closeDeleteMenu(toDelete)"
    :cancelButton="cancelDeleteMenu"
  />

  <RoundButton :onClick="createNote"><PlusIcon /></RoundButton>

</template>
