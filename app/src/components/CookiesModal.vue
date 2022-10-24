<script setup></script>

<template>
  <div class="container mx-auto px-20 justify-center flex">
    <div
      class="bg-slate-200 rounded-xl shadow-md p-6 mt-96 text-center"
      style="cursor: auto"
    >
      <div class="w-16 mx-auto relative -mt-10 mb-3">
        <img
          class="-mt-1"
          src="https://www.svgrepo.com/show/30963/cookie.svg"
          alt="Cookie Icon SVG"
        />
      </div>
      <span class="w-full block leading-normal text-gray-800 text-md mb-3"
        >We use cookies to provide a better user experience.</span
      >
      <div class="flex items-center justify-between">
        <button
          class="text-xs mr-1 text-slate-800 hover:text-gray-500"
          @click="this.$router.push({ path: '/policy' })"
        >
          Privacy Policy
        </button>
        <div class="w-1/2">
          <button
            type="button"
            class="py-2 px-4 bg-white hover:bg-slate-300 w-full text-center text-base font-semibold rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
