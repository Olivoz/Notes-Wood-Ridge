<script setup>
function close() {
  document.getElementById("cookieAccept").remove();
}
</script>

<template>
  <div
    class="container mx-auto px-20 justify-center flex z-40"
    id="cookieAccept"
  >
    <div
      class="absolute bg-slate-200 dark:bg-zinc-800 rounded-xl shadow-md p-6 bottom-4 text-center"
      style="cursor: auto"
    >
      <div class="w-16 mx-auto relative -mt-10 mb-3">
        <img
          class="-mt-1"
          src="https://www.svgrepo.com/show/30963/cookie.svg"
          alt="Cookie Icon SVG"
        />
      </div>
      <span
        class="w-full block leading-normal text-gray-800 text-md mb-3 dark:text-white"
        >We use cookies to provide a better user experience.</span
      >
      <div class="flex items-center justify-between">
        <button
          class="text-xs mr-1 text-slate-800 hover:text-gray-500 dark:text-white dark:hover:text-zinc-400"
          @click="this.$router.push({ path: '/policy' })"
        >
          Privacy Policy
        </button>
        <div class="w-1/2">
          <button
            @click="close"
            type="button"
            class="py-2 px-4 dark:bg-zinc-700 dark:hover:bg-zinc-600 bg-white hover:bg-slate-300 w-full text-center text-base font-semibold rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
