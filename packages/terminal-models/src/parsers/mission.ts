import type { MaybeProtocol } from '@terminal/core'
import { compatByteArray } from '@terminal/core'
import { MissionItem } from './item'
import { Condition } from './condition'

export class Mission {
  setting = 0
  id = 0
  level = 0
  mapId = -1
  npcId = -1
  exp = 0
  money2 = 0
  money3 = 0
  honor = 0
  cityProsperity = 0
  cityArmy = 0
  countryArmy = 0
  countryLand = 0
  countryProsperity = 0
  promoteProsperity = 0
  countryPeople = 0
  countryWood = 0
  countryStone = 0
  countryIron = 0
  rewardItems: MissionItem[] = []
  selectItems: MissionItem[] = []
  acceptCondition: Condition[] = []
  submitCondition: Condition[] = []
  escortCost: number[] = []
  radarMapID = 0
  radarGx = 0
  radarGy = 0
  acceptJumpMapID = 0
  acceptJumpMapGx = 0
  acceptJumpMapGy = 0
  submitJumpMapID = 0
  submitJumpMapGx = 0
  submitJumpMapGy = 0
  acceptBattleID = 0
  submitBattleID = 0
  submitNextMissionID = 0

  name = ''
  desc = ''
  simpleDesc = ''
  dialogNotStartNotReady = ''
  dialogStartNotFinish = ''
  dialogStartFinish = ''

  isRandomMission() {
    return (2097152 & this.setting) > 0
  }

  couldNotDel() {
    return (16 & this.setting) > 0
  }

  isDirectSubmit() {
    return (1 & this.setting) > 0
  }

  isDailyMission() {
    return (2 & this.setting) > 0
  }

  isUnLimitSubmit() {
    return (8 & this.setting) > 0
  }

  isEscort() {
    return (64 & this.setting) > 0
  }

  isEscortTeam() {
    return (128 & this.setting) > 0
  }

  isCityOrCountry() {
    return (32 & this.setting) > 0
  }

  isCountryAssignTask() {
    return (2048 & this.setting) !== 0
  }

  isShowGuide() {
    return (256 & this.setting) !== 0
  }

  isOneKeyMission() {
    return (4096 & this.setting) !== 0
  }

  isOneKeyShow() {
    return (1048576 & this.setting) !== 0
  }

  isHaveSpecailReward() {
    return (512 & this.setting) !== 0
  }

  isHaveSpecailReward2() {
    return (32768 & this.setting) !== 0
  }

  isHaveSpecailExecute() {
    return (1024 & this.setting) !== 0
  }

  static from(p: MaybeProtocol) {
    p = compatByteArray(p)
    const mission = new Mission()
    mission.id = p.readShort()
    mission.name = p.readUTF()
    mission.level = p.readByte()
    mission.simpleDesc = p.readUTF()
    mission.desc = p.readUTF()
    mission.setting = 65535 & p.readShort()
    mission.mapId = p.readShort()
    mission.npcId = p.readByte()
    mission.radarMapID = p.readShort()
    if (mission.radarMapID > 0) {
      mission.radarGx = p.readByte()
      mission.radarGy = p.readByte()
    }
    mission.dialogNotStartNotReady = p.readUTF()
    mission.dialogStartNotFinish = p.readUTF()
    mission.dialogStartFinish = p.readUTF()
    mission.exp = p.readInt()
    mission.money2 = p.readShort()
    mission.money3 = p.readShort()
    if (mission.isHaveSpecailReward()) {
      mission.honor = p.readShort()
      mission.countryLand = p.readShort()
      mission.countryProsperity = p.readShort()
      mission.countryPeople = p.readShort()
      mission.countryWood = p.readShort()
      mission.countryStone = p.readShort()
      mission.countryIron = p.readShort()
      mission.cityArmy = p.readShort()
      mission.cityProsperity = p.readShort()
      mission.promoteProsperity = p.readShort()
    }

    if (mission.isHaveSpecailReward2())
      mission.countryArmy = p.readShort()

    if (mission.isHaveSpecailExecute()) {
      mission.acceptJumpMapID = p.readShort()
      if (mission.acceptJumpMapID > 0) {
        mission.acceptJumpMapGx = p.readByte()
        mission.acceptJumpMapGy = p.readByte()
      }
      mission.submitJumpMapID = p.readShort()
      if (mission.submitJumpMapID > 0) {
        mission.submitJumpMapGx = p.readByte()
        mission.submitJumpMapGy = p.readByte()
      }
      mission.acceptBattleID = p.readShort()
      mission.submitBattleID = p.readShort()
      mission.submitNextMissionID = p.readShort()
    }

    if (mission.isEscort()) {
      mission.escortCost = new Array(3)
      mission.escortCost[0] = p.readInt()
      mission.escortCost[1] = p.readInt()
      mission.escortCost[2] = p.readInt()

      p.readByte()
      p.readByte()
    }

    mission.rewardItems = Array.from({ length: p.readByte() }, () => {
      return MissionItem.from(p)
    })
    mission.selectItems = Array.from({ length: p.readByte() }, () => {
      return MissionItem.from(p)
    })
    mission.acceptCondition = Array.from({ length: p.readByte() }, () => {
      return Condition.from(p)
    })
    mission.submitCondition = Array.from({ length: p.readByte() }, () => {
      return Condition.from(p)
    })
  }
}
