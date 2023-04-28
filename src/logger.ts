import debug from 'debug'
import { useGlobalSettingStore } from './store/setting'
import type { Logger } from './types'

const isDebugMode = useGlobalSettingStore().debug

export namespace $Logger {
  const $debug = debug('Global')

  export const enableLogger = isDebugMode

  $debug.enabled = enableLogger

  export function log(info: string, ...args: any[]) {
    if (!enableLogger)
      return

    $debug(info, ...args)
  }

  export function create(scope: string): Logger {
    const $debug = debug(scope)
    $debug.enabled = enableLogger

    return {
      log(info: string, ...args: any[]) {
        $debug(info, ...args)
      },
    }
  }
}
