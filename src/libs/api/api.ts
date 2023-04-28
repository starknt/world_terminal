import type { nato } from 'libs/base/nato'
import type { SocketClient } from 'libs/base/socket'
import type { ApiClientResponse } from '~/types'

export abstract class ApiClient {
  constructor(protected readonly socket: SocketClient) { }

  protected async makeRequest(message: nato.Message) {
    return await this.socket.sendCmd(message)
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
