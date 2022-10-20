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
    id: "placeholderId",
    owner: "placeholderOwner",
    title: titleInput.value,
    content: editNotes.value,
  });
  router.push({ path: "/" });
}
</script>

<template>
  <input type="text" id="title" />
  <textarea
    name="editNotes"
    id="editNotes"
    cols="30"
    rows="2"
    class="resize-none h-full w-full p-8 outline-none dark:bg-black"
  ></textarea>
  <RoundButton @click="saveNote($router)"><CheckIcon /></RoundButton>
</template>
