import type { ByteArray } from './egret'

export class Long {
  private sign = 1

  constructor(public high: number, public low: number) {
    if ((2147483648 & this.high) !== 0) {
      this.high = 4294967295 - this.high
      this.low = 4294967295 - this.low
      this.sign = -1
    }
  }

  toString(): string {
    const t = this.sign === 1 ? '' : '-'
    return `${t + this.high.toString()}-${this.low.toString()}`
  }

  get value() {
    return this.sign * (4294967296 * this.high + this.low)
  }

  static formStr(value: string): Long {
    const e = value.split('-')
    const high = parseInt(e[0])
    const low = parseInt(e[1])
    return new Long(high, low)
  }
}

export class Bytes {
  private _data: ByteArray
  private _size = 0

  constructor(size: number, data: ByteArray) {
    this._size = size
    this._data = data
  }

  get size(): number {
    return this._size
  }

  get data(): ByteArray {
    return this._data
  }
}
