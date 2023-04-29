import { Define } from 'libs/defined/defined'
import { Model } from './Model'

export class PlayerBuffer {
  attrID = 0
  addValue = 0
  statusBit = 0
  lastTime = 0
  animeID = 0
  battle: any

  constructor(battle, attrID: number, addValue: number, statusBit: number, lastTime: number, animeID: number, addValue2: number) {
    this.battle = battle
    this.attrID = attrID
    this.addValue = addValue
    this.statusBit = statusBit
    this.lastTime = lastTime
    this.animeID = animeID

    if (!this.isPermanentBuffer())
      this.addValue = addValue2
  }

  getLastTime() {
    return this.lastTime
  }

  finish() {
    this.lastTime = 0
  }

  getStatus() {
    return this.statusBit
  }

  isDieStatus() {
    return (
      this.statusBit == Define.BUFFER_RESIST_DIE_1HP
      || this.statusBit == Define.BUFFER_RESIST_DIE_FULLHP
      || this.statusBit == Define.BUFFER_RESIST_DIE_DELAY
    )
  }

  isCannotReliveStatus() {
    return this.statusBit == Define.BUFFER_DIE_CANNOT_RELIVE
  }

  clearStatus() {
    this.statusBit = Define.BUFFER_NONE
  }

  isClearStatusBitBuffer() {
    return this.attrID == Model.BUFFER_REMOVE_STATUS
  }

  useKeeAtkTime() {
    return this.attrID != Model.KEEPOUT_ATK_TIME
      ? false
      : this.addValue <= 0
        ? false
        : (this.addValue--, true)
  }

  getAddValue() {
    return this.addValue
  }

  isSameStatusType(type: number) {
    if (type == Define.BUFFER_TYPE_BUFF || type == Define.BUFFER_TYPE_DEBUFF) {
      if (this.statusBit == 0)
        return false
      if (Define.getBufferType(this.statusBit) == type)
        return true
    }
    else if (this.statusBit == type) { return true }
    return false
  }

  run(t, e) {
    this.lastTime <= 0 || (this.lastTime--, this.doBuffer(t, e))
  }

  doBuffer(t, e) {
    if (t != null) {
      switch (this.attrID) {
        case Model.HP:
        case Model.MP:
      }
    }
  }

  isPermanentBuffer() {
    switch (this.attrID) {
      case Model.HP:
      case Model.MP:
      case Model.BUFFER_REMOVE_STATUS:
        return true
    }
    return false
  }

  destroy(t) {
    t != null
      && (this.isPermanentBuffer() || t.addValue(this.attrID, -this.addValue))
  }
}

export namespace PlayerBuffer {
  export const MAX_SIZE = 3
}
