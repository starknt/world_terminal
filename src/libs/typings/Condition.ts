import { Define } from 'libs/defined/defined'
import { Tools } from 'libs/shared/Tool'
import { Mission } from './Mission'
import type { Player } from './Player'
import { TaskTargetData } from './TaskTargetData'

export class Condition {
  type = 0
  not = 0
  data: egret.ByteArray = new egret.ByteArray()

  constructor(type: number) {
    this.type = type
  }

  getType() {
    return this.type
  }

  isConditionOfSatisfy(player: Player) {
    return this.checkCondition(player)
  }

  checkCondition(player: Player) {
    this.data.position = 0
    let result = true
    switch (this.type) {
      case 0:
        result = true
        break
      case 1:
        // xself level
        result = player.level >= this.data.readByte()
        break
      case 2:
        {
          this.data.readShort()
          this.data.readUTF()
          const a = this.data.readByte()
          const r = this.data.readByte()
          result = r >= a
        }
        break
      case 3:
        {
          // 消耗黄金
          const s = this.data.readInt()
          result = player.money1 >= s
        }
        break
      case 4:
        {
          // 优先消耗金叶
          const s = this.data.readInt()
          result = player.money2 >= s
        }
        break
      case 5:
        {
          // 消耗铜币
          const s = this.data.readInt()
          result = player.money3 >= s
        }
        break
      case 6:
        {
          // 国家贡献?
          const s = this.data.readShort()
          result = player.countryHonor >= s
        }
        break
      case 33:
        {
          // 国家等级
          const s = this.data.readByte()
          result = player.countryRank >= s
        }
        break
      case 34:
        {
          // 国家等级
          const s = this.data.readByte()
          result = player.countryRank >= s
        }
        break
      case 7:
        {
          // 消耗物品
          const id = this.data.readInt()
          const name = this.data.readUTF()
          const count = this.data.readByte()

          const itemNum = player.bag.getItemNumByID(id)

          result = itemNum >= count
          console.log(`完成条件: 消耗物品(${id}) ${name} ${count}`)
        }
        break
      case 8:
        {
          // ??
          const id = this.data.readInt()
          const name = this.data.readUTF()
          result = player.bag.isEquipItemByIdInEquip(id)
          console.log(`完成条件: 装备(${id}) ${name}`)
        }
        break
      case 9:
        {
          // 完成某个任务
          const id = this.data.readShort()
          const name = this.data.readUTF()
          result = Mission.isMissionFinish(player, id)
          console.log(`完成条件: 完成任务(${id}) ${name}`)
        }
        break
      case 10:
        {
          // 领取某个任务
          const id = this.data.readShort()
          const name = this.data.readUTF()
          result = !!player.missionList.find(m => m.id === id)
          console.log(`完成条件: 领取任务(${id}) ${name}`)
        }
        break
      case 11:
        {
          // race
          const race = this.data.readByte()
          result = race === player.race
        }
        break
      case 32:
        {
          // job
          const job = this.data.readByte()
          result = job === player.job
        }
        break
      case 12:
        {
          // mapId
          const mapId = this.data.readShort()
          const mapName = this.data.readUTF()

          console.log(`完成条件: 在地图(${mapId}) ${mapName}`)
        }
        break
      case 13:
        {
          // ??
          this.data.readByte()
          this.data.readByte()
        }
        break
      case 14:
        {
          // ??
          this.data.readByte()
          this.data.readByte()
        }
        break
      case 15:
        // 性别
        result = player.sex === Define.SEX_MALE
        break
      case 16:
        break
      case 17:
        this.data.readByte()
        break
      case 18:
        {
          // HP
          const hp = this.data.readInt()
          result = player.hp >= hp
        }
        break
      case 19:
        {
          // MP
          const mp = this.data.readInt()
          result = player.mp >= mp
        }
        break
      case 20:
        {
          // con 体质
          const con = this.data.readShort()
          result = player.con >= con
        }
        break
      case 21:
        {
          // str 力量
          const str = this.data.readShort()
          result = player.str >= str
        }
        break
      case 22:
        {
          // ilt 智力
          const ilt = this.data.readShort()
          result = player.ilt >= ilt
        }
        break
      case 23:
        {
          // agi 敏捷
          const agi = this.data.readShort()
          result = player.agi >= agi
        }
        break
      case 24:
        {
        // vip
          const vip = this.data.readByte()
          result = player.vipLevel >= vip
        }
        break
      case 25:
        break
      case 28:
        break
      case 26:
        {
          // city scale ??
          const scale = this.data.readByte()
        }
        break
      case 27:
        {
          // city level 等级
          const level = this.data.readByte()
        }
        break
      case 29:
        {
          // city degree 繁荣度
          const degree = this.data.readByte()
        }
        break
      case 30:
        {
          // city army 军力值
          const army = this.data.readByte()
        }
        break
      case 31:
      {
        // city master id

      }
    }

    return this.not ? !result : result
  }

  setKilledMonsterNum(id: number, killed: number, flag = false) {
    if (this.type === 2) {
      const o = this.data
      o.position = 0
      const mid = o.readShort()
      const description = o.readUTF()
      const s = o.readByte()
      const okilled = o.readByte()
      let _ = 0
      if (!flag) {
        if (mid !== id)
          return
        let h = okilled + killed
        if (h > Tools.MAX_VALUE_byte)
          _ = h = Tools.MAX_VALUE_byte
      }
      const u = new egret.ByteArray()
      u.writeShort(mid)
      u.writeUTF(description)
      u.writeByte(s)
      u.writeByte(_)
      this.data = u
    }
  }

  isShowTargetType() {
    return !!(this.type === 2 || this.type === 7)
  }

  getTargetData(player: Player) {
    const t = this.data
    t.position = 0
    let taskTargetData: TaskTargetData | null = null
    if (this.type === 2) {
      t.readShort()
      const name = t.readUTF()
      const needCount = t.readByte()
      const currentCount = t.readByte()
      taskTargetData = new TaskTargetData()
      taskTargetData.showName = name
      taskTargetData.currentCount = currentCount
      taskTargetData.needCount = needCount
    }
    else if (this.type === 7) {
      const id = t.readInt()
      const name = t.readUTF()
      const needCount = t.readByte()
      const currentCount = player.bag.getItemNumByID(id)
      taskTargetData = new TaskTargetData()
      taskTargetData.showName = name
      taskTargetData.currentCount = currentCount
      taskTargetData.needCount = needCount
    }
    return taskTargetData
  }

  cleanKillMonster() {
    this.setKilledMonsterNum(0, 0, true)
  }

  updateKilledMonsterNum(mid: number, killed: number) {
    this.setKilledMonsterNum(mid, killed, false)
  }

  isNestedMissionType() {
    return this.type === 9
  }

  isKillMonsterType() {
    return this.type === 2
  }

  isCollectItemType() {
    return this.type === 7
  }

  isCollectMonsterDropItemType() {
    if (this.type !== 7)
      return false
    this.data.position = 0
    const id = this.data.readInt()
    this.data.readUTF()
    this.data.readByte()
    return Condition.COLLECT_ITEM_DROP_FROM_MONSTER.includes(id)
  }

  getKillMonsterCondition() {
    if (!this.isKillMonsterType())
      return null
    this.data.position = 0
    const id = this.data.readShort()
    const name = this.data.readUTF()
    const total = this.data.readByte()
    const current = this.data.readByte()
    return { id, name, total, current }
  }

  getCollectItemCondition() {
    if (!this.isCollectMonsterDropItemType())
      return null
    this.data.position = 0
    const id = this.data.readInt()
    const name = this.data.readUTF()
    const total = this.data.readByte()
    const current = 0
    return { id, name, total, current }
  }
}

export namespace Condition {
  export function fromBytes(byte: egret.ByteArray) {
    const type = byte.readByte()
    const condition = new Condition(type)
    condition.not = byte.readByte()
    const o = 255 & byte.readByte()
    const byteArray = new egret.ByteArray()

    if (o > 0) {
      byte.readBytes(byteArray, byteArray.position, o)
      condition.data = byteArray
    }

    return condition
  }

  export const COLLECT_ITEM_DROP_FROM_MONSTER = [
    1, 2, 3, 4, 5, 6, 8, 9, 10, 60, 61, 75, 89, 105, 303, 304, 306, 501, 502,
    503, 504, 505, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518,
    519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533,
    534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548,
    549, 550, 551, 552, 553, 554, 555, 556, 600, 700, 701, 702, 703, 710, 715,
    730, 751, 824, 35004, 9038, 9039, 9040,
  ]
  export const COLLECT_ITEM_DROP_FROM_MONSTER_GROUP = [
    1, 2, 3, 4, 5, 6, 8, 9, 10, 60, 61, 75, 89, 105, 303, 304, 306, 501, 502,
    503, 504, 505, 507, 508, 509, 409, 511, 512, 513, 514, 515, 516, 517, 518,
    519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533,
    534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548,
    549, 550, 551, 552, 553, 554, 555, 556, 600, 700, 701, 702, 703, 710, 715,
    730, 751, 824, 35004, 9038, 9039, 9040,
  ]
}
