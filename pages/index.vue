<template>
  <span text="blue 5xl hover:red" cursor="default">Hello Nuxt 3</span>
  <br>
  <NButton icon="i-carbon-car" mt-4 n="orange6 dark:orange5 sm dashed">
    Orange Dashed
  </NButton>

  <NDarkToggle v-slot="{ toggle, isDark }">
    <NButton n="sm primary" @click="toggle">
      <div carbon-sun dark:carbon-moon translate-y--1px /> {{ isDark.value ? 'Dark' : 'Light' }}
    </NButton>
  </NDarkToggle>
</template>
