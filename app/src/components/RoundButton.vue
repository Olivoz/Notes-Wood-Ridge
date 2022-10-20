<script>
export default {
  props: {
    onClick: Function,
  },
};
</script>

<template>
  <button
    class="rounded-full fixed right-4 bottom-4 h-12 w-12 p-2 bg-slate-200"
    @click="onClick"
  >
    <slot />
  </button>
</template>
