import { ByteArray, EventEmitter, clone, skip } from '@terminal/kit'
import { Emitter } from '@livemoe/utils'
import { Protocol } from '.'

export class WebSocketClient {
  private host!: string
  private port!: number
  private socket!: globalThis.WebSocket
  private emitter = new EventEmitter<Protocol>()
  private buffer = new ByteArray()

  private _onSocketData = new Emitter<Protocol>()
  private _onSocketClose = new Emitter<number>()
  private _onSocketError = new Emitter<Event>()

  readonly onSocketDataEvent = this._onSocketData.event
  readonly onSocketCloseEvent = this._onSocketClose.event
  readonly onSocketErrorEvent = this._onSocketError.event

  static form(host: string, port: number, ssl?: boolean): WebSocketClient
  static form(url: string): WebSocketClient
  static form(hostOrUrl: string, port?: number, ssl = false) {
    const client = new WebSocketClient()
    if (!port)
      client.connect(hostOrUrl)
    else
      client.connect(hostOrUrl, port!, ssl)
    return client
  }

  private connect(host: string, port: number, ssl?: boolean): void
  private connect(url: string): void
  private connect(hostOrUrl: string, port?: number, ssl = false) {
    let url!: string
    if (!port) {
      const e = /(wss?):\/\/(.*):(\d*)/.exec(hostOrUrl)
      if (!e)
        throw new Error(`Invalid websocket url: ${hostOrUrl}`)
      const [protocol, host, port] = skip(e, 1)
      if (!protocol || !host || !port)
        throw new Error(`Invalid websocket url: ${hostOrUrl}`)
      url = `${protocol}://${host}:${port}`
      this.host = hostOrUrl
      this.port = +port
    }
    else {
      url = `ws${ssl ? 's' : ''}://${this.host}:${this.port}`
      this.host = hostOrUrl
      this.port = port
    }

    this.socket = new window.WebSocket(url)
    this.socket.binaryType = 'arraybuffer'
    this.socket.addEventListener('open', (e) => {
      this.emitter.emit('open', e as any)
    })
    this.socket.addEventListener('message', (e: MessageEvent<ArrayBuffer>) => {
      const buffer = new ByteArray()
      this.buffer.position = 0
      if (this.buffer.bytesAvailable > 0) {
        buffer.writeBytes(this.buffer)
        this.buffer.clear()
      }
      buffer._writeUint8Array(new Uint8Array(e.data))
      buffer.position = 0

      if (buffer.bytesAvailable < 2)
        this.buffer.writeBytes(buffer)

      // buffer length
      const length = buffer.readShort()

      if (buffer.length !== length) {
        buffer.position = 0
        this.buffer.writeBytes(buffer)
      }

      const type = buffer.readShort()

      buffer.position = 0
      const protocol = Protocol.form(buffer)
      this.emitter.emit(type, protocol)
      this._onSocketData.fire(clone(protocol))
    })
    this.socket.addEventListener('close', (e) => {
      this.emitter.emit('close', e as any)
    })
    this.socket.addEventListener('error', (e) => {
      this.emitter.emit('error', e as any)
    })
  }

  async send(protocol: Protocol): Promise<Protocol>
  async send(protocol: Protocol, callback: (protocol: Protocol) => void): Promise<void>
  async send(protocol: Protocol, callback?: (protocol: Protocol) => void) {
    const type = protocol.getType()

    const buffer = protocol.reposition().protocol
    // nexttick
    setTimeout(() => this.rawSocketSend(buffer.buffer))

    if (callback) {
      return this.pickSocketDataEvent(protocol.type)
        .then(protocol => callback(protocol))
        .catch(() => { /* ignore */ })
    }

    return this.pickSocketDataEvent(type)
  }

  addProtocolListener(type: number): Promise<Protocol>
  addProtocolListener(type: number, callback: (protocol: Protocol) => void): void
  addProtocolListener(type: number, callback?: (protocol: Protocol) => void) {
    if (callback)
      this.emitter.on(type, callback)
    return new Promise<Protocol>((resolve) => {
      const result = this.onSocketDataEvent((protocol) => {
        if (protocol.getType() === type) {
          result.dispose()
          resolve(protocol)
        }
      })
    })
  }

  removeProtocolListener(type: number, callback?: (protocol: Protocol) => void) {
    this.emitter.remove(type, callback)
  }

  private pickSocketDataEvent(type: number) {
    return new Promise<Protocol>((resolve) => {
      const disposable = this.onSocketDataEvent((e) => {
        if (e.getType() === type) {
          disposable.dispose()
          resolve(e)
        }
      })
    })
  }

  private rawSocketSend(data: string | ArrayBuffer) {
    if (this.socket.readyState === this.socket.OPEN)
      this.socket.send(data)
  }

  close(code?: number | undefined, reason?: string | undefined) {
    this.socket.close(code, reason)
  }
}
