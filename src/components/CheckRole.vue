<script setup lang="ts">
import { Define } from 'libs/defined/defined'
import { Model } from 'libs/typings/Model'
import { RoleInfo } from 'libs/typings/RoleInfo'

const props = defineProps<{
  roleInfo: RoleInfo[]
  creatable: number
}>()
const emit = defineEmits<{
  (e: 'login', info: RoleInfo): void
  (e: 'delete', info: RoleInfo): void
  (e: 'recover', info: RoleInfo): void
}>()
const noopRole: RoleInfo = new RoleInfo(
  0, '虚拟角色', '', 0, 0, 0, 0, 1, 0,
)
const roleInfo = $ref<RoleInfo[]>(props.roleInfo)

watch(() => roleInfo, () => {
  if (roleInfo.length === 3)
    return

  if (roleInfo.length === 1) {
    roleInfo.unshift(noopRole)
    roleInfo.push(noopRole)
  }

  if (roleInfo.length === 2)
    roleInfo.push(noopRole)
}, { immediate: true })

function loginRole(info: RoleInfo) {
  emit('login', info)
}

function deleteRole(info: RoleInfo) {
  emit('delete', info)
}

function recoverRole(info: RoleInfo) {
  emit('recover', info)
}

function finish(info: RoleInfo) {

}

const countDownTime = $computed(() => 60 * 1000)

const isCreatable = $computed(() => {
  return roleInfo.filter(info => info.id > 0).length < props.creatable
})

function disabled(info: RoleInfo) {
  if (info.id <= 0)
    return true
  if (info.isStatusBit(Model.STATUS_TEMP_DEL))
    return true

  return false
}
</script>

<template>
  <n-descriptions p-4 rounded-md label-align="center" title="角色列表">
    <n-descriptions-item ml-0 mt-4>
      <n-grid cols="1 s:2 m:3" responsive="screen" :collapsed="false" :x-gap="8" :y-gap="16">
        <n-grid-item v-for="info in roleInfo" span="1" suffix>
          <n-card h-full hoverable>
            <template #header>
              <n-p md:text-sm lg:text-sm>
                <n-text type="info">
                  角色名:
                </n-text>
                {{ info.name }}
              </n-p>
            </template>

            <template #header-extra>
              <n-tag type="success">
                等级: {{ info.level }}
              </n-tag>
            </template>

            <template #default>
              <n-space>
                <n-tag>
                  <n-p align-text>
                    <n-text type="info">
                      阵营:
                    </n-text>
                    <n-text>
                      {{ Define.getRaceString(info.race) }}
                    </n-text>
                  </n-p>
                </n-tag>

                <n-tag>
                  <n-p align-text>
                    <n-text type="info">
                      职业:
                    </n-text>
                    <n-text>
                      {{ Define.getJobString(info.job) }}
                    </n-text>
                  </n-p>
                </n-tag>

                <n-tag>
                  <n-p align-text>
                    <n-text type="info">
                      性别:
                    </n-text>
                    <n-text>
                      {{ Define.getSexString(info.sex) }}
                    </n-text>
                  </n-p>
                </n-tag>

                <n-tag>
                  <n-p align-text>
                    <n-text type="info">
                      当前地图:
                    </n-text>
                    <n-text>
                      {{ info.map ?? '未知图' }}
                    </n-text>
                  </n-p>
                </n-tag>

                <n-tag>
                  <n-p align-text>
                    <n-text type="info">
                      VIP等级:
                    </n-text>
                    <n-text>
                      {{ info.vip }}
                    </n-text>
                  </n-p>
                </n-tag>
              </n-space>
            </template>

            <template #footer>
              <n-tag v-if="info.isStatusBit(Model.STATUS_TEMP_DEL)" type="warning">
                临时删除 {{ info.getLeaveTime() }}
              </n-tag>

              <n-tag v-if="info.isStatusBit(Model.STATUS_OFFLINEMISSION)" type="warning">
                在线任务 {{ info.getLeaveTime() }}
              </n-tag>

              <n-p>
                <n-text type="info">
                  选择角色倒计时:
                </n-text>
                <n-text type="error">
                  <n-countdown :duration="countDownTime" @finish="finish(info as RoleInfo)" />
                </n-text>
                <n-text text-xs strong type="error">
                  &nbsp;&nbsp;倒计时结束后, 会自动选择角色
                </n-text>
              </n-p>
            </template>

            <template #action>
              <n-space size="small" justify="space-around" :wrap="false">
                <n-button
                  text-black dark:text-white type="success" :disabled="disabled(info as RoleInfo)"
                  @click="loginRole(info as RoleInfo)"
                >
                  选择角色
                </n-button>

                <n-button
                  v-if="info.id > 0 && !info.isStatusBit(Model.STATUS_TEMP_DEL)" text-black dark:text-white
                  type="warning" :disabled="info.id < 0" @click="deleteRole(info as RoleInfo)"
                >
                  删除角色
                </n-button>

                <n-button
                  v-if="info.id > 0 && info.isStatusBit(Model.STATUS_TEMP_DEL)" text-black dark:text-white
                  type="warning" @click="recoverRole(info as RoleInfo)"
                >
                  恢复角色
                </n-button>

                <n-button v-if="info.id <= 0 && isCreatable" text-black dark:text-white>
                  创建角色
                </n-button>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-descriptions-item>
  </n-descriptions>
</template>
