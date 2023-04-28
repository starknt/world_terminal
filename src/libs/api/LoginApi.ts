import { Protocol } from 'libs/base/protocol'
import type { Version } from 'libs/shared/version'
import { ServerInfo } from 'libs/typings/ServerInfo'
import { IApiClientResponse } from '~/types'
import { ApiClient } from './api'

export class LoginApiClient extends ApiClient {
  async registerAccount(username: string, password: string): IApiClientResponse {
    const message = Protocol.createUserRegisterMsg(username, password)
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async getAreaLinesServer(): IApiClientResponse<ServerInfo[]> {
    const message = Protocol.createAreaLineListMsg()
    const bytes = await this.socket.send(message)
    const areaList: ServerInfo[] = []
    for (let e = bytes.getByte(), n = 0; e > n; n++) {
      for (let info = ServerInfo.fromAreaBytes(bytes), o = bytes.getByte(), a = 0; o > a; a++) {
        const line = ServerInfo.fromLineBytes(bytes)
        info.addLine(line)
        areaList.push(info)
        if (info.actorCount > 0)
          info.logon = true
      }
    }

    return this.makeResponse(0, areaList)
  }

  async checkServerVersion(version: Version): IApiClientResponse {
    const message = Protocol.createCheckEditionMsg(version.channel, version.xgameid)
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    switch (code) {
      case 1:
        bytes.getString()
        return this.makeResponse(code, bytes.getString())
      case 2:
        return this.makeResponse(code, bytes.getString())
    }

    return this.makeResponse(code, bytes)
  }
}
