<script setup>
import { RouterView } from "vue-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const sidebarItems = [
  { name: "Toggle Dark Mode", onclick: () => {} },
  { name: "Recycle Bin", onclick: () => {} },
  { name: "Login", onclick: () => {} },
];
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
  },
};
</script>

<template>
  <div class="flex h-full w-full">
    <aside
      :class="[sidebarOpen ? '' : 'hidden']"
      class="w-48 h-full bg-slate-200 px-3 flex-shrink-0 sm:block"
    >
      <div class="mt-14">
        <button
          v-for="item in sidebarItems"
          :key="item.name"
          @click="item.onclick"
          class="w-full text-left bg-white hover:bg-slate-300 px-3 py-2 my-3 rounded-md text-base"
        >
          {{ item.name }}
        </button>
      </div>
    </aside>

    <div class="flex flex-col w-full">
      <header class="flex justify-center items-center p-4">
        <!-- Mobile menu button-->
        <button
          class="absolute left-4 rounded-md p-2 sm:hidden hover:bg-slate-300"
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
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Your Profile</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Settings</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
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
