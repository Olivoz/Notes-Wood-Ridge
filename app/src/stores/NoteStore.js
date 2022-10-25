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

function addNote(target, note, store, isTrash) {
  target.unshift(note);

  if (isTrash) store.availableTrash++;
  else store.availableNotes++;

  if (useAuthStore().user) return;

  const targetName = isTrash ? "trash" : "notes";
  const stored = getArrayFromStorage(targetName);
  stored.unshift(note);
  localStorage.setItem(targetName, JSON.stringify(stored));
}

function removeNote(target, note, store, isTrash) {
  target.splice(target.indexOf(note), 1);

  if (isTrash) store.availableTrash--;
  else store.availableNotes--;

  if (useAuthStore().user) return;

  const targetName = isTrash ? "trash" : "notes";
  const stored = getArrayFromStorage(targetName).filter((n) => n.id != note.id);
  localStorage.setItem(targetName, JSON.stringify(stored));
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
          .then((res) => addNote(this.notes, res.data))
          .catch((err) => console.log(err.message));
        return;
      }

      note.id = Date.now();
      note.owner = "local";
      addNote(this.notes, note, this);
    },
    moveToTrash(note) {
      removeNote(this.notes, note, this);
      addNote(this.trash, note, this, true);

      const authStore = useAuthStore();
      if (authStore.user) {
        axios
          .post("/api/v1/note/trash", {
            id: note.id,
          })
          .catch((err) => {
            this.clear();
            this.loadNotes();
            this.loadTrash();
            console.log(err.message);
          });
        return;
      }
    },
    deleteNote(note) {
      removeNote(this.trash, note, this, true);

      const authStore = useAuthStore();
      if (authStore.user) {
        axios.delete(`/api/v1/note/note/${note.id}`).catch((err) => {
          this.clear();
          this.loadNotes();
          this.loadTrash();
          console.log(err.message);
        });
        return;
      }
    },
  },
});
