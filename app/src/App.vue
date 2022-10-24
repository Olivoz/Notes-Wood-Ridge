<script setup>
import { RouterView } from "vue-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "./stores/AuthStore";

useAuthStore().checkLoggedIn();

const sidebarItems = [
  {
    name: "My Notes",
    onclick: (router) => {
      router.push({ path: "/" });
    },
  },
  {
    name: "Toggle Dark Mode",
    onclick: themeSwitch,
  },
  {
    name: "Recycle Bin",
    onclick: (router) => {
      router.push({ path: "/trash" });
    },
  },
  {
    name: "Login",
    onclick: (router) => {
      router.push({ path: "/login" });
    },
  },
];

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    return;
  }
};

themeCheck();

function themeSwitch() {
  const documentElement = document.documentElement;
  if (documentElement.classList.contains("dark")) {
    documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    return;
  }
  documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}
</script>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    displayedSidebarItems() {
      const authStore = useAuthStore();
      if (authStore.user) sidebarItems.filter((i) => i.name == "Login");
      return sidebarItems;
    },
  },
};
</script>

<template>
  <Transition
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div
      :class="[sidebarOpen ? 'z-10' : 'hidden']"
      class="fixed inset-0 bg-black bg-opacity-25 sm:hidden"
      @click="sidebarOpen = !sidebarOpen"
    ></div>
  </Transition>

  <div class="flex h-full w-full">
    <aside
      :class="[sidebarOpen ? 'w-48 z-20' : 'w-0']"
      class="dark:bg-zinc-800 overflow-hidden h-full bg-slate-200 flex-shrink-0 sm:w-48 absolute sm:relative transition-width"
    >
      <div class="mt-14 p-4 overflow-hidden">
        <button
          v-for="item in sidebarItems"
          :key="item.name"
          @click="item.onclick($router)"
          class="dark:bg-zinc-700 w-40 text-left bg-white hover:bg-slate-300 hover:dark:bg-zinc-600 px-3 py-2 my-3 rounded-md text-base"
        >
          {{ item.name }}
        </button>
      </div>
    </aside>

    <div class="flex flex-col w-full">
      <header class="flex justify-center items-center p-4">
        <!-- Mobile menu button-->
        <button
          :class="[sidebarOpen ? 'z-20' : '']"
          class="absolute left-4 rounded-md p-2 sm:hidden hover:bg-slate-300 hover:dark:bg-zinc-500"
          type="button"
          @click="sidebarOpen = !sidebarOpen"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            v-if="!sidebarOpen"
            class="block h-6 w-6"
            aria-hidden="true"
          />
          <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
        </button>
        <h1 class="text-2xl">{{ currentRouteName }}</h1>
        <!-- Profile dropdown -->
        <Menu as="div" class="absolute right-4">
          <div>
            <MenuButton class="flex rounded-full bg-slate-200 text-sm">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="dark:bg-zinc-700 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100 dark:bg-zinc-600' : '',
                    'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                  ]"
                  >Your Profile</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100 dark:bg-zinc-600' : '',
                    'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                  ]"
                  >Settings</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100 dark:bg-zinc-600' : '',
                    'block px-4 py-2 text-sm text-gray-700 dark:text-white',
                  ]"
                  >Sign out</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </header>
      <main class="flex-grow overflow-auto px-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
