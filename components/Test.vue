<script setup lang="ts">
import { createAreaLineListMsg, createCheckEditionMsg, createUserLoginMsg, parseAreaServer } from '@terminal/client'

const { ws } = useTerminalClient()!

await ws.send(createCheckEditionMsg(1100, 1000))
await ws.send(createUserLoginMsg('rr1234', 'rr1234'))
ws.send(createAreaLineListMsg(), (p) => {
  console.error(parseAreaServer(p))
})
</script>

<template>
  11
</template>
