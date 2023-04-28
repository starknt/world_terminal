import { Protocol } from 'libs/base/protocol'

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
}

export namespace OfflineExp {
  export function fromBytes(bytes: Protocol) {
    const info = new OfflineExp()
    info.lv = bytes.getInt()
    info.offlineTime = bytes.getInt()
    info.prayedCount = bytes.getInt()
    info.prayMaxCount = bytes.getInt()
    info.prayCost = bytes.getShort()
    info.prayExp = bytes.getInt()
    info.battleExp = bytes.getShort()
    info.taskExp = bytes.getShort()
    info.hpRecover = bytes.getShort()
    info.mpRecover = bytes.getInt()
    info.maxStoreMinutes = bytes.getInt()
    info.itemCount = bytes.getShort()
    info.expEachHour = bytes.getInt()
    info.trebleCost = bytes.getShort()
    const e = bytes.getBoolean()
    if (!e) {
      info.nextLv = bytes.getInt()
      info.nextBattleExp = bytes.getShort()
      info.nextTaskExp = bytes.getShort()
      info.nextHpRecover = bytes.getShort()
      info.nextMpRecover = bytes.getShort()
      info.nextMaxStoreMinutes = bytes.getInt()
      info.nextItemCount = bytes.getShort()
    }

    return info
  }
}
