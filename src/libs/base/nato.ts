import type { ProtocolDefine } from 'libs/defined/protocol'

export namespace nato {
  export class Long {
    sign = 1

    constructor(public high: number, public low: number) {
      if ((2147483648 & this.high) !== 0) {
        this.high = 4294967295 - this.high
        this.low = 4294967295 - this.low
        this.sign = -1
      }
    }

    get string(): string {
      const t = this.sign === 1 ? '' : '-'
      return `${t + this.high.toString()}-${this.low.toString()}`
    }

    get value() {
      return this.sign * (4294967296 * this.high + this.low)
    }

    static tolong(value: string): Long {
      const e = value.split('-')
      const high = parseInt(e[0])
      const low = parseInt(e[1])
      return new Long(high, low)
    }
  }

  export class Message {
    private data!: egret.ByteArray
    private type!: ProtocolDefine

    constructor(type: ProtocolDefine, data: egret.ByteArray = new egret.ByteArray(), position?: number) {
      this.type = 0
      this.init(type, data, position)
    }

    clone() {
      const _pos = this.position

      const type = this.type
      const data = new Uint8Array(this.data.buffer)
      const position = 0
      this.position = _pos

      return new Message(type, new egret.ByteArray(data), position)
    }

    private init(type: ProtocolDefine, data: egret.ByteArray, position?: number): void {
      this.type = type
      this.data = data
      if (position === 0)
        this.data.position = 0
    }

    dataView() {
      return this.data.dataView
    }

    getData(): egret.ByteArray {
      return this.data
    }

    reposition(): void {
      this.data.position = 0
    }

    get position(): number {
      return this.data.position
    }

    set position(value: number) {
      this.data.position = value
    }

    putBoolean(value: boolean): void {
      this.data.writeBoolean(value)
    }

    getBoolean(): boolean {
      return this.data.readBoolean()
    }

    putByte(value: number): void {
      this.data.writeByte(value)
    }

    getByte(): number {
      return this.data.readByte()
    }

    getUnsignedByte(): number {
      return this.data.readUnsignedByte()
    }

    putBytes(value?: egret.ByteArray): void {
      if (!value) {
        this.putShort(0)
        return
      }
      this.putLength(value.length)
      value.position = 0
      for (let e = 0, n = value.length; n > e; e++)
        this.putByte(value.readByte())
    }

    getBytes(): egret.ByteArray {
      const length = this.getLength()
      const bytes = new egret.ByteArray()
      for (let e = 0, n = length; n > e; e++)
        bytes.writeByte(this.getByte())
      bytes.position = 0
      return bytes
    }

    getXytes() {
      const length = this.getLength()
      const bytes = new Bytes(length, this.data)

      return bytes
    }

    putLength(value: number): void {
      const e = (value >>> 8) & 0xFF
      const n = value & 0xFF
      this.data.writeByte(e)
      this.data.writeByte(n)
    }

    getLength(): number {
      const t = 0xFF & this.data.readByte()
      const e = 0xFF & this.data.readByte()
      return (t << 8) + e
    }

    putShort(value: number): void {
      this.data.writeShort(value)
    }

    getShort(): number {
      return this.data.readShort()
    }

    getUnsignedShort(): number {
      return this.data.readUnsignedShort()
    }

    putInt(value: number): void {
      this.data.writeInt(value)
    }

    getInt(): number {
      return this.data.readInt()
    }

    getUnsignedInt(): number {
      return this.data.readUnsignedInt()
    }

    putLong(value: Long): void {
      this.putInt(value.high)
      this.putInt(value.low)
    }

    getLong(): Long {
      const t = this.getInt() >>> 0
      const e = this.getInt() >>> 0

      return new Long(t, e)
    }

    putLongInt(value: number) {
      const e = (value / 4294967296) >>> 0
      const n = value % 4294967296 >>> 0
      this.putInt(e)
      this.putInt(n)
    }

    getLongInt(): number {
      const t = this.getInt() >>> 0
      const e = this.getInt() >>> 0
      return 4294967296 * t + e
    }

    putFloat(value: number): void {
      this.data.writeFloat(value)
    }

    putString(value?: string): void {
      if (!value)
        value = ''
      this.data.writeUTF(value)
    }

    getString(): string {
      return this.data.readUTF()
    }

    getType() {
      return this.type
    }

    setType(value: number): void {
      this.type = value
    }

    getDataBytes(): egret.ByteArray | null {
      const t = 4
      const e = this.data.length + t
      const n = new egret.ByteArray()
      if (e > 65535 || this.type > 65535)
        return null
      n.writeShort(e)
      n.writeShort(this.type)
      n.writeBytes(this.data)
      return n
    }
  }

  class Bytes {
    private _data: egret.ByteArray
    private _size = 0

    constructor(size: number, data: egret.ByteArray) {
      this._size = size
      this._data = data
    }

    get size(): number {
      return this._size
    }

    get data(): egret.ByteArray {
      return this._data
    }
  }
}
