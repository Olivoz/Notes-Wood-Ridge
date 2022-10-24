<script setup>
import RoundButton from "../components/RoundButton.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
</script>

<script>
import { useNoteStore } from "../stores/NoteStore";
const noteStore = useNoteStore();
function saveNote(router) {
  const titleInput = document.getElementById("title");
  const editNotes = document.getElementById("editNotes");
  if (titleInput.value.length <= 0 || editNotes.value.length <= 0) return;
  noteStore.saveNote({
    id: `${Math.random()}`,
    owner: "placeholderOwner",
    title: titleInput.value,
    content: editNotes.value,
  });
  router.push({ path: "/" });
}
</script>

<template>
  <input
    type="text"
    id="title"
    class="mt-2 text-center text-black rounded-xl dark:bg-black border dark:border dark:text-white flex w-full justify-between font-semibold py-2 px-6"
  />
  <textarea
    name="editNotes"
    id="editNotes"
    cols="30"
    rows="2"
    class="mt-12 resize-none h-3/4 w-full p-8 outline-none dark:bg-black overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-800"
  ></textarea>
  <RoundButton @click="saveNote($router)"><CheckIcon /></RoundButton>
</template>
