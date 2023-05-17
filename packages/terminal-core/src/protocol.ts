import { Bytes, Long } from './datastruct'
import { ByteArray } from './egret'

export interface IProtocol {
  setUnsignedByte(value: number): this
  getUnsignedByte(): number

  setByte(value: number): this
  getByte(): number

  setShort(value: number): this
  getShort(): number

  setUnsignedShort(value: number): this
  getunsignedShort(): number

  setInt(value: number): this
  getInt(): number

  setUnsignedInt(value: number): this
  getUnsignedInt(): number

  setLong(value: Long): this
  getLong(): Long
  setLongByInt(value: number): this
  getLongToInt(): number

  setString(value: string): this
  getString(): string

  setFloat(value: number): this
  getFloat(): number

  setBytes(value?: ByteArray): this
  getBytes(): ByteArray

  setLengthBytes(value: Bytes): this
  getLengthBytes(): Bytes

  setBoolean(value: boolean): this
  getBoolean(): boolean

  getType(): number
  setType(value: number): this
  get type(): number
  set type(value: number)

  get position(): number
  set position(value: number)
  reposition(): this

  getData(): ByteArray
  setData(value: ByteArray): this
  get data(): ByteArray
  set data(value: ByteArray)

  get dataView(): DataView

  clone(): Protocol

  get length(): number
  // 发送给服务器的协议
  get protocol(): ByteArray

  getByteArrayByPosition(): ByteArray
}

export class Protocol implements IProtocol {
  constructor(private _type: number, private _data: ByteArray = new ByteArray(), position?: number) {
    _data.position = position ?? 0
  }

  setUnsignedByte(value: number) {
    this.data.writeByte(value & 0xFF)
    return this
  }

  getUnsignedByte(): number {
    return this.data.readUnsignedByte()
  }

  setByte(value: number) {
    this.data.writeByte(value)
    return this
  }

  getByte(): number {
    return this.data.readByte()
  }

  setBoolean(value: boolean) {
    this.data.writeBoolean(value)
    return this
  }

  getBoolean(): boolean {
    return this.data.readBoolean()
  }

  setShort(value: number) {
    this.data.writeShort(value)
    return this
  }

  getShort(): number {
    return this.data.readShort()
  }

  setUnsignedShort(value: number) {
    this.data.writeUnsignedShort(value)
    return this
  }

  getunsignedShort(): number {
    return this.data.readUnsignedShort()
  }

  getInt(): number {
    return this.data.readInt()
  }

  setInt(value: number) {
    this.data.writeInt(value)
    return this
  }

  getUnsignedInt(): number {
    return this.data.readUnsignedInt()
  }

  setUnsignedInt(value: number) {
    this.data.writeUnsignedInt(value)
    return this
  }

  setLong(value: Long) {
    this.setInt(value.high)
    this.setInt(value.low)
    return this
  }

  getLong(): Long {
    return new Long(this.getInt() >>> 0, this.getInt() >>> 0)
  }

  setLongByInt(value: number) {
    const high = (value / 4294967296) >>> 0
    const low = value % 4294967296 >>> 0
    this.setInt(high)
    this.setInt(low)
    return this
  }

  getLongToInt(): number {
    const high = this.getInt() >>> 0
    const low = this.getInt() >>> 0
    return 4294967296 * high + low
  }

  setString(value = '') {
    this.data.writeUTF(value)
    return this
  }

  getString(): string {
    return this.data.readUTF()
  }

  setFloat(value: number) {
    this.data.writeFloat(value)
    return this
  }

  getFloat(): number {
    return this.data.readFloat()
  }

  setBytes(value?: ByteArray) {
    if (!value)
      return this.setShort(0)

    this.setBytesLength(value.length)
    value.position = 0

    this.data.writeBytes(value)
    return this
  }

  getBytes(): ByteArray {
    const length = this.getBytesLength()
    const bytes = new ByteArray()
    for (let i = 0; i < length; i++)
      bytes.writeByte(this.getByte())
    bytes.position = 0
    return bytes
  }

  getByteArrayByPosition() {
    return this.clone(this.position).data
  }

  setLengthBytes(value: Bytes) {
    throw new Error('Method not implemented.')
    return this
  }

  private getBytesLength(): number {
    const high = 0xFF & this.getByte()
    const low = 0xFF & this.getByte()
    return (high << 8) + low
  }

  private setBytesLength(bytesLength: number) {
    const e = (bytesLength >>> 8) & 0xFF
    const n = bytesLength & 0xFF
    this.data.writeByte(e)
    this.data.writeByte(n)
  }

  getLengthBytes(): Bytes {
    return new Bytes(this.getBytesLength(), this.data)
  }

  getType(): number {
    return this.type
  }

  setType(value: number) {
    this.type = value
    return this
  }

  get type(): number {
    return this._type
  }

  set type(value: number) {
    this._type = value
  }

  get position(): number {
    return this.data.position
  }

  set position(value: number) {
    this._data.position = value
  }

  reposition() {
    this.position = 0
    return this
  }

  getData(): ByteArray {
    return this.data
  }

  setData(value: ByteArray): this {
    this.data = value
    return this
  }

  get data(): ByteArray {
    return this._data
  }

  set data(value: ByteArray) {
    this._data = value
    this.position = value.position
  }

  get dataView() {
    return this.data.dataView
  }

  // 不是 protocol 最终长度
  get length(): number {
    return this._data.length
  }

  get protocol(): ByteArray {
    const protocolLength = 4 + this.length
    const protocol = new ByteArray()
    protocol.writeShort(protocolLength)
    protocol.writeShort(this.type)
    protocol.writeBytes(this.data)
    return protocol
  }

  clone(position?: number): Protocol {
    return new Protocol(this._type, this._data, position || this.position)
  }

  static from(data: ArrayBuffer | ByteArray | Protocol) {
    if (data instanceof Protocol)
      return data

    const buffer = new ByteArray('buffer' in data ? data.buffer : data)
    const _ = buffer.readShort()
    const type = buffer.readShort()

    return new Protocol(type, new ByteArray(buffer.buffer.slice(4)))
  }
}

export function compatByteArray(p: Protocol | ByteArray) {
  if (p instanceof ByteArray)
    return p

  return p.getByteArrayByPosition()
}
