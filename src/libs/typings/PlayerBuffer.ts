import { Define } from 'libs/defined/defined'
import type { Battle } from 'libs/service/Battle/battle'
import type { Control } from 'libs/service/Battle/Control'
import { Model } from './Model'
import type { Player } from './Player'

export class PlayerBuffer {
  attrID = 0
  addValue = 0
  statusBit = 0
  lastTime = 0
  animeID = 0
  battle: Battle

  constructor(battle: Battle, attrID: number, addValue: number, statusBit: number, lastTime: number, animeID: number, addValue2: number) {
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
      this.statusBit === Define.BUFFER_RESIST_DIE_1HP
      || this.statusBit === Define.BUFFER_RESIST_DIE_FULLHP
      || this.statusBit === Define.BUFFER_RESIST_DIE_DELAY
    )
  }

  isCannotReliveStatus() {
    return this.statusBit === Define.BUFFER_DIE_CANNOT_RELIVE
  }

  clearStatus() {
    this.statusBit = Define.BUFFER_NONE
  }

  isClearStatusBitBuffer() {
    return this.attrID === Model.BUFFER_REMOVE_STATUS
  }

  useKeeAtkTime() {
    return this.attrID !== Model.KEEPOUT_ATK_TIME
      ? false
      : this.addValue <= 0
        ? false
        : (this.addValue--, true)
  }

  getAddValue() {
    return this.addValue
  }

  isSameStatusType(type: number) {
    if (type === Define.BUFFER_TYPE_BUFF || type === Define.BUFFER_TYPE_DEBUFF) {
      if (this.statusBit === 0)
        return false
      if (Define.getBufferType(this.statusBit) === type)
        return true
    }
    else if (this.statusBit === type) {
      return true
    }
    return false
  }

  run(player: Player, e: Control[]) {
    if (this.lastTime > 0) {
      this.lastTime--
      this.doBuffer(player, e)
    }
  }

  doBuffer(player: Player, e: Control[]) {
    if (player != null) {
      switch (this.attrID) {
        case Model.HP:
        case Model.MP:
          Define.processBattleHpMpPower(
            player,
            this.attrID,
            this.addValue,
            this.animeID,
            e,
          )
          this.battle.checkDie1Hp(player, e)
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

  destroy(player: Player) {
    this.isPermanentBuffer() || player.addValue(this.attrID, -this.addValue)
  }
}

export namespace PlayerBuffer {
  export const MAX_SIZE = 3
}
