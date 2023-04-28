<script setup lang="ts">
import { GameText } from 'libs/defined/gameText'
import type { Player } from 'libs/typings/Player'
import { ModelConst } from '~/shared/enum'

const { player } = defineProps<{
  player: Player
}>()
</script>

<template>
  <div py-4 px-2>
    <n-collapse display-directive="show" arrow-placement="right" accordion>
      <n-collapse-item title="人物基本属性">
        <n-scrollbar style="max-height: 240px;">
          <n-descriptions :columns="1" bordered label-placement="left" size="small">
            <n-descriptions-item label="称号">
              <template #default>
                {{ player.title !== 'null' ? player.title : '无' }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_HP">
              <template #default>
                {{ player.get(ModelConst.HP) }}/{{ player.get(ModelConst.HPMAX) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_MP">
              <template #default>
                {{ player.get(ModelConst.MP) }}/{{ player.get(ModelConst.MPMAX) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_STR">
              <template #default>
                {{ player.get(ModelConst.STR) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_CON">
              <template #default>
                {{ player.get(ModelConst.CON) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_AGI">
              <template #default>
                {{ player.get(ModelConst.AGI) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_ILT">
              <template #default>
                {{ player.get(ModelConst.ILT) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_WIS">
              <template #default>
                {{ player.get(ModelConst.WIS) }}
              </template>
            </n-descriptions-item>
          </n-descriptions>
        </n-scrollbar>
      </n-collapse-item>

      <n-collapse-item title="人物详细属性">
        <n-scrollbar style="max-height: 360px;">
          <n-descriptions :columns="1" bordered label-placement="left" size="small">
            <n-descriptions-item label="战力">
              <template #default>
                {{ player.getPower(false) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item v-if="player.getType() === 3" :label="GameText.STR_ATTR_LEVEL2">
              <template #default>
                {{ player.get(ModelConst.LEVEL2) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_ATK_STR">
              <template #default>
                {{ player.get(ModelConst.ATK_STR) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_ATK_AGI">
              <template #default>
                {{ player.get(ModelConst.ATK_AGI) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_ATK_MAGIC">
              <template #default>
                {{ player.get(ModelConst.ATK_MAGIC) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_EQUIP_ATK">
              <template #default>
                {{ player.get(ModelConst.ATK_MIN) }} ~ {{ player.get(ModelConst.ATK_MAX) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_ATK_TIME">
              <template #default>
                {{ player.get(ModelConst.ATK_TIME) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_HIT_RATE">
              <template #default>
                {{ player.get(ModelConst.HIT_RATE) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_HIT_MAGIC">
              <template #default>
                {{ player.get(ModelConst.HIT_MAGIC) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_BRK">
              <template #default>
                {{ player.get(ModelConst.BRK_ARMOR) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_CRITICAL">
              <template #default>
                {{ player.get(ModelConst.CRITICAL) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_MAGIC_PEN">
              <template #default>
                {{ player.get(ModelConst.MAGIC_PENETRATION) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_FORCE_HIT">
              <template #default>
                {{ player.get(ModelConst.FORCE_HIT) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视状态抵抗">
              <template #default>
                {{ player.get(ModelConst.IGNORE_WIL) }}%
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视伤害减免">
              <template #default>
                {{ player.get(ModelConst.IGNORE_TOUCH) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视格挡">
              <template #default>
                {{ player.get(ModelConst.IGNORE_BLOCK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视反击">
              <template #default>
                {{ player.get(ModelConst.IGNORE_BACK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视洞察">
              <template #default>
                {{ player.get(ModelConst.IGNORE_INSIGHT) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item label="无视魔法反馈">
              <template #default>
                {{ player.get(ModelConst.IGNORE_MAGIC_BACK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_DEF_STR">
              <template #default>
                {{ player.get(ModelConst.DEF_STR) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_DEF_AGI">
              <template #default>
                {{ player.get(ModelConst.DEF_AGI) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_DEF_MAGIC">
              <template #default>
                {{ player.get(ModelConst.DEF_MAGIC) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_BLOCK">
              <template #default>
                {{ player.get(ModelConst.BLOCK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_CHANGE_ATT_DESC_DODGE">
              <template #default>
                {{ player.get(ModelConst.DODGE) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_INSIGHT">
              <template #default>
                {{ player.get(ModelConst.INSIGHT) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_BACK">
              <template #default>
                {{ player.get(ModelConst.BACK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_TOUGH">
              <template #default>
                {{ player.get(ModelConst.TOUGH) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_DEF_FIELD">
              <template #default>
                {{ player.get(ModelConst.DEF_FIELD) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_MAGIC_BACK">
              <template #default>
                {{ player.get(ModelConst.MAGIC_BACK) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_WIL">
              <template #default>
                {{ player.get(ModelConst.WIL) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_SPEED">
              <template #default>
                {{ player.get(ModelConst.SPEED) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_KEEPOUT_ATK_TIME">
              <template #default>
                {{ player.get(ModelConst.KEEPOUT_ATK_TIME) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_GET_HP">
              <template #default>
                {{ player.get(ModelConst.LIFE_ABSORPTION) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_GET_MP">
              <template #default>
                {{ player.get(ModelConst.MANA_ABSORPTION) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_AUTO_HP">
              <template #default>
                {{ player.get(ModelConst.HEAL_RECOVERY) }}
              </template>
            </n-descriptions-item>
            <n-descriptions-item :label="GameText.STR_ATTR_AUTO_MP">
              <template #default>
                {{ player.get(ModelConst.MANA_RECOVERY) }}
              </template>
            </n-descriptions-item>
          </n-descriptions>
        </n-scrollbar>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
