import { Tool } from 'libs/shared/Tool'
import { Battle } from './battle'

export class Control {
  type = 0
  byte0 = 0
  byte1 = 0
  byte2 = 0
  int0 = 0
  int1 = 0
  int2 = 0
  counter = 0
  maxCounter = 0
  subControlIndex = 0
  subControls: any[] = []
  spriteStatusFlag = 0
  POINTER_NEARFY = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  datas: any

  constructor(type: number) {
    this.type = type
  }

  setSubControlList(t) {
    this.subControls = t
  }

  fromBytes(e) {
    switch (this.type) {
      case Control.TYPE_BATTLE_SKILL:
        this.fromBytesBattleSkill(e)
        break
      case Control.TYPE_BATTLE_ESCAPE:
        this.fromBytesBattleEscape(e)
        break
      case Control.TYPE_BATTLE_TARGET_EFFECT:
      case Control.TYPE_BATTLE_SELF_EFFECT:
        this.fromBytesBattleEffect(e)
    }
  }

  fromBytesBattleEffect(t: egret.ByteArray) {
    (this.byte0 = t.readByte()),
    (this.counter = t.readShort()),
    Battle.isEffectStatus(this.counter, Battle.EFFECT_INT_VALUE)
      ? (this.int0 = t.readInt())
      : Battle.isEffectStatus(this.counter, Battle.EFFECT_SHORT_VALUE)
        ? (this.int0 = t.readShort())
        : Battle.isEffectStatus(
          this.counter,
          Battle.EFFECT_BYTE_VALUE,
        ) && (this.int0 = t.readByte()),
    Battle.isEffectStatus(this.counter, Battle.EFFECT_HAS_ANIME)
      && (this.int1 = 65535 & t.readShort())
  }

  fromBytesBattleEscape(e: egret.ByteArray) {
    (this.byte0 = e.readByte()), (this.byte1 = e.readByte())
  }

  fromBytesBattleSkill(e: egret.ByteArray) {
    this.byte0 = e.readByte()
    const n = e.readShort()
    n > 0
      && ((this.datas = new egret.ByteArray()), e.readBytes(this.datas, 0, n))
    const i = e.readByte()
    if (i > 0) {
      this.subControls = new Array(i)
      for (let o = 0; i > o; o++) {
        const a = new Control(e.readByte())
        a.fromBytes(e), (this.subControls[o] = a)
      }
    }
  }
}

export namespace Control {
  export function createBattleUseSkillControl(e, n, i, o, a, r, s, l) {
    const _ = new Control(TYPE_BATTLE_SKILL)
    _.byte0 = e
    const h = new egret.ByteArray()
    h.writeByte(n)
    let u = 0
    return (
      i >= 0 && (u = Tool.setBit(true, BCONTROL_HAS_AREA_LIST, u)),
      s > 0 && (u = Tool.setBit(true, BCONTROL_HAS_ANIME2, u)),
      l != null && (u = Tool.setBit(true, BCONTROL_HAS_NAME, u)),
      h.writeByte(u),
      Tool.isBit(BCONTROL_HAS_AREA_LIST, u) && h.writeByte(i),
      h.writeByte(o),
      h.writeByte(a),
      h.writeShort(r),
      Tool.isBit(BCONTROL_HAS_ANIME2, u) && h.writeShort(s),
      Tool.isBit(BCONTROL_HAS_NAME, u) && h.writeUTF(l),
      (_.datas = h),
      _
    )
  }

  export function createBattleTargetEffect(e, n, i, o, a, r?: any) {
    void 0 === r && (r = 0)
    const s = new Control(TYPE_BATTLE_TARGET_EFFECT)
    return (
      e && (s.type = TYPE_BATTLE_SELF_EFFECT),
      (s.byte0 = n),
      (s.counter = o),
      (s.int0 = i),
      (s.int1 = a),
      (s.int2 = r),
      s
    )
  }

  export function createBattleTargetEffectOther(e, n, i, o) {
    return createBattleTargetEffect(false, e, n, i, o)
  }

  export function fromBytes(e: egret.ByteArray) {
    const n = new Control(e.readByte())
    return n.fromBytes(e), n
  }

  export const DEFAULT_MOVE_SPEED = 14 //  MapSetup.GRID_WIDTH / 3
  export const AUTO_MOVE_END_STEP = 1
  export const TYPE_NONE = 0
  export const TYPE_JUMP_MAP = 1
  export const TYPE_MOVE_TO = 14
  export const TYPE_MOVE = 15
  export const TYPE_PIXEL_MOVE = 80
  export const TYPE_CHANGE_STAGE = 81
  export const BCONTROL_HAS_AREA_LIST = 1
  export const BCONTROL_HAS_NAME = 2
  export const BCONTROL_HAS_ANIME2 = 4
  export const TYPE_BATTLE_SKILL = 31
  export const TYPE_BATTLE_ESCAPE = 32
  export const TYPE_BATTLE_TARGET_EFFECT = 33
  export const TYPE_BATTLE_SELF_EFFECT = 34
  export const FLAG_FINISH = 2
  export const FLAG_INIT = 4
}
