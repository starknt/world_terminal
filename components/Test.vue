<script setup lang="ts">
import { createAreaLineListMsg, createCheckEditionMsg, createUserLoginMsg, parseAreaServer, parseAuthenticationPayload } from '@terminal/client'

const { ws } = useTerminalClient()!

ws.send(createCheckEditionMsg(1100, 1000))
ws.send(createUserLoginMsg('rr1234', 'rr1234'), (p) => {
  const code = p.getByte()

  if (code < 0)
    console.error('login failed: ', p.getString())

  const payload = parseAuthenticationPayload(p)

  console.error(payload)
})
ws.send(createAreaLineListMsg(), (p) => {
  console.error(parseAreaServer(p))
})
</script>

<template>
  11
</template>
