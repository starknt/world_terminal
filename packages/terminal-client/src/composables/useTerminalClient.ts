import { inject } from 'vue'
import type { WebSocket } from '@terminal/ws'
import type { EventEmitter, Protocol } from '@terminal/core'
import type { MapData, Player } from '@terminal/models/parser'
import type { ProtocolType } from '@terminal/models'

export const TERMINAL_CLIENT_PROVIDER_KEY = Symbol('terminal.client.provider')

export interface TerminalClientEvent extends Record<ProtocolType, Protocol> {
  onMapUpdate: number
}

export interface TerminalClient {
  socket: WebSocket
  bus: EventEmitter<TerminalClientEvent>
  map: MapData
  self: Player
}

export function useTerminalClient() {
  return inject<TerminalClient>(TERMINAL_CLIENT_PROVIDER_KEY)
}
