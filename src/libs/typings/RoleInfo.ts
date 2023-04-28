import { Protocol } from 'libs/base/protocol'
import { Model } from './Model'
import { Player } from './Player'

export class RoleInfo extends Player {
  id: number
  name: string
  level: number
  vip: number
  sex: number
  race: number
  job: number
  icon: number
  map: string

  constructor(id: number, name: string, map: string, level: number, vip: number, sex: number, race: number, job: number, icon1: number) {
    super()

    this.id = id
    this.name = name
    this.map = map
    this.level = level
    this.vip = vip
    this.sex = sex
    this.race = race
    this.job = job
    this.icon = icon1
  }
}

export namespace RoleInfo {
  export function fromBytes(t: Protocol) {
    const id = t.getInt()
    const Name = t.getString()
    const Sex = t.getByte()
    const Race = t.getByte()
    const Job = t.getByte()
    const Level = t.getByte()
    const VipLevel = t.getByte()
    const MapName = t.getString()
    const Icon1 = t.getInt()
    const Icon2 = t.getInt()
    const Icon3 = t.getInt()
    const status = t.getInt()
    const roleInfo = new RoleInfo(id, Name, MapName, Level, VipLevel, Sex, Race, Job, Icon1)
    roleInfo.setStatus(status)

    if (roleInfo.isStatusBit(Model.STATUS_TEMP_DEL)) {
      const n = t.getShort()

      roleInfo.setTimes(Date.now() + n * 60 * 1000)
    }

    if (roleInfo.isStatusBit(Model.STATUS_OFFLINEMISSION)) {
      const i = t.getBoolean()
      if (!i) {
        roleInfo.setTabStatus(true, Model.OFFLINE_DOING)
        const n = t.getShort()
        roleInfo.setTimes(Date.now() + n * 60 * 1000)
        roleInfo.setInfo(t.getString())
      }
    }

    return roleInfo
  }
}
