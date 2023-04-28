import { Protocol } from 'libs/base/protocol'
import { Battle } from 'libs/service/Battle/battle'
import type { GameMap } from './GameMap'
import type { Model } from './Model'
import type { Monster } from './Monster'
import type { Player } from './Player'

export class MonsterGroup {
  flag = 0
  groupId = 0
  type = 0
  nextBattleGroupID = 0
  monsters: number[] = new Array(MonsterGroup.MONSTERGROUP_MONSTERS)
  npcs: number[] = new Array(MonsterGroup.MONSTERGROUP_NPCS)

  isFlag(flag: number) {
    return (this.flag & flag) != 0
  }

  setGroupMonsterDataToBattle(map: GameMap, layout: any[]) {
    let monsterId = 0
    for (let i = 0; i < this.monsters.length; i++) {
      monsterId = this.monsters[i]
      let monster = map.getMonster(monsterId)
      if (monster) {
        monster = monster.clone()
        monster.resumeHPMP()
        monster.position = i
        layout[i] = monster
      }
    }
  }

  getGroupNPCList(map: GameMap) {
    const n: Monster[] = new Array(this.npcs.length)
    let t: number
    let e: Monster
    for (
      let i = 0;
      i < this.npcs.length;
      i++
    ) {
      (t = this.npcs[i]),
      t <= 0
        || ((e = map.getMonster(t)),
        e != null && ((e = e.clone()), e.resumeHPMP(), (n[i] = e)))
    }
    return n
  }
}

export namespace MonsterGroup {
  export function fromBytes(byte: Protocol) {
    const monsterGroup = new MonsterGroup()

    monsterGroup.groupId = 65535 & byte.getShort()
    monsterGroup.type = byte.getByte()
    monsterGroup.nextBattleGroupID = 65535 & byte.getShort()
    monsterGroup.flag = byte.getByte()

    let i = 10
    if (monsterGroup.isFlag(MonsterGroup.FLAG_MONSTER_20))
      i = MonsterGroup.MONSTERGROUP_MONSTERS

    for (let o = 0; o < i; o++)
      monsterGroup.monsters[o] = byte.getShort()

    if (monsterGroup.isFlag(MonsterGroup.FLAG_HAVE_NPC)) {
      for (let o = 0; o < MonsterGroup.MONSTERGROUP_NPCS; o++)
        monsterGroup.npcs[o] = byte.getShort()
    }

    return monsterGroup
  }

  export function processDataMonsterGroupMsg(byte: Protocol) {
    const monsterGroup: MonsterGroup[] = []

    for (let e = byte.getByte(), n = 0; n < e; n++)
      monsterGroup.push(MonsterGroup.fromBytes(byte))

    return monsterGroup
  }

  export function getLocalBattlePlayerList(player: Player, map: GameMap, group: MonsterGroup) {
    const n = Battle.LOCAL_BATTLE_MY_POS
    const i = n - 1
    const o: Model[] = new Array(Battle.MAX_POS)

    group.setGroupMonsterDataToBattle(map, o)
    player.position = n
    o[player.position] = player
    const pet = player.pet
    if (pet) {
      pet.position = i
      o[pet.position] = pet
    }

    let r = n - 2
    let s = n + 2
    let l = 0
    const _ = player.getMerList()
    for (let h = 0, u = 0; u < _.length; u++) {
      const c = _[u]
      if (
        c != null
        && ((1 & h) == 0 ? ((l = r), (r -= 2)) : ((l = s), (s += 2)),
        h++,
        !(l < 0 || l >= Battle.MAX_POS || Battle.isLeftSide(l)))
      ) {
        const T = c.clone();
        (T.position = l), (o[T.position] = T)
        const p = c.pet as unknown as Monster
        if (p != null) {
          const d = p.clone();
          (d.position = l - 1), (o[d.position] = d)
        }
      }
    }

    const E = group.getGroupNPCList(map)
    if (E != null) {
      for (let u = 0; u < E.length; u++) {
        const c = E[u]
        c != null
          && ((l = r),
          u >= 2 && (l = s),
          (1 & u) != 0 && (l -= 1),
          l < 0
            || l >= Battle.MAX_POS
            || Battle.isLeftSide(l)
            || ((c.position = l), (o[c.position] = c)))
      }
    }

    return o
  }

  export const FLAG_MONSTER_20 = 1
  export const FLAG_HAVE_NPC = 2
  export const MONSTERGROUP_MONSTERS = 20
  export const MONSTERGROUP_NPCS = 4
}
