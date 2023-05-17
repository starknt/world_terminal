import { inject } from 'vue'
import type { WebSocket } from '@terminal/ws'
import type { EventEmitter } from '@terminal/core'

export const TERMINAL_CLIENT_PROVIDER_KEY = Symbol('terminal.client.provider')

export interface TerminalClientEvent {

}

export interface TerminalClient {
  socket: WebSocket
  bus: EventEmitter<TerminalClientEvent>
}

export function useTerminalClient() {
  return inject<TerminalClient>(TERMINAL_CLIENT_PROVIDER_KEY)
}
