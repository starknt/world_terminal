<script setup lang="ts">
import type { GameService } from 'libs/service/GameService'

const { service } = defineProps<{
  service: GameService
}>()

const player = toReactive(service.player)
</script>

<template>
  <n-layout mx-4>
    <n-layout-content>
      <n-grid cols="4" :x-gap="8" :y-gap="4" responsive="screen" item-responsive>
        <n-grid-item span="1">
          <n-card>
            <template #default>
              <n-space vertical :size="8">
                <n-popover trigger="click">
                  <template #trigger>
                    <n-button>背包</n-button>
                  </template>
                  <Bag :bag="player.bag" />
                </n-popover>
                <!-- <RolePowerPanel mt-4 :player="player" /> -->
                <n-popover placement="right" trigger="hover">
                  <template #trigger>
                    <n-button>属性</n-button>
                  </template>
                  <RolePowerPanel :player="player" />
                </n-popover>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>

        <n-grid-item span="3">
          <n-card>
            222
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
