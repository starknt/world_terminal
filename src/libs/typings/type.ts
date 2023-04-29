import type { Long, Protocol } from 'libs/base/protocol'
import type { RoleInfo } from './RoleInfo'
import type { ServerInfo } from './ServerInfo'

export interface LoginSuccessResult {
  uKey: Long
  sessionId: number
  photoIp: string
  loginSetting: number
  gameAreaServerList: ServerInfo[]
}

export interface RoleLoadedResult {
  roles: RoleInfo[]
  creatable: number
}

export interface WebSocketConnectEventCallback {
  (e: Event): void
}

export interface WebSocketCloseEventCallback {
  (e: CloseEvent): void
}

export interface WebSocketErrorEventCallback {
  (e: Event): void
}

export interface WebSocketDataEventCallback {
  (e: MessageEvent<ArrayBuffer>): void
}

export interface CommandCallback {
  (message: Protocol): void
}
