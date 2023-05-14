import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { MODE_SHOP } from '../contants/model'

export class Model {
  id!: number
  name!: string
  info!: string
  title!: string
  level!: number
  level2!: number
  icon1!: number
  icon2!: number
  icon3!: number
  settings!: number
  status!: number
  mode!: number
  shopName!: string
  shopType!: number
  countryId!: number
  countryName!: string
  countryRank!: number
  x!: number
  y!: number
  vipLevel!: number

  isStatusBit(bit: number) {
    return (this.status & bit) !== 0
  }

  setStatusBit(bit: number) {
    this.status |= bit
  }

  clearStatusBit(bit: number) {
    this.status &= ~bit
  }

  isSettingBit(bit: number) {
    return (this.settings & bit) !== 0
  }

  setSettingBit(bit: number) {
    this.settings |= bit
  }

  clearSettingBit(bit: number) {
    this.settings &= ~bit
  }

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const model = new Model()
    model.id = p.getInt()
    model.name = p.getString()
    model.info = p.getString()
    model.title = p.getString()
    model.level = p.getByte()
    model.level2 = p.getByte()
    model.icon1 = p.getInt()
    model.icon2 = p.getInt()
    model.icon3 = p.getInt()
    model.settings = p.getInt()
    model.status = p.getInt()
    model.mode = p.getByte()
    if (model.mode === MODE_SHOP) {
      model.shopName = p.getString()
      model.shopType = p.getByte()
    }

    model.countryId = p.getInt()
    if (model.countryId >= 0) {
      model.countryName = p.getString()
      model.countryRank = p.getByte()
    }
    model.x = p.getByte()
    model.y = p.getByte()
    model.vipLevel = p.getByte()

    return model
  }
}
