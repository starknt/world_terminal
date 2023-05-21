<script setup lang="ts">
import type { AuthenticationPayload } from '@terminal/client'
import { createAreaLineListMsg, createCheckEditionMsg, createFirstGameServerMsg, createUserLoginMsg, parseAreaServer, parseAuthenticationPayload } from '@terminal/client'
import type { ServerAreaInfo } from '@terminal/models/parser'
import { WebSocket } from '@terminal/ws'

const authPayload = shallowRef<AuthenticationPayload>()
const areaServer = shallowRef<ServerAreaInfo[]>()
const ws = ref<WebSocket>()

onMounted(() => {
  ws.value = WebSocket.from('wss://wanba.worldh5.com/websocket')

  ws.value.send(createCheckEditionMsg(1100, 1000))
  ws.value.send(createUserLoginMsg('rr1234', 'rr1234'), (p) => {
    authPayload.value = parseAuthenticationPayload(p)
  })
  ws.value.send(createAreaLineListMsg(), (p) => {
    areaServer.value = parseAreaServer(p)
  })
})

watch([authPayload, areaServer], async () => {
  if (!authPayload.value || !areaServer.value)
    return

  const { key, session, setting, ip } = toValue(authPayload.value)
  // console.log({ key, session, setting, ip })

  const line = toValue(areaServer.value!).filter(a => a.actorCount > 0).flatMap(a => a.lines)[0]

  if (line) {
    ws.value = WebSocket.from(line.webSocketUrl)
    const msg = createFirstGameServerMsg(key, session)

    const b = await ws.value.send(msg)

    if (b.getByte() !== 0)
      console.error(b.getString())

    //     ws.value.send(createPlayerListMsg(), (p) => {
    //       const roleInfo = parseRoleInfo(p)
    //       console.log(roleInfo)
    //     })
  }
})
</script>

<template>
  <NDarkToggle v-slot="{ toggle, isDark }">
    <NButton n="sm primary" @click="toggle">
      <div carbon-sun dark:carbon-moon translate-y--1px /> {{ isDark.value ? 'Dark' : 'Light' }}
    </NButton>
  </NDarkToggle>
</template>
