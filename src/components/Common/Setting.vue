<script setup lang="ts">
import { useGlobalSettingStore } from '~/store/setting'

let show = $ref(false)
const store = useGlobalSettingStore()

const toggleSettingWidget = () => {
  show = !show
}
</script>

<template>
  <div
    flex w="[24px]" h="[24px]" op-50 hover:op-100 text-black dark:text-white cursor-pointer
    @click="() => toggleSettingWidget()"
  >
    <Icon text-2xl i-carbon-settings />
  </div>

  <n-modal v-model:show="show" transform-origin="center">
    <n-card style="width: 600px" title="设置" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #default />
    </n-card>
  </n-modal>
</template>
