import { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Condition } from './Condition'
import type { GameMap } from './GameMap'
import type { ItemData } from './ItemData'
import { ItemManager } from './ItemManager'
import type { NPC } from './Npc'
import type { Player } from './Player'
import type { TaskTargetData } from './TaskTargetData'

export class Mission {
  owner: Player | null = null
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
  rewardItems: ItemData[] = []
  selectItems: ItemData[] = []
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

  constructor(id: number) {
    this.id = id
  }

  getId() {
    return this.id
  }

  getTargetData() {
    const t: TaskTargetData[] = []
    if (this.submitCondition && this.submitCondition.length > 0) {
      for (let e = 0; e < this.submitCondition.length; e++) {
        const n = this.submitCondition[e]
        if (n.isShowTargetType()) {
          const i = n.getTargetData(this.owner!)
          i != null && t.push(i)
        }
      }
    }
    return t
  }

  cleanKillMission() {
    if (!(this.submitCondition == null || this.submitCondition.length <= 0)) {
      for (let t = 0; t < this.submitCondition.length; t++) {
        this.submitCondition[t] != null
          && this.submitCondition[t].cleanKillMonster()
      }
    }
  }

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
    return (2048 & this.setting) != 0
  }

  isShowGuide() {
    return (256 & this.setting) != 0
  }

  isOneKeyMission() {
    return (4096 & this.setting) != 0
  }

  isOneKeyShow() {
    return (1048576 & this.setting) != 0
  }

  isHaveSpecailReward() {
    return (512 & this.setting) != 0
  }

  isHaveSpecailReward2() {
    return (32768 & this.setting) != 0
  }

  isHaveSpecailExecute() {
    return (1024 & this.setting) != 0
  }

  isVisibleAndSubmit(npc: NPC, map: GameMap) {
    if (this.isCityOrCountry() && this.npcId !== npc.missionGroupID) { return false }
    else {
      if (Define.isAllocateCityMap(map.mapId))
        return false
      if (Define.isAllocateCountryMap(map.mapId))
        return false
      let n = map.mapId
      if (Define.isAllocateMirrorMap(map.mapId))
        n = map.orgMapId

      if (Define.isCommonMap(n) && this.mapId !== n)
        return false

      if (Define.isCommonMap(n) && this.npcId !== npc.id)
        return false

      if (this.npcId !== npc.id)
        return false
      if (this.mapId !== n)
        return false
    }

    return true
  }

  updateKillMission(e, n, i) {
    if (this.submitCondition != null) {
      for (
        let a = 0;
        a < this.submitCondition.length;
        a++
      ) {
        this.submitCondition[a] != null
          && this.submitCondition[a].updateKilledMonsterNum(e, n)
      }
    }
  }

  isComplete() {
    if (this.submitCondition === null)
      return false
    if (this.owner === null)
      return false
    for (let t = 0; t < this.submitCondition.length; t++) {
      const e = this.submitCondition[t]
      if (!e.isConditionOfSatisfy(this.owner))
        return false
    }

    return true
  }

  getMissionStatus(npc: NPC) {
    const n = Mission.CAN_SUBMIT
    // if (npc.getM)
  }

  createFromBytes(t: egret.ByteArray) {
    const e = t.readShort()
    this.id = e
    this.name = t.readUTF()
    this.level = t.readByte()
    this.simpleDesc = t.readUTF()
    this.desc = t.readUTF()
    this.setting = 65535 & t.readShort()
    this.mapId = t.readShort()
    this.npcId = t.readByte()
    this.radarMapID = t.readShort()
    if (this.radarMapID > 0) {
      this.radarGx = t.readByte()
      this.radarGy = t.readByte()
    }
    this.dialogNotStartNotReady = t.readUTF()
    this.dialogStartNotFinish = t.readUTF()
    this.dialogStartFinish = t.readUTF()
    this.exp = t.readInt()
    this.money2 = t.readShort()
    this.money3 = t.readShort()
    if (this.isHaveSpecailReward()) {
      this.honor = t.readShort()
      this.countryLand = t.readShort()
      this.countryProsperity = t.readShort()
      this.countryPeople = t.readShort()
      this.countryWood = t.readShort()
      this.countryStone = t.readShort()
      this.countryIron = t.readShort()
      this.cityArmy = t.readShort()
      this.cityProsperity = t.readShort()
      this.promoteProsperity = t.readShort()
    }

    if (this.isHaveSpecailReward2())
      this.countryArmy = t.readShort()

    if (this.isHaveSpecailExecute()) {
      this.acceptJumpMapID = t.readShort()
      if (this.acceptJumpMapID > 0) {
        this.acceptJumpMapGx = t.readByte()
        this.acceptJumpMapGy = t.readByte()
      }
      this.submitJumpMapID = t.readShort()
      if (this.submitJumpMapID > 0) {
        this.submitJumpMapGx = t.readByte()
        this.submitJumpMapGy = t.readByte()
      }
      this.acceptBattleID = t.readShort()
      this.submitBattleID = t.readShort()
      this.submitNextMissionID = t.readShort()
    }

    if (this.isEscort()) {
      this.escortCost = new Array(3)
      this.escortCost[0] = t.readInt()
      this.escortCost[1] = t.readInt()
      this.escortCost[2] = t.readInt()

      t.readByte()
      t.readByte()
    }

    let n = t.readByte()
    if (n > 0) {
      this.rewardItems = new Array(n)
      for (let i = 0; i < n; i++) {
        const o = ItemManager.getItemFromMissionBytes(t)
        this.rewardItems[i] = o
      }
    }

    n = t.readByte()
    if (n > 0) {
      this.selectItems = new Array(n)
      for (let i = 0; n > i; i++) {
        const o = ItemManager.getItemFromMissionBytes(t)
        this.selectItems[i] = o
      }
    }

    n = t.readByte()
    if (n > 0) {
      this.acceptCondition = new Array(n)
      for (var i = 0; n > i; i++)
        this.acceptCondition[i] = Condition.fromBytes(t)
    }

    n = t.readByte()
    if (n > 0) {
      this.submitCondition = new Array(n)
      for (var i = 0; n > i; i++)
        this.submitCondition[i] = Condition.fromBytes(t)
    }
  }
}

export namespace Mission {
  export function clearNewRadar(e) {
    e != null
      && e.radarMapID == Mission.newRadarMapID
      && e.radarGx == Mission.newRadarGx
      && e.radarGy == Mission.newRadarGy
      && ((Mission.newRadarMapID = 0), (Mission.newRadarGx = 0), (Mission.newRadarGy = 0))
  }

  export function fromBytes(byte: egret.ByteArray): Mission {
    const mission = new Mission(-1)

    mission.createFromBytes(byte)

    return mission
  }

  export function isHaveSubmitMission(player: Player) {
    for (let a = 0; a < player.missionList.length; a++) {
      const mission = player.missionList[a]
      if (mission.isComplete())
        return true
    }

    return false
  }

  export function isMissionFinish(player: Player, e: number) {
    const i = Math.floor(e / 8)
    const o = Math.floor(e % 8)
    return i >= 0 && i < player.missionStatus.length && (player.missionStatus[i] & (1 << o)) !== 0
  }

  // export function acceptMission(network: ApiSocketClient, player: Player, npc: NPC, mission: Mission) {
  //   const msg = Protocol.createTaskAcceptMsg(player.id, mission.id)
  //   return network.sendCmd(msg, (byte) => {
  //     const a = byte.getByte()
  //     if (a !== 0) {
  //       console.error(`acceptMission error: ${byte.getString()}`)
  //       return
  //     }

  //     processNpcStatus(npc, byte)
  //     const s = byte.getBoolean()
  //     if (s) {
  //       const l = byte.getByte()
  //       if (l !== 0) {
  //         console.error(`acceptMission error: ${byte.getString()}`)
  //         return
  //       }
  //       // accept mission reward
  //     } else {
  //       player.mission.push(mission)
  //     }
  //   })
  // }

  // export function submitMission(network: ApiSocketClient, player: Player, npc: NPC, mission: Mission) {
  //   // if(mission.exp > 0 && playe)
  //   const message = Protocol.createTaskDeliverMsg(npc.getId(), mission.id, -1)

  //   const callback = (byte: Protocol) => {
  //     const a = byte.getByte()

  //     if (a !== 0) {
  //       console.error(`submit mission failed, ${byte.getString()}`)
  //     }

  //     // process mission npc status
  //     processNpcStatus(npc, byte)

  //     const r = byte.getBoolean()
  //     if (r) finshMission(mission.id)
  //     const s = byte.getShort()
  //     const l = byte.getInt()
  //     const _ = byte.getInt()
  //     if (s > 0) player.money1 -= s
  //     if (l > 0) player.money2 -= l
  //     if (_ > 0) player.money3 -= _

  //     const u = byte.getInt()
  //     if (u > 0) player.money2 += u
  //     const i = byte.getInt()
  //     if (i > 0) player.money3 += i

  //     console.log(`完成任务 ${mission.id}, 扣除 黄金: ${s}, 金叶: ${l}, 铜币${_}, 增加 金叶: ${u}, 铜币: ${i}`)
  //     // process up level
  //     const isUpLevel = byte.getByte()
  //     if (isUpLevel > 0) {
  //       player.level += isUpLevel
  //       player.exp += byte.getInt()
  //       player.expMax += byte.getInt()

  //       const _ = byte.getShort()
  //       if (_ > 0) player.sp += _
  //       const h = byte.getByte()
  //       if (h > 0) player.cp += h
  //     }

  //     const ul = byte.getInt()

  //     if (ul > 0) player.exp2 += ul
  //     const cl = byte.getByte()
  //     if (cl > 0) {
  //       player.level2 += cl
  //       const T = byte.getInt()
  //       const p = byte.getInt()
  //       player.exp2 += T
  //       player.expMax2 += p
  //     }

  //     //
  //     const T = byte.getBoolean()
  //     if (T) {
  //       // pet reward
  //       const i = byte.getInt()
  //       if (i > 0) player.pet!.exp += i
  //       const o = byte.getByte()
  //       if (o > 0) {
  //         const a = byte.getShort()
  //         const r = byte.getByte()

  //         if (r > 0) player.pet!.level += r

  //         let s = 0,
  //           l = 0,
  //           _ = 0,
  //           h = 0,
  //           u = 0

  //         if (r > 0) {
  //           s = byte.getShort()
  //           l = byte.getByte()
  //           _ = byte.getByte()
  //           h = byte.getByte()
  //           u = byte.getByte()
  //         }
  //         const E: Skill[] = []
  //         let c = byte.getInt(),
  //           T = byte.getInt(),
  //           p = byte.getByte(),
  //           d = byte.getByte()
  //         for (let g = 0; g < d; g++)
  //           E.push(Skill.fromBytes(byte))
  //         player.pet!.level += o
  //         player.pet!.sp += a
  //         player.pet!.growLevel += r
  //         player.pet!.str += s
  //         player.pet!.con += l
  //         player.pet!.agi += _
  //         player.pet!.ilt += h
  //         player.pet!.wis += u
  //         player.pet!.exp = c
  //         player.pet!.expMax = T
  //         player.pet!.cp = p

  //         for (let g = 0; g < E.length; g++) {
  //           const S = E[g]
  //           // learn skill
  //           player.pet!.skillList.push(S)
  //         }
  //       }
  //     }
  //     for (let p = byte.getByte(), d = 0; d < p; d++) {
  //       const E = byte.getInt()
  //       const g = byte.getUnsignedByte()
  //       const S = byte.getByte()
  //       const m = player.bag.store[g]
  //       if (!m) return
  //       if (m.id !== E) return
  //       // player.bag.
  //     }
  //     let rr = 0;
  //     let aa: ItemData | null = null
  //     for (let o = byte.getByte(), l = 0; o > l; l++) {
  //       const _ = byte.getByte()
  //       rr = byte.getByte()
  //       if (_ === 1) {
  //         const h = 255 & byte.getByte()
  //         aa = ItemData.fromBytes(byte)
  //         player.bag.store[rr] = aa
  //       } else if (_ === 2) {
  //         const u = byte.getInt()
  //         const h = 255 & byte.getByte()
  //         aa = player.bag.store[h]
  //         if (aa) {
  //           aa.quantity += rr
  //         }
  //       }
  //     }

  //     const f = byte.getBoolean()
  //     const A = byte.getBoolean()
  //     if (A) {
  //       const honor = byte.getInt()
  //       const cityDegree = byte.getShort()
  //       const cityArmy = byte.getShort()
  //       const countryLand = byte.getShort()
  //       const v = byte.getShort()
  //       const M = byte.getShort()
  //       const O = byte.getShort()
  //       const N = byte.getShort()
  //       const D = byte.getShort()
  //       const B = byte.getShort()
  //       const b = byte.getShort()
  //     }
  //   }

  //   return network.sendCmd(message, callback)
  // }

  // export function deleteMission(network: ApiSocketClient, player: Player, npc: NPC, mission: Mission) {
  //   const msg = Protocol.createTaskAbandonMsg(mission.id)
  //   return network.sendCmd(msg, (byte) => {
  //     const i = byte.getByte()
  //     if (i !== 0) {
  //       console.error(`delete mission failed, ${byte.getString()}`)
  //       return
  //     }

  //     processNpcStatus(npc, byte)
  //     player.mission = player.mission.filter(m => m.id !== mission.id)
  //   })
  // }

  export function finshMission(player: Player, missionId: number) {
    if (missionId < 0) {
      const o = Math.floor(missionId / 8)
      const a = Math.floor(missionId % 8)

      if (o < 0 || o >= player.missionStatus.length)
        player.missionStatus[o] |= (1 << a)
      else
        player.missionStatus[o] &= ~(1 << a)
    }
  }

  export function setNewRadar(e) {
    e == null
      || e.radarMapID <= 0
      || ((Mission.newRadarMapID = e.radarMapID),
      (Mission.newRadarGx = e.radarGx),
      (Mission.newRadarGy = e.radarGy))
  }

  function processNpcStatus(npc: NPC, byte: Protocol) {
    for (let e = byte.getByte(), n = 0; n < e; n++) {
      const i = byte.getByte()
      const o = byte.getByte()
      // 不对npc状态进行实际处理
      if (npc.id === i)
        npc.setSign(o)
    }
  }

  export const BuildinMission = {
    3060: { name: '精灵之森林初阶段', mapid: 254, npcid: 101 },
    3061: { name: '月牙山初阶任务', mapid: 22, npcid: 1 },
    3062: { name: '封印墓地初阶任务', mapid: 914, npcid: 101 },
    3063: { name: '汉王古墓初阶任务', mapid: 813, npcid: 3 },
    3064: { name: '精灵之森林中级任务', mapid: 254, npcid: 101 },
    3065: { name: '月牙山中级任务', mapid: 22, npcid: 1 },
    3066: { name: '封印墓地中级任务', mapid: 914, npcid: 101 },
    3067: { name: '汉王古墓中级任务', mapid: 813, npcid: 3 },
    3068: { name: '精灵之森林高级任务', mapid: 254, npcid: 101 },
    3069: { name: '月牙山高级任务', mapid: 22, npcid: 1 },
    3070: { name: '封印古墓高级任务', mapid: 914, npcid: 101 },
    3071: { name: '汉王古墓高级任务', mapid: 813, npcid: 3 },
    3072: { name: '绝望冰原中级任务', mapid: 920, npcid: 101 },
    3073: { name: '失魂沙漠中级任务', mapid: 820, npcid: 5 },
    3074: { name: '绝望冰原高级任务', mapid: 920, npcid: 101 },
    3075: { name: '失魂沙漠高级任务', mapid: 820, npcid: 5 },
  }

  export let newRadarMapID = 0
  export let newRadarGx = 0
  export let newRadarGy = 0
  export const CAN_SUBMIT = 0
  export const NOT_CAN_SUBMIT = 1
  export const CAN_ACCEPT = 2
  export const NOT_CAN_ACCEPT = 3
}
