<script>
import { useAuthStore } from "../stores/AuthStore";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const authStore = useAuthStore();
      const router = this.$router;
      authStore.login(this.email, this.password, () => {
        router.push({ path: "/" });
      });
    },
  },
};
</script>

<template>
  <div class="flex justify-center items-center mt-20">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="login"
        class="bg-slate-200 dark:bg-zinc-800 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          >
            Email</label
          >
          <input
            id="identity"
            class="dark:bg-zinc-600 dark:text-white shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
            >Password</label
          >

          <input
            aria-describedby="passwordHelp"
            v-model="password"
            class="dark:bg-zinc-600 dark:text-white shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*******"
          />

          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-white hover:bg-slate-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:hover:text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm hover:text-slate-500"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <p class="inline-block align-baseline text-sm">Dont have an account?</p>
        <button
          class="inline-block align-baseline font-bold text-sm hover:text-slate-500 mt-6 mx-2"
          @click="$router.push({ path: '/register' })"
        >
          Register here.
        </button>
      </form>
    </div>
  </div>
</template>
