import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { internalIpV4 } from 'internal-ip'
import { alias } from './alias'

const mobile
  = process.env.TAURI_PLATFORM === 'android'
  || process.env.TAURI_PLATFORM === 'ios'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    VueJsx(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
        'pinia',
      ],
      dirs: [
        './src/composables',
        './src/store',
      ],
    }),
    Components({
      extensions: ['vue', 'tsx'],
      resolvers: [
        NaiveUiResolver(),
      ],
      dirs: [
        './src/layouts',
        './src/components',
      ],
    }),
  ],
  resolve: {
    alias,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chunk: ['naive-ui'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  server: {
    host: mobile ? '0.0.0.0' : false,
    port: 1420,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    strictPort: true,
  },
  strictPort: true,
}))
