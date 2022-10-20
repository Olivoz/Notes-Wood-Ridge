<script setup>
import NoteCard from "../components/NoteCard.vue";
import RoundButton from "../components/RoundButton.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <NoteCard></NoteCard>
  <RoundButton @click="deleteNote" class="bg-red-500 dark:bg-red-500"
    ><TrashIcon
  /></RoundButton>
</template>
