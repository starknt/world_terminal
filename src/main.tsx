import '@unocss/reset/tailwind.css'
import 'uno.css'

import 'vfonts/FiraCode.css'
import { NDialogProvider, NMessageProvider } from 'naive-ui'
import { createApp } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./layouts/default.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

if (!xuis) {
  xuis = {
    frames: {},
  }
}

createApp(
  <NMessageProvider>
    <NDialogProvider>
      <App />
    </NDialogProvider>
  </NMessageProvider>,
)
  .use(createPinia())
  .use(router)
  .mount('#app')
