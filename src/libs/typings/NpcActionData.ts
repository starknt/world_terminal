import type { Mission } from './Mission'
import type { NPC } from './Npc'

export class NPCActionData {
  action = 0
  type = 0
  menu = ''
  data: Mission | NPC

  constructor(menu: string, action: number, thing: Mission | NPC, type?: number) {
    this.menu = menu
    this.action = action
    this.data = thing
    this.type = type ?? 0
  }
}

export namespace NPCActionData {
  export const Type_mission = 1
  export const Type_off_mission = 2
}
