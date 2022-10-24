import { defineStore } from "pinia";
import axios from "axios";
import router from "vue-router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    login(username, password) {
      const store = this;
      if (store.user) return;

      axios
        .post("/auth/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          store.user = res;
          router.push({ path: "/" });
        })
        .catch(console.log);
    },
    logout() {
      this.user = null;
      router.push({ path: "/login" });
      axios.post("/auth/logout").catch(console.log);
    },
  },
});
