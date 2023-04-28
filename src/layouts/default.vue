<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import type { PanelProps } from '~/types'

const panels = $ref<PanelProps[]>([
  createPanel(),
])
let activeTab = $ref(panels[0].id)

const handleAddPanel = () => {
  const panel = createPanel()

  panels.push(panel)
  activeTab = panel.id
}

const handleClosePanel = (id: string) => {
  if (panels.length === 1)
    return

  const index = panels.findIndex(v => v.id === id)
  panels.splice(index, 1)

  if (activeTab === id)
    activeTab = panels[0].id
}

function createPanel(title?: string): PanelProps {
  return {
    id: uuid(),
    title: title ?? '默认名字',
  }
}

function handleUpdateTitle(title: string, i: number) {
  const panel = panels[i]

  if (panel && title.length > 0)
    panel.title = title
}

const addable = $computed(() => {
  return {
    disabled: panels.length >= 10,
  }
})

const closable = $computed(() => {
  return panels.length > 1
})
</script>

<template>
  <n-tabs
    v-model:value="activeTab" pb-8 animated :tabs-padding="16" type="card" :addable="addable" :closable="closable"
    tab-style="min-width: 120px;" @close="handleClosePanel" @add="handleAddPanel"
  >
    <n-tab-pane
      v-for="panel, i in panels" :key="panel.id" display-directive="show:lazy" :tab="panel.title"
      :name="panel.id" min-h="[calc( 100vh - 40px )]" flex justify-center
    >
      <Layout :index="i" @update:title="handleUpdateTitle" />
    </n-tab-pane>
  </n-tabs>
</template>
