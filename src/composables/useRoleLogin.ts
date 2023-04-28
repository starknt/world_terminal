import type { GameService } from 'libs/service/GameService'
import type { RoleInfo } from 'libs/typings/RoleInfo'
import type { ReactiveVariable } from 'vue/macros'

export function useRoleLogin(service: GameService | ReactiveVariable<GameService>, role: RoleInfo) {
  service = toRaw(service)

  return new Promise((resolve, reject) => {
    const ret = service.onRoleLoginEvent((player) => {
      ret.dispose()
      resolve(player)
    })

    service.roleLogin(role)
  })
}
