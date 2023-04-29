import type { Protocol } from 'libs/base/protocol'
import { Monster } from './Monster'
import { MonsterAI } from './MonsterAI'
import { Skill } from './Skill'

export class Mercenary extends Monster {
  groupId = 0
  expireTime1 = 0
  worldMer: any

  constructor() {
    super()
    this.setType(5)
  }

  refreshWorldMercenaryData() {
    (this.worldMer.hp = this.hp), (this.worldMer.mp = this.mp)
  }

  clone() {
    const n = new Mercenary()

    n.setMonsterData.call(this, <Monster><unknown>n)
    n.groupId = this.groupId
    n.strength = this.strength
    n.hp = this.hp
    n.mp = this.mp
    n.expireTime1 = this.expireTime1
    n.job = this.job
    n.info = this.info

    return n
  }
}

export namespace Mercenary {
  export function fromBytesFull(byte: Protocol) {
    const mercenary = new Mercenary()

    mercenary.groupId = byte.getShort()
    mercenary.expireTime1 = new Date().getTime() + byte.getInt()

    fromBytesMercenary(mercenary, byte)
    const monster = fromBytesMercenary(new Mercenary(), byte)
    mercenary.setPet(monster)

    return mercenary
  }

  export function fromBytesSimple(byte: Protocol) {
    const mercenary = new Mercenary()

    mercenary.groupId = byte.getShort()
    fromBytesSimpleData(byte, mercenary)
    const i = fromBytesSimpleData(byte, new Mercenary())

    return mercenary
  }

  function fromBytesSimpleData(byte: Protocol, mercenary: Mercenary) {
    const n = byte.getInt()

    if (n <= 0)
      return null

    mercenary.id = n
    mercenary.icon1 = byte.getInt()
    mercenary.icon2 = byte.getInt()
    mercenary.icon3 = byte.getInt()

    return mercenary
  }

  function fromBytesMercenary(model: Mercenary, byte: Protocol) {
    const monster = Monster.fromMonsterBytes(model, byte)
    if (!monster)
      return null
    monster.info = byte.getString()
    monster.job = byte.getByte()
    monster.strength = byte.getByte()
    monster.hp = byte.getInt()
    monster.mp = byte.getInt()
    // icon2
    byte.getInt()
    // icon3
    byte.getInt()

    const n = byte.getBoolean()
    if (n) {
      const skills: Skill[] = []
      for (let i = byte.getByte(), a = 0; i > a; a++)
        skills.push(Skill.fromBytes(byte))
      const ai = MonsterAI.fromBytes(byte, skills)
      if (ai)
        monster.monsterAI = ai
    }

    return monster
  }

  export const SOLDIER_STATE_SLEEP = 1
  export const SOLDIER_STATE_FIGHT = 2
  export const SOLDIER_STATE_SACK = 3
  export const PANEL_MERCENARY_SHOP_TYPE = 1
  export const PANEL_MERCENARY_OTHER_TYPE = 2
}
