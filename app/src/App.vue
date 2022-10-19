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
  methods: {
    toggleSidebar: function () {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>

<template>
  <div class="flex h-full w-full">
    <aside
      :class="[sidebarOpen ? '' : 'hidden']"
      class="w-48 h-full bg-slate-200 px-3 flex-shrink-0"
    >
      <button
        v-for="item in sidebarItems"
        :key="item.name"
        @click="item.onclick"
        class="w-full text-left bg-white hover:bg-slate-300 px-3 py-2 my-3 rounded-md text-base"
      >
        {{ item.name }}
      </button>
    </aside>

    <div class="flex flex-col w-full">
      <header class="flex justify-between items-center p-4">
        <!-- Mobile menu button-->
        <button
          class="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          type="button"
          @click="toggleSidebar"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            v-if="!sidebarOpen"
            class="block h-6 w-6"
            aria-hidden="true"
          />
          <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
        </button>
        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
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
      <main class="flex-grow overflow-x-hidden overflow-y-auto px-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
