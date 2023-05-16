import { inject } from 'vue'
import type { WebSocket } from '@terminal/ws'

export const TERMINAL_CLIENT_PROVIDER_KEY = Symbol('terminal.client.provider')
export interface ITerminalClient {
  ws: WebSocket
}

export function useTerminalClient() {
  return inject<ITerminalClient>(TERMINAL_CLIENT_PROVIDER_KEY)
}
