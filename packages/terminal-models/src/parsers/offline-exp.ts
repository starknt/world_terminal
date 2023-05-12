import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'

export class OfflineExp {
  nextLv = -1
  nextBattleExp = -1
  nextTaskExp = -1
  nextHpRecover = -1
  nextMpRecover = -1
  nextMaxStoreMinutes = -1
  nextItemCount = -1
  lv = 0
  offlineTime = 0
  prayedCount = 0
  prayMaxCount = 0
  prayCost = 0
  prayExp = 0
  battleExp = 0
  taskExp = 0
  hpRecover = 0
  mpRecover = 0
  maxStoreMinutes = 0
  itemCount = 0
  expEachHour = 0
  trebleCost = 0

  get maxStoreHours() {
    return Math.floor(this.maxStoreMinutes / 30) / 2
  }

  get expGetable() {
    return (Math.floor(this.offlineTime / 30) / 2) * this.expEachHour
  }

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const offline = new OfflineExp()
    offline.lv = p.getInt()
    offline.offlineTime = p.getInt()
    offline.prayedCount = p.getInt()
    offline.prayMaxCount = p.getInt()
    offline.prayCost = p.getShort()
    offline.prayExp = p.getInt()
    offline.battleExp = p.getShort()
    offline.taskExp = p.getShort()
    offline.hpRecover = p.getShort()
    offline.mpRecover = p.getInt()
    offline.maxStoreMinutes = p.getInt()
    offline.itemCount = p.getShort()
    offline.expEachHour = p.getInt()
    offline.trebleCost = p.getShort()
    if (!p.getBoolean()) {
      offline.nextLv = p.getInt()
      offline.nextBattleExp = p.getShort()
      offline.nextTaskExp = p.getShort()
      offline.nextHpRecover = p.getShort()
      offline.nextMpRecover = p.getShort()
      offline.nextMaxStoreMinutes = p.getInt()
      offline.nextItemCount = p.getShort()
    }

    return offline
  }
}
