import { inject } from 'vue'
import type { WebSocket } from '@terminal/ws'
import type { EventEmitter, Protocol } from '@terminal/core'
import type { MapData } from '@terminal/models/parser'
import type { ProtocolType } from '@terminal/models'
import type { Self } from '../models/self'

export const TERMINAL_CLIENT_PROVIDER_KEY = Symbol('terminal.client.provider')

export interface TerminalClientEvent extends Record<ProtocolType, Protocol> {
  'on:map:update': number
}

export interface TerminalClient {
  socket: WebSocket
  bus: EventEmitter<TerminalClientEvent>
  map: MapData
  self: Self
}

export function useTerminalClient() {
  const client = inject<TerminalClient>(TERMINAL_CLIENT_PROVIDER_KEY)

  if (!client)
    throw new Error('Should be to provide <terminal-client-provider> warpper')

  return client
}
