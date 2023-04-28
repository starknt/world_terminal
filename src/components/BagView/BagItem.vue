<script setup lang="ts">
import type { ItemData } from 'libs/typings/ItemData'

const { item } = defineProps<{
  item?: ItemData
}>()

const icon = xuis.frames[`${item?.bagIcon ?? 0}`]
const colorTexture = xuis.frames[`${100 + (item?.grade ?? 0)}`]
const posX = $computed(() => `-${item ? colorTexture.x : 140}px`)
const posY = $computed(() => `-${item ? colorTexture.y : 155}px`)
const width = $computed(() => `${item ? colorTexture.sourceW : 64}px`)
const height = $computed(() => `${item ? colorTexture.sourceH : 64}px`)
</script>

<template>
  <n-popover :disabled="!!!item" trigger="hover">
    <template #trigger>
      <div id="item" m="[-8px]" flex rounded-md border-4 border="[#ccc]">
        <GameIcon v-if="item" :frame="icon" />
      </div>
    </template>
    <div v-if="item">
      {{ item.name }} x {{ item.quantity }}
      <p>
        {{ item.info }}
      </p>
    </div>
  </n-popover>
</template>

<style scoped>
#item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://worldh5.gamehz.cn/version/world/publish/channel/res/resource/ui/icons.png") no-repeat;
  background-position-x: v-bind(posX);
  background-position-y: v-bind(posY);
  width: v-bind(width);
  height: v-bind(height);
  transform: scale(0.7);
  aspect-ratio: 16 / 9;
}
</style>
