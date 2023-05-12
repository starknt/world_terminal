import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetTerminal } from '@terminal/ui-kit/unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTerminal(),
  ],
})
