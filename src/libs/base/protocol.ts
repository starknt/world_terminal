import { Define } from 'libs/defined/defined'
import type { GameMap } from 'libs/typings/GameMap'
import type { ItemData } from 'libs/typings/ItemData'
import type { Player } from 'libs/typings/Player'
import type { ShopItemData } from 'libs/typings/ShopItem'

export const enum ProtocolCmd {
  LC_CHECKEDITION = 5e3,
  LC_PLAYER_CREATE = 5001,
  LC_PLAYER_LOGIN = 5002,
  LC_PLAYER_CREATE_AUTO = 5003,
  LC_GAME_GET_AREA_AND_LINE = 5007,
  CG_LOGIN_PLAYERCHECK = 1,
  CG_LOGIN_ACTORENTER = 2,
  CG_LOGIN_ACTORLEAVE = 3,
  CG_ERROR_NOTIFY = 5,
  CG_LOGIN_ACTORLIST = 10001,
  CG_LOGIN_CREATEACTOR = 10002,
  CG_LOGIN_DELETEACTOR = 10003,
  CG_LOGIN_RECOVERACTOR = 10004,
  CG_LOGIN_CREATEACTOR_AUTO = 10005,
  CG_CHANGE_ACCOUNT = 10006,
  CG_CHANGE_ACTOR = 10007,
  CG_LOGIN_DELETEACTOR_PASSWD = 10017,
  CG_ACTOR_ATTRIBUTE_UPDATE_STRING = 11037,
  CG_ACTOR_CHANGE_NAME = 11038,
  CG_ACTOR_IS_TOURIST = 11097,
  CG_BIND_PHONE = 10008,
  CG_BIND_EMAIL = 10010,
  CG_BIND_SETTING = 10011,
  CG_PET_CHANGE_NOTIFY = 15501,
  CG_PET_SEE = 15502,
  CG_SOLDIER_GROUP_LIST = 15503,
  CG_SOLDIER_GROUP_INFO = 15504,
  CG_SOLDIER_GROUP_BUY = 15505,
  CG_SOLDIER_GROUP_MY_LIST_SLEEP = 15506,
  CG_SOLDIER_GROUP_MY_INFO = 15507,
  CG_SOLDIER_STATE_SET = 15508,
  CG_SOLDIER_STATE_NOTIFY = 15509,
  CG_SOLDIER_DELETE = 15510,
  CG_PET_CHANGE_NAME = 15511,
  CG_PET_INFO = 15512,
  CG_SOLDIER_GROUP_MY_LIST_CHANGE_CAPTAIN = 15513,
  CG_PET_INFO_BYID = 15514,
  CG_PET_EVOLVE = 15515,
  CG_GET_SEAL_PET_SKILL = 15516,
  GC_SEAL_PET_TYPE = 15517,
  CG_SYSTEM_HEART = 16001,
  CG_SYSTEM_TEST_OPER = 16002,
  CG_SCENE_ENTERMAP = 10501,
  CG_SCENE_LEAVEMAP = 10502,
  CG_SCENE_WORLDDATA = 10503,
  CG_SCENE_PLAYER_MOVING = 10504,
  CG_SCENE_GET_OTHER_PLAYER_STATE = 10505,
  CG_SCENE_GO_MAP = 10506,
  CG_SCENE_PLAYER_ICON = 10507,
  CG_SCENE_SHOW_TEXT = 10509,
  SHOW_TEXT_ERROR = 1,
  SHOW_TEXT_INFO = 2,
  SHOW_TEXT_OPEN = 3,
  SHOW_TEXT_SCROLL = 4,
  SHOW_TEXT_PROMPT = 5,
  CG_SCENE_GO_CITY = 10510,
  CG_CITY_INFO = 10511,
  CG_CITY_EXTRACT_MONEY = 10512,
  CG_CITY_CHANGE_NAME = 10513,
  CG_CITY_CHANGE_SIGN = 10514,
  CG_CITY_MAP_REFRESH = 10515,
  CG_SCENE_UPDATE = 10516,
  CG_SCENE_SETREBORNMAP = 10517,
  CG_SCENE_FINDPATH_MISSION = 10518,
  CG_SCENE_GETNPC = 10519,
  CG_SCENE_WORLDMAP = 10521,
  CG_SCENE_WORLDMAP_DATA = 10522,
  CG_SCENE_WORLDMAP_ENTER = 10523,
  CG_SCENE_GO_MAP_VIP = 10524,
  CG_SCENE_GO_MAP_UPGRADE = 10525,
  CG_SCENE_FINDPATH_AGAIN = 10527,
  CG_FIGHT_ENTER_LOCALBATTEL = 12501,
  CG_FIGHT_RUN_LOCALBATTLE = 12502,
  CG_FIGHT_ENTER_REMOTEBATTLE = 12503,
  CG_FIGHT_ENTER_BATTLE_NOTIFY = 12504,
  CG_FIGHT_BATTLE_DOPLAN = 12505,
  CG_FIGHT_BATTLE_UPDATE = 12506,
  CG_FIGHT_PK_ASK = 12507,
  CG_FIGHT_SEE_IN = 12508,
  CG_FIGHT_SEE_OUT = 12509,
  ADD_ITEM_BATTLE_REWARD = 0,
  ADD_ITEM_MISSION_REWARD = 1,
  ADD_ITEM_USE_REWARD = 2,
  ADD_ITEM_MAIL_REWARD = 3,
  CG_FIGHT_ENTER_PLAYER_REMOTEBATTLE = 12510,
  CG_FIGHT_ENTER_PLAYER_REMOTEBATTLE_LIST = 12511,
  CG_FIGHT_ENTER_PLAYER_BATTLE_NOTIFY_LIST = 12512,
  CG_FIGHT_ENTER_PLAYER_DATA = 12513,
  CG_FIGHT_ENTER_PLAYER_REMOTEBATTLE_EXIT = 12514,
  CG_FIGHT_ENTER_PLAYER_EXIT_NOTIFY = 12515,
  CG_FIGHT_ENTER_PLAYER_NOTIFY = 12516,
  CG_FIGHT_ENTER_COMPTITION = 12517,
  CG_FIGHT_EXIT_COMPTITION = 12518,
  CG_FIGHT_SAVE_ADJUST = 12519,
  CG_FIGHT_SHOW_RANK = 12520,
  CG_FIGHT_ADD_FIGHT_COUNT = 12521,
  CG_FIGHT_CREATE_COMPITION = 12522,
  CG_FIGHT_CLEAR_INTERVAL = 12523,
  CG_FIGHT_REFRESH_COMPITION = 12524,
  CG_FIGHT_ACTIVE_COMPITION = 12525,
  GC_SYNC_NOTICE_COMPTITION = 12526,
  GC_SYNC_MY_COMPITION_RANK = 12527,
  GC_SYNC_MY_SCORE_REWARD = 12528,
  GC_SYNC_MY_COMPITION_REWARD = 12529,
  GC_SYNC_MY_COMPITION_RANKLIST = 12530,
  GC_SYNC_REFRESH_COMPITION = 12531,
  GC_SYNC_INFO_COMPITION = 12532,
  CG_TASK_ARENA_JOIN = 14525,
  CG_TASK_ARENA_UPDATE = 14526,
  CG_TASK_ARENA_FIGHT = 14527,
  CG_TASK_ARENA_EXIT = 14528,
  CG_TASK_ARENA_END = 14529,
  CG_TASK_ARENA_JOIN_NEW = 14536,
  CG_TASK_ARENA_ACTOR_LIST = 14537,
  CG_TASK_ARENA_PK = 14538,
  CG_TASK_ARENA_SEE_RANDOM = 14539,
  CG_TASK_ARENA_START = 14540,
  CG_ACTOR_PLAYERBAG = 12001,
  PLAYERBAG_EQUIP = 1,
  PLAYERBAG_UN_EQUIP = 2,
  PLAYERBAG_USE = 3,
  PLAYERBAG_LOSE = 4,
  PLAYERBAG_CHECKUP = 5,
  PLAYERBAG_ENCHASE = 6,
  PLAYERBAG_BIND = 7,
  BAG_NO_WAIT = 0,
  BAG_USE_PET_EGG = 1,
  BAG_EQUIP_PET = 2,
  BAG_UN_EQUIP_PET = 3,
  BAG_USE_CHEST = 4,
  BAG_CHECKUP = 5,
  BAG_ENCHASE = 6,
  BAG_BIND = 7,
  BAG_COMMAND_BOOK = 8,
  BAG_EQUIP = 9,
  BAG_ADD_STORE_NUM = 10,
  BAG_ADD_EXP = 11,
  BAG_ADD_PET_EXP = 12,
  BAG_PET_RESET = 13,
  BAG_PET_AGE = 14,
  BAG_REPAIR = 15,
  BAG_GET_TITLE = 16,
  BAG_UN_EQUIP = 17,
  BAG_CHANGE_JOB = 18,
  BAG_PET_ITEM_ADD_SKILLS = 19,
  BAG_WAIT = 20,
  BAG_ALERT_SEX = 21,
  BAG_ADD_CP = 22,
  BAG_ADD_SP = 23,
  BAG_ADD_PROSPERITY_DEGREE = 24,
  BAG_SKILL_SLOT_PALYER = 25,
  BAG_SKILL_SLOT_PET = 26,
  CG_BAG_CLEAN = 12003,
  CG_ITEMSHOP_LIST = 12004,
  CG_ITEMSHOP_BUY = 12005,
  CG_ITEMSHOP_SELL = 12006,
  CG_PLAYERSHOP_START = 12007,
  CG_PLAYERSHOP_STOP = 12008,
  CG_PLAYERSHOP_LIST_GOODS = 12010,
  CG_PLAYERSHOP_BUY = 12011,
  CG_PLAYERSHOP_SELLRECORD = 12012,
  CG_PLAYERSHOP_SELL_NOTIFY = 12013,
  CG_PLAYERSHOP_SHOP_NOTIFY = 12014,
  CG_BAG_CHECKUP_ASK = 12015,
  CG_ITEMTYPE_GETINFO = 12016,
  CG_STORAGE_LIST = 12017,
  CG_STORAGE_OPER = 12018,
  CG_BAG_REPAIR = 12019,
  CG_ITEMSHOP_LIST_SCORE = 12020,
  CG_ITEMSHOP_BUY_SCORE = 12021,
  CG_ITEM_PET_ADD_SKILL = 12022,
  CG_BAG_REPAIR_BY_TEAM = 12023,
  CG_STORAGE_LIST_VIP = 12024,
  CG_STORAGE_OPER_VIP = 12025,
  CG_STORAGE_CLEAN = 12026,
  CG_EQUIP_TASK_GET_ITEM = 12027,
  CG_GET_AWARD_ITEM = 12029,
  CG_GET_RANDOM_NPC_AWARD = 12030,
  CG_USE_TASK_GET_PET = 12031,
  CG_USE_NEW_GET_PET = 12032,
  CG_USE_NEW_GET_RIDE = 12033,
  CG_GET_PET = 12034,
  CG_GET_RIDE = 12035,
  CG_GET_AUTO_SELL_LIST = 12036,
  CG_AUTO_SELL = 12037,
  CG_CHEST_USE_HIGH_KEY = 12039,
  CG_IDENTIFY_USE_HIGH_KEY = 12040,
  CG_IDENTIFY_GET_LIST = 12041,
  CG_TURN_MONSTER_CARD = 12042,
  CG_TURN_MONSTER_NOTIFY = 12043,
  CG_CHANGE_TURN_MONSTER = 11142,
  CG_SUIT_GETINFO = 11501,
  CG_ITEM_DECOM = 11502,
  CG_ASCENSION_STAR = 11506,
  CG_ADVANCE_STAR = 11528,
  CG_EQUIPMENT_UPGRADE = 11527,
  CG_REPLACE_INLAY_GEM = 11507,
  CG_REPLACE_INLAY_GEM_ASK = 11508,
  CG_COMPOSITE_PET_SHOP = 11509,
  CG_COMPOSITE_PET_GRADE = 11510,
  CG_COMPOSITE_PET_DO = 11511,
  CG_COMPOSITE_PET_CONFIRM = 11512,
  CG_COMPOSITE_PET_PROMPTLY = 11513,
  CG_COMPOSITE_SHOP = 11503,
  CG_COMPOSITE_DO = 11504,
  CG_COMPOSITE_CONFIRM = 11505,
  CG_FURNACE_OPEN_SHOP = 11514,
  CG_FURNACE_REFINE = 11515,
  CG_FURNACE_INC_TOTAL_REFINE_NUM = 11516,
  CG_FURNACE_BUY_CRAFTSMAN = 11517,
  CG_FURNACE_LIST_ITEMINFO = 11518,
  CG_ENCHANTS_ADD = 11519,
  CG_ENCHANTS_EQUAL_SELF = 11520,
  CG_ENCHANTS_GETLIST = 11521,
  CG_ENCHANTSHOP_START = 11522,
  CG_ENCHANTSHOP_STOP = 11523,
  CG_ENCHANTSHOP_BUY = 11524,
  CG_ENCHANTSHOP_LIST = 11525,
  CG_ENCHANTSHOP_SELLRECORD = 11526,
  CG_EXCHANGE_FIND_SELLGOODS = 13516,
  CG_EXCHANGE_BUY_SELLGOODS = 13517,
  CG_EXCHANGE_SUBMIT_SELLGOODS = 13518,
  CG_EXCHANGE_RETRIEVE_SELLGOODS = 13519,
  CG_EXCHANGE_MY_SELLGOODS = 13520,
  CG_EXCHANGE_SUBMIT_PURCHASEGOODS = 13521,
  CG_EXCHANGE_CANCEL_PURCHASEGOODS = 13522,
  CG_EXCHANGE_EXTRACT_PURCHASEGOODS = 13523,
  CG_EXCHANGE_MY_PURCHASEGOODS = 13524,
  CG_EXCHANGE_FIND_PURCHASEGOODS = 13525,
  CG_EXCHANGE_PROVIDE_PURCHASEGOODS = 13526,
  CG_EXCHANGE_AUTOPROVIDE_PURCHASEGOODS = 13527,
  CG_EXCHANGE_PURCHASEGOODS_TYPELIST = 13528,
  CG_ACTOR_LOGIN_ONLINE_REWARD = 11108,
  CG_ACTOR_RECEIVE_ONLINE_REWARD = 11109,
  CG_SEND_IS_OPEN = 11116,
  CG_CHARGE_ACTIVITY_LIST = 11120,
  CG_CHARGE_ACTIVITY_GET_GIFT = 11121,
  CG_TASK_GETMISSIONDATA = 14501,
  CG_TASK_ACCEPT = 14502,
  CG_TASK_DELIVER = 14503,
  CG_TASK_ABANDON = 14504,
  CG_TASK_NPC_STATUS = 14505,
  CG_TASK_ACCEPT_TEAM = 14506,
  CG_TASK_DELIVER_TEAM = 14507,
  CG_TASK_OFFLINE_LIST = 14512,
  CG_TASK_OFFLINE_ACTIVATE = 14513,
  CG_TASK_RANDOM_GET = 14531,
  CG_TASK_RANDOM_FINISH = 14532,
  CG_TASK_RANDOM_CANCEL = 14533,
  CG_TASK_RANDOM_INFO = 14534,
  CG_TASK_VITALITY_FIRST_OPEN = 14551,
  CG_TASK_VITALITY_SHOW_REWARD = 14553,
  CG_TASK_VITALITY_GET_REWARD = 14554,
  CG_TASK_VITALITY_REMIND = 14555,
  CG_TASK_MILESTONE_OPEN = 14556,
  CG_TASK_MILESTONE_SHOW_TYPE = 14557,
  CG_TASK_MILESTONE_GET_PART = 14558,
  CG_TASK_MILESTONE_GET_REWARD = 14559,
  CG_TASK_MILESTONE_ON = 14560,
  CG_TASK_MILESTONE_AB = 14561,
  CG_ACTOR_ADDATTRIBUTE = 11003,
  CG_ACTOR_ATTRIBUTE_UPDATE = 11004,
  CG_ACTOR_SETTING = 11006,
  CG_SKILL_SHOP_LIST = 14001,
  CG_SKILL_SHOP_LEARN = 14002,
  CG_SKILL_DELETE = 14003,
  CG_SKILL_AUTO_ACTIVE = 14004,
  CG_SKILL_AUTO_INVALID = 14005,
  CG_SKILL_DELETE_BY_LEVEL = 14006,
  CG_SKILL_SCROLL_LEARN = 14007,
  CG_SKILL_SCROLL_LEARN_ASK = 14008,
  CG_SKILL_INITIATIVE_SET = 14009,
  CG_SKILL_INITIATIVE_CLEAN = 14010,
  CG_SKILL_UPDATE = 14011,
  CG_FORMATION_LEARN = 14012,
  CG_FORMATION_FORGET = 14013,
  CG_FORMATION = 14014,
  CG_FORMATION_CHANGE_DEFAULT = 14015,
  CG_SKILL_BOOK_LEARN = 14016,
  CG_SKILL_BOOK_LEARN_ASK = 14017,
  CG_ACTOR_PROTECT_LOCK_SET = 11043,
  CG_ACTOR_PROTECT_LOCK_MODIFY = 11044,
  CG_ACTOR_PROTECT_LOCK_CHANCLE = 11045,
  CG_ACTOR_PROTECT_LOCK_OPEN = 10009,
  CG_ACTOR_PROTECT_LOCK_RESET = 11047,
  CG_MAIL_LIST = 11007,
  CG_MAIL_DETAIL = 11008,
  CG_MAIL_REPORT = 11051,
  CG_MAIL_SEND = 11009,
  CG_MAIL_SEND_SERVICE = 11010,
  CG_MAIL_EXTRACT_ATTACHMENT = 11011,
  CG_MAIL_TURNBACK = 11012,
  CG_MAIL_DELETE = 11013,
  CG_MAIL_NOTIFY = 11014,
  CG_MAIL_OPEN = 11031,
  CG_MAIL_GETITEMDETAIL = 11034,
  MAIL_SEND_ID = 1,
  MAIL_SEND_NAME = 2,
  MAIL_SEND_UID = 3,
  CG_RELATION_LIST = 13529,
  CG_RELATION_ADD = 13530,
  CG_RELATION_DELETE = 13531,
  CG_ACTOR_SEE = 13532,
  CG_RELATION_FLY = 13533,
  CG_RELATION_MASTER_ADD = 13536,
  CG_RELATION_MASTER_DELETE = 13537,
  CG_RELATION_ADD_REMARKS = 13548,
  CG_PARTNER_FLY = 13538,
  CG_RELATION_PARTNER_ADD = 13539,
  CG_RELATION_PARTNER_DELETE = 13540,
  CG_SCENE_PLAYER_EVENT = 10508,
  PLAYER_EVENT_CHOOSE_YES = 1,
  PLAYER_EVENT_CHOOSE_NO = 2,
  CG_SYSTEM_GET_RAIDERS = 16005,
  CG_SYSTEM_SPECIALCODE = 16006,
  CG_SYSTEM_GET_PET_RAIDERS = 16009,
  CG_SYSTEM_GET_MOUNT_RAIDERS = 16010,
  CG_SYSTEM_GET_VOCATION_RAIDERS = 16011,
  CG_SYSTEM_ASK_VOCATION_RAIDERS = 16012,
  CG_SYSTEM_VOCATION_RAIDERS_WORD = 16013,
  CG_SYSTEM_GET_VOCATION_RAIDERS_WORD = 16014,
  CG_SYSTEM_GET_RAIDERS_PLAYER = 16015,
  CG_SYSTEM_GET_RAIDERS_PLAYER_PET = 16016,
  CG_TEAM_INVITE = 13501,
  TEAM_CREATE_TYPE_INVITE = 1,
  TEAM_CREATE_TYPE_JOIN = 2,
  CG_TEAM_JOIN = 13502,
  CG_TEAM_LEAVE = 13503,
  CG_TEAM_CHANGE_CAPTAIN = 13504,
  CG_TEAM_DISBAND = 13505,
  CG_TEAM_SET = 13506,
  TEAM_SET_AUTO_JOIN = 1,
  TEAM_SET_CHANGE_CAPTAIN = 2,
  TEAM_SET_DISBAND = 3,
  TEAM_SET_REMOVE_MEMBER = 4,
  CG_TEAM_LEAVE_SELF = 13507,
  CG_TEAM_NEW = 13508,
  CG_CHAT_SUBMIT = 13509,
  CG_CHAT_DOWN_WORLD = 13510,
  CG_CHAT_DOWN_MAP = 13511,
  CG_CHAT_DOWN_COUNTRY = 13512,
  CG_CHAT_DOWN_TEAM = 13513,
  CG_CHAT_DOWN_PRIVATE = 13514,
  CG_CHAT_DOWN_SYSTEM = 13515,
  CG_CHAT_DOWN_UNION = 13550,
  CG_CHAT_DOWN_BATTLE = 13553,
  CG_CHAT_DOWN_SERVERS = 13558,
  CG_CHAT_SEE_ITEM = 13534,
  CG_CHAT_SEN_MISSION = 13535,
  CG_WEDDING_CARD_CONSULT = 13551,
  CG_WEDDING_CARD_SEND = 13552,
  CG_SYSTEM_GUIDE = 11077,
  CG_SEND_ACCOST = 11110,
  CG_INITIATIVE_ACCOST = 11111,
  CG_SEND_INITIATIVE_ACCOST = 11112,
  CG_GET_ACCOST_MY_LIST = 11113,
  CG_SYSTEM_GET_ACTIVITY = 16004,
  CG_SYSTEM_BALLOT = 16007,
  CG_SYSTEM_UPGRADE = 16008,
  CG_MIX_SERVER_ACTIVITY_ACTOR_JOIN = 13544,
  CG_MIX_SERVER_ACTIVITY_ACTOR_CANCEL = 13545,
  CG_MIX_SERVER_ACTIVITY_COUNTRY_JOIN = 13546,
  CG_MIX_SERVER_ACTIVITY_COUNTRY_CANCEL = 13547,
  CG_TASK_ESCORT_START = 14508,
  CG_TASK_ESCORT_CANCEL = 14509,
  CG_TASK_ESCORT_MOVE = 14510,
  CG_TASK_ESCORT_REFURBISH = 14511,
  CG_TASK_ESCORT_CHOICE_EVENT = 14514,
  CG_TASK_ESCORT_LIST = 14515,
  CG_TASK_ESCORT_ROB = 14516,
  CG_TASK_ESCORT_SEE = 14517,
  CG_TASK_ESCORT_NEW_LIST = 14535,
  CG_ACTOR_LOTTERY_DRAW = 11063,
  CG_ACTOR_LOTTERY_DRAW_LIST = 11064,
  CG_ACTOR_LOTTERY_DRAW_WINNING_LIST = 11065,
  CG_ACTOR_LOTTERY_DRAW_LIST_NEW = 11106,
  CG_ACTOR_LOTTERY_DRAW_START_NEW = 11107,
  CG_ACTOR_LOGIN_LOTTERY_DRAW_NEW = 11115,
  CG_ACHIEVEMENT_GETINFO = 11023,
  CG_ACHIEVEMENT_GETLIST = 11024,
  CG_ACHIEVEMENT_GAINREWARD = 11025,
  CG_TITLE_GETLIST = 11026,
  CG_TITLE_USE = 11027,
  CG_ACTOR_SEE_ACHIEVEMENT = 11050,
  CG_BILL_ACHIEVEMENT_GETLIST = 11083,
  CG_BILL_GETLIST = 11028,
  CG_BILL_DESCRIBE = 11078,
  CG_NEWBILL_LIST = 17001,
  CG_NEWBILL_BILL = 17002,
  CG_BILL_MO9 = 17006,
  ISOPEN_MO9_POP = 17007,
  EXTRACTIONGOLD_TENCENT = 17008,
  CG_TENCENT_QUERY_BALANCE = 17009,
  CG_CHANNEL_SHARE = 17010,
  CG_DRAW_WANBA_GIFT = 17601,
  CG_WANBA_VIP_GIFT = 17602,
  CG_OPEN_WANBA_PLAT_GIFT = 17603,
  CG_DRAW_WANBA_PLAT_GIFT = 17604,
  CG_GET_INVITATION_INFO = 17605,
  CG_INVITATION_REPORT = 17606,
  CG_SAHRE_INVITATION = 17607,
  CG_DRAW_INVITATION_AWARD = 17608,
  CG_DAILY_CAHRGE = 17609,
  CG_POWER_CHARGE = 17610,
  CG_ACTOR_FETCH_BS_DATA = 11301,
  CG_ACTOR_PUSH_BS_CHANGE = 11302,
  CG_ACTOR_DRAW_BS_AWARD = 11303,
  CG_INVITE_SYS_DATA = 17701,
  CG_INVITE_BINDING = 17702,
  CG_INVITE_DRAW_REBATE = 17703,
  CG_TOP_TYPE_LIST = 13541,
  CG_TOP_DATA_LIST = 13542,
  CG_TOP_ME = 13543,
  CG_ACTOR_OPEN_RANK_REWARD = 11210,
  CG_ACTOR_ACCEPTDISCIPLE_START = 11060,
  CG_ACTOR_ACCEPTDISCIPLE_CANCEL = 11061,
  CG_ACTOR_ACCEPTDISCIPLE_LIST = 11062,
  CG_COUNTRY_CREATE = 15001,
  CG_COUNTRY_CHECK = 15002,
  CG_COUNTRY_ACTIVATE = 15003,
  CG_COUNTRY_LIST = 15004,
  CG_COUNTRY_RECRUIT_OPEN = 15005,
  CG_COUNTRY_RECRUIT_CLOSE = 15006,
  CG_COUNTRY_SET_TAX = 15007,
  CG_COUNTRY_SET_ENTRYTAX = 15008,
  CG_COUNTRY_ENTER = 15009,
  CG_COUNTRY_INVITE = 15010,
  CG_COUNTRY_APPLY = 15011,
  CG_COUNTRY_APPLY_LIST = 15012,
  CG_COUNTRY_APPLY_HANDLE = 15013,
  CG_COUNTRY_PEOPLE_REMOVE = 15014,
  CG_COUNTRY_PEOPLE_LEAVE = 15015,
  CG_COUNTRY_PEOPLE_LIST = 15016,
  CG_COUNTRY_MAP_CHANGE = 15017,
  CG_COUNTRY_APOINT_PEOPLE = 15018,
  CG_COUNTRY_KING_TRANSFER = 15019,
  CG_COUNTRY_BUILDING_UPGRADE = 15020,
  CG_COUNTRY_BUILDING_REMOVE = 15021,
  CG_COUNTRY_COMMAND_EXCUTE = 15022,
  CG_COUNTRY_PEOPLE_DONATE = 15023,
  CG_COUNTRY_DONATE_ITEM = 15024,
  CG_COUNTRY_DELETE_STORAGE_ITEM = 15025,
  CG_COUNTRY_GET_STORAGE_ITEM = 15026,
  CG_COUNTRY_EXCHAGE_STORAGE_ITEM = 15027,
  CG_COUNTRY_GET_MISSION = 15028,
  CG_COUNTRY_ISSUE_MISSION = 15029,
  CG_COUNTRY_GET_ASSIGN_MISSION = 15030,
  CG_COUNTRY_GET_ASSIGN_PEOPLE = 15031,
  CG_COUNTRY_ASSIGN_MISSION = 15032,
  CG_COUNTRY_GET_VALID_MISSION = 15033,
  CG_COUNTRY_MODIFY_NOTICE = 15034,
  CG_COUNTRY_JOIN_NOTIFY = 15035,
  CG_COUNTRY_GET_ISSUE_MISSION = 15036,
  CG_COUNTRY_GET_MISSION_MAIN = 15037,
  CG_COUNTRY_GET_EXCHARGE_LIST = 15038,
  CG_COUNTRY_WAR_START = 15039,
  CG_COUNTRY_WAR_UPDATE = 15040,
  CG_COUNTRY_WAR_ARMY_LIST = 15041,
  CG_COUNTRY_WAR_GOTO_CELL = 15042,
  CG_COUNTRY_WAR_NOTICE = 15043,
  CG_COUNTRY_WAR_COMMAND_LIST = 15044,
  CG_COUNTRY_WAR_COMMAND_USE = 15045,
  CG_COUNTRY_WAR_COUNTYR_LIST = 15046,
  CG_COUNTRY_WAR_CREATE = 15047,
  CG_COUNTRY_WAR_ANSWER = 15048,
  CG_COUNTRY_WAR_BUILD_LIST = 15049,
  CG_COUNTRY_WAR_BUILD_UPDATE = 15050,
  CG_COUNTRY_WAR_ANSWER_GET_INFO = 15051,
  CG_COUNTRY_WAR_SEE_LIST = 15052,
  CG_COUNTRY_WAR_TEXT_LIST = 15053,
  CG_COUNTRY_WAR_TO_ARMY = 15054,
  CG_COUNTRY_WAR_TO_ARMY_LIST = 15055,
  CG_COUNTRY_WAR_TO_ARMY_ANSWER = 15056,
  CG_COUNTRY_BUILD_CAMP = 15057,
  CG_COUNTRY_WAR_TO_FOREIGN = 15058,
  CG_COUNTRY_WAR_DELETE_ARMY = 15059,
  CG_COUNTRY_WAR_WIN_ACTION_INFO = 15060,
  CG_COUNTRY_WAR_WIN_ACTION_DO = 15061,
  CG_COUNTRY_WAR_UNION_CREATE = 15062,
  CG_COUNTRY_WAR_UNION_LIST = 15063,
  CG_COUNTRY_WAR_UNION_MY = 15064,
  CG_COUNTRY_WAR_UNION_MEMBER_APPLY = 15065,
  CG_COUNTRY_WAR_UNION_MEMBER_APPLY_LIST = 15066,
  CG_COUNTRY_WAR_UNION_MEMBER_APPLY_DEAL = 15067,
  CG_COUNTRY_WAR_UNION_MEMBER_DELETE = 15068,
  CG_COUNTRY_WAR_UNION_MEMBER_EXIT = 15069,
  CG_COUNTRY_WAR_UNION_HEAD_CHANGE = 15070,
  CG_COUNTRY_WAR_TOP_PLAYER_LIST = 15071,
  CG_COUNTRY_WAR_TOP_COUNTRY_LIST = 15072,
  CG_COUNTRY_WAR_TOP_PEOPLE_COUNTRY_LIST = 15073,
  CG_COUNTRY_GET_VIP_ITEM = 15074,
  CG_COUNTRY_GET_STORAGE_PET = 15075,
  CG_COUNTRY_GET_COMMAND_INFO_CREATE_WAR = 15076,
  CG_COUNTRY_SET_ONLINE_NOTIFY = 15077,
  CG_TASK_TEAM_BOSS_JOIN = 14518,
  CG_TASK_TEAM_BOSS_UPDATE = 14519,
  CG_TASK_TEAM_BOSS_FIGHT = 14520,
  CG_TASK_TEAM_BOSS_EXIT = 14522,
  CG_TASK_TEAM_BOSS_END = 14523,
  CG_TASK_TEAM_BOSS_LEAVE_GRID = 14524,
  CG_TASK_COUNTRY_BOSS_JOIN = 14541,
  CG_TASK_COUNTRY_BOSS_UPDATE = 14542,
  CG_TASK_COUNTRY_BOSS_FIGHT = 14543,
  CG_TASK_COUNTRY_BOSS_EXIT = 14544,
  CG_TASK_COUNTRY_BOSS_END = 14545,
  CG_TASK_COUNTRY_BOSS_LEAVE_GRID = 14546,
  CG_TASK_COUNTRY_BOSS_JOIN_PUSH = 14547,
  CG_TASK_COUNTRY_BOSS_GET_SCORE = 14548,
  CG_TASK_COUNTRY_BOSS_ACTIVATE = 14549,
  CG_TASK_COUNTRY_BOSS_ACTIVATE_DATA = 14550,
  CG_VIP_LIST = 11053,
  CG_VIP_BUY = 11054,
  CG_VIP_INFO = 11055,
  CG_VIP_QUESTION_GET = 11056,
  CG_VIP_QUESTION_SUB = 11057,
  CG_ACTOR_LEVEL_REWARD_LIST = 11160,
  CG_ACTOR_DRAW_LEVEL_REWARD = 11161,
  CG_ACTOR_DRAW_MICRO_REWARD = 11162,
  CG_ACTOR_DRAW_SEVEN_DAY_LOGIN_REWARD = 11163,
  CG_ACTOR_EXPAND_PACKAGE = 11164,
  CG_ACTOR_LIANJIN = 11165,
  CG_ACTOR_DRAW_SPRING_LOGIN_REWARD = 11166,
  CG_ACTOR_OFFLINE_EXP_OPEN = 11170,
  CG_ACTOR_OFFLINE_EXP_GET = 11171,
  CG_ACTOR_OFFLINE_UPGRADE = 11172,
  CG_ACTOR_OFFLINE_EXP_PRAY = 11173,
  CG_ACTOR_OPEN_WISHING_WELL = 11180,
  CG_ACTOR_WISHING = 11181,
  CG_ACTOR_DAY_ACTITY_LIST = 11066,
  CG_ACTOR_DRAW_DAY_ACTITY = 11067,
  CG_ACTOR_OPEN_EACH_CHARGE = 11190,
  CG_ACTOR_OPEN_TOTAL_CHARGE = 11200,
  CG_ACTOR_DRAW_TOTAL_CHARGE = 11201,
  CG_ACTOR_VIP_LEVEL = 11300,
  CG_VIP_LEVEL_INFO = 11032,
  CG_ACTIVITY_FUND_PAGE = 14593,
  CG_ACTIVITY_FUND_REWARD = 14594,
  CG_ACTIVITY_FUND_BUY = 14595,
  CG_ACTOR_OPEN_NATIONAL_DAY_CHARGE_RANK = 11211,
  CG_HOT_SHOP_LIST = 11091,
  CG_REFRESH_HOT_SHOP = 11092,
  CG_BUY_HOT_SHOP_ITEM = 11093,
  CG_SAVE_TO_DESKTOP = 17011,
  CG_FOLLOW_STATUS = 11100,
  CG_TRADE_MONEY1_EVERYDAY = 11094,
  CG_HAND_OUT_RED_ENVELOPES = 13553,
  CG_RECEIVE_RED_ENVELOPES = 13554,
  CG_RED_ENVELOPES_LIST = 13555,
  CG_MY_ENVELOPES_RECORD = 13556,
  CG_RECEIVE_ENVELOPES_RECORD = 13557,
  CG_SEND_RED_PACKET_DATA = 11088,
  CG_ACTOR_SELL_MY_LIST = 11039,
  CG_ACTOR_SELL_START = 11040,
  CG_ACTOR_SELL_CANCEL = 11041,
  CG_ACTOR_SELL_LIST = 11042,
  CG_ACTOR_SELL_BUY = 11048,
  CG_ACTOR_SELL_SEE = 11049,
  CG_ACTOR_OPEN_ONEKEY_DAILY_MISSION = 11400,
  CG_ACTOR_EXEC_ONEKEY_DAILY_MISSION = 11401,
  CG_ACTOR_STOP_ONEKEY_DAILY_MISSION = 11402,
  CG_COST_REWARD_LIST = 11150,
  CG_COST_REWARD_GET_REWARD = 11151,
}

// impl int64 for js
export class Long {
  private sign = 1

  constructor(public high: number, public low: number) {
    if ((2147483648 & this.high) !== 0) {
      this.high = 4294967295 - this.high
      this.low = 4294967295 - this.low
      this.sign = -1
    }
  }

  toString(): string {
    const t = this.sign === 1 ? '' : '-'
    return `${t + this.high.toString()}-${this.low.toString()}`
  }

  get value() {
    return this.sign * (4294967296 * this.high + this.low)
  }

  static formStr(value: string): Long {
    const e = value.split('-')
    const high = parseInt(e[0])
    const low = parseInt(e[1])
    return new Long(high, low)
  }
}

export class Bytes {
  private _data: egret.ByteArray
  private _size = 0

  constructor(size: number, data: egret.ByteArray) {
    this._size = size
    this._data = data
  }

  get size(): number {
    return this._size
  }

  get data(): egret.ByteArray {
    return this._data
  }
}

export interface IProtocol {
  setUnsignedByte(value: number): this
  getUnsignedByte(): number

  setByte(value: number): this
  getByte(): number

  setShort(value: number): this
  getShort(): number

  setUnsignedShort(value: number): this
  getunsignedShort(): number

  setInt(value: number): this
  getInt(): number

  setUnsignedInt(value: number): this
  getUnsignedInt(): number

  setLong(value: Long): this
  getLong(): Long
  setLongByInt(value: number): this
  getLongToInt(): number

  setString(value: string): this
  getString(): string

  setFloat(value: number): this
  getFloat(): number

  setBytes(value?: egret.ByteArray): this
  getBytes(): egret.ByteArray

  setLengthBytes(value: Bytes): this
  getLengthBytes(): Bytes

  setBoolean(value: boolean): this
  getBoolean(): boolean

  getType(): ProtocolCmd
  setType(value: ProtocolCmd): this
  get type(): ProtocolCmd
  set type(value: ProtocolCmd)

  get position(): number
  set position(value: number)
  reposition(): this

  getData(): egret.ByteArray
  setData(value: egret.ByteArray): this
  get data(): egret.ByteArray
  set data(value: egret.ByteArray)

  get dataView(): DataView

  clone(): Protocol

  get length(): number
  // 发送给服务器的协议
  get protocol(): egret.ByteArray
}

export class Protocol implements IProtocol {
  constructor(private _type: ProtocolCmd, private _data: egret.ByteArray = new egret.ByteArray(), position?: number) {
    _data.position = position || 0
  }

  setUnsignedByte(value: number) {
    this.data.writeByte(value & 0xFF)
    return this
  }

  getUnsignedByte(): number {
    return this.data.readUnsignedByte()
  }

  setByte(value: number) {
    this.data.writeByte(value)
    return this
  }

  getByte(): number {
    return this.data.readByte()
  }

  setBoolean(value: boolean) {
    this.data.writeBoolean(value)
    return this
  }

  getBoolean(): boolean {
    return this.data.readBoolean()
  }

  setShort(value: number) {
    this.data.writeShort(value)
    return this
  }

  getShort(): number {
    return this.data.readShort()
  }

  setUnsignedShort(value: number) {
    this.data.writeUnsignedShort(value)
    return this
  }

  getunsignedShort(): number {
    return this.data.readUnsignedShort()
  }

  getInt(): number {
    return this.data.readInt()
  }

  setInt(value: number) {
    this.data.writeInt(value)
    return this
  }

  getUnsignedInt(): number {
    return this.data.readUnsignedInt()
  }

  setUnsignedInt(value: number) {
    this.data.writeUnsignedInt(value)
    return this
  }

  setLong(value: Long) {
    this.setInt(value.high)
    this.setInt(value.low)
    return this
  }

  getLong(): Long {
    return new Long(this.getInt() >>> 0, this.getInt() >>> 0)
  }

  setLongByInt(value: number) {
    const high = (value / 4294967296) >>> 0
    const low = value % 4294967296 >>> 0
    this.setInt(high)
    this.setInt(low)
    return this
  }

  getLongToInt(): number {
    const high = this.getInt() >>> 0
    const low = this.getInt() >>> 0
    return 4294967296 * high + low
  }

  setString(value = '') {
    this.data.writeUTF(value)
    return this
  }

  getString(): string {
    return this.data.readUTF()
  }

  setFloat(value: number) {
    this.data.writeFloat(value)
    return this
  }

  getFloat(): number {
    return this.data.readFloat()
  }

  setBytes(value?: egret.ByteArray) {
    if (!value)
      return this.setShort(0)

    this.setBytesLength(value.length)
    value.position = 0

    this.data.writeBytes(value)
    return this
  }

  getBytes(): egret.ByteArray {
    const length = this.getBytesLength()
    const bytes = new egret.ByteArray()
    for (let i = 0; i < length; i++)
      bytes.writeByte(this.getByte())
    bytes.position = 0
    return bytes
  }

  setLengthBytes(value: Bytes) {
    throw new Error('Method not implemented.')
    return this
  }

  private getBytesLength(): number {
    const high = 0xFF & this.getByte()
    const low = 0xFF & this.getByte()
    return (high << 8) + low
  }

  private setBytesLength(bytesLength: number) {
    const e = (bytesLength >>> 8) & 0xFF
    const n = bytesLength & 0xFF
    this.data.writeByte(e)
    this.data.writeByte(n)
  }

  getLengthBytes(): Bytes {
    return new Bytes(this.getBytesLength(), this.data)
  }

  getType(): ProtocolCmd {
    return this.type
  }

  setType(value: ProtocolCmd) {
    this.type = value
    return this
  }

  get type(): ProtocolCmd {
    return this._type
  }

  set type(value: ProtocolCmd) {
    this._type = value
  }

  get position(): number {
    return this.data.position
  }

  set position(value: number) {
    this._data.position = value
  }

  reposition() {
    this.position = 0
    return this
  }

  getData(): egret.ByteArray {
    return this.data
  }

  setData(value: egret.ByteArray): this {
    this.data = value
    return this
  }

  get data(): egret.ByteArray {
    return this._data
  }

  set data(value: egret.ByteArray) {
    this._data = value
    this.position = value.position
  }

  get dataView() {
    return this.data.dataView
  }

  // 不是 protocol 最终长度
  get length(): number {
    return this._data.length
  }

  get protocol(): egret.ByteArray {
    const protocolLength = 4 + this.length
    const protocol = new egret.ByteArray()
    protocol.writeShort(protocolLength)
    protocol.writeShort(this.type)
    protocol.writeBytes(this.data)
    return protocol
  }

  clone(position?: number): Protocol {
    return new Protocol(this._type, this._data, position || this.position)
  }
}

export namespace Protocol {
  export function createSystemHeartMsg(mapId: number) {
    const protocol = new Protocol(ProtocolCmd.CG_SYSTEM_HEART)
    protocol.setShort(mapId)
    return protocol
  }

  export function createCheckEditionMsg(channel: number, id: number) {
    const protocol = new Protocol(ProtocolCmd.LC_CHECKEDITION)
    protocol.setShort(id)
      .setInt(320200)
      .setShort(channel)
      .setByte(0)
    if (navigator != null) {
      const n = navigator.userAgent
      protocol.setString(n)
    }
    else { protocol.setString('h5') }
    protocol.setByte(1)
      .setByte(Define.CLIENT_TYPE_JAR)
    return protocol
  }

  export function createUserLoginMsg(t: string, e: string) {
    const protocol = new Protocol(ProtocolCmd.LC_PLAYER_LOGIN)
    protocol.setString(t)
    protocol.setString(e)
    protocol.setString('')
    protocol.setString('')
    protocol.setByte(0)
    protocol.setByte(0)
    return protocol
  }

  export function createAreaLineListMsg() {
    return new Protocol(ProtocolCmd.LC_GAME_GET_AREA_AND_LINE)
  }

  export function createFirstGameServerMsg(key: Long, sessionId: number) {
    const protocol = new Protocol(ProtocolCmd.CG_LOGIN_PLAYERCHECK)
    protocol.setLong(key)
      .setInt(sessionId)
      .setByte(Define.LANG_DEFAULT)
      .setInt(320200)
      .setByte(Define.CLIENT_TYPE_JAR)
    return protocol
  }

  export function createPlayerListMsg() {
    return new Protocol(ProtocolCmd.CG_LOGIN_ACTORLIST)
  }

  export function createAddPlayerMsg(t: Player) {
    const protocol = new Protocol(ProtocolCmd.CG_LOGIN_CREATEACTOR)
    protocol.setByte(t.getSex())
      .setByte(t.getRace())
      .setByte(t.getJob())
      .setInt(t.icon1)
      .setInt(t.icon2)
      .setInt(t.icon3)
      .setString(t.getName())
    return protocol
  }

  export function createDelPlayerMsg(t: number) {
    return new Protocol(ProtocolCmd.CG_LOGIN_DELETEACTOR).setInt(t)
  }

  export function createDeleteRoleByProtectCodeMsg(t: number, e: string) {
    return new Protocol(ProtocolCmd.CG_LOGIN_DELETEACTOR_PASSWD).setInt(t).setString(e)
  }

  export function createCancelDelPlayerMsg(t: number) {
    return new Protocol(ProtocolCmd.CG_LOGIN_RECOVERACTOR).setInt(t)
  }

  export function createPlayerEnterMsg(t: number, _ = '') {
    return new Protocol(ProtocolCmd.CG_LOGIN_ACTORENTER).setInt(t)
      .setInt(Define.LOGIN_DATA_FLAG)
      .setInt(0)
      .setString('')
      .setByte(Define.CLIENT_TYPE_JAR)
      .setString('')
      .setString('')
  }

  export function createUserRegisterMsg(username: string, password: string) {
    return new Protocol(ProtocolCmd.LC_PLAYER_CREATE)
      .setString(username)
      .setString(password)
      .setString('')
      .setString('abc')
      .setString('')
      .setString('随机吧')
      .setString('440106198001018491')
      .setInt(0)
  }

  export function createWorldDataMessage(t: number, e: boolean, mapId: number) {
    return new Protocol(ProtocolCmd.CG_SCENE_WORLDDATA)
      .setShort(mapId)
      .setBoolean(e)
      .setInt(t)
      .setByte(0)
      .setByte(0)
  }

  export function createJumpCityMessage(t: number, e: number) {
    return new Protocol(ProtocolCmd.CG_SCENE_GO_CITY)
      .setInt(t)
      .setInt(e)
  }

  export function createBrowseCityInfoMsg(t) {
    return new Protocol(ProtocolCmd.CG_CITY_INFO).setInt(t)
  }

  export function createMoveMessage(t, e) {
    return new Protocol(ProtocolCmd.CG_SCENE_PLAYER_MOVING).setByte(t).setByte(e)
  }

  export function createOtherMoveMessage() {
    return new Protocol(ProtocolCmd.CG_SCENE_GET_OTHER_PLAYER_STATE)
  }

  export function createEnterLocalBattle() {
    return new Protocol(ProtocolCmd.CG_FIGHT_ENTER_LOCALBATTEL)
  }

  export function createEnterRemoteBattle(t: number) {
    return new Protocol(ProtocolCmd.CG_FIGHT_ENTER_REMOTEBATTLE).setShort(t)
  }

  export function createFightSeeInterMsg(t: number) {
    return new Protocol(ProtocolCmd.CG_FIGHT_SEE_IN).setInt(t)
  }

  export function createFightSeeQuitMsg() {
    return new Protocol(ProtocolCmd.CG_FIGHT_SEE_OUT)
  }

  export function createBattlePlan(t: number, e: egret.ByteArray, plans?: egret.ByteArray) {
    const protocol = new Protocol(ProtocolCmd.CG_FIGHT_BATTLE_DOPLAN)
      .setByte(t)
      .setBytes(e)

    if (!plans) {
      protocol.setBoolean(false)
    }
    else {
      protocol.setBoolean(true)
        .setBytes(plans)
    }

    return protocol
  }

  export function createBattleUpdate(round: number) {
    return new Protocol(ProtocolCmd.CG_FIGHT_BATTLE_UPDATE).setByte(round)
  }

  export function createAutoSkillMsg(player: Player, e: number, n = false) {
    const protocol = new Protocol(ProtocolCmd.CG_SKILL_AUTO_ACTIVE)
    if (!n)
      protocol.setType(ProtocolCmd.CG_SKILL_AUTO_INVALID)

    return protocol
      .setByte(player.getType() === 4 ? Define.SKILL_TYPE_PET : Define.SKILL_TYPE_PLAYER)
      .setInt(e)
  }

  export function createJumpMapMessage(mapId: number, x: number, y: number, flag: number) {
    return new Protocol(ProtocolCmd.CG_SCENE_GO_MAP)
      .setShort(mapId)
      .setByte(x)
      .setByte(y)
      .setInt(flag)
  }

  export function createPlayerBagMessage(cmd: ProtocolCmd, item: ProtocolCmd, n: ItemData, i: number, o = false, a = false) {
    const protocol = new Protocol(ProtocolCmd.CG_ACTOR_PLAYERBAG)
    protocol.setByte(cmd)
    protocol.setByte(item)
    protocol.setShort(n.slotPos)

    item === ProtocolCmd.PLAYERBAG_EQUIP
      ? protocol.setByte(i)
      : item === ProtocolCmd.PLAYERBAG_LOSE
        ? protocol.setInt(n.id)
        : item === ProtocolCmd.PLAYERBAG_ENCHASE
          ? protocol.setShort(i)
          : (n.isPetCanUseItem() && protocol.setShort(i))

    protocol.setBoolean(o)
    protocol.setBoolean(a)
    return protocol
  }

  export function createGetMissionDataMsg(id: number, map: GameMap) {
    const protocol = new Protocol(ProtocolCmd.CG_TASK_GETMISSIONDATA)
    protocol.setShort(id)

    protocol.setByte(map.monsterGroupList.length)
    for (let i = 0; i < map.monsterGroupList.length; i++) {
      const id = map.monsterGroupList[i].groupId
      protocol.setShort(id)
    }

    protocol.setByte(Object.keys(map.monsterList).length)
    for (const id in map.monsterList)
      protocol.setShort(+id)

    return protocol
  }

  export function createGetNPCData(npc?: number[]) {
    const protocol = new Protocol(ProtocolCmd.CG_SCENE_GETNPC)
    if (!npc)
      return protocol.setByte(0)
    protocol.setByte(npc.length)
    for (let i = 0; i < npc.length; i++)
      protocol.setByte(npc[i])
    return protocol
  }

  export function createAutoMoveMsgByMission(id: number) {
    return new Protocol(ProtocolCmd.CG_SCENE_FINDPATH_MISSION).setByte(2).setShort(id)
  }

  export function createExpandPackage(type: number, slot: number) {
    return new Protocol(ProtocolCmd.CG_ACTOR_EXPAND_PACKAGE).setByte(type).setInt(slot)
  }

  export function createTaskAbandonMsg(id: number) {
    return new Protocol(ProtocolCmd.CG_TASK_ABANDON).setShort(id)
  }

  export function createTaskDeliverMsg(pid: number, mid: number, iid = -1) {
    return new Protocol(ProtocolCmd.CG_TASK_DELIVER).setShort(pid).setShort(mid).setInt(iid)
  }

  export function createTaskAcceptMsg(nid: number, mid: number) {
    return new Protocol(ProtocolCmd.CG_TASK_ACCEPT).setShort(nid).setShort(mid)
  }

  export function createAchieveUseTitle(id: number) {
    return new Protocol(ProtocolCmd.CG_TITLE_USE).setShort(id)
  }

  export function createAchieveTitleList() {
    return new Protocol(ProtocolCmd.CG_TITLE_GETLIST)
  }

  export function createItemShopListMsg(id: number) {
    return new Protocol(ProtocolCmd.CG_ITEMSHOP_LIST).setShort(id)
  }

  export function createItemShopBuy(sid: number, item: ShopItemData, num = 1) {
    const protocol = new Protocol(ProtocolCmd.CG_ITEMSHOP_BUY)
    protocol.setShort(sid)
      .setInt(item.id)
      .setByte(num)
      .setBoolean(Define.isCountryShop(sid))
    if (Define.isCountryShop(sid)) {
      protocol
        .setInt(item.money1)
        .setInt(item.money2)
        .setInt(item.money3)
    }
    return protocol
  }
}
