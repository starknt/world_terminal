import { fileURLToPath } from 'node:url'
import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'

function rPath(p: string) {
  return fileURLToPath(new URL(p, import.meta.url).toString())
}

export default defineNuxtModule({
  async setup() {
    const { resolvePath } = createResolver(import.meta.url)

    addComponentsDir({ path: rPath('./components') })
    addImportsDir(rPath('./composables'))

    await installModule(await resolvePath('@vueuse/nuxt'))
  },
})
