import type { Long } from '@terminal/core'

export type Nullable<T> = T | undefined
export interface Account {
  username: string
  password: string
}

export interface Version {
  name: string
  id: number
  channel: number
  url: string
}

export interface AuthenticationPayload {
  key: Long
  session: number
  ip: string
  setting: number
}
