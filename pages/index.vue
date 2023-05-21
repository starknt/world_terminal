<script setup lang="ts">
// const key = new Long(509161320, 3706178809)
// const session = 1885682
// const msg = createFirstGameServerMsg(key, session)

// console.log({ msg })

// const authPayload = ref<AuthenticationPayload>()
// const areaServer = ref<ServerAreaInfo[]>()
// const ws = ref<WebSocket>()

// onMounted(() => {
//   ws.value = WebSocket.from('wss://wanba.worldh5.com/websocket')

//   ws.value.send(createCheckEditionMsg(1100, 1000))
//   ws.value.send(createUserLoginMsg('rr1234', 'rr1234'), (p) => {
//     authPayload.value = parseAuthenticationPayload(p)
//   })
//   ws.value.send(createAreaLineListMsg(), (p) => {
//     areaServer.value = parseAreaServer(p)
//   })
// })

// watch([authPayload, areaServer], async () => {
//   if (!authPayload.value || !areaServer.value)
//     return

//   ws.value?.close()

//   const line = areaServer.value.filter(a => a.actorCount > 0).flatMap(a => a.lines)[0]

//   console.log(line.webSocketUrl)

//   if (line) {
//     ws.value = WebSocket.from(line.webSocketUrl)
//     const auth = toValue(authPayload)!
//     const msg = createFirstGameServerMsg(auth?.key, auth?.session)
//     console.log({ msg })
//     const b = await ws.value.send(msg)

//     if (b.getByte() !== 0)
//       console.error(b.getString())

//     ws.value.send(createPlayerListMsg(), (p) => {
//       const roleInfo = parseRoleInfo(p)
//       console.log(roleInfo)
//     })
//   }
// })
</script>

<template>
  <NDarkToggle v-slot="{ toggle, isDark }">
    <NButton n="sm primary" @click="toggle">
      <div carbon-sun dark:carbon-moon translate-y--1px /> {{ isDark.value ? 'Dark' : 'Light' }}
    </NButton>
  </NDarkToggle>
</template>
