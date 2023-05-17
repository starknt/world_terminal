import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { OFFLINE_DOING, STATUS_OFFLINEMISSION, STATUS_TEMP_DEL } from '../contants/model'

export class Role {
  id!: number
  name!: string
  sex!: number
  race!: number
  job!: number
  level!: number
  vipLevel!: number
  mapName!: string
  icon1!: number
  icon2!: number
  icon3!: number
  status!: number
  time!: number
  info = ''
  intValue1!: number

  isStatusBit(bit: number) {
    return (this.status & bit) !== 0
  }

  setTabStatus(t: boolean, status: number) {
    if (t)
      this.intValue1 |= status
    else
      this.intValue1 &= ~status
  }

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const role = new Role()
    role.id = p.getInt()
    role.name = p.getString()
    role.sex = p.getByte()
    role.race = p.getByte()
    role.job = p.getByte()
    role.level = p.getByte()
    role.vipLevel = p.getByte()
    role.mapName = p.getString()
    role.icon1 = p.getInt()
    role.icon2 = p.getInt()
    role.icon3 = p.getInt()
    role.status = p.getInt()

    if (role.isStatusBit(STATUS_TEMP_DEL))
      role.time = Date.now() + p.getShort() * 60 * 1000

    if (role.isStatusBit(STATUS_OFFLINEMISSION)) {
      if (p.getBoolean()) {
        role.setTabStatus(true, OFFLINE_DOING)
        role.time = Date.now() + p.getShort() * 60 * 1000
        role.info = p.getString()
      }
    }

    return role
  }
}
