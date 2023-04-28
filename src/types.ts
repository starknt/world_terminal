import { Protocol } from 'libs/base/protocol'
import type { Account } from 'libs/shared/Account'
import type { Version } from 'libs/shared/version'

export interface GlobalSetting {
  debug: boolean
}

export interface PanelProps {
  id: string
  title: string
}

export interface WorldApi {
  updateTitle(title: string): void
}

export interface Form {
  username: string
  password: string
  displayName: string
}

export interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
}

export interface IAccount {
  displayName: string
  username: string
  password: string
  version: Version
  url: string
}

export interface AccountState {
  id: string
  url: string
  username: string
  password: string
  version: string
  displayName: string
}

export interface AccountRepositoryInst {
  clear(): void
  update(name: string): void
  set(account: Account): void
}

export interface ApiClientResponse<T = Protocol> {
  code: number
  data?: T
  error?: string
}

export interface Logger {
  log(info: string, ...args: any[]): void
}

export interface IImageResource {
  file: string
  x: number
  y: number
  w: number
  h: number
  offX: number
  offY: number
  sourceW: number
  sourceH: number
}

export interface IGameIconProps {
  frame: IImageResource
}


export type IApiClientResponse<T = Protocol> = Promise<ApiClientResponse<T>>
