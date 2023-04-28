import type { nato } from 'libs/base/nato'
import { GameText } from 'libs/defined/gameText'
import { ItemData } from './ItemData'
import { Mission } from './Mission'

export class RandomMission extends Mission {
  rmissionStatus = 0
  rmissionType = 0
  rneedCount = 0
  rhaveCount = 0
  rItemcount = 0
  moneyType = 0
  money = 0
  myCount = 0
  maxCount = 0
  objName = ''

  fromRandomMission(t: nato.Message) {
    this.rmissionStatus = t.getByte()
    if (this.rmissionStatus === RandomMission.STATUS_END_1 || this.rmissionStatus === RandomMission.STATUS_END_2 || this.rmissionStatus === RandomMission.STATUS_WAIT) {
      if (this.rmissionStatus == RandomMission.STATUS_WAIT) {
      }

      return
    }

    this.desc = t.getString()
    this.rmissionType = t.getByte()
    this.objName = t.getString()
    const n = this.rmissionType === RandomMission.TYPE_MONSTER ? GameText.STR_KILL : GameText.STR_COLLECT
    this.name = n + this.objName
    this.rneedCount = t.getShort()
    this.rhaveCount = t.getShort()
    this.exp = t.getInt()
    this.money2 = t.getInt()
    this.money3 = t.getInt()
    const i = t.getByte()
    this.rItemcount = i
    if (i > 0) {
      this.rewardItems = new Array(i)
      for (let o = 0; i > o; o++) {
        const item = new ItemData()
        item.name = t.getString()
        item.quantity = t.getByte()
        item.bagIcon = t.getByte()
        item.grade = t.getByte()
        this.rewardItems[o] = item
      }
    }
  }
}

export namespace RandomMission {
  export function getRandomMissionInfo() {

  }

  export const STATUS_START_1 = 0
  export const STATUS_START_2 = 1
  export const STATUS_WAIT = 2
  export const STATUS_END_1 = 3
  export const STATUS_END_2 = 4
  export const TYPE_MONSTER = 0
  export const TYPE_ITEM = 1
  export const Action_accept = 1
  export const Action_giveUp = 2
  export const Action_refresh = 3
  export const Action_sumbit = 4
}
