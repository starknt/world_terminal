import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { unocssPreset as terminalUIKitUnoPreset } from './packages/terminal-ui-kit/src/unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    terminalUIKitUnoPreset(),
  ],
})
