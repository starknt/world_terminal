import { ByteArray, EventEmitter, Protocol } from '@terminal/core'
import { clone, skip } from '@terminal/kit'
import { Emitter } from '@livemoe/utils'
import type { ProtocolType } from '@terminal/models'

export type WebSocketEvents = {
  [key in ProtocolType]: Protocol
} & {
  open: void
  close: Event
  error: Event
  data: Protocol
}

export class WebSocket extends EventEmitter<WebSocketEvents> {
  private host!: string
  private port!: number
  private socket!: globalThis.WebSocket
  private buffer = new ByteArray()

  private pendingProtocols: Array<ArrayBuffer | string> = []

  private _onSocketData = new Emitter<Protocol>()
  private _onSocketClose = new Emitter<number>()
  private _onSocketError = new Emitter<Event>()

  readonly onSocketDataEvent = this._onSocketData.event
  readonly onSocketCloseEvent = this._onSocketClose.event
  readonly onSocketErrorEvent = this._onSocketError.event

  static from(host: string, port: number, ssl?: boolean): WebSocket
  static from(url: string): WebSocket
  static from(hostOrUrl: string, port?: number, ssl = false) {
    const client = new WebSocket()
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
      const e = hostOrUrl.match(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)
      if (!e)
        throw new Error(`Invalid websocket url: ${hostOrUrl}`)
      const [protocol, _, host, port, pathname, query, hash] = skip(e, 1)
      if (!protocol || !host)
        throw new Error(`Invalid websocket url: ${hostOrUrl}`)
      url = `${protocol}://${host}${port ? `:${+port}` : ''}${pathname ? `/${pathname}` : ''}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
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
      for (const p of this.pendingProtocols)
        this.rawSocketSend(p)

      this.emit('open', e as any)
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
      const protocol = Protocol.from(buffer)
      this.emit(type, protocol)
      this._onSocketData.fire(clone(protocol))
    })
    this.socket.addEventListener('close', (e) => {
      this.emit('close', e)
      this._onSocketClose.fire(e.code)
    })
    this.socket.addEventListener('error', (e) => {
      this.emit('error', e)
      this._onSocketError.fire(e)
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

  addProtocolListener(type: ProtocolType): Promise<Protocol>
  addProtocolListener(type: ProtocolType, callback: (protocol: Protocol) => void): void
  addProtocolListener(type: ProtocolType, callback?: (protocol: Protocol) => void) {
    if (callback)
      this.on(type, callback)
    return new Promise<Protocol>((resolve) => {
      const result = this.onSocketDataEvent((protocol) => {
        if (protocol.getType() === type) {
          result.dispose()
          resolve(protocol)
        }
      })
    })
  }

  private pickSocketDataEvent(type: ProtocolType) {
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
    if (this.socket.readyState < this.socket.OPEN) {
      this.pendingProtocols.push(data)
      return
    }

    if (this.socket.readyState === this.socket.OPEN)
      this.socket.send(data)
  }

  close(code?: number | undefined, reason?: string | undefined) {
    this.socket.close(code, reason)
  }
}
