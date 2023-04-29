import { Battle } from 'libs/service/Battle/battle'
import { Control } from 'libs/service/Battle/Control'
import { Model } from 'libs/typings/Model'
import type { Player } from 'libs/typings/Player'
import { PlayerBuffer } from 'libs/typings/PlayerBuffer'

export namespace Define {
  export const SPRITE_USE_ITEM = 1215
  export const ID_PER_AREA = 5e7
  export const startChar = 97
  export const endChar = 122
  export const SUCCESS = 1
  export const ERROR = -1
  export const BACK_ERROR_DUR = -400
  export const BACK_ERROR_NULL_HAND = -401
  export const BACK_ERROR_JUMP_SHOP = -100
  export const BACK_ERROR_HIGH_KEY3 = -48
  export const BACK_ERROR_HIGH_KEY4 = -47
  export const BACK_ERROR_IDENTIFY_KEY = -49
  export const LANG_ZHCN = 0
  export const LANG_ZHHK = 1
  export const LANG_EN = 2
  export const LANG_JPN = 3
  export const LANG_IND = 4
  export const LANG_DEFAULT = Define.LANG_ZHCN
  export const ACTOR_LEAVE_TYPE_BACKTOLIST = 1
  export const ACTOR_LEAVE_TYPE_BACKTOLOGINLIST = 2
  export const ACTOR_LEAVE_TYPE_BACKTOLOGIN = 3
  export const ACTOR_LEAVE_TYPE_KICKTOLIST = 4
  export const ACTOR_LEAVE_TYPE_KICKTOLOGIN = 5
  export const ACTOR_LEAVE_TYPE_SELFKICK = 6
  export const ACTOR_LEAVE_TYPE_SESSIONCLOSE = 7
  export const SETTING_INVITE_REJECT = 1
  export const SETTING_JOIN_ACCEPT = 2
  export const SETTING_JOIN_REJECT = 4
  export const SETTING_CHAT_WORLD_OFF = 8
  export const SETTING_CHAT_MAP_OFF = 16
  export const SETTING_CHAT_COUNTRY_OFF = 32
  export const SETTING_CHAT_TEAM_OFF = 64
  export const SETTING_CHAT_PRIVATE_OFF = 128
  export const SETTING_SHOW_TRANSPORT_OFF = 256
  export const SETTING_SHOW_PET_OFF = 512
  export const SETTING_PET_PLAN_OFF = 1024
  export const SETTING_SHOW_CHAT_ALL = 2048
  export const SETTING_SHOW_CHAT_MORE = 4096
  export const SETTING_SHOW_CHAT_OFF = 8192
  export const SETTING_MASTER_REJECT = 16384
  export const SETTING_SPRITE_GUIDE = 32768
  export const SETTING_CHAT_UNION_OFF = 65536
  export const SETTING_MINI_MAP_ALL = 1 << 18
  export const SETTING_MINI_MAP_OFF = 1 << 19
  export const SETTING_SHOW_NAME_ALL = 1 << 20
  export const SETTING_SHOW_NAME_OFF = 1 << 21
  export const SETTING_SHOW_PLAYER_ALL = 1 << 22
  export const SETTING_SHOW_PLAYER_FAR = 1 << 23
  export const SETTING_SHOW_PLAYER_OFF = 1 << 24
  export const SETTING_MAP_IMG_MINI = 1 << 25
  export const SETTING_MAP_IMG_OFF = 1 << 26
  export const SETTING_SPRITE_MINI = 1 << 27
  export const SETTING_PLAYER_MINI = 1 << 28
  export const SETTING_MAP_PLAYER_LOAD_50 = 1 << 29
  export const SETTING_MAP_PLAYER_LOAD_20 = 1 << 30
  export const SETTING_GLOBAL_START = 18
  export const SETTING_GLOBAL_END = 30
  export const CHAT_TYPE_WORLD = 1
  export const CHAT_TYPE_MAP = 2
  export const CHAT_TYPE_COUNTRY = 3
  export const CHAT_TYPE_TEAM = 4
  export const CHAT_TYPE_PRIVATE = 5
  export const CHAT_TYPE_SYSTEM = 6
  export const CHAT_TYPE_UNION = 7
  export const CHAT_TYPE_SERVER = 8
  export const CHAT_TYPE_ALL = 10
  export const CHAT_TYPE_NOTHING = 11
  export const DATA_PLAYER_DETAIL = 2
  export const DATA_PLAYER_MISSION_BYTE = 4
  export const DATA_PLAYER_MISSION = 8
  export const DATA_PLAYER_ITEM = 16
  export const DATA_PLAYER_SKILL = 32
  export const DATA_PLAYER_LIST_BASE = 64
  export const DATA_PLAYER_LIST_EXTRA = 128
  export const DATA_MAP_NORMAL = 256
  export const DATA_MAP_MINI = 512
  export const DATA_NPC_BASE = 1024
  export const DATA_MONSTER_GROUP = 2048
  export const DATA_MONSTER_MODEL = 4096
  export const DATA_MAP_IMAGE = 8192
  export const DATA_GUILD_MAP = 16384
  export const DATA_CITY = 32768
  export const DATA_NOTICE = 65536
  export const DATA_SPRITE = 1 << 17
  export const DATA_SPRITE_MINI = 1 << 18
  export const DATA_CLIENT_NEW = 1 << 19
  export const DATA_FORMATION = 1 << 20
  export const DATA_MASTER_INFO = 1 << 21
  export const DATA_TURN_MONSTER = 1 << 22
  export const DATA_END = 32
  export const PLAYER_DATA_FLAG
    = Define.DATA_PLAYER_DETAIL
    | Define.DATA_PLAYER_MISSION_BYTE
    | Define.DATA_PLAYER_MISSION
    | Define.DATA_PLAYER_ITEM
    | Define.DATA_PLAYER_SKILL
    | Define.DATA_FORMATION
    | Define.DATA_TURN_MONSTER
  export const NEW_SCENE_DATA_FLAG
    = Define.DATA_NPC_BASE
    | Define.DATA_MONSTER_GROUP
    | Define.DATA_MONSTER_MODEL
    | Define.DATA_MAP_IMAGE
  export const LOGIN_DATA_FLAG = Define.PLAYER_DATA_FLAG | Define.DATA_NOTICE
  export const SIMPLE_FLASH_DATA_FLAG = Define.DATA_PLAYER_LIST_BASE
  export const REFRESH_DATA_FLAG = Define.PLAYER_DATA_FLAG | Define.SIMPLE_FLASH_DATA_FLAG
  export const JUMP_MAP_DATA_FLAG = Define.SIMPLE_FLASH_DATA_FLAG
  export const ANIME_TYPE_PHYSIC = 0
  export const ANIME_TYPE_MAGIC = 1
  export const ANIME_TYPE_USE_ITEM = 2
  export const ANIME_TYPE_BACKUP = 3
  export const ANIME_NORMAL = 0
  export const ANIME_ALL = 1
  export const ANIME_POINT = 2
  export const ANIME_FRONT = 3
  export const POWER_ADD_MOENY1 = 301
  export const POWER_ADD_MOENY2 = 302
  export const POWER_ADD_MOENY3 = 303
  export const POWER_ADD_ITEM = 304
  export const POWER_NONE = 0
  export const POWER_STR = 1
  export const POWER_STR_PERCENT = 2
  export const POWER_CON = 3
  export const POWER_CON_PERCENT = 4
  export const POWER_AGI = 5
  export const POWER_AGI_PERCENT = 6
  export const POWER_ILT = 7
  export const POWER_ILT_PERCENT = 8
  export const POWER_WIS = 9
  export const POWER_WIS_PERCENT = 10
  export const POWER_HPMAX = 11
  export const POWER_HPMAX_PERCENT = 12
  export const POWER_MPMAX = 13
  export const POWER_MPMAX_PERCENT = 14
  export const POWER_SPEED_PERCENT = 23
  export const POWER_HITRATE_PERCENT = 24
  export const POWER_DODGE_PERCENT = 25
  export const POWER_MAGIC_HITRATE_PERCENT = 26
  export const POWER_CRITICAL_PERCENT = 27
  export const POWER_ATK_STR_PERCENT = 28
  export const POWER_ATK_AGI_PERCENT = 29
  export const POWER_ATK_MAGIC_PERCENT = 30
  export const POWER_DEF_STR_PERCENT = 31
  export const POWER_DEF_AGI_PERCENT = 32
  export const POWER_DEF_MAGIC_PERCENT = 33
  export const POWER_WIL_PERCENT = 34
  export const POWER_TOUGH_PERCENT = 35
  export const POWER_REFLECTION_PERCENT = 36
  export const POWER_BLOCK_PERCENT = 37
  export const POWER_INSIGHT_PERCENT = 38
  export const POWER_PENETRATION_PERCENT = 39
  export const POWER_DEF_FIELD_PERCENT = 40
  export const POWER_BACK_PERCENT = 41
  export const POWER_MAGIC_BACK_PERCENT = 42
  export const POWER_LIFE_ABSORPTION_PERCENT = 43
  export const POWER_MANA_ABSORPTION_PERCENT = 44
  export const POWER_MAGIC_PENETRATION_PERCENT = 45
  export const POWER_HIT_FORCE_PERCENT = 46
  export const POWER_HEAL_RECOVERY_PERCENT = 47
  export const POWER_MANA_RECOVERY_PERCENT = 48
  export const POWER_HP = 49
  export const POWER_HP_PERCENT = 50
  export const POWER_MP = 51
  export const POWER_MP_PERCENT = 52
  export const POWER_SPEED = 53
  export const POWER_HITRATE = 54
  export const POWER_DODGE = 55
  export const POWER_MAGIC_HITRATE = 56
  export const POWER_CRITICAL = 57
  export const POWER_ATK_STR = 58
  export const POWER_ATK_AGI = 59
  export const POWER_ATK_MAGIC = 60
  export const POWER_DEF_STR = 61
  export const POWER_DEF_AGI = 62
  export const POWER_DEF_MAGIC = 63
  export const POWER_WIL = 64
  export const POWER_TOUGH = 65
  export const POWER_REFLECTION = 66
  export const POWER_BLOCK = 67
  export const POWER_INSIGHT = 68
  export const POWER_PENETRATION = 69
  export const POWER_DEF_FIELD = 70
  export const POWER_BACK = 71
  export const POWER_MAGIC_BACK = 72
  export const POWER_LIFE_ABSORPTION = 73
  export const POWER_MANA_ABSORPTION = 74
  export const POWER_MAGIC_PENETRATION = 75
  export const POWER_HIT_FORCE = 76
  export const POWER_HEAL_RECOVERY = 77
  export const POWER_MANA_RECOVERY = 78
  export const POWER_REMOVE_STATUS = 79
  export const POWER_RECOVER = 80
  export const POWER_SKILL_DAMAGE = 81
  export const POWER_SKILL_HITRATE = 82
  export const POWER_SELF_CRITICAL = 84
  export const POWER_SKILL_HIT_FORCE = 85
  export const POWER_SKILL_MAGIC_PENETRATION = 86
  export const POWER_SKILL_BRK_ARMOR = 87
  export const POWER_SKILL_REMOVE_STATUS = 88
  export const POWER_PET_DAMAGE = 89
  export const POWER_PET_HPMAX_PERCENT = 90
  export const POWER_PET_MPMAX_PERCENT = 91
  export const POWER_PET_STR_PERCENT = 92
  export const POWER_PET_CON_PERCENT = 93
  export const POWER_PET_AGI_PERCENT = 94
  export const POWER_PET_ILT_PERCENT = 95
  export const POWER_PET_WIS_PERCENT = 96
  export const POWER_RECOVER_PERCENT = 97
  export const POWER_HPMP_RECOVER = 98
  export const POWER_OPEN_STORE = 99
  export const POWER_CHEST_LV1 = 100
  export const POWER_CHEST_LV2 = 101
  export const POWER_CHEST_LV3 = 102
  export const POWER_REQ_SLOT = 103
  export const POWER_TO_WORLDMAP = 104
  export const POWER_TO_GXGY = 105
  export const POWER_EXPIRE_TIME = 106
  export const POWER_RESET_MISSION = 107
  export const POWER_CHEST_KEY_LEVEL = 108
  export const POWER_PET_EGG = 109
  export const POWER_COSTUME = 110
  export const POWER_TRANSPORT = 111
  export const POWER_POWER_TITLE = 112
  export const POWER_GUARD_STR_ATTACK = 113
  export const POWER_GUARD_AGI_ATTACK = 114
  export const POWER_GUARD_MAGIC_ATTACK = 115
  export const POWER_GUARD_CURSE_ATTACK = 116
  export const POWER_GUARD_ALL_ATTACK = 117
  export const POWER_PET_ADD_EXP = 118
  export const POWER_ADD_EXP = 119
  export const POWER_EXP_BY_TIME = 120
  export const POWER_IDENTIFY = 121
  export const POWER_SWORD_ATK_TIME = 122
  export const POWER_BLADE_ATK_TIME = 123
  export const POWER_HEAVY_ATK_TIME = 124
  export const POWER_LANCE_ATK_TIME = 125
  export const POWER_STAFF_ATK_TIME = 126
  export const POWER_HAND_ATK_TIME = 127
  export const POWER_BOW_ATK_TIME = 128
  export const POWER_HAND_ITEM_ATK_TIME = 129
  export const POWER_ALL_ATK_TIME = 130
  export const POWER_COMPOSITE = 131
  export const POWER_SWORD_PERCENT = 133
  export const POWER_BLADE_PERCENT = 134
  export const POWER_HEAVY_PERCENT = 135
  export const POWER_LANCE_PERCENT = 136
  export const POWER_STAFF_PERCENT = 137
  export const POWER_HAND_PERCENT = 138
  export const POWER_BOW_PERCENT = 139
  export const POWER_HAND_ITEM_PERCENT = 140
  export const POWER_ALL_PERCENT = 141
  export const POWER_EQUIP_ARMOR_DUR_PERCENT = 142
  export const POWER_SKILL_HP = 145
  export const POWER_SKILL_HP_PERCENT = 146
  export const POWER_SKILL_MP = 147
  export const POWER_SKILL_MP_PERCENT = 148
  export const POWER_SKILL_LIFE_ABSORPTION = 149
  export const POWER_SKILL_MANA_ABSORPTION = 150
  export const POWER_SKILL_TARGET_BACK = 151
  export const POWER_SKILL_TARGET_MAGIC_BACK = 152
  export const POWER_SKILL_TARGET_BLOCK = 153
  export const POWER_SKILL_TARGET_INSIGHT = 154
  export const POWER_SKILL_TARGET_WIL = 155
  export const POWER_SKILL_TARGET_TOUCH = 156
  export const POWER_GRARD_MASTER_STR_ATTACK = 157
  export const POWER_GRARD_MASTER_AGI_ATTACK = 158
  export const POWER_GRARD_MASTER_MAGIC_ATTACK = 159
  export const POWER_GRARD_MASTER_CURSE_ATTACK = 160
  export const POWER_GRARD_MASTER_ALL_ATTACK = 161
  export const POWER_PET_GRARD_STR_ATTACK = 162
  export const POWER_PET_GRARD_AGI_ATTACK = 163
  export const POWER_PET_GRARD_MAGIC_ATTACK = 164
  export const POWER_PET_GRARD_CURSE_ATTACK = 165
  export const POWER_PET_GRARD_ALL_ATTACK = 166
  export const POWER_EXP_MISSION_BY_TIME = 167
  export const POWER_IGNORE_BACK = 168
  export const POWER_IGNORE_MAGIC_BACK = 169
  export const POWER_IGNORE_BLOCK = 170
  export const POWER_IGNORE_INSIGHT = 171
  export const POWER_IGNORE_WIL = 172
  export const POWER_IGNORE_TOUCH = 173
  export const POWER_BALL_ATK_TIME = 174
  export const POWER_BALL_PERCENT = 175
  export const POWER_SKILL_SCROLL = 176
  export const POWER_SKILL_SCROLL_PET = 177
  export const POWER_KEEPOUT_ATK_TIME = 178
  export const POWER_NEW_GET_PET = 179
  export const POWER_NEW_GET_ITEM = 180
  export const POWER_ENCHANT_ITEM = 181
  export const POWER_FORMATION_BOOK = 182
  export const POWER_CHEST_LV4 = 183
  export const POWER_COLOR_BOX = 184
  export const POWER_TURN_MONSTER_CARD = 185
  export const POWER_SKILL_BOOK_PET = 186
  export const POWER_GUN_ATK_TIME = 190
  export const POWER_GUN_PERCENT = 191
  export const SKILL_TYPE_PASSIVE = 1
  export const SKILL_TYPE_ROUND = 2
  export const SKILL_TYPE_ACTIVE = 3
  export const SKILL_TYPE_FORMATION = 4
  export const skillTypeText = ['', '被动', '自动', '主动', '阵型']
  export const SKILL_WEAPON_NONE = 0
  export const SKILL_WEAPON_MELEE_1 = 1
  export const SKILL_WEAPON_MELEE_2 = 2
  export const SKILL_WEAPON_MELEE_3 = 3
  export const SKILL_WEAPON_RANGE = 4
  export const SKILL_WEAPON_ONE_HAND = 5
  export const SKILL_WEAPON_ONE_SWORD = 6
  export const SKILL_WEAPON_TWO_SWORD = 7
  export const SKILL_WEAPON_HEAVY_SWORD = 8
  export const SKILL_WEAPON_ONE_BLADE = 9
  export const SKILL_WEAPON_TWO_BLADE = 10
  export const SKILL_WEAPON_HEAVY_BLADE = 11
  export const SKILL_WEAPON_ONE_HEAVY = 12
  export const SKILL_WEAPON_LANCE = 13
  export const SKILL_WEAPON_ONE_CROSSBOW = 14
  export const SKILL_WEAPON_TOW_CROSSBOW = 15
  export const SKILL_WEAPON_HEAVY_CROSSBOW = 16
  export const SKILL_WEAPON_BOW = 17
  export const SKILL_WEAPON_HAND = 18
  export const SKILL_WEAPON_CANE = 19
  export const SKILL_WEAPON_SWORD = 20
  export const SKILL_WEAPON_ONE_HAND_BLADE = 21
  export const SKILL_WEAPON_BALL = 22
  export const SKILL_WEAPON_GUN = 23
  export const SKILL_WEAPON_TWO_GUN = 24
  export const SKILL_WEAPON_HEAVY_GUN = 25
  export const skillWeaponText = [
    '无限制',
    '空手、剑类、刀类、重型武器、长柄武器',
    '轻剑、轻刀',
    '重剑、重刀、重型武器、长柄武器',
    '轻弩、重弩、弓',
    '单手持武器或空手',
    '单手剑限制',
    '单手剑双持限制',
    '重剑限制',
    '刀类武器限制',
    '单手刀双持限制',
    '重刀限制',
    '重型武器',
    '长柄武器',
    '轻弩、重弩',
    '轻弩双持限制',
    '重弩限制',
    '弓',
    '空手',
    '法杖',
    '剑类武器限制',
    '单手刀限制',
    '法器限制',
    '枪类武器限制',
    '轻枪限制',
    '重枪限制',
  ]
  export const SKILL_AREA_SEARCH_ALL = 0
  export const SKILL_AREA_SEARCH_ENEMY = 1
  export const SKILL_AREA_SEARCH_FRIEND = 2
  export const SKILL_AREA_SEARCH_MY_SELF = 3
  export const SKILL_AREA_SEARCH_MY_OWNER = 4
  export const SKILL_AREA_CURSOR_1 = 1
  export const SKILL_AREA_CURSOR_2 = 2
  export const SKILL_AREA_CURSOR_3 = 3
  export const SKILL_AREA_CURSOR_4 = 4
  export const SKILL_AREA_CURSOR_5 = 5
  export const SKILL_AREA_CURSOR_6 = 6
  export const SKILL_AREA_CURSOR_ALL = -1
  export const SKILL_AREA_SINGLE = 0
  export const SKILL_AREA_FRONT_BACK_TWO = 1
  export const SKILL_AREA_UP_DOWN_TWO = 2
  export const SKILL_AREA_UP_DOWN_THREE = 3
  export const SKILL_AREA_UP_DOWN_FOUR = 4
  export const SKILL_AREA_UP_DOWN_FIVE = 5
  export const SKILL_AREA_TEN = 6
  export const SKILL_AREA_SQUARE = 7
  export const SKILL_AREA_AROUND_SIX = 8
  export const SKILL_AREA_ALL = 9
  export const SKILL_AREA_ENEMY_SINGLE = 10
  export const SKILL_AREA_ENEMY_FONT_BACK_TWO = 11
  export const SKILL_AREA_ENEMY_UP_DOWN_TWO = 12
  export const SKILL_AREA_ENEMY_UP_DOWN_THREE = 13
  export const SKILL_AREA_ENEMY_UP_DOWN_FOUR = 14
  export const SKILL_AREA_ENEMY_UP_DOWN_FIVE = 15
  export const SKILL_AREA_ENEMY_TEN = 16
  export const SKILL_AREA_ENEMY_SQUARE = 17
  export const SKILL_AREA_ENEMY_AROUND_SIX = 18
  export const SKILL_AREA_ENEMY_ALL = 19
  export const SKILL_AREA_ME_SIGHLE = 20
  export const SKILL_AREA_ME_FONT_BACK_TWO = 21
  export const SKILL_AREA_ME_UP_DOWN_TWO = 22
  export const SKILL_AREA_ME_UP_DOWN_THREE = 23
  export const SKILL_AREA_ME_UP_DOWN_FOUR = 24
  export const SKILL_AREA_ME_UP_DOWN_FIVE = 25
  export const SKILL_AREA_ME_TEN = 26
  export const SKILL_AREA_ME_SQUARE = 27
  export const SKILL_AREA_ME_AROUND_SIX = 28
  export const SKILL_AREA_ME_ALL = 29
  export const SKILL_AREA_MY_SELF = 30
  export const SKILL_AREA_ENEMY_HP_LEAST = 31
  export const SKILL_AREA_ENEMY_HP_MOST = 32
  export const SKILL_AREA_ME_HP_LEAST = 33
  export const SKILL_AREA_ME_HP_MOST = 34
  export const SKILL_AREA_MY_OWNER = 35
  export const SKILL_AREA_ME_ALL_NO_SELF = 36
  export const SKILL_AREA_ALL_NO_SELF = 37
  export const SKILL_AREA_PLAYER_AND_PET = 38
  export const skillAreaText = [
    '单体',
    '前后两人',
    '上下两人',
    '上下三人',
    '上下四人',
    '上下五人',
    '十字',
    '正方',
    '六人长方',
    '全体',
    '敌单体',
    '敌前后两人',
    '敌上下两人',
    '敌上下三人',
    '敌上下四人',
    '敌上下五人',
    '敌十字',
    '敌正方',
    '敌六人长方',
    '敌全体',
    '我单体',
    '我前后两人',
    '我上下两人',
    '我上下三人',
    '我上下四人',
    '我上下五人',
    '我十字',
    '我正方',
    '我六人长方',
    '我全体',
    '自身',
    '敌当前生命最少者',
    '敌当前生命最大者',
    '我当前生命最少者',
    '我当前生命最大者',
    '自身主人',
    '我全体(不包括自身)',
    '全体(不包括自身)',
    '宠物和主人',
  ]
  export const SKILL_POS_STAND = 0
  export const SKILL_POS_FRONT = 1
  export const SKILL_POS_CENTER = 2
  export const skillPositionText = ['原地', '目标身前', '中央']
  export const GRADE_0 = 0
  export const GRADE_1 = 1
  export const GRADE_2 = 2
  export const GRADE_3 = 3
  export const GRADE_4 = 4
  export const gradeText = ['普通', '精致', '稀有', '史诗', '传说']
  export const gradeGoods = [
    -1,
    Define.GRADE_0,
    Define.GRADE_1,
    Define.GRADE_2,
    Define.GRADE_3,
    Define.GRADE_4,
  ]
  export const CONDITION_NONE = 0
  export const CONDITION_HP_BELOW = 1
  export const CONDITION_HP_HIGH = 2
  export const CONDITION_HELP_RATE = 3
  export const CONDITION_ROUND = 4
  export const CONDITION_PLAYER_COUNT = 5
  export const CONDITION_MONSTER_COUNT = 6
  export const monsterAIConditionText = [
    '无条件',
    'HP小于百分之%U',
    'HP大于百分之%U',
    '百分之%U执行',
    '战场已进行大于%U回合',
    '玩家生存数量大于%U',
    '怪物生存数量大于%U',
  ]
  export const AI_HATE_MIN = 1
  export const AI_HATE_MAX = 2
  export const AI_HP_MIN_ENEMY = 3
  export const AI_HP_MAX_ENEMY = 4
  export const AI_SPEED_MIN_ENEMY = 5
  export const AI_SPEED_MAX_ENEMY = 6
  export const AI_HP_MIN_FRIEND = 7
  export const AI_HP_MAX_FRIEND = 8
  export const AI_SPEED_MIN_FRIEND = 9
  export const AI_SPEED_MAX_FRIEND = 10
  export const AI_RAND_ENEMY = 11
  export const AI_RAND_FRIEND = 12
  export const AI_SELF = 13
  export const AI_RAND_FRIEND_DEAD = 14
  export const AI_RAND_ALL_ALIVE = 15
  export const AI_ESCAPE = 16
  export const monsterAIText = [
    '',
    '最少仇恨的敌人',
    '最大仇恨的敌人',
    'HP最低的敌人',
    'HP最高的敌人',
    '速度最低的敌人',
    '速度最高的敌人',
    'HP最低的队友',
    'HP最高的队友',
    '速度最低的队友',
    '速度最高的队友',
    '随机敌人',
    '随机队友',
    '自已',
    '随机已死亡的队友',
    '随机自已以外的活人',
    '逃跑',
  ]
  export const MONSTER_NORMAL = 0
  export const MONSTER_ELITE = 1
  export const MONSTER_BOSS = 2
  export const MONSTER_HIGHER_BOSS = 3
  export const MONSTER_HIGHEST_BOSS = 4
  export const monsterTypeText = ['普通', '精英', 'BOSS', '高级BOSS', '远古BOSS']
  export const BATTLE_NORMAL = 0
  export const BATTLE_BOSS = 1
  export const BATTLE_NPC = 2
  export const BATTLE_VIP = 3
  export const monsterGroupTypeText = [
    '常规战斗',
    'BOSS战斗',
    '携带NPC的常规战斗',
    '携带VIP的常规战斗',
  ]
  export const ITEM_TYPE_ARMOR_HEAD = 0
  export const ITEM_TYPE_ARMOR_CLOTHES = 1
  export const ITEM_TYPE_ARMOR_TROUSERS = 2
  export const ITEM_TYPE_ARMOR_SHOULDER = 3
  export const ITEM_TYPE_ARMOR_WAIST = 4
  export const ITEM_TYPE_ARMOR_BACK = 5
  export const ITEM_TYPE_ARMOR_SHOES = 6
  export const ITEM_TYPE_ARMOR_HAND = 7
  export const ITEM_TYPE_ARMOR_NECKLACE = 8
  export const ITEM_TYPE_ARMOR_RING = 9
  export const ITEM_TYPE_ARMOR_AMULET = 10
  export const ITEM_TYPE_ARMOR_TRANSPORT = 11
  export const ITEM_TYPE_ARMOR_FASHION = 12
  export const ITEM_TYPE_WEAPON_ONEHAND_SWORD = 13
  export const ITEM_TYPE_WEAPON_TWOHAND_SWORD = 14
  export const ITEM_TYPE_WEAPON_ONEHAND_BLADE = 15
  export const ITEM_TYPE_WEAPON_TWOHAND_BLADE = 16
  export const ITEM_TYPE_WEAPON_ONEHAND_HEAVY = 17
  export const ITEM_TYPE_WEAPON_TWOHAND_HEAVY = 18
  export const ITEM_TYPE_WEAPON_TWOHAND_STAFF = 19
  export const ITEM_TYPE_WEAPON_TWOHAND_LANCE = 20
  export const ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW = 21
  export const ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW = 22
  export const ITEM_TYPE_WEAPON_TWOHAND_BOW = 23
  export const ITEM_TYPE_WEAPON_ONEHAND_HAND = 24
  export const ITEM_TYPE_TASK = 25
  export const ITEM_TYPE_BATTLE_USE = 26
  export const ITEM_TYPE_ANYTIME_USE = 27
  export const ITEM_TYPE_NOT_BATTLE_USE = 28
  export const ITEM_TYPE_BUILD_MATERIAL = 29
  export const ITEM_TYPE_GEM = 30
  export const ITEM_TYPE_SKILL_BOOK = 31
  export const ITEM_TYPE_PET = 32
  export const ITEM_TYPE_SPECEAIL = 33
  export const ITEM_TYPE_WEAPON_BALL = 34
  export const ITEM_TYPE_WEAPON_ONEHAND_GUN = 35
  export const ITEM_TYPE_WEAPON_TWOHAND_GUN = 36
  export const ITEM_TYPE_OTHER = 37
  export const ITEM_TYPE_ONE_SWORD = 100
  export const ITEM_TYPE_ONE_BLADE = 101
  export const ITEM_TYPE_NULL = -1
  export const BALL_WEAPON_ID_AREA = Define.ITEM_TYPE_WEAPON_ONEHAND_HAND + 1
  export const BALL_WEAPON_ID_ONEHAND_GUN = Define.ITEM_TYPE_WEAPON_ONEHAND_HAND + 2
  export const BALL_WEAPON_ID_TWOHAND_GUN = Define.ITEM_TYPE_WEAPON_ONEHAND_HAND + 3
  export const itemTypeText = [
    '头',
    '衣',
    '裤',
    '肩',
    '腰带',
    '背',
    '鞋',
    '护手',
    '链',
    '戒',
    '护符',
    '坐骑',
    '时装',
    '单手剑',
    '双手剑',
    '单手刀',
    '双手刀',
    '轻型武器',
    '重型武器',
    '杖',
    '长柄武器',
    '轻弩',
    '重弩',
    '弓箭',
    '副手',
    '任务物品',
    '战斗道具',
    '世界道具',
    '普通道具',
    '建筑材料',
    '宝石',
    '技能书',
    '宠物',
    '特殊',
    '法器',
    '轻枪',
    '重枪',
    '待定义',
  ]
  export const SEX_MALE = 0
  export const SEX_FEMALE = 1
  export const SEX_MAX = 2
  export const sexTEXT = ['男', '女']
  export const RACE_EAST = 0
  export const RACE_WEST = 1
  export const RACE_MAX = 2
  export const raceText = ['东方', '西方']
  export const JOB_RANGER = 1
  export const JOB_XIUZHEN = 2
  export const JOB_WARRIOR = 3
  export const JOB_WIZARD = 4
  export const JOB_NEW = 5
  export const JOB_BACKUP2 = 6
  export const JOB_PET_WIL = 7
  export const JOB_PET_STR = 8
  export const JOB_PET_AGI = 9
  export const JOB_BACKUP3 = 10
  export const jobText = [
    '',
    '侠客',
    '修真',
    '战士',
    '法师',
    '贤者',
    '武圣',
    '睿智',
    '勇猛',
    '迅捷',
    '枪王',
  ]
  export const jobInfoText = [
    [],
    [
      {
        text: '    侠客注重内功和剑术修炼。他们敏捷而具有极强的瞬间破杀能力，就算是最强大的敌人，在侠客面前亦往往无法全身而退。剑客着重于提升',
      },
      { text: '敏捷', style: { textColor: 16753920 } },
      { text: '属性，它能让侠客拥有更高的暴击值和穿刺伤害。' },
    ],
    [
      {
        text: '    修真者注重精神修炼，擅长咒术与各种五行之术。他们可以运用各种自然之力，帮助队友恢复和提升队友能力，是战斗中不可缺少的战友。修真者着重于提升',
      },
      { text: '体力', style: { textColor: 16753920 } },
      { text: '和' },
      { text: '感知', style: { textColor: 16753920 } },
      {
        text: '属性，体质能让修真者拥有更高的生命值，而感知则会让他们拥有更强的魔法抵抗力。',
      },
    ],
    [
      {
        text: '    战士是近身格斗和施法者的融合。战士以强大的力量击退敌人，更可使用具有守护力量的光环协助队友驱除一切负面魔法。战士着重于提升',
      },
      { text: '力量', style: { textColor: 16753920 } },
      { text: '属性，它能让战士拥有更强的伤害能力和更高的生命值。' },
    ],
    [
      {
        text: '    法师们具有强大的精神力，可以使用大范围魔法进行攻击，极具杀伤力的攻击能快速粉碎对手，置对手于死地。法师着重于提升',
      },
      { text: '智力', style: { textColor: 16753920 } },
      {
        text: '属性，它能让法师拥有更高的魔法伤害和魔力值，同时让法师有更强的魔法抵抗力。',
      },
    ],
  ]
  export const raceJobList = [
    [Define.JOB_RANGER, Define.JOB_XIUZHEN],
    [Define.JOB_WARRIOR, Define.JOB_WIZARD],
  ]
  export const RANK_NONE = 0
  export const RANK_KING = 1
  export const RANK_PRIME = 2
  export const RANK_MARSHAL = 3
  export const RANK_KNIGHT = 4
  export const RANK_LORD = 5
  export const RANK_NOBLE = 6
  export const RANK_NATIONAL = 7
  export const RANK_SOLDIER = 8
  export const RANK_SUCCOR = 9
  export const RANK_COMTE = 10
  export const RANK_VICOMTE = 11
  export const RANK_NO_RANK = 100
  export const rankText = [
    '无限制',
    '国王',
    '宰相',
    '元帅',
    '将军',
    '领主',
    '贵族',
    '国民',
    '士兵',
    '援军',
    '伯爵',
    '子爵',
  ]
  export const BUILDING_NONE = 0
  export const BUILDING_PALACE = 1
  export const BUILDING_CAMP = 2
  export const BUILDING_HOUSE = 3
  export const BUILDING_FACTORY_WOOD = 4
  export const BUILDING_FACTORY_STONE = 5
  export const BUILDING_FACTORY_IRON = 6
  export const BUILDING_SKILLSHOP_EAST_KNIGHT = 7
  export const BUILDING_SKILLSHOP_EAST_MASTER = 8
  export const BUILDING_SKILLSHOP_WEST_KNIGHT = 9
  export const BUILDING_SKILLSHOP_WEST_MASTER = 10
  export const BUILDING_SHOP_ITEM = 11
  export const BUILDING_SHOP_WEAPON = 12
  export const BUILDING_SHOP_ARMOR = 13
  export const buildingText = [
    '国力排名',
    '皇宫',
    '军营',
    '民居',
    '木材厂',
    '石材厂',
    '铁矿厂',
    '侠客技能所',
    '修真技能所',
    '战士技能所',
    '法师技能所',
    '道具商店',
    '武器商店',
    '防具商店',
  ]
  export const SEARCH_MEM_ALL = 0
  export const SEARCH_MEM_ONLINE = 1
  export const SEARCH_MEM_UN_ONLINE = 2
  export const SEARCH_MEM_APPLY = 3
  export const searchMemText = ['所有', '在线', '离线', '申请']
  export const ATKTYPE_STR = 0
  export const ATKTYPE_RANGE_STR = 1
  export const ATKTYPE_AGI = 2
  export const ATKTYPE_RANGE_AGI = 3
  export const ATKTYPE_MAGIC = 4
  export const ATKTYPE_CURSE = 5
  export const ATKTYPE_BLESS = 6
  export const AtkTypeText = [
    '近身劈砍',
    '远程劈砍',
    '近身穿刺',
    '远程穿刺',
    '魔法攻击',
    '诅咒攻击',
    '祝福',
  ]
  export const BUFFER_NONE = 0
  export const BUFFER_POISON = 1
  export const BUFFER_BURN = 2
  export const BUFFER_BLOOD = 3
  export const BUFFER_ATTR_DOWN = 4
  export const BUFFER_BLOCK_TALK = 5
  export const BUFFER_BLOCK_SKILL = 6
  export const BUFFER_SILENCE = 7
  export const BUFFER_STUN = 8
  export const BUFFER_CHAO = 9
  export const BUFFER_WEAK = 10
  export const BUFFER_ATTR_UP = 11
  export const BUFFER_ADD_MP = 12
  export const BUFFER_ADD_HP = 13
  export const BUFFER_HIDE = 14
  export const BUFFER_RESIST_MAGIC = 15
  export const BUFFER_RESIST_PHYSIC = 16
  export const BUFFER_RESIST_SILENCE = 17
  export const BUFFER_RESIST_STUN = 18
  export const BUFFER_RESIST_CHAO = 19
  export const BUFFER_RESIST_DEBUFF = 20
  export const BUFFER_INVINCIBLE = 21
  export const BUFFER_RESIST_TALK = 22
  export const BUFFER_RESIST_SKILL = 23
  export const BUFFER_RESIST_WEAK = 24
  export const BUFFER_TYPE_BUFF = 25
  export const BUFFER_TYPE_DEBUFF = 26
  export const BUFFER_RESIST_DIE_1HP = 27
  export const BUFFER_RESIST_DIE_FULLHP = 28
  export const BUFFER_RESIST_DIE_DELAY = 29
  export const BUFFER_DIE_CANNOT_RELIVE = 30
  export const bufferText = [
    '无',
    '中毒',
    '火烧',
    '流血',
    '属性减少',
    '禁言',
    '封技',
    '封魔',
    '定身',
    '混乱',
    '衰弱',
    '属性增加',
    '持续回魔',
    '持续回血',
    '幻影',
    '魔攻无效',
    '物攻无效',
    '免疫封魔',
    '免疫定身',
    '免疫混乱',
    '全减益免疫',
    '无敌',
    '免疫禁言',
    '免疫封技',
    '免疫衰弱',
    '增益',
    '减益',
    '不死意志',
    '死者苏生',
    '死亡傀儡',
    '驱逐',
  ]
  export const bufferInfoText = [
    '无',
    '中毒',
    '火烧',
    '流血',
    '属性减少',
    '禁言',
    '封技',
    '封魔',
    '定身',
    '混乱',
    '衰弱',
    '属性增加',
    '持续回魔',
    '持续回血',
    '物理群体技能和祝福群体技能对其无效',
    '魔攻无效',
    '物攻无效',
    '封魔效果对其无效',
    '定身效果对其无效',
    '混乱效果对其无效',
    '全减益免疫',
    '无敌',
    '禁言效果对其无效',
    '封技效果对其无效',
    '衰弱效果对其无效',
    '增益',
    '减益',
    '死亡后，会复活并恢复1点生命。一场战斗只能生效一次',
    '死亡后，会复活并恢复所有生命，一场战斗只能生效一次',
    '生命值为0时，不会马上死亡。直到回合结束时，才会触发死亡效果。',
    '复活、不死意志、死者苏生效果对该宠物无效。',
  ]
  export const ITEM_ID_PET = 24
  export const ITEM_ID_WOOD = 1e3
  export const ITEM_ID_STONE = 1001
  export const ITEM_ID_IRON = 1002
  export const ITEM_ID_IDENTIFY_SCROLL = 4e4
  export const ITEM_ID_IDENTIFY_SCROLL_BIND = 40001
  export const ITEM_ID_COMMAND_BOOK = 40002
  export const ITEM_ID_PET_RESET = 40004
  export const ITEM_ID_PET_AGE = 40005
  export const ITEM_ID_REPAIR = 40008
  export const ITEM_ID_PET_RESET2 = 40015
  export const ITEM_ID_CHANGE_NAME = 40016
  export const ITEM_ID_SPEAK = 40017
  export const ITEM_ID_PET_ADD_SKILL = 40020
  export const ITEM_ID_STAR_SCROLL = 40021
  export const ITEM_ID_CHANGE_SEX = 42e3
  export const ITEM_ID_CP_POINT_ADD = 42001
  export const ITEM_ID_SP_POINT_ADD = 42002
  export const ITEM_ID_PROSPERITY_DEGREE_POINT_ADD = 42003
  export const ITEM_ID_SKILL_PLAYER = 42004
  export const ITEM_ID_SKILL_PET = 42005
  export const ITEM_ID_SKILL_PLAYER_BIND = 42006
  export const ITEM_ID_SKILL_PET_2 = 42007
  export const ITEM_ID_SKILL_PLAYER_2 = 42016
  export const ITEM_ID_SKILL_PLAYER_3 = 42017
  export const ITEM_ID_SKILL_PLAYER_4 = 42018
  export const ITEM_ID_SKILL_PLAYER_5 = 42019
  export const ITEM_ID_SKILL_PLAYER_2_BIND = 42020
  export const ITEM_ID_SKILL_PLAYER_3_BIND = 42021
  export const ITEM_ID_SKILL_PLAYER_4_BIND = 42022
  export const ITEM_ID_SKILL_PLAYER_5_BIND = 42023
  export const ITEM_ID_HIGH_IDENTIFY_SCROLL = 40022
  export const ITEM_ID_HIGH_IDENTIFY_SCROLL_BIND = 40023
  export const ITEM_ID_UPGRADE_IDENTIFY_SCROLL = 40024
  export const ITEM_ID_UPGRAND_IDENTIFY_SCROLL_BIND = 40025
  export const ITEM_ID_UPGRADE_INTENSIFY_SCROLL = 40026
  export const ITEM_ID_UPGRAND_INTENSIFY_SCROLL_BIND = 40027
  export const ITEM_ID_CRYSTAL1 = 1041
  export const ITEM_ID_CRYSTAL2 = 1042
  export const ITEM_ID_CRYSTAL3 = 1043
  export const ITEM_ID_CRYSTAL4 = 1044
  export const ITEM_ID_CRYSTAL5 = 1045
  export const ITEM_ID_MAGICCRYSTAL1 = 1107
  export const ITEM_ID_MAGICCRYSTAL2 = 1108
  export const ITEM_ID_MAGICCRYSTAL3 = 1109
  export const ITEM_ID_MAGICCRYSTAL4 = 1110
  export const ITEM_ID_MAGICCRYSTAL5 = 1111
  export const ITEM_ID_HAIR_START = 40100
  export const ITEM_ID_HAIR_END = 40199
  export const ITEM_ID_FACE_START = 40200
  export const ITEM_ID_FACE_END = 40249
  export const ITEM_ID_RANGER = 41100
  export const ITEM_ID_XIUZHEN = 41101
  export const ITEM_ID_WARRIOR = 41102
  export const ITEM_ID_WIZARD = 41103
  export const ITEM_ID_NEW = 41104
  export const ITEM_ID_JOB_START = Define.ITEM_ID_RANGER
  export const ITEM_ID_JOB_END = 41110
  export const SKILL_TYPE_PLAYER = 0
  export const SKILL_TYPE_PET = 1
  export const SKILL_TYPE_OTHER = 2
  export const SKILL_SHOP_START_PLAYER = 1
  export const SKILL_SHOP_END_PLAYER = 2e3
  export const SKILL_SHOP_START_PET = 2e3
  export const SKILL_SHOP_END_PET = 4e3
  export const SKILL_SHOP_END_OTHER = 1e4
  export const SKILL_SHOP_COUNTRY_START_PLAYER = 1500
  export const SKILL_SHOP_COUNTRY_END_PLAYER = 1999
  export const SKILL_SHOP_COUNTRY_START_PET = 3500
  export const SKILL_SHOP_COUNTRY_END_PET = 3999
  export const SKILL_ID_TYPE_PLAYER = 0
  export const SKILL_ID_PET_NORMAL_TALENT = 1
  export const SKILL_ID_PET_LEARN_TALENT = 2
  export const SKILL_ID_OTHER = 3
  export const SKILL_END_PLAYER = 5e3
  export const SKILL_END_PET_NORMAL_TALENT = 6e3
  export const SKILL_END_PET_LEARN_TALENT = 7e3
  export const SKILL_END_OTHER = 1e4
  export const MAP_ID_ESCORT = 999
  export const MAP_ID_COUNTRY_WAR = 998
  export const MAP_ID_START_COMMON = 1
  export const MAP_ID_END_COMMON = 999
  export const MAP_ID_START_CITY_EAST = 1e3
  export const MAP_ID_END_CITY_EAST = 2999
  export const MAP_ID_START_CITY_WEST = 3e3
  export const MAP_ID_END_CITY_WEST = 4999
  export const MAP_ID_START_COUNTRY_EAST = 5e3
  export const MAP_ID_END_COUNTRY_EAST = 5499
  export const MAP_ID_START_COUNTRY_WEST = 5500
  export const MAP_ID_END_COUNTRY_WEST = 5999
  export const MAP_ID_START_MIRROR = 6e3
  export const MAP_ID_END_MIRROR = 6099
  export const MAP_ID_START_CITY_ALLOCATE = 1e4
  export const MAP_ID_END_CITY_ALLOCATE = 19999
  export const MAP_ID_START_COUNTRY_ALLOCATE = 2e4
  export const MAP_ID_END_COUNTRY_ALLOCATE = 29999
  export const MAP_ID_START_MIRROR_ALLOCATE = 3e4
  export const MAP_ID_END_MIRROR_ALLOCATE = 31999
  export const MERCENARY_FIGHT_TYPE_STR = 0
  export const MERCENARY_FIGHT_TYPE_BLESS = 1
  export const MERCENARY_FIGHT_TYPE_DEF = 2
  export const MERCENARY_FIGHT_TYPE_CURSE = 3
  export const mercenaryFight = ['猛攻', '治疗', '守护', '诅咒']
  export const SHOP_PET_USEITEM_ID = 3
  export const SHOP_MARKETPLACE = 4
  export const SHOP_REPAIR_ID = 10001
  export const SHOP_COUNTRY_MENU = 10002
  export const SHOP_COUNTRY_MISSION = 10003
  export const SHOP_REBORN_MAP = 10004
  export const SHOP_ESCORT_LIST = 10005
  export const OFFLINE_MISSION_LIST = 10006
  export const SHOP_REWARD_CODE = 10007
  export const SHOP_STORE = 10008
  export const SHOP_COUNTRY_STORE = 10009
  export const SHOP_COUNTRY_SYSTEM_STORE = 10010
  export const SHOP_COUNTRY_WAR = 10011
  export const SHOP_WAR_DECLARE = 10012
  export const SHOP_WAR_INFO = 10013
  export const SHOP_CAMP = 10014
  export const SHOP_UNIN = 10015
  export const SHOP_WAR_RESULT = 10016
  export const SHOP_MARRY = 10017
  export const SHOP_DIVORCE = 10018
  export const SHOP_TEAMBOSS = 10019
  export const SHOP_SPORT_START = 10020
  export const SHOP_SPORT_END = 10030
  export const SHOP_INTEGRAL_START = 10040
  export const SHOP_INTEGRAL_END = 10050
  export const SHOP_SKY_START = 10901
  export const SHOP_SKY_END = 10910
  export const SHOP_COMPOSE_START = 10050
  export const SHOP_COMPOSE_COUNTRY_START = 10500
  export const SHOP_COMPOSE_END = 10900
  export const SHOP_ACTIVITY_COMPOSE_START = 10200
  export const SHOP_ACTIVITY_COMPOSE_END = 10400
  export const SHOP_PLAYER_SELL = 10031
  export const SHOP_PLAYER_BUY = 10032
  export const SHOP_ARENA_SINGLE = 10033
  export const SHOP_ARENA_TEAM = 10034
  export const SHOP_QUESTION = 10035
  export const SHOP_QUESTION_VIP = 10036
  export const SHOP_QUESTION_SUPER_QQ = 10038
  export const SHOP_STORE_VIP = 10037
  export const SHOP_COUNTRY_VIPGETMONEY = 10039
  export const SHOP_BACKUP_START = 10039
  export const SHOP_BACKUP_END = 10040
  export const SHOP_PET_START = 10911
  export const SHOP_PET_COUNTRY_START = 10950
  export const SHOP_PET_END = 11e3
  export const FURNACE_START = 11001
  export const FURNACE_COUNTRY_START = 11020
  export const FURNACE_END = 11040
  export const SHOP_SOLDIER_START = 20001
  export const SHOP_SOLDIER_COUNTRY_START = 21e3
  export const SHOP_SOLDIER_END = 21999
  export const SHOP_COUNTRY_START = 22e3
  export const SHOP_COUNTRY_END = 23999
  export const SHOP_VIP_COUNTRY_START = 23e3
  export const SHOP_VIP_COUNTRY_END = 23020
  export const SHOP_VIP_START = 2e3
  export const SHOP_VIP_END = 2020
  export const SHOP_SUPER_QQ_COUNTRY_START = 23021
  export const SHOP_SUPER_QQ_COUNTRY_END = 23040
  export const SHOP_SUPER_QQ_START = 2021
  export const SHOP_SUPER_QQ_END = 2040
  export const SHOP_ENCHANT_START = 23100
  export const SHOP_ENCHANT_COUNTRY_START = 23200
  export const SHOP_ENCHANT_END = 23299
  export const SHOP_ADVANCED_START = 23400
  export const SHOP_ADVANCED_END = 23499
  export const SEARCH_ITEM_TYPE_SWORD = 1
  export const SEARCH_ITEM_TYPE_BLADE = 2
  export const SEARCH_ITEM_TYPE_STICK = 3
  export const SEARCH_ITEM_TYPE_BOW = 4
  export const SEARCH_ITEM_TYPE_HAMMER = 5
  export const SEARCH_ITEM_TYPE_SPECIAL = 6
  export const SEARCH_ITEM_TYPE_ARMOR = 7
  export const SEARCH_ITEM_TYPE_JEWELRY = 8
  export const SEARCH_ITEM_TYPE_PET = 9
  export const SEARCH_ITEM_TYPE_GEM = 10
  export const SEARCH_ITEM_TYPE_MATERIAL = 11
  export const SEARCH_ITEM_TYPE_OTHER = 12
  export const SEARCH_ITEM_TYPE_BALL = 13
  export const goodsTypeText = [
    '全部',
    '剑',
    '刀',
    '杖',
    '弓',
    '重型武器',
    '特殊武器',
    '法器',
    '护甲',
    '饰品',
    '宠物',
    '宝石',
    '材料',
    '其它',
  ]
  export const goodsType = [
    0,
    Define.SEARCH_ITEM_TYPE_SWORD,
    Define.SEARCH_ITEM_TYPE_BLADE,
    Define.SEARCH_ITEM_TYPE_STICK,
    Define.SEARCH_ITEM_TYPE_BOW,
    Define.SEARCH_ITEM_TYPE_HAMMER,
    Define.SEARCH_ITEM_TYPE_SPECIAL,
    Define.SEARCH_ITEM_TYPE_BALL,
    Define.SEARCH_ITEM_TYPE_ARMOR,
    Define.SEARCH_ITEM_TYPE_JEWELRY,
    Define.SEARCH_ITEM_TYPE_PET,
    Define.SEARCH_ITEM_TYPE_GEM,
    Define.SEARCH_ITEM_TYPE_MATERIAL,
    Define.SEARCH_ITEM_TYPE_OTHER,
  ]
  export const goodsIcon = [6, 4, 14, 5, 0, 12, 40, 11, 20, 25, 32, 30, 35]
  export const PURCHASE_ITEM_TYPE_GEM = 1
  export const PURCHASE_ITEM_TYPE_MATERIAL = 2
  export const PURCHASE_ITEM_TYPE_TASKITEM = 3
  export const PURCHASE_ITEM_TYPE_OTHER = 4
  export const purchaseTypeText = ['--', '宝石', '材料', '任务物品', '其它']
  export const purchaseType = [
    -1,
    Define.PURCHASE_ITEM_TYPE_GEM,
    Define.PURCHASE_ITEM_TYPE_MATERIAL,
    Define.PURCHASE_ITEM_TYPE_TASKITEM,
    Define.PURCHASE_ITEM_TYPE_OTHER,
  ]
  export const purchaseIcon = [34, 30, 32, 35]
  export const SEARCH_LEVEL_ALL = 0
  export const SEARCH_LEVEL_1_10 = 1
  export const SEARCH_LEVEL_10_20 = 2
  export const SEARCH_LEVEL_20_30 = 3
  export const SEARCH_LEVEL_30_40 = 4
  export const SEARCH_LEVEL_40_50 = 5
  export const SEARCH_LEVEL_50_60 = 6
  export const SEARCH_LEVEL_60_70 = 7
  export const SEARCH_LEVEL_70_80 = 8
  export const SEARCH_LEVEL_80_90 = 9
  export const goodsLevelText = [
    '无限制',
    '1-10级',
    '11-20级',
    '21-30级',
    '31-40级',
    '41-50级',
    '51-60级',
    '61-70级',
    '71-80级',
    '81-90级',
  ]
  export const SEARCH_SORT_OBJ_PRICE = 1
  export const SEARCH_SORT_OBJ_CREATETIME = 2
  export const SEARCH_SORT_TYPE_ASC = 1
  export const SEARCH_SORT_TYPE_DESC = -1
  export const RELATION_FRIEND = 0
  export const RELATION_BLACK = 1
  export const RELATION_BLACK_FRIEND = 2
  export const RELATION_MASTER = 3
  export const RELATION_PRENTICE = 4
  export const BAG_CHECKUP_RESULT_NEW = 1
  export const BAG_CHECKUP_RESULT_UPDATE = 2
  export const BAG_CHECKUP_RESULT_ASK = 3
  export const NEAR_ALL = 0
  export const NEAR_SHOP = 1
  export const NEAR_ENCHANT_SHOP = 2
  export const NEAR_TEAM = 3
  export const NEAR_FIGHT = 4
  export const NEAR_PHOTO = 5
  export const NEAR_NULL = 6
  export const NEAR_MY_TEAM = 7
  export const NEARSTR = ['筛选', '摆摊', '附魔', '组队', '战斗', '照片', '空闲']
  export const ADMIN_1 = 1
  export const ADMIN_2 = 2
  export const ADMIN_3 = 3
  export const ADMIN_4 = 4
  export const ADMIN_MAX = 10
  export const ADMINSTR = [
    '',
    '游戏管理员',
    '邮件管理员',
    '交易所管理员',
    '国家管理员',
  ]
  export const COUNTRY_COMMAND_NONE = 0
  export const COUNTRY_COMMAND_CHANGE_NAME = 1
  export const COUNTRY_COMMAND_ADD_PROSPERITY = 2
  export const COUNTRY_COMMAND_TRANSFER_RESOURCE = 3
  export const COUNTRY_COMMAND_ADD_PEOPLE = 4
  export const COUNTRY_COMMAND_ADD_LAND = 5
  export const COUNTRY_COMMAND_ADD_ARMY = 6
  export const COUNTRY_COMMAND_ADD_ARMY_USELAND = 7
  export const COUNTRY_COMMAND_REFRESH_TASK = 8
  export const COUNTRY_COMMAND_KING_COMMAND = 9
  export const COUNTRY_COMMAND_CREATE_WAR = 10
  export const countryBooks = [
    '',
    '国家改名',
    '提升繁荣度',
    '资源转换',
    '增加民众数',
    '增加空余土地',
    '增加军力值',
    '增加军力(消耗土地)',
    '重置当天国家任务',
    '繁荣增幅',
    '强制攻击',
  ]
  export const PLAYER_EVENT_CHOOSE_YES = 1
  export const PLAYER_EVENT_CHOOSE_NO = 2
  export const PLAYER_EVENT_TEAM_INVITE = 1
  export const PLAYER_EVENT_TEAM_APPLY = 2
  export const PLAYER_EVENT_PKASK = 3
  export const PLAYER_EVENT_JOINCOUNTRYASK = 4
  export const PLAYER_EVENT_ESCORT = 5
  export const PLAYER_EVENT_MASTER = 6
  export const PLAYER_EVENT_JOINCOUNTRYHANDLE = 7
  export const PLAYER_EVENT_MERRY = 8
  export const PLAYER_WEDDING_CARD = 9
  export const PLAYER_EVENT_MAIL = 100
  export const PLAYER_EVENT_TOURIST_MODIFY = 101
  export const PLAYER_EVENT_ACTIVITY_LIST = 102
  export const BATTLE_NET_START = 1e4
  export const BATTLE_NET_END = 15e3
  export const MAIL_TITLE_CONSUME_ERROR = 1
  export const MAIL_TITLE_CONSUME = 2
  export const MAIL_TITLE_PASSNAME = 3
  export const MAIL_TITLE_PASSWORD = 4
  export const MAIL_TITLE_ITEM = 5
  export const MAIL_TITLE_ACTOR = 6
  export const MAIL_TITLE_REPORT = 7
  export const MAIL_TITLE_BUG = 8
  export const MAIL_TITLE_NETWORD = 9
  export const MAIL_TITLE_ADVICE = 10
  export const MAIL_TITLE_OTHER = 0
  export const DONATE_TYPE_MONEY3 = 1
  export const DONATE_TYPE_MONEY1 = 2
  export const DONATE_TYPE_WOOD = 3
  export const DONATE_TYPE_STONE = 4
  export const DONATE_TYPE_IRON = 5
  export const DONATE_LABEL = [
    [
      ['1万铜', '无'],
      ['10万铜', '无'],
      ['100万铜', '无'],
    ],
    [
      ['10黄金', '10贡献度'],
      ['50黄金', '50贡献度'],
      ['100黄金', '100贡献度'],
    ],
    [
      ['5木材', '1贡献度'],
      ['50木材', '10贡献度'],
      ['500木材', '100贡献度'],
    ],
    [
      ['5石材', '1贡献度'],
      ['50石材', '10贡献度'],
      ['500石材', '100贡献度'],
    ],
    [
      ['5铁矿', '1贡献度'],
      ['50铁矿', '10贡献度'],
      ['500铁矿', '100贡献度'],
    ],
  ]
  export const DONATE_DATA = [
    [
      [Define.DONATE_TYPE_MONEY3, 1e4, 0],
      [Define.DONATE_TYPE_MONEY3, 1e5, 0],
      [Define.DONATE_TYPE_MONEY3, 1e6, 0],
    ],
    [
      [Define.DONATE_TYPE_MONEY1, 10, 10],
      [Define.DONATE_TYPE_MONEY1, 50, 50],
      [Define.DONATE_TYPE_MONEY1, 100, 100],
    ],
    [
      [Define.DONATE_TYPE_WOOD, 5, 1],
      [Define.DONATE_TYPE_WOOD, 50, 10],
      [Define.DONATE_TYPE_WOOD, 500, 100],
    ],
    [
      [Define.DONATE_TYPE_STONE, 5, 1],
      [Define.DONATE_TYPE_STONE, 50, 10],
      [Define.DONATE_TYPE_STONE, 500, 100],
    ],
    [
      [Define.DONATE_TYPE_IRON, 5, 1],
      [Define.DONATE_TYPE_IRON, 50, 10],
      [Define.DONATE_TYPE_IRON, 500, 100],
    ],
  ]
  export const DONATE_MONEY3 = [
    ['1万铜', '无'],
    ['10万铜', '无'],
    ['100万铜', '无'],
  ]
  export const DONATE_MONEY3_VALUE = [
    [Define.DONATE_TYPE_MONEY3, 1e4],
    [Define.DONATE_TYPE_MONEY3, 1e5],
    [Define.DONATE_TYPE_MONEY3, 1e6],
  ]
  export const DONATE_MONEY1 = [
    ['10黄金', '10贡献度'],
    ['50黄金', '50贡献度'],
    ['100黄金', '100贡献度'],
    ['500黄金', '500贡献度'],
    ['1000黄金', '1000贡献度'],
  ]
  export const DONATE_MONEY1_VALUE = [
    [Define.DONATE_TYPE_MONEY1, 10],
    [Define.DONATE_TYPE_MONEY1, 50],
    [Define.DONATE_TYPE_MONEY1, 100],
    [Define.DONATE_TYPE_MONEY1, 500],
    [Define.DONATE_TYPE_MONEY1, 1e3],
  ]
  export const DONATE_WOODArray = [
    ['5木材', '1贡献度'],
    ['50木材', '10贡献度'],
    ['500木材', '100贡献度'],
  ]
  export const DONATE_WOOD_VALUE = [
    [Define.DONATE_TYPE_WOOD, 5],
    [Define.DONATE_TYPE_WOOD, 50],
    [Define.DONATE_TYPE_WOOD, 500],
  ]
  export const DONATE_STONE = [
    ['5石材', '1贡献度'],
    ['50石材', '10贡献度'],
    ['500石材', '100贡献度'],
  ]
  export const DONATE_STONE_VALUE = [
    [Define.DONATE_TYPE_STONE, 5],
    [Define.DONATE_TYPE_STONE, 50],
    [Define.DONATE_TYPE_STONE, 500],
  ]
  export const DONATE_IRON = [
    ['5铁矿', '1贡献度'],
    ['50铁矿', '10贡献度'],
    ['500铁矿', '100贡献度'],
  ]
  export const DONATE_IRON_VALUE = [
    [Define.DONATE_TYPE_IRON, 5],
    [Define.DONATE_TYPE_IRON, 50],
    [Define.DONATE_TYPE_IRON, 500],
  ]
  export const MASTER_FLAG_NONE = 0
  export const MASTER_FLAG_MASTER = 1
  export const MASTER_FLAG_PRENTICE = 2
  export const BIND_SETTING_SMS = 1
  export const BIND_SETTING_12114 = 2
  export const bindType = Define.BIND_SETTING_SMS
  export const BIND_SETTING_FUNCTION_RESET = 1
  export const BIND_SETTING_FUNCTION_FIND = 2
  export const BIND_SETTING_FUNCTION_CLEAN = 3
  export const BIND_SETTING_FUNCTION_BIND = 4
  export const CLIENT_TYPE_NULL = 0
  export const CLIENT_TYPE_JAR = 1
  export const CLIENT_TYPE_ANDROID = 2
  export const CLIENT_TYPE_IOS = 3
  export const CLIENT_TYPE_JAR_NEW = 4
  export const CLIENT_TYPE_ANDROID_NEW = 5
  export const CLIENT_TYPE_IOS_NEW = 6
  export const IS_OPEN_TYPE_BONUS_ONLINE = 1
  export const IS_OPEN_TYPE_LOTTERY_DRAW_NEW = 2
  export const IS_OPEN_TYPE_BOSS_REWARD = 3
  export const IS_OPEN_TYPE_CHARGE_ACTIVITY = 4
  export const IS_OPEN_TYPE_ENCHANT = 5
  export const IS_OPEN_TYPE_FORMATION = 6
  export const IS_OPEN_TYPE_WO = 7
  export const IS_OPEN_TYPE_MO9_POP = 8
  export const IS_OPEN_TYPE_PLAYER_IDENTIFY = 9
  export const IS_OPEN_TYPE_UPGRADE = 10
  export const IS_OPEN_TYPE_BATTLE = 11
  export const IS_OPEN_TYPE_COST_REWARD = 12
  export const IS_OPEN_TYPE_LEVEL_REWARD = 16
  export const IS_OPEN_TYPE_MICRO_REWARD = 17
  export const IS_OPEN_TYPE_SEVENDAY_REWARD = 18
  export const IS_OPEN_TYPE_EXCHANGE_MONEY = 20
  export const IS_OPEN_TYPE_OFFLINE_EXP = 21
  export const IS_OPEN_TYPE_OPEN_ACTIVITIES = 22
  export const IS_OPEN_TYPE_OPEN_VIP = 23
  export const IS_OPEN_TYPE_DAYACTITY = 24
  export const IS_OPEN_TYPE_SERVERFOUNDATION = 25
  export const IS_OPEN_TYPE_SHARE = 26
  export const IS_OPEN_TYPE_FIRST_CHARGE = 27
  export const IS_OPEN_TYPE_FOLLOW = 28
  export const IS_OPEN_TYPE_ONEKEY_DAILY = 30
  export const IS_OPEN_TYPE_SPRING = 31
  export const GUIDE_TYPE_CP = 1
  export const GUIDE_TYPE_MAIL = 2
  export const GUIDE_TYPE_COUNTRY = 3
  export const GUIDE_TYPE_MAP = 4
  export const GUIDE_TYPE_PET_EVOLVE = 5
  export const GUIDE_TYPE_LEARN_SKILL = 6
  export const GUIDE_TYPE_LOTTERY_DRAW = 7
  export const GUIDE_TYPE_ITEM_USE = 8
  export const GUIDE_TYPE_EQUIP = 9
  export const GUIDE_TYPE_LEVEL15_ASS = 10
  export const GUIDE_TYPE_SHOP = 11
  export const GUIDE_TYPE_MOSAIC = 12
  export const GUIDE_TYPE_NEW_LEARN_SKILL = 13
  export const GUIDE_TYPE_PET_LEARN_SKILL = 14
  export const GUIDE_TYPE_IDENTIFY = 15
  export const GUIDE_TYPE_SYNTHIS = 16
  export const PLAYER_SHOP_TYPE_NORMAL = 0
  export const PLAYER_SHOP_TYPE_ENCHANT = 1
  export const SHOP_MINIGAME_START = 23600
  export const SHOP_MINIGAME_END = 23699
  export const GAME_TYPE_GUESS = 0
  export const GAME_TYPE_PLUMBER = 1
  export const OK = 'ok'
  export const NO = 'no'
  export const MAX_OTHER_PRICE_MAX = 8
  export const MAX_SELL_NAME = 20
  export const MAX_ACTOR_PRICE_MAX = 6
  export const MAX_NAME_LENGTH = 12
  export const MAX_USERNAME_LENGTH = 20
  export const MAX_COUNTRY_NAME_LEN = 12
  export const MAX_BIND_PHONE = 12
  export const MAX_CHAT_LEN = 120
  export const MAX_MAIL_CONTENT_LEN = 100
  export const MAX_CITY_NAME_LEN = 20
  export const MAX_CITY_SIGN_LEN = 100
  export const MAX_PET_NAME_LEN = 12
  export const MAX_COUNTRY_AFFICHE_LEN = 100
  export const MAX_MASTER_MANIFESTO = 100
  export const MAX_FRIEND_REMARDS = 14
  export const default_clear_time = 3e5
  export const CHANNEL_9G = 2e3
  export const CHANNEL_1758 = 2300
  export const CHANNEL_SINA = 2900
  export const CHANNEL_QQBROWSER = 3100
  export const CHANNEL_UCALI = 3200
  export const CHANNEL_WANBA = 7500
  export const CHANNEL_YIJIE = 10600
  export const CHANNEL_JIUYAO = 10700
  export const CHANNEL_MANBA = 10800
  export const CHANNEL_XIAOMI = 10900
  export const CHANNEL_QUANQUAN = 11e3

  export function addValuePlayer(player: Player, type: number, n: number, i: boolean, o: number) {
    if (player != null) {
      const get = function (player: Player) {
        return (type = i ? ((n * player.get(o)) / 100) >> 0 : n)
      }
      const val = get(player)
      player.addValue(type, val)
      let pet = player.getPet()
      if (pet) {
        const val = get(pet)
        pet.addValue(type, val)
      }
      const mercenaries = player.getMerList()
      for (let i = 0; i < mercenaries.length; i++) {
        const mercenary = mercenaries[i]
        if (mercenary !== null) {
          let val = get(mercenary)
          mercenary.addValue(type, val)
          pet = mercenary.getPet()
          if (pet !== null) {
            val = get(pet)
            pet.addValue(type, val)
          }
        }
      }
    }
  }

  export function isAllocateMirrorMap(e: number): boolean {
    return e >= Define.MAP_ID_START_MIRROR_ALLOCATE && e <= Define.MAP_ID_END_MIRROR_ALLOCATE
  }

  export function isAllocateCityMap(e: number): boolean {
    return e >= Define.MAP_ID_START_CITY_ALLOCATE && e <= Define.MAP_ID_END_CITY_ALLOCATE
  }

  export function isAllocateCountryMap(e: number): boolean {
    return !!(e >= Define.MAP_ID_START_COUNTRY_ALLOCATE
      && e <= Define.MAP_ID_END_COUNTRY_ALLOCATE)
  }

  export function isCountrySkillShop(id: number): boolean {
    return (id >= Define.SKILL_SHOP_COUNTRY_START_PLAYER
      && id <= Define.SKILL_SHOP_COUNTRY_END_PLAYER)
      ? true
      : !!(id >= Define.SKILL_SHOP_COUNTRY_START_PET
        && id <= Define.SKILL_SHOP_COUNTRY_END_PET)
  }

  export function isCountryShop(id: number): boolean {
    return id >= Define.SHOP_COUNTRY_START && id <= Define.SHOP_COUNTRY_END
  }

  export function isCommonMap(id: number): boolean {
    return !!(id >= Define.MAP_ID_START_COMMON && id <= Define.MAP_ID_END_COMMON)
  }

  export function getTypeBySkillShopID(id: number): number {
    return (id >= Define.SKILL_SHOP_START_PLAYER && id < Define.SKILL_SHOP_END_PLAYER)
      ? Define.SKILL_TYPE_PLAYER
      : (id >= Define.SKILL_SHOP_START_PET && id < Define.SKILL_SHOP_END_PET)
          ? Define.SKILL_TYPE_PET
          : Define.SKILL_TYPE_OTHER
  }

  export function getRankString(rank: number) {
    return (rank < 0 || rank >= Define.rankText.length) ? '' : Define.rankText[rank]
  }

  export function isNetBattleID(id: number) {
    return id >= Define.BATTLE_NET_START && id <= Define.BATTLE_NET_END
  }

  export function getSexString(sex: number) {
    return (sex < 0 || sex >= Define.sexTEXT.length) ? `sex_${sex}` : Define.sexTEXT[sex]
  }

  export function getRaceString(race: number) {
    return (race < 0 || race >= Define.raceText.length) ? `race_${race}` : Define.raceText[race]
  }

  export function getJobString(job: number) {
    return (job < 0 || job >= Define.jobText.length) ? `job_${job}` : Define.jobText[job]
  }

  export function getBufferBitValue(bit: number) {
    return bit === BUFFER_NONE ? 0 : 1 << bit
  }

  export function getBufferType(type: number, flag = false) {
    if (flag) {
      if (
        type >= getBufferBitValue(BUFFER_POISON)
        && type <= getBufferBitValue(BUFFER_WEAK)
      )
        return BUFFER_TYPE_DEBUFF
      if (type === getBufferBitValue(BUFFER_DIE_CANNOT_RELIVE))
        return BUFFER_TYPE_DEBUFF
    }
    else {
      if (type >= BUFFER_POISON && type <= BUFFER_WEAK)
        return BUFFER_TYPE_DEBUFF
      if (type === BUFFER_DIE_CANNOT_RELIVE)
        return BUFFER_TYPE_DEBUFF
    }
    return BUFFER_TYPE_BUFF
  }

  export function isPhysicalAtkType(type: number) {
    return type <= ATKTYPE_RANGE_AGI
  }

  export function getSkillAreaPlayerNum(type: number) {
    switch (type) {
      case SKILL_AREA_PLAYER_AND_PET:
      case SKILL_AREA_FRONT_BACK_TWO:
      case SKILL_AREA_UP_DOWN_TWO:
      case SKILL_AREA_ENEMY_FONT_BACK_TWO:
      case SKILL_AREA_ENEMY_UP_DOWN_TWO:
      case SKILL_AREA_ME_FONT_BACK_TWO:
      case SKILL_AREA_ME_UP_DOWN_TWO:
        return SKILL_AREA_CURSOR_2
      case SKILL_AREA_UP_DOWN_THREE:
      case SKILL_AREA_ENEMY_UP_DOWN_THREE:
      case SKILL_AREA_ME_UP_DOWN_THREE:
        return SKILL_AREA_CURSOR_3
      case SKILL_AREA_UP_DOWN_FOUR:
      case SKILL_AREA_ENEMY_UP_DOWN_FOUR:
      case SKILL_AREA_ME_UP_DOWN_FOUR:
      case SKILL_AREA_SQUARE:
      case SKILL_AREA_ENEMY_SQUARE:
      case SKILL_AREA_ME_SQUARE:
      case SKILL_AREA_TEN:
      case SKILL_AREA_ENEMY_TEN:
      case SKILL_AREA_ME_TEN:
        return SKILL_AREA_CURSOR_4
      case SKILL_AREA_UP_DOWN_FIVE:
      case SKILL_AREA_ENEMY_UP_DOWN_FIVE:
      case SKILL_AREA_ME_UP_DOWN_FIVE:
        return SKILL_AREA_CURSOR_5
      case SKILL_AREA_AROUND_SIX:
      case SKILL_AREA_ENEMY_AROUND_SIX:
      case SKILL_AREA_ME_AROUND_SIX:
        return SKILL_AREA_CURSOR_6
      case SKILL_AREA_ALL:
      case SKILL_AREA_ENEMY_ALL:
      case SKILL_AREA_ME_ALL:
      case SKILL_AREA_ME_ALL_NO_SELF:
      case SKILL_AREA_ALL_NO_SELF:
        return SKILL_AREA_CURSOR_ALL
    }
    return SKILL_AREA_CURSOR_1
  }

  export function processBattleReborn(player: Player, type: number, i: number, _: number, __: any[]) {
    if (player.isDead())
      return false
    if (player.isBattleStatus(getBufferBitValue(BUFFER_DIE_CANNOT_RELIVE)))
      return false
    player.clearBufferList(true)
    player.addValue(Model.HP, type)
    if (i !== 0)
      player.addValue(Model.MP, i)
    return true
  }

  export function processBattleHpMpPower(player: Player, attrID: number, addValue: number, animeID: number, control: Control[]) {
    return processBattleHpMpPowerBySelf(player, attrID, addValue, animeID, control, false)
  }

  export function processBattleHpMpPowerBySelf(player: Player, attrID: number, addValue: number, animeID: number, control: Control[], flag = false) {
    if (player.isDead())
      return false
    player.addValue(attrID, addValue)
    let r = Battle.EFFECT_HIT
    attrID === Model.HP
      ? (player.isDeadNoWithDelay() && (r |= Battle.EFFECT_DIE))
      : (r |= Battle.EFFECT_MP_CHANGE)
    const s = Control.createBattleTargetEffect(flag, player.position, addValue, r, animeID)
    control != null && control.push(s)
    return true
  }

  export function getSearchTypeByArea(area: number) {
    return ((area >= SKILL_AREA_ENEMY_SINGLE && area <= SKILL_AREA_ENEMY_ALL)
      || area === SKILL_AREA_ENEMY_HP_LEAST
      || area === SKILL_AREA_ENEMY_HP_MOST)
      ? SKILL_AREA_SEARCH_ENEMY
      : ((area >= SKILL_AREA_ME_SIGHLE && area <= SKILL_AREA_ME_ALL)
        || area === SKILL_AREA_ME_HP_LEAST
        || area === SKILL_AREA_ME_HP_MOST
        || area === SKILL_AREA_ME_ALL_NO_SELF)
          ? SKILL_AREA_SEARCH_FRIEND
          : area === SKILL_AREA_MY_SELF
            ? SKILL_AREA_SEARCH_MY_SELF
            : area === SKILL_AREA_MY_OWNER
              ? SKILL_AREA_SEARCH_MY_OWNER
              : SKILL_AREA_SEARCH_ALL
  }

  export function processBattlePower(battle: Battle, player: Player, i: Player, o, a, r, s, l, _, h) {
    if (battle != null && player != null && !(a <= 0)) {
      let u = 0
      let c = -1
      let T = 0
      let p: number
      switch (a) {
        case POWER_SWORD_ATK_TIME:
        case POWER_BLADE_ATK_TIME:
        case POWER_HEAVY_ATK_TIME:
        case POWER_LANCE_ATK_TIME:
        case POWER_STAFF_ATK_TIME:
        case POWER_HAND_ATK_TIME:
        case POWER_BOW_ATK_TIME:
        case POWER_HAND_ITEM_ATK_TIME:
        case POWER_ALL_ATK_TIME:
        case POWER_BALL_ATK_TIME:
        case POWER_GUN_ATK_TIME:
          {
            p = player.getEquipWeaponType()
            if (
              a === POWER_SWORD_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_SWORD
              && p !== ITEM_TYPE_WEAPON_TWOHAND_SWORD
            )
              return
            if (
              a === POWER_BLADE_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_BLADE
              && p !== ITEM_TYPE_WEAPON_TWOHAND_BLADE
            )
              return
            if (
              a === POWER_HEAVY_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_HEAVY
              && p !== ITEM_TYPE_WEAPON_TWOHAND_HEAVY
            )
              return
            if (
              a === POWER_LANCE_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_TWOHAND_LANCE
            )
              return
            if (
              a === POWER_STAFF_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_TWOHAND_STAFF
            )
              return
            if (a === POWER_BALL_ATK_TIME && p !== ITEM_TYPE_WEAPON_BALL)
              return
            if (
              a === POWER_GUN_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_GUN
              && p !== ITEM_TYPE_WEAPON_TWOHAND_GUN
            )
              return
            if (a === POWER_HAND_ATK_TIME && p !== BACK_ERROR_NULL_HAND)
              return
            if (
              a === POWER_BOW_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
              && p !== ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW
              && p !== ITEM_TYPE_WEAPON_TWOHAND_BOW
            )
              return
            if (
              a === POWER_HAND_ITEM_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_HAND
            )
              return
            c = Model.ATK_TIME
            u = r
            player.addValue(c, u)
          }
          break
        case POWER_SWORD_PERCENT:
        case POWER_BLADE_PERCENT:
        case POWER_HEAVY_PERCENT:
        case POWER_LANCE_PERCENT:
        case POWER_STAFF_PERCENT:
        case POWER_HAND_PERCENT:
        case POWER_BOW_PERCENT:
        case POWER_HAND_ITEM_PERCENT:
        case POWER_BALL_PERCENT:
        case POWER_GUN_PERCENT:
        case POWER_ALL_PERCENT:
          {
            p = player.getEquipWeaponType()
            if (
              a === POWER_SWORD_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_SWORD
              && p !== ITEM_TYPE_WEAPON_TWOHAND_SWORD
            )
              return
            if (
              a === POWER_BLADE_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_BLADE
              && p !== ITEM_TYPE_WEAPON_TWOHAND_BLADE
            )
              return
            if (
              a === POWER_HEAVY_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_HEAVY
              && p !== ITEM_TYPE_WEAPON_TWOHAND_HEAVY
            )
              return
            if (
              a === POWER_LANCE_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_TWOHAND_LANCE
            )
              return
            if (
              a === POWER_STAFF_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_TWOHAND_STAFF
            )
              return
            if (a === POWER_BALL_ATK_TIME && p !== ITEM_TYPE_WEAPON_BALL)
              return
            if (
              a === POWER_GUN_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_GUN
              && p !== ITEM_TYPE_WEAPON_TWOHAND_GUN
            )
              return
            if (a === POWER_HAND_ATK_TIME && p !== BACK_ERROR_NULL_HAND)
              return
            if (
              a === POWER_BOW_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
              && p !== ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW
              && p !== ITEM_TYPE_WEAPON_TWOHAND_BOW
            )
              return
            if (
              a === POWER_HAND_ITEM_ATK_TIME
              && p !== ITEM_TYPE_WEAPON_ONEHAND_HAND
            )
              return
            c = Model.WEAPON_DAMAGE_PERCENT
            u = r
            player.addValue(c, u)
          }
          break
        case POWER_SPEED:
          c = Model.SPEED
          u = r
          player.addValue(c, u)
          break
        case POWER_SPEED_PERCENT:
          c = Model.SPEED
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_ATK_STR:
          c = Model.ATK_STR
          u = r
          player.addValue(c, u)
          break
        case POWER_ATK_STR_PERCENT:
          c = Model.ATK_STR
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_ATK_AGI:
          c = Model.ATK_AGI
          u = r
          player.addValue(c, u)
          break
        case POWER_ATK_AGI_PERCENT:
          c = Model.ATK_AGI
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_ATK_MAGIC:
          c = Model.ATK_MAGIC
          u = r
          player.addValue(c, u)
          break
        case POWER_ATK_MAGIC_PERCENT:
          c = Model.ATK_MAGIC
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_DEF_STR:
          c = Model.DEF_STR
          u = r
          player.addValue(c, u)
          break
        case POWER_DEF_STR_PERCENT:
          c = Model.DEF_STR
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_DEF_AGI:
          c = Model.DEF_AGI
          u = r
          player.addValue(c, u)
          break
        case POWER_DEF_AGI_PERCENT:
          c = Model.DEF_AGI
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_DEF_MAGIC:
          c = Model.DEF_MAGIC
          u = r
          player.addValue(c, u)
          break
        case POWER_DEF_MAGIC_PERCENT:
          c = Model.DEF_MAGIC
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_CRITICAL:
          c = Model.CRITICAL
          u = r
          player.addValue(c, u)
          break
        case POWER_CRITICAL_PERCENT:
          c = Model.CRITICAL
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_MAGIC_HITRATE:
          c = Model.HIT_MAGIC
          u = r
          player.addValue(c, u)
          break
        case POWER_MAGIC_HITRATE_PERCENT:
          c = Model.HIT_MAGIC
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_HITRATE:
          c = Model.HIT_RATE
          u = r
          player.addValue(c, u)
          break
        case POWER_HITRATE_PERCENT:
          c = Model.HIT_RATE
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_HIT_FORCE:
          c = Model.FORCE_HIT
          u = r
          player.addValue(c, u)
          break
        case POWER_HIT_FORCE_PERCENT:
          c = Model.FORCE_HIT
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_DODGE:
          c = Model.DODGE
          u = r
          player.addValue(c, u)
          break
        case POWER_DODGE_PERCENT:
          c = Model.DODGE
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_WIL:
          c = Model.WIL
          u = r
          player.addValue(c, u)
          break
        case POWER_WIL_PERCENT:
          c = Model.WIL
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_TOUGH:
          c = Model.TOUGH
          u = r
          player.addValue(c, u)
          break
        case POWER_TOUGH_PERCENT:
          c = Model.TOUGH
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_PENETRATION:
          c = Model.BRK_ARMOR
          u = r
          player.addValue(c, u)
          break
        case POWER_PENETRATION_PERCENT:
          c = Model.BRK_ARMOR
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_MAGIC_PENETRATION:
          c = Model.MAGIC_PENETRATION
          u = r
          player.addValue(c, u)
          break
        case POWER_MAGIC_PENETRATION_PERCENT:
          c = Model.MAGIC_PENETRATION
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_BLOCK:
          c = Model.BLOCK
          u = r
          player.addValue(c, u)
          break
        case POWER_BLOCK_PERCENT:
          c = Model.BLOCK
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_DEF_FIELD:
          c = Model.DEF_FIELD
          u = r
          player.addValue(c, u)
          break
        case POWER_DEF_FIELD_PERCENT:
          c = Model.DEF_FIELD
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_INSIGHT:
          c = Model.INSIGHT
          u = r
          player.addValue(c, u)
          break
        case POWER_INSIGHT_PERCENT:
          c = Model.INSIGHT
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_BACK:
          c = Model.BACK
          u = r
          player.addValue(c, u)
          break
        case POWER_BACK_PERCENT:
          c = Model.BACK
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_MAGIC_BACK:
          c = Model.MAGIC_BACK
          u = r
          player.addValue(c, u)
          break
        case POWER_MAGIC_BACK_PERCENT:
          c = Model.MAGIC_BACK
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_LIFE_ABSORPTION:
          c = Model.LIFE_ABSORPTION
          u = r
          player.addValue(c, u)
          break
        case POWER_LIFE_ABSORPTION_PERCENT:
          c = Model.LIFE_ABSORPTION
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_MANA_ABSORPTION:
          c = Model.MANA_ABSORPTION
          u = r
          player.addValue(c, u)
          break
        case POWER_MANA_ABSORPTION_PERCENT:
          c = Model.MANA_ABSORPTION
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_HEAL_RECOVERY:
          c = Model.HEAL_RECOVERY
          u = r
          player.addValue(c, u)
          break
        case POWER_HEAL_RECOVERY_PERCENT:
          c = Model.HEAL_RECOVERY
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_MANA_RECOVERY:
          c = Model.MANA_RECOVERY
          u = r
          player.addValue(c, u)
          break
        case POWER_MANA_RECOVERY_PERCENT:
          c = Model.MANA_RECOVERY
          u = ((r * player.get(c)) / 100) >> 0
          player.addValue(c, u)
          break
        case POWER_HP:
          c = Model.HP
          u = r
          if (
            o != null
            && o.area !== SKILL_AREA_MY_SELF
            && processBattleKeepOutPower(player, u, h)
          )
            break
          if (u > 0 && player.isBattleStatus(getBufferBitValue(BUFFER_BURN)))
            u = (u / 2) >> 0

          if (processBattleHpMpPower(player, c, u, _, h) === false)
            return addBufferBySpecial(l, c, u, s, player, battle, _)
          battle.checkDie1Hp(player, null)
          break
        case POWER_HP_PERCENT:
          c = Model.HP
          u = ((r * player.get(Model.HPMAX)) / 100) >> 0
          if (
            o != null
              && o.area !== SKILL_AREA_MY_SELF
              && processBattleKeepOutPower(player, u, h)
          )
            break
          if (u < 0) {
            let d = Battle.calTouch(player)
            i !== null && player !== i && (d -= i.get(Model.IGNORE_TOUCH))
            d > Battle.MAX_RATE_TOUCH && (d = Battle.MAX_RATE_TOUCH)
            if (d > 0) {
              u -= ((u * d) / 1e3) >> 0
              u > 0 && (u = 0)
            }
          }

          if (u > 0 && player.isBattleStatus(getBufferBitValue(BUFFER_BURN)))
            u = (u / 2) >> 0

          if (!processBattleHpMpPower(player, c, u, _, h))
            return addBufferBySpecial(l, c, u, s, player, battle, _)
          battle.checkDie1Hp(player, null)
          break
        case POWER_RECOVER:
          if (!processBattleReborn(player, u, u, _, h))
            return
          break
        case POWER_RECOVER_PERCENT:
          {
            const E = ((r * player.get(Model.HPMAX)) / 100) >> 0
            const g = ((r * player.get(Model.MPMAX)) / 100) >> 0
            if (!processBattleReborn(player, E, g, _, h))
              return
          }

          break
        case POWER_MP:
          c = Model.MP
          u = r
          if (u > 0 && player.isBattleStatus(getBufferBitValue(BUFFER_POISON)))
            u = (u / 2) >> 0

          if (!processBattleHpMpPower(player, c, u, _, h))
            return addBufferBySpecial(l, c, u, s, player, battle, _)
          break
        case POWER_MP_PERCENT:
          c = Model.MP
          u = ((r * player.get(Model.MPMAX)) / 100) >> 0
          if (u > 0 && player.isBattleStatus(getBufferBitValue(BUFFER_POISON)))
            u = (u / 2) >> 0
          if (!processBattleHpMpPower(player, c, u, _, h))
            return addBufferBySpecial(l, c, u, s, player, battle, _)
          break
        case POWER_REMOVE_STATUS:
          c = Model.BUFFER_REMOVE_STATUS
          u = r
          player.removeBufferByStatus(r)
          break
        case POWER_KEEPOUT_ATK_TIME:
          c = Model.KEEPOUT_ATK_TIME
          u = r
          T = player.keepout_atk_time
          if (u < 0 && T + u <= 0 && player.isTabStatus(Model.TAG_IS_KEEP_OUT))
            u++
          player.addValue(c, u)
      }
      if (l > 0 && c >= 0) {
        if (u === 0 && s === BUFFER_NONE)
          return
        l--
        let S = player.readAddValue
        if (a === POWER_KEEPOUT_ATK_TIME && u < 0 && player.isTabStatus(Model.TAG_IS_KEEP_OUT)) {
          T--
          S = player.keepout_atk_time - T
        }
        const m = new PlayerBuffer(battle, c, u, s, l, _, S)
        player.addBuffer(m)
      }
    }
  }

  export function addBufferBySpecial(e, n, i, o, a, r, s) {
    if (o === BUFFER_DIE_CANNOT_RELIVE && e > 0 && n >= 0) {
      if (i === 0 && o === BUFFER_NONE)
        return
      e--
      const l = a.readAddValue
      const _ = new PlayerBuffer(r, n, i, o, e, s, l)
      a.addBuffer(_)
    }
  }

  export function processBattleKeepOutPower(t, e, n) {
    if (t == null)
      return false
    if (e >= 0)
      return false
    if (t.keepout_atk_time <= 0)
      return false
    let i = Battle.EFFECT_HIT
    t.isTabStatus(Model.TAG_IS_KEEP_OUT) === 0
      && (i |= Battle.EFFECT_KEEPOUT)
    t.setTabStatus(true, Model.TAG_IS_KEEP_OUT)
    // var o = Control.createBattleTargetEffect(false, t.position, 0, i, 0);
    return true
  }

  export function isNullHand(left: number, right: number) {
    return !!(left < 0 && right < 0)
  }

  export function isValidOneSword(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_ONEHAND_SWORD === left
      || ITEM_TYPE_WEAPON_ONEHAND_SWORD === right
    )
  }

  export function isValidTwoSword(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_SWORD === left
      || ITEM_TYPE_WEAPON_TWOHAND_SWORD === right
    )
  }

  export function isValidSword(left: number, right: number) {
    return isValidOneSword(left, right) || isValidTwoSword(left, right)
  }

  export function isValidOneBlade(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_ONEHAND_BLADE === left
      || ITEM_TYPE_WEAPON_ONEHAND_BLADE === right
    )
  }

  export function isValidTwoBlade(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_BLADE === left
      || ITEM_TYPE_WEAPON_TWOHAND_BLADE === right
    )
  }

  export function isValidBlade(left: number, right: number) {
    return isValidOneBlade(left, right) || isValidTwoBlade(left, right)
  }

  export function isValidOneHeavy(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_ONEHAND_HEAVY === left
      || ITEM_TYPE_WEAPON_ONEHAND_HEAVY === right
    )
  }

  export function isValidTwoHeavy(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_HEAVY === left
      || ITEM_TYPE_WEAPON_TWOHAND_HEAVY === right
    )
  }

  export function isValidHeavy(left: number, right: number) {
    return isValidOneHeavy(left, right) || isValidTwoHeavy(left, right)
  }

  export function isValidLance(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_LANCE === left
      || ITEM_TYPE_WEAPON_TWOHAND_LANCE === right
    )
  }

  export function isValidOneCrossrow(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW === left
      || ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW === right
    )
  }

  export function isValidTwoCrossrow(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW === left
      || ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW === right
    )
  }

  export function isValidCrossrow(left: number, right: number) {
    return isValidOneCrossrow(left, right) || isValidTwoCrossrow(left, right)
  }

  export function isValidBow(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_BOW === left
      || ITEM_TYPE_WEAPON_TWOHAND_BOW === right
    )
  }

  export function isTwoHand(left: number, right: number) {
    return !!(left > 0 && right > 0)
  }

  export function isNoHeavyTypeWeapon(type: number) {
    return !!(type > 0
      && (type === ITEM_TYPE_WEAPON_ONEHAND_SWORD
        || type === ITEM_TYPE_WEAPON_ONEHAND_BLADE
        || type === ITEM_TYPE_WEAPON_ONEHAND_HEAVY
        || type === ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
        || type === ITEM_TYPE_WEAPON_ONEHAND_HEAVY
        || type === ITEM_TYPE_WEAPON_ONEHAND_GUN))
  }

  export function isOneHandWeapon(left: number, right: number) {
    return isNullHand(left, right)
      ? false
      : (isTwoHand(left, right)
        && left !== ITEM_TYPE_WEAPON_ONEHAND_HAND
        && right !== ITEM_TYPE_WEAPON_ONEHAND_HAND)
          ? false
          : !!(isNoHeavyTypeWeapon(left) || isNoHeavyTypeWeapon(right))
  }

  export function isValidStaff(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_STAFF === left
      || ITEM_TYPE_WEAPON_TWOHAND_STAFF === right
    )
  }

  export function isValidBall(left: number, right: number) {
    return ITEM_TYPE_WEAPON_BALL === left || ITEM_TYPE_WEAPON_BALL === right
  }

  export function isValidOneGun(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_ONEHAND_GUN === left
      || ITEM_TYPE_WEAPON_ONEHAND_GUN === right
    )
  }

  export function isValidTwoGun(left: number, right: number) {
    return (
      ITEM_TYPE_WEAPON_TWOHAND_GUN === left
      || ITEM_TYPE_WEAPON_TWOHAND_GUN === right
    )
  }

  export function isValidGun(left: number, right: number) {
    return isValidOneGun(left, right) || isValidTwoGun(left, right)
  }

}
