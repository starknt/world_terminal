import type { GameService } from 'libs/service/GameService'
import { ItemData } from 'libs/typings/ItemData'
import { Model } from 'libs/typings/Model'
import { Monster } from 'libs/typings/Monster'
import { MonsterGroup } from 'libs/typings/MonsterGroup'
import { PlayerBag } from 'libs/typings/PlayerBag'
import { Skill } from 'libs/typings/Skill'
import type { nato } from './nato'

export namespace Processor {
  export function parseBattleNormalReward(e: nato.Message, service: GameService) {
    const { player } = service

    const money3 = e.getInt()
    if (money3 > 0)
      player.addValue(Model.MONEY3, money3)

    // handle up level
    processUpLevelMsg(e, service)

    const isBagFull = e.getBoolean()

    const hasPet = e.getBoolean()

    if (hasPet) {
      // handle pet reward
      parsePetReward(e, service)
    }

    const l = e.getByte()

    if (l > 0) {
      for (var _ = 0, h = new Array(l), u = new Array(l), c = 0; l > c; c++)
        (h[c] = e.getShort()), (u[c] = e.getByte()), (_ += u[c])
      // handle update kill mission
      player.updateAllKillMission(h, u, null)
      _ > 0 && player.addValue(Model.KILL_COUNT, _)
    }

    const inEscort = e.getBoolean()
    if (inEscort) {
      // TODO: escort
      const d = e.getByte()
    }

    processAddItemMsg(e, service)
  }

  export function parsePetReward(t: nato.Message, service: GameService) {
    const pet = service.player.getPet()

    const exp = t.getInt()
    if (exp > 0)
      pet?.addValue(Model.EXP, exp)

    const upLevel = t.getByte()
    if (upLevel > 0) {
      const sp = t.getShort()
      const growLevel = t.getByte()

      let str = 0
      let con = 0
      let agi = 0
      let ilt = 0
      let wsi = 0
      if (growLevel > 0) {
        str = t.getShort()
        con = t.getShort()
        agi = t.getShort()
        ilt = t.getShort()
        wsi = t.getShort()
      }
      const exp = t.getInt()
      const maxExp = t.getInt()
      const cp = t.getByte()
      const skills: Skill[] = []

      for (let d = t.getByte(), g = 0; d > g; g++)
        skills.push(Skill.fromBytes(t))

      if (pet != null) {
        pet.addValue(Model.LEVEL, upLevel),
        pet.addValue(Model.SP, sp),
        pet.addValue(Model.PET_GROW_LEVEL, growLevel),
        pet.addValue(Model.STR, str),
        pet.addValue(Model.CON, con),
        pet.addValue(Model.AGI, agi),
        pet.addValue(Model.ILT, ilt),
        pet.addValue(Model.WIS, wsi),
        pet.addValue(Model.SET_EXP, exp),
        pet.addValue(Model.SET_EXPMAX, maxExp),
        (pet.cp = cp)

        for (let g = 0; g < skills.length; g++) {
          const S = skills[g]
          if (S != null)
            pet.learnSkill(S)
        }

        pet.resumeHPMP()
      }
    }
  }

  export function processUpLevelMsg(t: nato.Message, service: GameService) {
    const { player } = service

    const exp = t.getInt()
    player.addValue(Model.EXP, exp)
    const upLevel = t.getByte()
    if (upLevel > 0) {
      player.addValue(Model.LEVEL, upLevel)
      const exp = t.getInt()
      const maxExp = t.getInt()
      player.addValue(Model.SET_EXP, exp)
      player.addValue(Model.SET_EXPMAX, maxExp)
      const sp = t.getShort()
      if (sp > 0)
        player.addValue(Model.SP, sp)

      const cp = t.getByte()
      if (cp) {
        player.addValue(Model.CP, cp)
        player.setTabStatus(true, Model.ATTR_NEW_NOTICE)
      }
    }

    const exp2 = t.getInt()
    if (exp2 > 0)
      player.addValue(Model.EXP2, exp2)
    const upLevel2 = t.getByte()
    if (upLevel2 > 0) {
      player.addValue(Model.LEVEL2, upLevel2)
      const exp2 = t.getInt()
      const maxExp2 = t.getInt()
      player.addValue(Model.SET_EXP2, exp2)
      player.addValue(Model.SET_EXPMAX2, maxExp2)
    }

    if (upLevel > 0 || upLevel2 > 0)
      player.resumeHPMP()
  }

  export function processAddItemMsg(t: nato.Message, service: GameService) {
    const { player } = service
    const n = player
    const i = player.bag
    for (
      let o = t.getByte(), a: ItemData | null = null, r = 0, l = 0;
      o > l;
      l++
    ) {
      const _ = t.getByte()
      if (((r = t.getByte()), _ == 1)) {
        var h = 255 & t.getByte();
        (a = ItemData.fromBytes(t)),
        n.bag.addItem(PlayerBag.TYPE_BAG_POS, a, r),
        h != a.slotPos
      }
      else if (_ == 2) {
        const u = t.getInt()
        var h = 255 & t.getByte();
        (a = i.getItem(h)),
        a != null && (a.quantity += r),
        a == null || (a.quantity > a.stackNum, a.id != u)
      }
      r > 0
        && a != null
      // PlayerBag.checkServerEquip(a)
    }
  }

  export function processMissionNPCStatus(t: nato.Message, service: GameService) {
    for (let e = t.getByte(), n = 0; e > n; n++) {
      const i = t.getByte()
      const o = t.getByte()
      const a = service.gameMap.getNpcByID(i, false)
      a != null && a.setSign(o)
    }
  }

  export function processMyMercenaryCheck(t: nato.Message, service: GameService) {
    const e = service.player

    for (let n = t.getByte(), i = 0; n > i; i++) {
      const o = (t.getBoolean(), t.getShort())
      t.getString()
      if (e) {
        const a = e.getMercenaryById(o)
        if (a == null)
          continue
        e.removeMercenary(a)
      }
    }
  }

  export function processDataMonsterMsg(t: nato.Message, service: GameService) {
    const e = t.getByte()
    const monsters: Monster[] = []

    if (e <= 0)
      return []

    for (let i = 0; i < e; i++) {
      const monster = Monster.fromMonsterBytes(new Monster(), t)

      if (monster)
        monsters.push(monster)
    }

    return monsters
  }

  export function processDataMonsterGroupMsg(t: nato.Message, service: GameService) {
    const monsterGroup: MonsterGroup[] = []

    for (let e = t.getByte(), n = 0; n < e; n++)
      monsterGroup.push(MonsterGroup.fromBytes(t))

    return monsterGroup
  }
}
