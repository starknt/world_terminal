<script setup lang="ts">
import type { PlayerBag } from 'libs/typings/PlayerBag'

const { bag } = defineProps<{
  bag: PlayerBag
}>()
const PAGE_MAX_ITEM = 60
let page = $ref(1)
const store = bag.store.slice(30).filter(Boolean)
const pages = store.length % PAGE_MAX_ITEM ? Math.floor(store.length / PAGE_MAX_ITEM) + 1 : Math.floor(store.length / PAGE_MAX_ITEM)
const willRendererStore = computed(() => store.slice((page - 1) * PAGE_MAX_ITEM, page * PAGE_MAX_ITEM))

function updatePage(nextPage: number) {
  page = nextPage
}
</script>

<template>
  <n-space vertical>
    <n-grid cols="6 s:10 m:12 x:14" responsive="screen" :item-responsive="true" :collapsed="false">
      <n-grid-item v-for="item in willRendererStore" cursor-pointer span="1">
        <BagItem :item="item" />
      </n-grid-item>
    </n-grid>

    <n-pagination v-if="pages > 1" :page="page" :page-count="pages" @update:page="updatePage" />
  </n-space>
</template>
