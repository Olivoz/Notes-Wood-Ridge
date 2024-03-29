import { defineStore } from "pinia";
import axios from "axios";
import { useNoteStore } from "./NoteStore";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    checkLoggedIn() {
      const noteStore = useNoteStore();
      if (!localStorage.getItem("loggedIn")) {
        noteStore.loadNotes();
        noteStore.loadTrash();
        return;
      }
      axios
        .get("/api/v1/user")
        .then((res) => {
          this.user = res.data;
          const noteStore = useNoteStore();
          noteStore.clear();
          noteStore.loadNotes();
          noteStore.loadTrash();
        })
        .catch(() => {});
    },
    login(username, password, callback) {
      if (this.user) return;

      axios
        .post("/auth/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          this.user = res.data;
          localStorage.setItem("loggedIn", true);
          const noteStore = useNoteStore();
          noteStore.clear();
          noteStore.loadNotes();
          noteStore.loadTrash();
        })
        .then(callback)
        .catch(console.log);
    },
    logout(callback) {
      this.user = null;
      localStorage.setItem("loggedIn", false);
      const noteStore = useNoteStore();
      noteStore.clear();
      noteStore.loadNotes();
      noteStore.loadTrash();
      axios.post("/auth/logout").then(callback).catch(console.log);
    },
    register(username, email, password, callback) {
      axios
        .post("/auth/signup", {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          this.user = res.data;
          localStorage.setItem("loggedIn", true);
          const noteStore = useNoteStore();
          noteStore.clear();
          noteStore.loadNotes();
          noteStore.loadTrash();
        })
        .then(callback)
        .catch(console.log);
    },
  },
});
