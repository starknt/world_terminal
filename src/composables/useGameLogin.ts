import type { Long } from 'libs/base/protocol'
import { GameService } from 'libs/service/GameService'
import type { ServerInfo } from 'libs/typings/ServerInfo'
import type { RoleLoadedResult } from 'libs/typings/type'

export function useGameLogin(key: Long, sessionId: number, server: ServerInfo): Promise<[GameService, RoleLoadedResult]> {
  return new Promise((resolve, reject) => {
    const service = new GameService()

    service.onRoleLoadedEvent((e) => {
      resolve([service, e])
    })

    service.connectGameServer(key, sessionId, server)
  })
}
