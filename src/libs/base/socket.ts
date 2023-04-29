import type { IDisposable } from '@livemoe/utils'
import { Emitter, Event as VSEvent } from '@livemoe/utils'
import EventEmitter from 'eventemitter3'
import type { CommandCallback, WebSocketCloseEventCallback, WebSocketConnectEventCallback, WebSocketDataEventCallback, WebSocketErrorEventCallback } from 'libs/typings/type'
import type { ProtocolCmd } from './protocol'
import { Protocol } from './protocol'
import { $Logger } from '~/logger'

const $Log = $Logger.create('Socket').log

class HTML5WebSocket {
  private host = ''
  private port = 0
  private socket?: WebSocket
  private onSocketConnect?: WebSocketConnectEventCallback
  private onSocketData?: WebSocketDataEventCallback
  private onSocketClose?: WebSocketCloseEventCallback
  private onSocketError?: WebSocketErrorEventCallback
  private bind?: any

  constructor(
    onSocketConnect: WebSocketConnectEventCallback,
    onSocketData: WebSocketDataEventCallback,
    onSocketClose: WebSocketCloseEventCallback,
    onSocketError: WebSocketErrorEventCallback,
    bind: any,
  ) {
    this.bind = bind

    this.onSocketConnect = onSocketConnect.bind(this.bind)
    this.onSocketData = onSocketData.bind(this.bind)
    this.onSocketClose = onSocketClose.bind(this.bind)
    this.onSocketError = onSocketError.bind(this.bind)
  }

  connect(host: string, port: number, ssl = false) {
    this.host = host
    this.port = port
    const url = `ws${ssl ? 's' : ''}://${this.host}:${this.port}`

    this.socket = new WebSocket(url)
    this.socket.binaryType = 'arraybuffer'
    this.bindEvent()
  }

  connectByUrl(url: string | URL) {
    this.socket = new WebSocket(url)
    this.socket.binaryType = 'arraybuffer'
    this.bindEvent()
  }

  private bindEvent() {
    this.socket?.addEventListener('open', (e) => {
      this.onSocketConnect?.(e)
    })

    this.socket?.addEventListener('message', (e) => {
      this.onSocketData?.(e)
    })

    this.socket?.addEventListener('close', (e) => {
      this.onSocketClose?.(e)
    })

    this.socket?.addEventListener('error', (e) => {
      this.onSocketError?.(e)
    })
  }

  send(data: string | ArrayBuffer) {
    this.socket?.send(data)
  }

  close() {
    this.socket?.close()
  }

  get connecting() {
    return this.socket && this.socket?.readyState === this.socket?.CONNECTING
  }
}

class WebSocketClient {
  private connected = false
  private connecting = false
  private socket: HTML5WebSocket
  private writeBuffer: egret.ByteArray
  private readBuffer: egret.ByteArray

  private _onSocketConnect = new Emitter<Event>()
  private _onSocketClosed = new Emitter<CloseEvent>()
  private _onSocketError = new Emitter<Event>()
  private _onSocketData = new Emitter<Protocol>()

  readonly onSocketConnectedEvent = this._onSocketConnect.event
  readonly onSocketClosedEvent = this._onSocketClosed.event
  readonly onSocketErrorEvent = this._onSocketError.event
  readonly onSocketDataEvent = this._onSocketData.event

  constructor() {
    this.socket = new HTML5WebSocket(
      this.onSocketConnect,
      this.onSocketData,
      this.onSocketClose,
      this.onSocketError,
      this,
    )

    this.connected = false
    this.connecting = false
    this.writeBuffer = new egret.ByteArray()
    this.readBuffer = new egret.ByteArray()
  }

  whenSocketConnected() {
    if (this.connected)
      return Promise.resolve()

    return VSEvent.toPromise(this.onSocketConnectedEvent)
  }

  connect(host: string, port: number, ssl = false) {
    if (!this.connecting && !this.connected) {
      this.connecting = true
      this.socket.connect(host, port, ssl)
    }
  }

  connectByUrl(url: string | URL) {
    if (!this.connecting && !this.connected) {
      this.connecting = true
      this.socket.connectByUrl(url)
    }
  }

  close() {
    if (this.connected)
      this.socket.close()
  }

  private flush() {
    if (!this.connected) {
      $Log('Please connect Socket firstly')
      return
    }

    this.socket.send(this.writeBuffer.buffer)
    this.writeBuffer.clear()
  }

  writeUTF(data: string) {
    if (!this.connected) {
      $Log('Please connect Socket firstly')
      return
    }

    this.writeBuffer.writeUTF(data)

    this.flush()
  }

  readUTF() {
    const message: string = this.readBuffer.readUTF()
    this.readBuffer.position = 0
    this.readBuffer.clear()

    return message
  }

  writeBytes(bytes: egret.ByteArray, offset = 0, length = 0) {
    if (!this.connected) {
      $Log('Please connect Socket firstly')
      return
    }

    this.writeBuffer.writeBytes(bytes, offset, length)
    this.flush()
  }

  readBytes(bytes: egret.ByteArray, offset = 0, length = 0) {
    this.readBuffer.position = 0
    this.readBuffer.readBytes(bytes, offset, length)
    this.readBuffer.clear()
  }

  private onSocketConnect(e: Event) {
    this.connecting = false
    this.connected = true

    this._onSocketConnect.fire(e)
  }

  private onSocketData(e: MessageEvent<ArrayBuffer>) {
    $Log('SocketData', e.data)

    const buffer = new egret.ByteArray()
    this.readBuffer.position = 0
    if (this.readBuffer.bytesAvailable > 0) {
      buffer.writeBytes(this.readBuffer)
      this.readBuffer.clear()
    }

    buffer._writeUint8Array(new Uint8Array(e.data))
    buffer.position = 0

    if (buffer.bytesAvailable < 2) {
      this.readBuffer.writeBytes(buffer)

      return
    }

    // buffer length
    const length = buffer.readShort()

    $Log('Buffer Length', length)

    if (buffer.length !== length) {
      buffer.position = 0
      this.readBuffer.writeBytes(buffer)
      return
    }

    const protocol = buffer.readShort()

    $Log('Socket Protocol', protocol)

    buffer.position = 4
    this._onSocketData.fire(
      new Protocol(protocol, buffer),
    )
  }

  private onSocketClose(e: CloseEvent) {
    this.connected = false
    this._onSocketClosed.fire(e)
  }

  private onSocketError(e: Event) {
    this.connecting = false
    this._onSocketError.fire(e)
  }
}

export class SocketClient implements IDisposable {
  private client: WebSocketClient
  private eventEmitter: EventEmitter<`${ProtocolCmd}`, Protocol>
  private eventStoreDispose: IDisposable
  private startOnlineTime = 0
  private endOnlineTime = 0

  private _onSocketClose = new Emitter<number>()
  private _onSocketError = new Emitter<Event>()

  readonly onSocketCloseEvent = this._onSocketClose.event
  readonly onSocketErrorEvent = this._onSocketError.event

  constructor() {
    this.client = new WebSocketClient()
    this.eventEmitter = new EventEmitter()

    this.eventStoreDispose = this.client.onSocketDataEvent((message) => {
      $Log(`EventEmitter: emit protocol ${message.getType()}`, 'content: ', message)
      const _msg = message.clone()
      _msg.position = 4 // skip `type`
      this.eventEmitter.emit(`${message.getType()}`, _msg)
    })

    this.client.onSocketClosedEvent(() => {
      this.endOnlineTime = Date.now()
      const onlineTime = this.endOnlineTime - this.startOnlineTime
      this.startOnlineTime = this.endOnlineTime

      this._onSocketClose.fire(onlineTime)
    })

    this.client.onSocketErrorEvent((e) => {
      this._onSocketError.fire(e)
    })
  }

  async connect(url: string) {
    this.startOnlineTime = Date.now()

    this.client.connectByUrl(url)

    return await VSEvent.toPromise(this.client.onSocketConnectedEvent)
  }

  async close() {
    this.client.close()

    this.endOnlineTime = Date.now()

    return await VSEvent.toPromise(this.client.onSocketClosedEvent)
  }

  send(protocol: Protocol, callback: CommandCallback, thisArg?: any): void
  send(protocol: Protocol): Promise<Protocol>
  async send(protocol: Protocol, callback?: CommandCallback, thisArg?: any) {
    await this.client.whenSocketConnected()
    const type = protocol.getType()

    const bytes = protocol.protocol
    if (bytes) {
      bytes.position = 0
      this.client.writeBytes(bytes)
    }

    if (callback) {
      this.pickSocketDataEvent(protocol.type)
        .then(e => callback.call(thisArg, e))

      return
    }

    return await this.pickSocketDataEvent(type)
  }

  addProtocol(protocol: ProtocolCmd, callback: CommandCallback, thisArg?: any): void
  addProtocol(protocol: ProtocolCmd): Promise<Protocol>
  addProtocol(protocol: ProtocolCmd, callback?: CommandCallback, thisArg?: any) {
    if (callback) {
      this.eventEmitter.on(`${protocol}`, callback, thisArg)

      return
    }

    return new Promise<Protocol>((resolve) => {
      const result = this.client.onSocketDataEvent((message) => {
        const _msg = message.clone()
        _msg.position = 4
        if (message.getType() === protocol) {
          result.dispose()
          resolve(_msg)
        }
      })
    })
  }

  removeProtocol(protocol: ProtocolCmd, callback?: CommandCallback, thisArg?: any) {
    this.eventEmitter.removeListener(`${protocol}`, callback, thisArg)
  }

  private pickSocketDataEvent(type: ProtocolCmd) {
    return new Promise<Protocol>((resolve) => {
      const disposable = this.client.onSocketDataEvent((e) => {
        if (e.getType() === type) {
          disposable.dispose()
          e.position = 4 // skip `type`
          resolve(e)
        }
      })
    })
  }

  dispose(): void {
    this._onSocketError.dispose()
    this._onSocketClose.dispose()
    this.eventStoreDispose.dispose()
    this.close()
  }
}
