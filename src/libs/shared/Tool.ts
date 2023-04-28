import { Random } from 'libs/service/Battle/random'

export namespace Tool {
  export function getTime() {
    const t = new Date()
    return t.getTime()
  }

  export function manageStringU(s, s2) {
    return s + s2
  }

  export function isBit(t, e) {
    return (e & t) != 0
  }

  export function setBit(t, e, n) {
    return t ? (n |= e) : (n &= ~e), n
  }

  export function convertLastLinefeed(t) {
    if (t == null || t == '')
      return t
    for (let e = t.substring(t.length - 1); e == '\n';)
      (t = t.substring(0, t.length - 1)), (e = t.substring(t.length - 1))
    return t
  }

  export function sumValue(t, e, n, i) {
    let o = t + e
    return n > o && (o = n), o > i && (o = i), Math.floor(o)
  }

  export function arraycopy(t, e, n, i, o) {
    for (let a = 0; o > a; a++) n[i + a] = t[e + a]
  }

  export function randByRange(e) {
    return e == 0 ? 0 : Math.abs(random.nextInt() % e)
  }

  export function setKeyXY(t, e) {
    return (65535 & t) | ((65535 & e) << 16)
  }

  export function getXKey(e) {
    const n = int2Short(65535 & e)
    return n
  }

  export function getYKey(e) {
    const n = int2Short((e >> 16) & 65535)
    return n
  }

  export function int2Short(t) {
    const e = new egret.ByteArray()
    return e.writeShort(t), (e.position = 0), e.readShort()
  }

  export function isArrayIndexOutOfBounds(t, e) {
    if (e == null)
      return true
    const n = e.length
    return !!(t < 0 || t >= n)
  }

  export const MAX_VALUE_int = 2147483647
  export const MAX_VALUE_short = 32767
  export const MAX_VALUE_byte = 127
  export const MILLIS_IN_SECOND = 1e3
  export const MILLIS_IN_MINUTE = 60 * Tool.MILLIS_IN_SECOND
  export const MILLIS_IN_HOUR = 60 * Tool.MILLIS_IN_MINUTE
  export const MILLIS_IN_DAY = 24 * Tool.MILLIS_IN_HOUR
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
}
