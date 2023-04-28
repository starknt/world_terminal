import { Protocol } from 'libs/base/protocol'
import type { SocketClient } from 'libs/base/socket'
import type { ApiClientResponse } from '~/types'

export abstract class ApiClient {
  constructor(protected readonly socket: SocketClient) { }

  protected async makeRequest(message: Protocol) {
    return await this.socket.send(message)
  }

  protected makeResponse<T>(code: number, data: string): ApiClientResponse<T>
  protected makeResponse<T>(code: number, data: T): ApiClientResponse<T>
  protected makeResponse<T>(code: number, data?: T | string): ApiClientResponse<T> {
    if (typeof data === 'string') {
      return {
        code,
        error: data,
      }
    }

    return {
      code,
      data,
    }
  }
}
