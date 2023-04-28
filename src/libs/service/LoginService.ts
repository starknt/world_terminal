import { Emitter } from '@livemoe/utils'
import { LoginApiClient } from 'libs/api'
import { Long, Protocol } from 'libs/base/protocol'
import { SocketClient } from 'libs/base/socket'
import type { Version } from 'libs/shared/version'
import { ServerInfo } from 'libs/typings/ServerInfo'
import type { LoginSuccessResult } from 'libs/typings/type'
import { $Logger } from '~/logger'

export class LoginService {
  private isConnectLoginServer = false
  private loginMsg: Protocol | null = null
  private uKey!: Long
  private sessionId!: number
  private photoIp!: string
  private loginSetting!: number
  private version: Version | null = null

  private socket = new SocketClient()
  readonly client = new LoginApiClient(this.socket)

  private readonly _onLoginSuccess = new Emitter<LoginSuccessResult>()
  private readonly _onLoginError = new Emitter<void>()

  readonly onLoginSuccess = this._onLoginSuccess.event
  readonly onLoginError = this._onLoginError.event
  private gameAreaList: ServerInfo[] = []

  async login(username: string, password: string, version: Version) {
    switch (version.name) {
      case '官方':
        this.loginMsg = Protocol.createUserLoginMsg(username, password)
        break
      default:
        this.loginMsg = Protocol.createUserLoginMsg(username, 'chrome')
        break
    }

    this.version = version

    if (!this.isConnectLoginServer) {
      await this.socket.connect(version.loginWebsocketUrl)

      $Logger.log('Login Server connected')

      this.isConnectLoginServer = true

      await this.client.checkServerVersion(this.version)
      this.socket.send(this.loginMsg, this.onLogin, this)
    }
  }

  private async requestAreaLines() {
    const res = await this.client.getAreaLinesServer()
    this.gameAreaList = res.data!
    this.gameAreaList = this.gameAreaList.sort((a, b) => b.state - a.state)

    this._onLoginSuccess.fire({
      uKey: this.uKey,
      sessionId: this.sessionId,
      photoIp: this.photoIp,
      loginSetting: this.loginSetting,
      gameAreaServerList: this.gameAreaList
    })
  }

  private onLogin(bytes: Protocol) {
    const e = bytes.getByte()
    if (e === -22)
      return window.$message.error('平台登录出错,请重新登录！', { closable: true, duration: 10e3 })
    if (e !== 0)
      $Logger.log('Login Error', bytes.getString())

    this.uKey = bytes.getLong()
    this.sessionId = bytes.getUnsignedInt()
    this.photoIp = bytes.getString()
    this.loginSetting = bytes.getInt()

    this.requestAreaLines()
  }

  close() {
    this.isConnectLoginServer = false
    this.socket.close()
  }
}
