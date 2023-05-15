import { fileURLToPath } from 'node:url'
import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import { extendUnocssOptions } from './unocss'

export { presetTerminal as unocssPreset } from './unocss'

function rPath(p: string) {
  return fileURLToPath(new URL(p, import.meta.url).toString())
}

export interface ModuleOptions {
  dev?: boolean
  preset?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'terminal-ui-kit',
    configKey: '@terminal/ui',
  },
  defaults: {
    preset: rPath('./preset'),
  },
  async setup(options, nuxt) {
    const { resolvePath } = createResolver(import.meta.url)

    // Standard components
    addComponentsDir({ path: rPath('./components') })

    nuxt.options.css.unshift(rPath('assets/style.css'))

    nuxt.options.unocss = extendUnocssOptions(nuxt.options.unocss)

    nuxt.options.vueuse = nuxt.options.vueuse || {}
    // @ts-expect-error - module options
    nuxt.options.colorMode = defu(nuxt.options.colorMode, { classSuffix: '' })

    await installModule(await resolvePath('@unocss/nuxt'))
    await installModule(await resolvePath('@vueuse/nuxt'))
    await installModule(await resolvePath('@nuxtjs/color-mode'))
    await installModule(await resolvePath('v-lazy-show/nuxt'))
  },
})
