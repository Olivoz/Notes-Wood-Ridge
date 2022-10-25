<script>
import { useNoteStore } from "../stores/NoteStore";
import RoundButton from "../components/RoundButton.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const noteStore = useNoteStore();

export default {
  components: { RoundButton, CheckIcon },
  data() {
    return {
      currentNote: null,
      title: "",
      content: "",
    };
  },
  created() {
    if (this.$route.params) {
      const noteId = this.$route.params.id;

      let currentNote = noteStore.notes.find((i) => i.id == noteId);
      if (!currentNote)
        currentNote = noteStore.trash.find((i) => i.id == noteId);

      if (currentNote) {
        this.currentNote = currentNote;
        this.title = currentNote.title;
        this.content = currentNote.content;
      }
    }
  },
  methods: {
    saveNote() {
      if (!this.title || !this.content) return;

      if (this.currentNote) {
        const change = {};
        if (this.currentNote.title !== this.title) change.title = this.title;
        if (this.currentNote.content !== this.content)
          change.content = this.content;

        if (Object.keys(change).length !== 0) {
          noteStore.editNote(this.currentNote.id, change);
          Object.assign(this.currentNote, change);
        }
      } else {
        noteStore.createNote({
          title: this.title,
          content: this.content,
        });
      }

      this.$router.push({ path: "/" });
    },
  },
};
</script>

<template>
  <input
    v-model="title"
    type="text"
    class="mt-2 text-center text-black rounded-xl dark:bg-black border dark:border dark:text-white flex w-full justify-between font-semibold py-2 px-6"
  />
  <textarea
    v-model="content"
    name="noteContent"
    cols="30"
    rows="2"
    class="mt-12 resize-none h-3/4 w-full p-8 outline-none dark:bg-black overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200 dark:scrollbar-thumb-zinc-700 dark:scrollbar-track-zinc-800"
  ></textarea>
  <RoundButton @click="saveNote"><CheckIcon /></RoundButton>
</template>
