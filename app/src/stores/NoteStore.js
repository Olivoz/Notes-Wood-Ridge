import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

function getArrayFromStorage(name) {
  let arr = localStorage.getItem(name);
  if (!arr) arr = [];
  else arr = JSON.parse(arr);
  return arr;
}

function findAvailableNotes() {
  const authStore = useAuthStore();
  if (authStore.user) {
    return authStore.user.notes.length;
  }

  return getArrayFromStorage("notes").length;
}

function findAvailableTrash() {
  const authStore = useAuthStore();
  if (authStore.user) {
    return authStore.user.trash.length;
  }

  return getArrayFromStorage("trash").length;
}

export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    availableNotes: findAvailableNotes(),
    availableTrash: findAvailableTrash(),
    notes: [],
    trash: [],
  }),
  actions: {
    clear() {
      this.availableNotes = findAvailableNotes();
      this.availableTrash = findAvailableTrash();
      this.notes.length = 0;
      this.trash.length = 0;
    },
    loadNotes() {
      const authStore = useAuthStore();
      if (authStore.user) {
        axios
          .get(`/api/v1/note/notes/${this.notes.length}`)
          .then((res) => res.data.forEach((note) => this.notes.push(note)))
          .catch(console.log);
        return;
      }

      const storedNotes = getArrayFromStorage("notes");
      this.notes = storedNotes.slice(0, this.notes.length + 4);
    },
    loadTrash() {
      const authStore = useAuthStore();
      if (authStore.user) {
        axios
          .get(`/api/v1/note/trash/${this.trash.length}`)
          .then((res) => res.data.forEach((note) => this.trash.push(note)))
          .catch(console.log);
        return;
      }
      const storedTrash = getArrayFromStorage("trash");
      this.trash = storedTrash.slice(0, this.trash.length + 4);
    },
    saveNote(note) {
      const authStore = useAuthStore();
      if (authStore.user) {
        axios
          .post("/api/v1/note/new", note)
          .then((res) => {
            this.notes.unshift(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        return;
      }

      note.id = Date.now();
      note.owner = "local";
      this.notes.unshift(note);
      this.availableNotes++;

      const storedNotes = getArrayFromStorage("notes");
      storedNotes.unshift(note);
      localStorage.setItem("notes", JSON.stringify(storedNotes));
    },
    moveToTrash(note) {
      const authStore = useAuthStore();
      if (authStore.user) {
        axios
          .post("/api/v1/note/trash", {
            id: note.id,
          })
          .then(() => {
            this.notes.splice(this.notes.indexOf(note), 1);
            this.trash.unshift(note);
            this.availableNotes--;
            this.availableTrash++;
          })
          .catch((err) => {
            console.log(err.message);
          });
        return;
      }

      this.notes.splice(this.notes.indexOf(note), 1);
      this.trash.unshift(note);
      this.availableNotes--;
      this.availableTrash++;

      let storedNotes = getArrayFromStorage("notes");
      storedNotes = storedNotes.filter((i) => i.id !== note.id);
      localStorage.setItem("notes", JSON.stringify(storedNotes));

      const storedTrash = getArrayFromStorage("trash");
      storedTrash.unshift(note);
      localStorage.setItem("trash", JSON.stringify(storedTrash));
    },
    deleteNote(note) {
      const authStore = useAuthStore();
      if (authStore.user) {
        return;
      }

      this.trash.splice(this.trash.indexOf(note), 1);
      this.availableTrash--;

      const storedTrash = getArrayFromStorage("trash");
      storedTrash.splice(storedTrash.indexOf(note), 1);
      localStorage.setItem("trash", JSON.stringify(storedTrash));
    },
  },
});
