<script setup></script>

<template>
  <div class="rounded-xl text-center justify-center mt-12 py-4 w-full bg-slate-200 dark:bg-zinc-700">
    <div class="flex justify-center mb-4">
      <p class="mx-4">Choose a username:</p>
      <p class="mx-4">Your email address:</p>
    </div>
    <input class="text-center mx-2 rounded-xl dark:bg-zinc-600" type="text" name="username" placeholder="Your username"/>
    <input class="text-center mx-4 mt-4 rounded-xl dark:bg-zinc-600" type="email" name="email" placeholder="Your email" />
    <br>
    <input class="text-center mt-8 rounded-xl dark:bg-zinc-600" type="password" name="password" placeholder="Password"/>
    <br>
  </div>
  <button class="text-center rounded-xl bg-slate-200 w-32 mt-8 hover:bg-slate-300 dark:bg-zinc-700 dark:text-white">Create account</button>
</template>