import { internalIpV4 } from 'internal-ip'

const mobile = process.env.TAURI_PLATFORM === 'android' || process.env.TAURI_PLATFORM === 'ios'

export default defineNuxtConfig({
  // must disable ssr
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@terminal/ui-kit',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  build: {
    transpile: process.env.NODE_ENV === 'production'
      ? [
          'naive-ui',
          'vueuc',
          '@juggle/resize-observer',
        ]
      : ['@juggle/resize-observer'],
  },
  vite: {
    server: {
      hmr: mobile
        ? {
            protocol: 'ws',
            host: await internalIpV4(),
            port: 1421,
          }
        : undefined,
      strictPort: true,
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
    build: {
      chunkSizeWarningLimit: 600,
      // Tauri supports es2021
      target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  },
  devServer: {
    port: 1420,
    host: mobile ? '0.0.0.0' : undefined,
  },
  devtools: {
    enabled: true,
  },
})
