import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { GameText } from 'libs/defined/gameText'
import { Tool } from 'libs/shared/Tool'
import type { Mercenary } from './Mercenary'
import type { Pet } from './PetInfo'

export class Model {
  type = 0
  id = 0
  _status = 0
  playerName = ''
  info = ''
  title = ''
  level = 0
  sex = 0
  race = 0
  job = 0
  mode = Model.MODE_NORMAL
  shopName = ''
  vipLevel = 0
  superQqLevel = 0
  icon1 = 0
  icon2 = 0
  icon3 = 0
  countryId = -1
  countryName = ''
  countryRank = 0
  level2 = 0
  enchantValue = 0
  shoptype = 0
  iconpet1 = 0
  controlList = []
  dir = 2
  intValue1 = 0
  lastMove = null
  lastMoveBeginIndex = 0
  leaderID = -1
  members: Mercenary[] = []
  setting = 0
  pet: Pet | null = null
  merList: Mercenary[] = []
  position = 0
  remark = ''
  name = ''
  time = 0
  follower!: Model

  constructor(type = 0) {
    this.setType(type)
  }

  setPet(t) {
    this.setTabStatus(false, Model.PET_INNER_SHOW)
    this.pet = t
    if (this.pet) {
      this.pet.follower = this
      const i = (t.icon1 >> Model.OFFSET_PET_STYLE) & Model.LEN_PET_STYLE
      switch (i) {
        case 3:
        case 13:
        case 4:
        case 17:
        case 7:
        case 26:
      }
    }
  }

  addMercenary(t) {
    if (t == null)
      return false
    if (t.type != 5)
      return false
    this.merList == null
      && (this.merList = new Array(Model.MAX_MERCENARY_MEMBER))
    for (var n = 0, i = 0; i <= this.merList.length; i++) {
      if (this.merList[i] == null) {
        n = i
        break
      }
    }
    if (this.addMember(t) == false)
      return false
    const o = this.merList[n]
    o != null && this.removeMercenary(o), (this.merList[n] = t)
    return (
      true
    )
  }

  getMercenaryById(t) {
    if (this.merList == null)
      return null
    for (let e = 0; e < this.merList.length; e++) {
      const n = this.merList[e]
      if (n != null && n.type == 5 && n.groupId == t)
        return n
    }
    return null
  }

  removeMercenary(t) {
    if (t == null)
      return false
    if (t.type != 5)
      return false
    if (this.merList == null)
      return false
    for (let e = 0; e < this.merList.length; e++) {
      const n = this.merList[e]
      if (n != null && n.type == t.type && n.groupId == t.groupId) {
        return (
          this.removeMember(n.groupId, 5),
          this.merList.splice(e, 1),
          true
        )
      }
    }
  }

  isInTeam() {
    return this.leaderID > 0
  }

  isLeader() {
    return this.leaderID == this.id
  }

  isMember() {
    return this.isInTeam() && this.isLeader() == false
  }

  addMember(t: Mercenary) {
    if (t == null)
      return false
    if ((t.type == 3 && t.clearMercenary(), t.isInTeam() == true))
      return false
    if (t.type == 3 && t.getId() == this.getId())
      return false
    if (this.isMember() == true)
      return false
    let e = false
    if (this.members != null) {
      for (let n = 0; n < this.members.length; n++) {
        const i = this.members[n]
        if (
          i != null
          && i.type == t.type
          && ((t.type == 3 && i.getId() == t.getId())
            || (t.type == 5 && i.groupId == t.groupId))
        ) {
          e = true
          break
        }
      }
    }
    e == true
      && (t.type == 3
        ? this.removeMember(t.getId(), 3)
        : t.type == 5 && this.removeMember(t.groupId, 5)),
    this.members == null && (this.members = []),
    (this.leaderID = this.id),
    (t.leaderID = this.id)
    let o: any = null
    const a = this.members.length
    return (
      (o = a > 0 ? this.members[a - 1] : this),
      this.members.push(t),
      true
    )
  }

  removeMember(t, e) {
    if (this.isMember() == true)
      return false
    if (this.members != null) {
      for (let n = 0; n < this.members.length; n++) {
        const i = this.members[n]
        if (i != null && i.type == e) {
          let o = 0
          if (
            (i.type == 3 ? (o = i.id) : i.type == 5 && (o = i.groupId),
            o == t)
          ) {
            this.members.splice(n, 1),
            i.clearMember()
            break
          }
        }
      }
    }
    return (
      (this.members == null || this.members.length <= 0)
      && this.clearMember(),
      true
    )
  }

  clearMember() {
    if (
      (this.setTabStatus(false, Model.HIDE_SPIRTE),
      this.members != null && this.members.length > 0)
    ) {
      for (let t = this.members.length - 1; t >= 0; t--) {
        const n = this.members[t]
        n != null
          ? (n.getType() != 5
            || this.getMercenaryById(n.groupId) == null)
          && this.members.splice(t, 1)
          : this.members.splice(t, 1)
      }
    }
    (this.members == null || this.members.length <= 0)
      && ((this.members = []), this.setLeaderID(-1))
  }

  clearMercenary() {
    if (!(this.merList == null || this.merList.length < 0)) {
      if (
        ((this.merList = []),
        this.members != null && this.members.length > 0)
      ) {
        for (let t = this.members.length - 1; t >= 0; t--) {
          const e = this.members[t];
          (e == null || e.getType() == 5) && this.members.splice(t, 1)
        }
      }
      (this.members == null || this.members.length <= 0)
        && ((this.members = []), this.setLeaderID(-1))
    }
  }

  setLeaderID(t) {
    this.leaderID = t
  }

  getPet() {
    return this.pet
  }

  isHasPhoto() {
    return this.isStatusBit(Model.STATUS_IS_PHOTO)
  }

  isHasCard() {
    return this.isStatusBit(Model.STATUS_IS_CARD)
  }

  isHasCity() {
    return this.isStatusBit(Model.STATUS_IS_CITY)
  }

  isRobot() {
    return this.isStatusBit(Model.STATUS_IS_ROBOT)
  }

  isLongTrouses(t: number) {
    return t >= 52
  }

  getMerList() {
    return this.merList
  }

  setDir(dir: number) {
    switch (dir) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 8:
        this.dir = dir
        break
      case 4:
      case 5:
        this.dir = 1
        break
      case 6:
      case 7:
        this.dir = 0
    }
  }

  setId(t) {
    this.id = t
  }

  getId() {
    return this.id
  }

  setType(t) {
    this.type = t
  }

  getType() {
    return this.type
  }

  getName() {
    return this.playerName
  }

  setName(t) {
    this.playerName = t
  }

  getLevel() {
    return this.level
  }

  setLevel(t) {
    this.level = t
  }

  getSex() {
    return this.sex
  }

  setSex(t) {
    this.sex = t
  }

  getJob() {
    return this.job
  }

  setJob(t) {
    this.job = t
  }

  getRace() {
    return this.race
  }

  setRace(t) {
    this.race = t
  }

  getInfo() {
    return this.info
  }

  setInfo(t) {
    this.info = t
  }

  getTitle() {
    return this.title
  }

  setTitle(t) {
    this.title = t
  }

  setMode(t) {
    const n = this.mode
  }

  getMode() {
    return this.mode
  }

  getSetting() {
    return this.setting
  }

  setSetting(t) {
    this.setting = t
  }

  getLevel2() {
    return this.level2
  }

  setLevel2(t) {
    this.level2 = t
  }

  getEnchantValue() {
    return this.enchantValue
  }

  setEnchantValue(t: number) {
    this.enchantValue = t
  }

  getCountryId() {
    return this.countryId
  }

  setCountryId(t: number) {
    this.countryId = t
  }

  getCountryName() {
    return this.countryName
  }

  setCountryName(t: string) {
    this.countryName = t
  }

  getCountryRank() {
    return this.countryRank
  }

  setCountryRank(t: number) {
    this.countryRank = t
  }

  clearCountry() {
    this.countryId = -1
    this.countryName = ''
    this.countryRank = -1
  }

  getVipLevel() {
    return this.vipLevel
  }

  setVipLevel(t: number) {
    this.vipLevel = t
  }

  setPosition(x: number, y: number) {
    // this.position.setPosition(x * 24, y * 24)
  }

  isTabStatus(t: number) {
    return (this.intValue1 & t) !== 0
  }

  setTabStatus(t: boolean, e: number) {
    t ? (this.intValue1 |= e) : (this.intValue1 &= ~e)
  }

  setTimes(time: number) {
    this.time = time
  }

  getTimes() {
    return this.time
  }

  setStatus(status: number) {
    this._status = status
  }

  isStatusBit(bit: number) {
    return (this._status & bit) !== 0
  }

  setStatusBit(bit: number) {
    this._status |= bit
  }

  clearStatusBit(bit: number) {
    this._status &= ~bit
  }

  isSettingBit(bit: number) {
    return (this.setting & bit) !== 0
  }

  setSettingBit(bit: number) {
    this.setting |= bit
  }

  clearSettingBit(bit: number) {
    this.setting &= ~bit
  }

  getRemark() {
    return this.remark
  }

  setRemark(t: string) {
    this.remark = t
  }

  getCountryRankStr() {
    let t = Define.getRankString(this.countryRank)
    return (
      this.isStatusBit(Model.STATUS_IS_SOLDIER)
        ? (t += `(${GameText.STR_MODEL_SOLDIER})`)
        : this.isStatusBit(Model.STATUS_IS_HELP)
        && (t += `(${GameText.STR_MODEL_HELP})`),
      t
    )
  }

  get status() {
    return this._status
  }

  set status(s: number) {
    this._status = s
  }

  get(t: number) {
    switch (t) {
      case Model.ID:
        return this.id
      case Model.SEX:
        return this.sex
      case Model.RACE:
        return this.race
      case Model.JOB:
        return this.job
      case Model.LEVEL:
        return this.level
      case Model.LEVEL2:
        return this.level2
      case Model.SETTING:
        return this.setting
      case Model.STATUS:
        return this.status
      case Model.COUNTRY_ID:
        return this.countryId
      case Model.COUNTRY_RANK:
        return this.countryRank
    }
    return 0
  }

  getMemberById(t) {
    if (this.members == null || this.members.length <= 0)
      return false
    for (let e = 0; e < this.members.length; e++) {
      const n: any = this.members[e]
      if (n.getType() == 3 && n.id == t)
        return true
    }
    return false
  }

  addValue(t, e) {
    switch (t) {
      case Model.LEVEL:
        e > 0 && (this.level = Tool.sumValue(this.level, e, 0, 120))
        break
      case Model.LEVEL2:
        e > 0 && (this.level2 = Tool.sumValue(this.level2, e, 0, 120))
        break
      case Model.ENCHANTVALUE:
        this.enchantValue += e
        break
      case Model.COUNTRY_RANK_SET:
        this.countryRank = e
        break
      case Model.COUNTRY_ID_SET:
        this.countryId = e
        break
      case Model.STATUS_SET:
        this.status = e
    }
  }

  setBattleIntValue(t) {
    for (let e = 27; e <= 30; e++) {
      const n = 1 << e
      Tool.isBit(n, t) ? (this.intValue1 |= n) : (this.intValue1 &= ~n)
    }
  }

  isHasPlayerMember() {
    if (this.members == null)
      return false
    for (let t = 0; t < this.members.length; t++) {
      const e = this.members[t]
      if (e != null && e.type == 3)
        return true
    }
    return false
  }
}

export namespace Model {
  export function fromBytes(byte: Protocol, model: Model) {
    const e = model

    e.setId(byte.getInt())
    e.setName(byte.getString())
    e.setInfo(byte.getString())
    e.setTitle(byte.getString())
    e.setLevel(byte.getByte())
    e.setLevel2(byte.getByte())
    byte.getInt()
    byte.getInt()
    byte.getInt()
    e.setSetting(byte.getInt())
    e.status = byte.getInt()
    e.setMode(byte.getByte())
    if (e.mode === Model.MODE_SHOP) {
      e.shopName = byte.getString()
      byte.getByte()
    }
    const n = byte.getInt()
    e.setCountryId(n)
    if (n >= 0) {
      e.setCountryName(byte.getString())
      e.setCountryRank(byte.getByte())
    }
    e.setPosition(byte.getByte(), byte.getByte())
    e.vipLevel = byte.getByte()
  }

  export function getAttributeName(attr: number) {
    switch (attr) {
      case STR:
        return GameText.STR_ATTR_STR
      case CON:
        return GameText.STR_ATTR_CON
      case AGI:
        return GameText.STR_ATTR_AGI
      case ILT:
        return GameText.STR_ATTR_ILT
      case WIS:
        return GameText.STR_ATTR_WIS
    }
  }

  export const MODE_NORMAL = 0
  export const MODE_SHOP = 1
  export const MODE_BATTLE_LOCAL = 50
  export const MODE_BATTLE_REMOTE = 51
  export const MODE_BATTLE_PK = 52
  export const MODE_BATTLE_OB = 53
  export const START_HAIR = 0
  export const START_FACE = 1e3
  export const START_HAND = 2e3
  export const START_FEET = 3e3
  export const START_SHOULDER = 4e3
  export const START_BACK = 5e3
  export const START_CLOTHES = 6e3
  export const START_TROUSERS = 7e3
  export const START_WEAPON = 8e3
  export const START_HELMET = 1e4
  export const START_PET = 12e3
  export const START_TRANSPORT = 14e3
  export const START_FLASH = 15e3
  export const START_MINI_SPRITE = 16e3
  export const MAX_STORE_NUM = 60
  export const MAX_PLAYER_HP = 9999999
  export const MAX_PLAYER_MP = 9999999
  export const MAX_MOSTER_HP = 5e6
  export const MAX_BASE_ATTRIBUTE = 32767
  export const MAX_OTHER_ATTRIBUTE = 1e6
  export const MAX_DEF = 1e6
  export const MAX_PROBABILITY = 100
  export const MIN_HIT_RATE = 30
  export const MIN_HIT_MAGIC = 20
  export const MIN_FORCE_HITRATE = 30
  export const MAX_FORCE_RATE = 70
  export const MIN_HIT_TIME = 1
  export const MAX_HIT_TIME = 99
  export const MAX_ATK = 99999999
  export const MAX_KEEPOUT_ATK_TIME = 1e4
  export const MAX_OTHER_PROBABILITY = 1e3
  export const MIN_DEF_FIELD = -999999
  export const MIN_HEAL_RECOVERY = -999999
  export const MIN_MANA_RECOVERY = -999999
  export const BIT_1 = 1
  export const BIT_2 = 3
  export const BIT_3 = 7
  export const BIT_4 = 15
  export const BIT_5 = 31
  export const BIT_6 = 63
  export const BIT_7 = 127
  export const BIT_8 = 255
  export const BIT_9 = 511
  export const OFFSET_SEX = 0
  export const OFFSET_RACE = 1
  export const OFFSET_JOB = 3
  export const OFFSET_HAIR_STYLE = 7
  export const OFFSET_HAIR_COLOR = 11
  export const OFFSET_FACE_STYLE = 13
  export const OFFSET_HAND_STYLE = 17
  export const OFFSET_HAND_COLOR = 19
  export const OFFSET_FEET_STYLE = 21
  export const OFFSET_FEET_COLOR = 23
  export const OFFSET_HELMET_STYLE = 25
  export const OFFSET_HELMET_COLOR = 30
  export const OFFSET_SHOULDER_STYLE = 0
  export const OFFSET_SHOULDER_COLOR = 4
  export const OFFSET_LWEAPON_STYLE = 6
  export const OFFSET_LWEAPON_COLOR = 14
  export const OFFSET_RWEAPON_STYLE = 16
  export const OFFSET_RWEAPON_COLOR = 24
  export const OFFSET_VIP = 26
  export const OFFSET_WEAPON_FLASH = 28
  export const OFFSET_SHOULDER_ADD = 31
  export const OFFSET_BACK_STYLE = 0
  export const OFFSET_BACK_COLOR = 4
  export const OFFSET_CLOTHES_STYLE = 6
  export const OFFSET_CLOTHES_COLOR = 12
  export const OFFSET_TROUSERS_STYLE = 14
  export const OFFSET_TROUSERS_COLOR = 20
  export const OFFSET_TRANSPORT_STYLE = 22
  export const OFFSET_TRANSPORT_COLOR = 26
  export const OFFSET_BACK_ADD = 28
  export const OFFSET_TRANSPORT_ADD = 29
  export const OFFSET_FASH_ADD = 30
  export const OFFSET_TRANSPORT_ADD_2 = 31
  export const OFFSET_PET_STYLE = 0
  export const OFFSET_PET_COLOR = 6
  export const OFFSET_LVUP_STYLE = 8
  export const LEN_PET_STYLE = Model.BIT_6
  export const LEN_PET_COLOR = Model.BIT_2
  export const LEN_LVUP_STYLE = Model.BIT_4
  export const LEN_SEX = Model.BIT_1
  export const LEN_RACE = Model.BIT_2
  export const LEN_JOB = Model.BIT_4
  export const LEN_HAIR_STYLE = Model.BIT_4
  export const LEN_HAIR_COLOR = Model.BIT_2
  export const LEN_FACE_STYLE = Model.BIT_4
  export const LEN_HAND_STYLE = Model.BIT_2
  export const LEN_HAND_COLOR = Model.BIT_2
  export const LEN_FEET_STYLE = Model.BIT_2
  export const LEN_FEET_COLOR = Model.BIT_2
  export const LEN_HELMET_STYLE = Model.BIT_5
  export const LEN_HELMET_COLOR = Model.BIT_2
  export const LEN_SHOULDER_STYLE = Model.BIT_4
  export const LEN_SHOULDER_COLOR = Model.BIT_2
  export const LEN_LWEAPON_STYLE = Model.BIT_8
  export const LEN_LWEAPON_COLOR = Model.BIT_2
  export const LEN_RWEAPON_STYLE = Model.BIT_8
  export const LEN_RWEAPON_COLOR = Model.BIT_2
  export const LEN_VIP = Model.BIT_2
  export const LEN_WEAPON_FLASH = Model.BIT_3
  export const LEN_SHOULDER_ADD = Model.BIT_1
  export const LEN_BACK_STYLE = Model.BIT_4
  export const LEN_BACK_COLOR = Model.BIT_2
  export const LEN_CLOTHES_STYLE = Model.BIT_6
  export const LEN_CLOTHES_COLOR = Model.BIT_2
  export const LEN_TROUSERS_STYLE = Model.BIT_6
  export const LEN_TROUSERS_COLOR = Model.BIT_2
  export const LEN_TRANSPORT_STYLE = Model.BIT_4
  export const LEN_TRANSPORT_COLOR = Model.BIT_2
  export const LEN_BACK_ADD = Model.BIT_1
  export const LEN_TRANSPORT_ADD = Model.BIT_1
  export const LEN_FASH_ADD = Model.BIT_1
  export const LEN_TRANSPORT_ADD_2 = Model.BIT_1
  export const LONG_TROUSERS_IN_TRANSPORT = (7400 - Model.START_TROUSERS) / 8 + 1
  export const MAX_MERCENARY_MEMBER = 2
  export const MOVE_END_CHECK = 1
  export const LAST_MOVE_FILL = 2
  export const NPC_MISSION_LOAD = 4
  export const MOVE_NPC_WELCOME = 8
  export const MERCENARY_INFO = 16
  export const PET_INFO = 32
  export const DEL_STATUS = 64
  export const MONSTER_BOOK_INFO = 128
  export const PET_INNER_SHOW = 256
  export const OFFLINE_DOING = 512
  export const NPC_MISSION_DISPLAY = 1024
  export const NPC_MISSION_HIDE = 2048
  export const NPC_COUNTRY_BLOAD = 4096
  export const MAIL_NEW_NOTICE = 8192
  export const ATTR_NEW_NOTICE = 16384
  export const CHAT_NEW_NOTICE = 32768
  export const SPRITE_LOADING_NPC = 65536
  export const SELL_PLAYER_INFO_LOAD = 1 << 17
  export const SELL_PLAYER_STORE_LOAD = 1 << 18
  export const HIDE_SPIRTE = 1 << 19
  export const HIDE_PHOTO_COMMAND = 1 << 20
  export const SELL_PLAYER_STORE_VIP_LOAD = 1 << 21
  export const BUFFER_DIE_1HP_CHECK = 1 << 27
  export const BUFFER_DIE_FULLHP_CHECK = 1 << 28
  export const BUFFER_DIE_DELAY_CHECK = 1 << 29
  export const TAG_IS_KEEP_OUT = 1 << 30
  export const COUNTRY_APPLY = 1 << 31

  export const EXP = 0
  export const EXPMAX = 1
  export const HP = 2
  export const MP = 3
  export const CP = 4
  export const SP = 5
  export const STR = 6
  export const CON = 7
  export const AGI = 8
  export const ILT = 9
  export const WIS = 10
  export const MONEY1 = 11
  export const MONEY2 = 12
  export const MONEY3 = 13
  export const NUM_BAG = 14
  export const NUM_STROE = 15
  export const COUNTRY_HONOR = 16
  export const CITY_ID = 17
  export const KILL_COUNT = 18
  export const PK_WIN_COUNT = 19
  export const PK_LOSE_COUNT = 20
  export const TOTAL_ONLINE = 21
  export const PARTNER_ID = 22
  export const MASTER_ID = 23
  export const APPRENTICE1 = 24
  export const APPRENTICE2 = 25
  export const APPRENTICE3 = 26
  export const APPRENTICE4 = 27
  export const APPRENTICE5 = 28
  export const HPMAX = 29
  export const MPMAX = 30
  export const SPEED = 31
  export const ATK_TYPE = 32
  export const ATK_MIN = 33
  export const ATK_MAX = 34
  export const ATK_TIME = 35
  export const ATK_STR = 36
  export const ATK_AGI = 37
  export const ATK_MAGIC = 38
  export const DEF_STR = 39
  export const DEF_AGI = 40
  export const DEF_MAGIC = 41
  export const DODGE = 42
  export const HIT_RATE = 43
  export const HIT_MAGIC = 44
  export const CRITICAL = 45
  export const FORCE_HIT = 46
  export const EXP_UP = 47
  export const WIL = 48
  export const TOUGH = 49
  export const BLOCK = 51
  export const BRK_ARMOR = 52
  export const INSIGHT = 53
  export const DEF_FIELD = 54
  export const BACK = 55
  export const MAGIC_BACK = 56
  export const LIFE_ABSORPTION = 57
  export const MANA_ABSORPTION = 58
  export const MAGIC_PENETRATION = 59
  export const HEAL_RECOVERY = 60
  export const MANA_RECOVERY = 61
  export const RECOVERY = 62
  export const ARGO = 63
  export const BACK_MAX = 64
  export const MASTER_FLAG = 65
  export const HELP_COUNTRY = 66
  export const LOVE_PLAYER = 67
  export const INTEGRAL = 68
  export const PARTNER_NAME = 69
  export const LEFT_WEAPON_TYPE = 71
  export const RIGHT_WEAPON_TYPE = 72
  export const LEFT_ATK_MIN = 73
  export const LEFT_ATK_MAX = 74
  export const RIGHT_ATK_MIN = 75
  export const RIGHT_ATK_MAX = 76
  export const LEFT_ATK_TIME = 77
  export const RIGHT_ATK_TIME = 78
  export const WEAPON_DAMAGE_PERCENT = 79
  export const PET_COLOR = 81
  export const PET_GRADE = 82
  export const PET_GROW_LEVEL = 83
  export const BUFFER_REMOVE_STATUS = 90
  export const HP_DISPLAY = 91
  export const MP_DISPLAY = 92
  export const UID = 101
  export const ID = 102
  export const SEX = 103
  export const RACE = 104
  export const JOB = 105
  export const LEVEL = 106
  export const ICON = 107
  export const SETTING = 108
  export const STATUS = 109
  export const COUNTRY_ID = 110
  export const COUNTRY_RANK = 111
  export const COUNTRY_NAME = 112
  export const PX = 113
  export const PY = 114
  export const COUNTRY_RANK_SET = 115
  export const COUNTRY_ID_SET = 116
  export const STATUS_SET = 117
  export const LEVEL2 = 118
  export const EXP2 = 119
  export const EXPMAX2 = 120
  export const ENCHANTVALUE = 121
  export const IGNORE_BACK = 200
  export const IGNORE_MAGIC_BACK = 201
  export const IGNORE_BLOCK = 202
  export const IGNORE_INSIGHT = 203
  export const IGNORE_WIL = 204
  export const IGNORE_TOUCH = 205
  export const KEEPOUT_ATK_TIME = 250
  export const SET_EXP = 5001
  export const SET_EXPMAX = 5002
  export const SET_EXP2 = 5003
  export const SET_EXPMAX2 = 5004
  export const COUNTRY_FFLAG_IS_VIP = 1
  export const COUNTRY_FFLAG_IS_VIP_CQ = 2
  export const COUNTRY_MEMBER_IS_VIP = 1
  export const COUNTRY_MEMBER_IS_VIP_CQ = 2
  export const STATUS_NONE = 0
  export const STATUS_ONLINE = 1
  export const STATUS_ALL_DEL = 2
  export const STATUS_TEMP_DEL = 4
  export const STATUS_FROST = 8
  export const STATUS_SELL = 16
  export const STATUS_ENGAGE = 32
  export const STATUS_CLOSE = 64
  export const STATUS_MOUTH = 128
  export const STATUS_COMMENTS = 256
  export const STATUS_OFFLINEMISSION = 512
  export const STATUS_VIP = 1024
  export const STATUS_IS_CARD = 2048
  export const STATUS_CAN_MASTER = 4096
  export const STATUS_IS_SOLDIER = 8192
  export const STATUS_IS_HELP = 16384
  export const STATUS_IS_PHOTO = 32768
  export const STATUS_IS_GM = 65536
  export const STATUS_IS_CITY = 1 << 17
  export const STATUS_IS_TEACHER = 1 << 18
  export const STATUS_VIP_TX_CQ = 1 << 19
  export const STATUS_IS_TOURIST = 1 << 20
  export const STATUS_IS_ROBOT = 1 << 21
}
