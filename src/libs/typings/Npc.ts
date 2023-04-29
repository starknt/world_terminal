import { Protocol } from 'libs/base/protocol'
import type { SocketClient } from 'libs/base/socket'
import { Define } from 'libs/defined/defined'
import { GameMap } from './GameMap'
import { MenuEventHandler } from './MenuEventHandler'
import { Mission } from './Mission'
import { Model } from './Model'
import { Player } from './Player'

export class NPC extends Model {
  rangeX = 0
  rangeY = 0
  nextMoveTime = 0
  sourceGx = 0
  sourceGy = 0
  comeOutCounter = 0
  missionIDList = null
  missions: Mission[] = []
  missionData: number[] = []
  missionGroupID = -1
  missionIcon = null
  _isShowAllTeacher = false
  npcType = 0
  businessIcon = 0
  shopID: number[] = []
  teacherId: number[] = []
  welcome = ''
  talkDetail = ''

  owner: GameMap = new GameMap()

  // 1
  battleID: number[] = []
  comeOutTime = 0

  // 3/8
  topic = ''
  jumpMapID: number[] = []
  jumpMapGx: number[] = []
  jumpMapGy: number[] = []

  // 0
  menuJumpMap: string[] = []
  jumpMapReqMissionID: number[] = []
  jumpMapReqMissionState: number[] = []
  menuBattle: string[] = []
  battleReqMissionID: number[] = []
  battleReqMissionState: number[] = []
  menuShop: string[] = []
  shopReqMissionID: number[] = []
  shopReqMissionState: number[] = []
  menuTeacher: string[] = []
  teacherReqMissionID: number[] = []
  teacherReqMissionState: number[] = []

  _showAllTeacherID: number[] = []
  player: Player = new Player()

  getSign() {
    return this.icon2
  }

  setSign(value: number) {
    if (value < 0 || value > 4)
      this.icon2 = 0
    else
      this.icon2 = value
  }

  isUseMissionData() {
    return (8 & this.status) !== 0
  }

  isMissionLoadEveryTime() {
    return (16 & this.status) !== 0
  }

  isJumpIcon() {
    return (32 & this.status) !== 0
  }

  isEnable() {
    return (2 & this.status) !== 0
  }

  setEnable(value: boolean) {
    value ? (this.status |= 2) : (this.status &= ~3)
  }

  isVisible() {
    return (1 & this.status) !== 0
  }

  isInitVisible() {
    return (1024 & this.status) !== 0
  }

  setInitVisible(t: boolean) {
    t ? (this.status |= 1024) : (this.status &= -1025)
  }

  isInitEnable() {
    return (2048 & this.status) !== 0
  }

  setInitEnable(t: boolean) {
    t ? (this.status |= 2048) : (this.status &= -2049)
  }

  isMonster() {
    return this.npcType === 1
  }

  isAchieveNPC() {
    return this.npcType === 5
      && this.shopID !== null
      && this.shopID.includes(MenuEventHandler.EVENT_ALL_MENU_ACHIEVE)
  }

  isPlayerSkillTeacher() {
    if (this.teacherId.length > 0) {
      const teacher = this.teacherId[0]
      if (Define.getTypeBySkillShopID(teacher) === Define.SKILL_TYPE_PLAYER)
        return true
    }

    return false
  }

  isRepairNPC() {
    if (this.shopID)
      return this.shopID.includes(Define.SHOP_REPAIR_ID)

    return false
  }

  doNpc(network: SocketClient) {
    if (!this.isEnable())
      return false

    if (this.doGetCountryBuildingNPC(network)) {
      return false
    }
    else {
      this.doGetMissionData(network)
      return false
    }
  }

  private doGetCountryBuildingNPC(network: SocketClient) {
    if (this.isTabStatus(Model.NPC_COUNTRY_BLOAD))
      return false
    if (!Define.isAllocateCountryMap(this.owner.mapId))
      return false
    if (this.id < Define.BUILDING_PALACE || this.id > Define.BUILDING_SHOP_ARMOR)
      return false

    this.setTabStatus(true, Model.NPC_COUNTRY_BLOAD)
    this.doGetNPCData(network)

    return true
  }

  private doGetNPCData(network: SocketClient) {
    const msg = Protocol.createGetNPCData([this.id])
    network.send(msg, (byte) => {
      this.onNPCData(network, byte)
    }, this)
  }

  private onNPCData(network: SocketClient, byte: Protocol) {
    const npcs = NPC.parseNPCData(byte.getBytes())
    if (npcs.length > 0) {
      const npc = npcs[0]
      this.copyCountryBuildingNPCData(npc)
    }

    if (this.teacherId && this.teacherId.length > 0) {
      this._isShowAllTeacher = true
      this.sortShowAllTeacher(this.menuTeacher, this.teacherId)
    }

    this.doNpc(network)
  }

  private copyCountryBuildingNPCData(npc: NPC) {
    this.missionData = npc.missionData
    this.comeOutTime = npc.comeOutTime
    this.menuJumpMap = npc.menuJumpMap
    this.jumpMapID = npc.jumpMapID
    this.jumpMapGx = npc.jumpMapGx
    this.jumpMapGy = npc.jumpMapGy
    this.jumpMapReqMissionID = npc.jumpMapReqMissionID
    this.jumpMapReqMissionState = npc.jumpMapReqMissionState
    this.menuBattle = npc.menuBattle
    this.battleID = npc.battleID
    this.battleReqMissionID = npc.battleReqMissionID
    this.battleReqMissionState = npc.battleReqMissionState
    this.menuShop = npc.menuShop
    this.shopID = npc.shopID
    this.shopReqMissionID = npc.shopReqMissionID
    this.shopReqMissionState = npc.shopReqMissionState
    this.menuTeacher = npc.menuTeacher
    this.teacherId = npc.teacherId
    this.teacherReqMissionID = npc.teacherReqMissionID
    this.teacherReqMissionState = npc.teacherReqMissionState
    this.missionGroupID = npc.missionGroupID
    this.npcType = npc.npcType
    this.talkDetail = npc.talkDetail
    this.topic = npc.topic
  }

  private sortShowAllTeacher(menuTeacher: string[], teacherId: number[]) {
    this._showAllTeacherID = []
    for (let n = 0; n < menuTeacher.length; n++) {
      const teacher = menuTeacher[n]
      if (teacher.includes('主动'))
        this._showAllTeacherID[0] = teacherId[n]

      if (teacher.includes('被动'))
        this._showAllTeacherID[1] = teacherId[n]

      if (teacher.includes('自动'))
        this._showAllTeacherID[2] = teacherId[n]
    }
  }

  private doGetMissionData(network: SocketClient) {
    const msg = Protocol.createGetMissionDataMsg(this.id, this.owner)

    network.send(msg, this.onMissionData, this)
    this.setTabStatus(true, Model.NPC_MISSION_LOAD)
  }

  private onMissionData(byte: Protocol) {
    const e = byte.getByte()

    if (e < 0) {
      console.error(`NPC.onMissionData error: ${byte.getString()}`)
      return
    }

    const missions: Mission[] = []
    for (let i = 0; i < e; i++) {
      const mission = Mission.fromBytes(byte.getBytes())
      missions.push(mission)
    }
    this.missions = missions

    // let len = byte.getByte()
    // for (let n = 0; n < len; n++) {
    //   const monsterGroup = MonsterGroup.fromBytes(byte)
    //   this.owner.monsterGroupList.push(monsterGroup)
    // }
    // let ee = byte.getByte()
    // for (let n = 0; n < ee; n++) {
    //   const monster = Monster.fromMonsterBytes(byte)
    //   if (monster) this.owner.monsterList.push(monster)
    // }
    // let skills: Skill[] = []
    // for (let e = byte.getByte(), i = 0; e > i; i++)
    //   skills.push(Skill.fromBytes(byte));
    // for (let o = byte.getByte(), i = 0; o > i; i++) {
    //   MonsterAI.fromBytes(byte, skills);
    // }
  }

  getMissionById(id: number) {
    return this.missions.find(mission => mission.id === id)
  }
}

export namespace NPC {
  export function loadNPC(byte: egret.ByteArray, network?: SocketClient) {
    const npcs: NPC[] = []
    const npcCount = byte.readUnsignedByte()
    for (let o = 0; o < npcCount; o++) {
      const npc = fromNPCBytes(byte, network)
      npcs[o] = npc
    }

    return npcs
  }

  export function fromNPCBytes(byte: egret.ByteArray, network?: SocketClient) {
    const npc = new NPC()

    npc.setSign(byte.readByte())
    npc.id = byte.readByte()
    npc.missionGroupID = byte.readByte()
    npc.npcType = byte.readByte()
    npc.icon1 = byte.readShort()
    npc.businessIcon = byte.readShort()
    npc.name = byte.readUTF()
    npc.playerName = npc.name
    npc.welcome = byte.readUTF()
    npc.talkDetail = byte.readUTF()
    npc.status = byte.readUnsignedByte()
    npc.setDir(byte.readByte())
    const i = byte.readByte()
    const o = byte.readByte()
    npc.setPosition(i, o)
    npc.sourceGx = i
    npc.sourceGy = o
    npc.rangeX = byte.readByte()
    npc.rangeY = byte.readByte()

    if (npc.isUseMissionData()) {
      npc.missionData = []
      npc.missionData[0] = byte.readShort()
      npc.missionData[1] = byte.readByte()
      npc.missionData[2] = byte.readShort()
      npc.missionData[3] = byte.readByte()
    }

    switch (npc.npcType) {
      case 1:
      {
        npc.battleID = []
        npc.battleID[0] = byte.readShort()
        npc.comeOutTime = byte.readUnsignedByte()
        break
      }
      case 3:
      case 8:
      {
        npc.topic = byte.readUTF()
        npc.jumpMapID = []
        npc.jumpMapID[0] = byte.readShort()
        npc.jumpMapGx = []
        npc.jumpMapGx[0] = byte.readByte()
        npc.jumpMapGy = []
        npc.jumpMapGy[0] = byte.readByte()
        break
      }
      case 2:
      {
        npc.topic = byte.readUTF()
        npc.shopID = []
        npc.shopID[0] = byte.readShort()
        break
      }
      case 7:
      {
        npc.topic = byte.readUTF()
        npc.teacherId = []
        npc.teacherId[0] = byte.readShort()
        break
      }
      case 9:
      {
        npc.topic = byte.readUTF()
        break
      }
      case 0:
      {
        break
      }
      case 5:
      {
        let i = byte.readByte()

        if (i > 0) {
          npc.menuJumpMap = new Array(i)
          npc.jumpMapID = new Array(i)
          npc.jumpMapGx = new Array(i)
          npc.jumpMapGy = new Array(i)
          npc.jumpMapReqMissionID = new Array(i)
          npc.jumpMapReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuJumpMap[o] = byte.readUTF()
            npc.jumpMapID[o] = byte.readShort()
            npc.jumpMapGx[o] = byte.readByte()
            npc.jumpMapGy[o] = byte.readByte()
            npc.jumpMapReqMissionID[o] = byte.readShort()
            npc.jumpMapReqMissionState[o] = byte.readByte()
          }
        }

        i = byte.readByte()
        if (i > 0) {
          npc.menuBattle = new Array(i)
          npc.battleID = new Array(i)
          npc.battleReqMissionID = new Array(i)
          npc.battleReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuBattle[o] = byte.readUTF()
            npc.battleID[o] = byte.readShort()
            npc.battleReqMissionID[o] = byte.readShort()
            npc.battleReqMissionState[o] = byte.readByte()
          }
        }

        i = byte.readByte()
        if (i > 0) {
          npc.menuShop = new Array(i)
          npc.shopID = new Array(i)
          npc.shopReqMissionID = new Array(i)
          npc.shopReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuShop[o] = byte.readUTF()
            npc.shopID[o] = byte.readShort()
            npc.shopReqMissionID[o] = byte.readShort()
            npc.shopReqMissionState[o] = byte.readByte()
          }
        }

        i = byte.readByte()
        if (i > 0) {
          npc.menuTeacher = new Array(i)
          npc.teacherId = new Array(i)
          npc.teacherReqMissionID = new Array(i)
          npc.teacherReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuTeacher[o] = byte.readUTF()
            npc.teacherId[o] = byte.readShort()
            npc.teacherReqMissionID[o] = byte.readShort()
            npc.teacherReqMissionState[o] = byte.readByte()
          }
        }

        break
      }
    }

    if (network)
      npc.doNpc(network)

    return npc
  }

  export function parseNPCData(byte: egret.ByteArray) {
    return NPC.loadNPC(byte)
  }

  export const SHOW_WELCOME_RANGE = 48
  export const EVENT_ALL_BACK = -1
  export const EVENT_MISSION_FIGHT = 1e3
  export const SUB_MISSION_NPC_MENU = 1
  export const SUB_MISSION_OFFLINE_LIST = 2
  export const SUB_MISSION_OFFLINE_INFO = 3
  export const SUB_MISSION_ESCORT_INFO = 4
  export const SUB_MISSION_DIRECT_STEP1 = 5
  export const SUB_MISSION_DIRECT_STEP2 = 6
  export const SUB_MISSION_ACCEPT = 7
  export const SUB_MISSION_DOING = 8
  export const SUB_MISSION_VIEW = 9
  export const SUB_MISSION_SUBMIT_NORMAL = 10
  export const SUB_MISSION_MAIL = 11
  export const SUB_MISSION_ONE_ACCEPT = 12
  export const SUB_MISSION_ONE_SUBMIT = 13
  export const SUB_RANDOM_MISSION_CHANGE = 14
  export const SUB_SPRITE_GUIDE = 15
  export const EVENT_ALL_TASK_ACCEPT = 11023
  export const EVENT_ALL_TASK_PATH = 11024
  export const EVENT_ALL_TASK_DEL = 11025
  export const EVENT_ALL_TASK_SUBMIT = 11026
  export const EVENT_ALL_TASK_ITEM_SEE = 11027
  export const EVENT_ALL_RANDOM_MISSION_MENU = 11029
  export const EVENT_ALL_RANDOM_MISSION_REFLASH = 11030
  export const EVENT_ALL_TASK_OFF_ACTIVATE = 11094
  export const EVENT_ALL_TASK_DIRECT_STEP2 = 11095
}
