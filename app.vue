<script lang="ts" setup>
useHead({
  title: 'Terminal',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
})
</script>

<template>
  <main class="px-12 py-20 text-center">
    <span text="blue 5xl hover:red" cursor="default">Hello Nuxt 3</span>
    <br>
    <div i-carbon-car inline-block text-4xl />
    <br>
    <button btn>
      Button
    </button>
    <NButton n="orange6 dark:orange5 sm dashed">
      S Orange Dashed
    </NButton>
  </main>
</template>
