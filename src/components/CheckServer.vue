<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { ServerInfo } from 'libs/typings/ServerInfo'

const props = defineProps<{
  serverInfo: ServerInfo[]
}>()
const emit = defineEmits<{
  (e: 'login', info: ServerInfo): void
}>()
const breakPoints = useBreakpoints(breakpointsTailwind)
let checkedServer = $ref(props.serverInfo.find(info => info.logon)!.id)

function handleCheck(id: number) {
  checkedServer = id
}

function handleLogin() {
  const info = props.serverInfo.find(v => v.id === checkedServer)!

  emit('login', info)
}

onMounted(() => {
  useEventListener('keydown', useDebounceFn((e) => {
    let x = 0
    let y = 0
    switch (e.keyCode) {
      case 37: // left
        x = -1
        break
      case 38: // top
        y = -1
        break
      case 39: // right
        x = 1
        break
      case 40: // bottom
        y = 1
        break
    }

    let l = -1
    let check_x = 0
    let check_y = 0
    const { serverInfo } = props
    const rows = (() => {
      if (breakPoints.isGreater('xl'))
        return 4
      if (breakPoints.isInBetween('lg', 'xl'))
        return 3
      if (breakPoints.isInBetween('md', 'lg'))
        return 2

      return 2
    })()
    const info = serverInfo.reduce((prev: ServerInfo[][], curr, index) => {
      const i = index % rows
      if (index % rows === 0) {
        l++
        prev[l] = [curr]
      }
      else {
        prev[l].push(curr)
      }

      if (curr.id === checkedServer) {
        check_y = l
        check_x = i
      }

      return prev
    }, [])

    let _x = check_x + x
    let _y = check_y + y

    if (_x < 0)
      _x = info[_y].length - 1
    if (_y < 0)
      _y = info.length - 1
    if (_y >= info.length)
      _y = 0
    if (_x >= info[_y].length)
      _x = 0

    if (info[_y][_x]?.id)
      checkedServer = info[_y][_x].id
  }, 30))
})

function randomInt(min = 0, max = 0) {
  return Math.floor(Math.random() * max + min)
}

function randomType(): 'default' | 'error' | 'info' | 'success' | 'warning' {
  const TYPES = ['default', 'error', 'info', 'success', 'warning']

  const type = TYPES[randomInt(0, TYPES.length)]

  return type as 'default' | 'error' | 'info' | 'success' | 'warning'
}
</script>

<template>
  <div>
    <n-descriptions
      p-4 rounded-md text-white bg="[#f1f1f1]" dark:bg="[#18181c]" label-placement="top"
      label-align="center" title="服务器列表"
    >
      <n-descriptions-item ml-0 mt-4>
        <n-grid
          ml-0 p-8 cols="6 m:9 l:12" responsive="screen" :item-responsive="true" :collapsed="false" :x-gap="8"
          :y-gap="20"
        >
          <n-grid-item v-for="info in props.serverInfo" span="3">
            <n-badge
              :type="randomType()"
              :value="info.stateStr.includes('#') ? `新服 ${info.actorCount}` : `${info.stateStr} ${info.actorCount}`"
            >
              <n-tag
                :key="info.id" :disabled="info.state === ServerInfo.SERVER_STATE_STOP"
                :checked="info.id === checkedServer" checkable size="large" round strong :value="info.id"
                @update:checked="handleCheck(info.id)"
              >
                {{ info.name.slice(0, 4) }}
              </n-tag>
            </n-badge>
          </n-grid-item>
        </n-grid>
      </n-descriptions-item>
    </n-descriptions>

    <n-space mt-4 mr-12 justify="center" align="center">
      <n-button text-black dark:text-white type="success" @keyup.enter="handleLogin" @click="handleLogin">
        登录该服务器
      </n-button>
    </n-space>
  </div>
</template>
