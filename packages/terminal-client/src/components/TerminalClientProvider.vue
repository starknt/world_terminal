<script setup lang="ts">
import { provide } from 'vue'
import type { ITerminalClient } from '../composables/useTerminalClient'
import { TERMINAL_CLIENT_PROVIDER_KEY } from '../composables/useTerminalClient'

const props = defineProps<ITerminalClient>()
defineOptions({
  name: 'terminal-client-provider',
})
provide(TERMINAL_CLIENT_PROVIDER_KEY, props)
</script>

<template>
  <slot />
</template>
