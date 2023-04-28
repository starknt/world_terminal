<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui'
import { darkTheme, lightTheme, zhCN } from 'naive-ui'
import { isDark } from './logic/isDark'

window.$message = useMessage()

const theme = $computed<GlobalTheme>(() => isDark.value ? darkTheme : lightTheme)
const locale = $computed(() => zhCN)
</script>

<template>
  <n-config-provider preflight-style-disabled :locale="locale" :theme="theme" flex="~ col" h-screen gap-2>
    <n-global-style />
    <n-loading-bar-provider>
      <Header />
      <main flex="~" justify-center>
        <router-view />
      </main>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
