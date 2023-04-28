<script setup lang="ts">
import type { IImageResource } from '~/types'

interface IGameIconProps {
  frame: IImageResource
}

// https://worldh5.gamehz.cn/version/world/publish/channel/res/resource/ui/icons.png
const props = defineProps<IGameIconProps>()

const icon = props.frame

const posX = $computed(() => `-${icon.x}px`)
const posY = $computed(() => `-${icon.y}px`)
const width = $computed(() => `${icon.w}px`)
const height = $computed(() => `${icon.h}px`)
</script>

<template>
  <div class="container">
    <i class="game-icon" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  transform: scale(1.5);
}

.game-icon {
  display: block;
  background: url("https://worldh5.gamehz.cn/version/world/publish/channel/res/resource/ui/icons.png") no-repeat;
  background-position-x: v-bind(posX);
  background-position-y: v-bind(posY);
  width: v-bind(width);
  height: v-bind(height);
  aspect-ratio: 16 / 9;
}
</style>
