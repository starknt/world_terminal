import type { MaybeProtocol } from '@terminal/core'
import { compatByteArray } from '@terminal/core'

export class Npc {
  status!: number
  icon2!: number
  id!: number
  missionGroupID!: number
  npcType!: number
  icon1!: number
  businessIcon!: number
  name!: string
  playerName: any
  welcome!: string
  talkDetail!: string
  sourceGx!: number
  sourceGy!: number
  rangeX!: number
  rangeY!: number
  missionData!: number[]
  battleID!: number[]
  comeOutTime!: number
  topic!: string
  jumpMapID!: number[]
  jumpMapGx!: number[]
  jumpMapGy!: number[]
  shopID!: number[]
  teacherId!: number[]
  menuJumpMap!: any[]
  jumpMapReqMissionID!: any[]
  jumpMapReqMissionState!: any[]
  menuBattle!: any[]
  battleReqMissionID!: any[]
  battleReqMissionState!: any[]
  menuShop!: any[]
  shopReqMissionID!: any[]
  shopReqMissionState!: any[]
  menuTeacher!: any[]
  teacherReqMissionID!: any[]
  teacherReqMissionState!: any[]

  isUseMissionData() {
    return (8 & this.status) !== 0
  }

  isMissionLoadEveryTime() {
    return (16 & this.status) !== 0
  }

  isJumpIcon() {
    return (32 & this.status) !== 0
  }

  static from(p: MaybeProtocol) {
    p = compatByteArray(p)
    const npc = new Npc()

    npc.icon2 = p.readByte()
    npc.id = p.readByte()
    npc.missionGroupID = p.readByte()
    npc.npcType = p.readByte()
    npc.icon1 = p.readShort()
    npc.businessIcon = p.readShort()
    npc.name = p.readUTF()
    npc.playerName = npc.name
    npc.welcome = p.readUTF()
    npc.talkDetail = p.readUTF()
    npc.status = p.readUnsignedByte()
    // dir
    p.readByte()
    const i = p.readByte()
    const o = p.readByte()
    npc.setPosition(i, o)
    npc.sourceGx = i
    npc.sourceGy = o
    npc.rangeX = p.readByte()
    npc.rangeY = p.readByte()

    if (npc.isUseMissionData()) {
      npc.missionData = []
      npc.missionData[0] = p.readShort()
      npc.missionData[1] = p.readByte()
      npc.missionData[2] = p.readShort()
      npc.missionData[3] = p.readByte()
    }

    switch (npc.npcType) {
      case 1:
      {
        npc.battleID = []
        npc.battleID[0] = p.readShort()
        npc.comeOutTime = p.readUnsignedByte()
        break
      }
      case 3:
      case 8:
      {
        npc.topic = p.readUTF()
        npc.jumpMapID = []
        npc.jumpMapID[0] = p.readShort()
        npc.jumpMapGx = []
        npc.jumpMapGx[0] = p.readByte()
        npc.jumpMapGy = []
        npc.jumpMapGy[0] = p.readByte()
        break
      }
      case 2:
      {
        npc.topic = p.readUTF()
        npc.shopID = []
        npc.shopID[0] = p.readShort()
        break
      }
      case 7:
      {
        npc.topic = p.readUTF()
        npc.teacherId = []
        npc.teacherId[0] = p.readShort()
        break
      }
      case 9:
      {
        npc.topic = p.readUTF()
        break
      }
      case 0:
      {
        break
      }
      case 5:
      {
        let i = p.readByte()

        if (i > 0) {
          npc.menuJumpMap = new Array(i)
          npc.jumpMapID = new Array(i)
          npc.jumpMapGx = new Array(i)
          npc.jumpMapGy = new Array(i)
          npc.jumpMapReqMissionID = new Array(i)
          npc.jumpMapReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuJumpMap[o] = p.readUTF()
            npc.jumpMapID[o] = p.readShort()
            npc.jumpMapGx[o] = p.readByte()
            npc.jumpMapGy[o] = p.readByte()
            npc.jumpMapReqMissionID[o] = p.readShort()
            npc.jumpMapReqMissionState[o] = p.readByte()
          }
        }

        i = p.readByte()
        if (i > 0) {
          npc.menuBattle = new Array(i)
          npc.battleID = new Array(i)
          npc.battleReqMissionID = new Array(i)
          npc.battleReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuBattle[o] = p.readUTF()
            npc.battleID[o] = p.readShort()
            npc.battleReqMissionID[o] = p.readShort()
            npc.battleReqMissionState[o] = p.readByte()
          }
        }

        i = p.readByte()
        if (i > 0) {
          npc.menuShop = new Array(i)
          npc.shopID = new Array(i)
          npc.shopReqMissionID = new Array(i)
          npc.shopReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuShop[o] = p.readUTF()
            npc.shopID[o] = p.readShort()
            npc.shopReqMissionID[o] = p.readShort()
            npc.shopReqMissionState[o] = p.readByte()
          }
        }

        i = p.readByte()
        if (i > 0) {
          npc.menuTeacher = new Array(i)
          npc.teacherId = new Array(i)
          npc.teacherReqMissionID = new Array(i)
          npc.teacherReqMissionState = new Array(i)

          for (let o = 0; o < i; o++) {
            npc.menuTeacher[o] = p.readUTF()
            npc.teacherId[o] = p.readShort()
            npc.teacherReqMissionID[o] = p.readShort()
            npc.teacherReqMissionState[o] = p.readByte()
          }
        }

        break
      }
    }

    return npc
  }

  setPosition(i: number, o: number) {
    // throw new Error('Method not implemented.')
  }
}
