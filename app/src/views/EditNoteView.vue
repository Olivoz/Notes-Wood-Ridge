<script setup>
import RoundButton from "../components/RoundButton.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <textarea
    name="editNotes"
    id="editNotes"
    cols="30"
    rows="2"
    class="resize-none h-full w-full p-8 outline-none dark:bg-black"
  ></textarea>
  <RoundButton @click="saveNote"><CheckIcon /></RoundButton>
</template>
