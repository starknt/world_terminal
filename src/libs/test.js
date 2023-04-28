const msg = MsgHandler.createEnterLocalBattle()

nato.Network.sendCmd(msg)

setTimeout(() => {
  const id = xself.missionList[0].submitCondition[0].getKillMonsterCondition().id
  xworld.battleSeed = Tool.nextSeed(xworld.battleSeed)

  const t = new nato.Message(ProtocolDefine.CG_FIGHT_RUN_LOCALBATTLE)
  t.putInt(5260),
  t.putInt(24161),
  t.putInt(xself.hp),
  t.putInt(xself.mp),
  t.putShort(xworld.battleSeed) // seed
  t.putShort(id) // groupId
  t.putBoolean(true) // pet
  t.putByte(2) // if pet a / 2

  const playerList = MonsterGroup.getLocalBattlePlayerList(xself, xworld.monsterGroupList[id])
  const plans = []

  const o = []
  const plan1 = new egret.ByteArray()
  plan1.writeByte(2)
  plan1.writeByte(2)
  plan1.writeShort()
  o.push(plan1)
  const plan2 = new egret.ByteArray()
  plan2.writeByte(0)
  o.push(plan2)
  const plan3 = new egret.ByteArray()
  plan3.writeByte(1)
  plan3.writeByte(4)
  o.push(plan3)
  const plan4 = new egret.ByteArray()
  plan4.writeByte(0)
  o.push(plan4)

  for (let r = 0; r < plans.length;) {
    const s = plans[r++]
    t.putBytes(s)
    if (true) {
      let l = null
      r < plans.length && (l = plans[r++]),
      t.putBytes(l)
    }
  }

  nato.Network.sendCmd(t)
}, 500)
// 1 1
// 0
// 1 4
// 0

// 1 2
// 2 4 23 127
