import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/index',
    { input: 'src/module', format: 'esm' },
    { input: 'src/components/', outDir: 'dist/components' },
    { input: 'src/composables/', outDir: 'dist/composables' },
  ],
  rollup: {
    emitCJS: true,
  },
  externals: [
    'vue',
    '"@vueuse/core',
    'nuxt',
    'nuxt/schema',
    '@nuxt/schema',
    '@nuxt/kit',
  ],
})
