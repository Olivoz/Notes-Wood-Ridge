import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    login(username, password, callback) {
      const store = this;
      if (store.user) return;

      axios
        .post("/auth/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          store.user = res;
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
