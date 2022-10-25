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
          useNoteStore().clear();
        })
        .then(callback)
        .catch(console.log);
    },
    logout(callback) {
      this.user = null;
      callback();
      axios.post("/auth/logout").catch(console.log);
    },
  },
});
