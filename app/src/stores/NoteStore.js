import { defineStore } from "pinia";
import axios from "axios";

export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    notes: [
      {
        id: "testID",
        owner: "ownerID",
        title: "testTitle",
        content:
          "Tempor ut reprehenderit aute irure proident exercitation. Adipisicing cillum velit reprehenderit irure. Nisi ipsum ex reprehenderit ut culpa sit.",
      },
    ],
    trash: [],
  }),
  actions: {
    saveNote(note) {
      this.notes.push(note);
      axios.post("/api/v1/note/new", note).then(console.log).catch(console.log);
    },
    moveToTrash(note) {
      this.notes.splice(this.notes.indexOf(note), 1);
      this.trash.push(note);
    },
  },
});
