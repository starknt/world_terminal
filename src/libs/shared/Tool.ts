import { Random } from 'libs/service/Battle/random'
import { isUndefinedOrNull } from './types'

export namespace Tools {
  export const MAX_VALUE_int = 2147483647
  export const MAX_VALUE_short = 32767
  export const MAX_VALUE_byte = 127
  export const MILLIS_IN_SECOND = 1e3
  export const MILLIS_IN_MINUTE = 60 * Tools.MILLIS_IN_SECOND
  export const MILLIS_IN_HOUR = 60 * Tools.MILLIS_IN_MINUTE
  export const MILLIS_IN_DAY = 24 * Tools.MILLIS_IN_HOUR
  export const SECOND_IN_MINUTE = 60
  export const SECOND_IN_HOUR = 3600
  export const SECOND_IN_DAY = 86400
  export const MINUTE_IN_HOUR = 60
  export const MINUTE_IN_DAY = 1440
  export const HOUR_IN_DAY = 24
  export const random = new Random(Date.now())
  export const MAX_SEED_VALUE = 1e4
  export const DIVIDE_TEN_THOUSAND = 1
  export const DIVIDE_THOUSAND = 2

  export function getTime() {
    return new Date().getTime()
  }

  export function manageStringU(s: string, s2: string) {
    return s + s2
  }

  export function isBit(t: number, e: number) {
    return (e & t) !== 0
  }

  export function setBit(t: boolean, e: number, n: number) {
    t ? (n |= e) : (n &= ~e)
    return n
  }

  export function convertLastLinefeed(t: string) {
    if (t === null || t === '')
      return t
    for (let e = t.substring(t.length - 1); e === '\n';) {
      t = t.substring(0, t.length - 1)
      e = t.substring(t.length - 1)
    }
    return t
  }

  export function sumValue(t: number, e: number, n: number, i: number) {
    let o = t + e
    n > o && (o = n)
    o > i && (o = i)
    return Math.floor(o)
  }

  export function arraycopy(t, e, n, i, o) {
    for (let a = 0; o > a; a++) n[i + a] = t[e + a]
  }

  export function randByRange(e) {
    return e === 0 ? 0 : Math.abs(random.nextInt() % e)
  }

  export function setKeyXY(t: number, e: number) {
    return (65535 & t) | ((65535 & e) << 16)
  }

  export function getXKey(e: number) {
    const n = int2Short(65535 & e)
    return n
  }

  export function getYKey(e: number) {
    const n = int2Short((e >> 16) & 65535)
    return n
  }

  export function int2Short(t: number) {
    const e = new egret.ByteArray()
    e.writeShort(t)
    e.position = 0
    return e.readShort()
  }

  export function isArrayIndexOutOfBounds(len: number, arr?: unknown[]) {
    if (isUndefinedOrNull(arr))
      return true
    const n = arr.length
    return !!(len < 0 || len >= n)
  }

}
