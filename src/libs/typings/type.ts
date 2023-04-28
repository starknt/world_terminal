import type { nato } from 'libs/base/nato'
import type { RoleInfo } from './RoleInfo'
import type { ServerInfo } from './ServerInfo'

export interface LoginSuccessResult {
  uKey: nato.Long
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
  (message: nato.Message): void
}
