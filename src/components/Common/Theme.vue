<script setup lang="ts">
import { isDark, toggleTheme } from '~/logic/isDark'
</script>

<template>
  <div
    flex w="[24px]" h="[24px]" rounded-md op-50 hover:op-100 text-black dark:text-white cursor-pointer
    @click="() => toggleTheme()"
  >
    <Icon v-if="isDark" text-2xl i-carbon-moon />
    <Icon v-if="!isDark" text-2xl i-carbon-sun />
  </div>
</template>
