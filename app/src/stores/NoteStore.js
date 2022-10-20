import { defineStore } from "pinia";

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
    },
    moveToTrash(note) {
      this.notes.splice(this.notes.indexOf(note), 1);
      this.trash.push(note);
    },
  },
});
