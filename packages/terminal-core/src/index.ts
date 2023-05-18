import type { ByteArray } from './egret'
import type { Protocol } from './protocol'

export * from './datastruct'
export * from './egret'
export * from './gzip'
export * from './bigint'
export * from './protocol'
export * from './eventemitter'
export * from './types'

export type MaybeProtocol = Protocol | ByteArray
