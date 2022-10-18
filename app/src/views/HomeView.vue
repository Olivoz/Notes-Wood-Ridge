<script setup>
import NoteCard from "../components/NoteCard.vue";
import DeleteModal from "../components/DeleteModal.vue";
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
    closeDeleteMenu: function () {
      this.deleteOpen = false;
    },
  },
};
</script>

<template>
  <NoteCard :onRemove="openDeleteMenu"
    ><h1 class="font-semibold">Untitled</h1></NoteCard
  >

  <DeleteModal
    :open="deleteOpen"
    title="Remove note"
    description="Are you sure you want to remove this note? Removing this note will move it to the Recycle Bin"
    buttonText="Yes, remove!"
    :closeButton="closeDeleteMenu"
  />
</template>
