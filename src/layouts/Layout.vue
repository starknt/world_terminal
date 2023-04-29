<script setup lang="ts">
import { GameService } from 'libs/service/GameService'
import { Account } from 'libs/shared/Account'
import { Tool } from 'libs/shared/Tool'
import type { Version } from 'libs/shared/version'
import { Model } from 'libs/typings/Model'
import { RoleInfo } from 'libs/typings/RoleInfo'
import type { ServerInfo } from 'libs/typings/ServerInfo'
import type { LoginSuccessResult } from 'libs/typings/type'
import type { StepsProps } from 'naive-ui'
import pretty from 'pretty-ms'
import { globalWorld } from '~/GlobalWorld'
import { $Logger } from '~/logger'
import type { Form } from '~/types'

const props = defineProps<{
  index: number
}>()

const emit = defineEmits<{
  (e: 'update:title', title: string, index: number): void
}>()

const loadingBar = useLoadingBar()
let account = $ref<Account>()
let current = $ref<number>(1)
let roleInfo = $ref<RoleInfo[]>([])
let creatable = $ref(0)
let currentStatus = $ref<StepsProps['status']>('process')
let loginResult = $ref<LoginSuccessResult>()
let gameService = $ref<GameService>()
const { updateAccount } = useAccountRepository()

watch(() => gameService, () => {
  globalWorld.setGameWorld(props.index, gameService as any as GameService)
})

function next() {
  currentStatus = 'process'

  current++
}

async function handleLogin(form: Form, version: Version) {
  $Logger.log('登录账号信息', form, version)

  loadingBar.start()
  currentStatus = 'wait'

  const _account = Account.fromForm(form, version)

  try {
    const result = await useLogin(_account)

    $Logger.log('登录成功', result)

    account = _account
    loginResult = result
    currentStatus = 'finish'
    loadingBar.finish()

    setTimeout(() => next(), 1000)
  }
  catch {
    currentStatus = 'process'
    loadingBar.finish()
    current = 1

    window.$message.error('登录失败, 请检查账号与是否正确')
  }
}

async function handleGameLogin(info: ServerInfo) {
  loadingBar.start()
  currentStatus = 'wait'

  if (!loginResult) {
    $Logger.log('')
    return
  }

  const [service, gameLoginResult] = await useGameLogin(loginResult.uKey, loginResult.sessionId, info)
  currentStatus = 'finish'
  loadingBar.finish()

  gameService = service

  service.onCloseConnect((e) => {
    $Logger.log(`角色 ${service.player.playerName} 与服务器的连接已中断, 已在线 ${pretty(e)}`)

    current = 1
  })

  roleInfo = gameLoginResult.roles
  creatable = gameLoginResult.creatable

  if (account)
    updateAccount(account)
  setTimeout(() => next(), 1000)
}

async function handleRoleLogin(role: RoleInfo) {
  loadingBar.start()
  currentStatus = 'wait'

  await useRoleLogin(gameService as GameService, role)

  loadingBar.finish()
  currentStatus = 'finish'
  setTimeout(() => next(), 1000)
}

async function handleDeleteRole(role: RoleInfo) {
  $Logger.log('删除角色', role)
  const res = await gameService!.client.deleteRole(role)

  if (res.code === 0) {
    role.setStatusBit(Model.STATUS_TEMP_DEL)
    const n = res.data!.getShort()
    const time = Date.now() + n * Tool.MILLIS_IN_MINUTE
    role.setTimes(time)

    console.log(role)
  }

  $Logger.log('删除角色', res)
}

async function handleRecoverRole(role: RoleInfo) {
  $Logger.log('恢复角色', role)

  const res = await gameService!.client.recoverRole(role)

  if (res.code === 0)
    role.clearStatusBit(Model.STATUS_TEMP_DEL)

  $Logger.log('恢复角色', res)
}

provide('api', {
  updateTitle: (title: string) => {
    emit('update:title', title, props.index)
  },
})
</script>

<template>
  <n-layout
    v-if="current !== 4" max-w="[95%]" lg:max-w="[70%]" md:max-w="[80%]" sm:max-w="[90%]"
    content-style="display: flex; width: 100%; justify-content: center; flex-direction: column; gap: 24px;"
  >
    <n-layout-header
      self-center hidden sm:w-full sm:flex md:w-full md:flex xl:w="[90%] xl:flex" justify-center
      rounded-md overflow-hidden
    >
      <n-steps :status="currentStatus" :current="current as number" p-6>
        <n-step title="登录账号" description="登录游戏账号" />
        <n-step title="选择服务器" description="选择游戏服务器" />
        <n-step title="选择角色&进入游戏" description="选择游戏角色" />
      </n-steps>
    </n-layout-header>
    <n-layout-content self-center w="[90%]">
      <n-grid h-full item-responsive responsive="self">
        <n-grid-item offset="1" span="22">
          <LoginPanel v-if="current === 1" @login="handleLogin" />

          <CheckServer
            v-if="current === 2"
            :server-info="loginResult!.gameAreaServerList"
            @login="handleGameLogin"
          />

          <CheckRole
            v-if="current === 3" :role-info="roleInfo as RoleInfo[]" :creatable="creatable"
            @delete="handleDeleteRole" @recover="handleRecoverRole" @login="handleRoleLogin"
          />
        </n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>

  <GameWorld v-if="current === 4" :service="gameService as GameService" />
</template>
