import type { RemovableRef } from '@vueuse/core'
import type { GlobalSetting } from '~/types'

export const useGlobalSettingStore = defineStore<string, RemovableRef<GlobalSetting>>('global:setting', {
  state: () => useLocalStorage<GlobalSetting>('global:setting', {
    debug: false,
  }),
})
