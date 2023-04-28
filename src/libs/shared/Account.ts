import type { Version } from 'libs/shared/version'
import { VERSION, VERSION_KEY } from 'libs/shared/version'
import { v4 as uuid } from 'uuid'
import type { AccountState, Form, IAccount } from '~/types'

export class Account implements IAccount {
  id: string = uuid()

  displayName = '官方账号'
  url = ''
  username = ''
  password = ''
  version: Version = VERSION[VERSION_KEY.GF]

  setUsername(username: string) {
    this.username = username

    return this
  }

  setPassword(password: string) {
    this.password = password

    return this
  }

  setVersion(version: Version) {
    this.version = version

    return this
  }

  setUrl(url: string) {
    this.url = url

    switch (this.version.name) {
      case '官方':
        break
      case '小七':
        {
          const params = new URLSearchParams(url.slice(url.indexOf('?')))

          const xameid = params.get('xameid')!
          const xhannel = params.get('xhannel')!
          this.version.xgameid = isNaN(parseInt(xameid)) ? this.version.xgameid : parseInt(xameid)
          this.version.channel = isNaN(parseInt(xhannel)) ? this.version.channel : parseInt(xhannel)
          const stime = params.get('stime')!
          const ticket = params.get('ticket')!
          const game_key = params.get('game_key')!
          const sign = params.get('sign')!

          this.username = JSON.stringify({
            game_key,
            stime,
            ticket,
            sign,
          })
          this.password = 'chrome'

          this.displayName = '小七账号'
        }
        break
      case '天宇':
        {
          const params = new URLSearchParams(url.slice(url.indexOf('?')))

          const xameid = params.get('xameid')!
          const xhannel = params.get('xhannel')!
          this.version.xgameid = isNaN(parseInt(xameid)) ? this.version.xgameid : parseInt(xameid)
          this.version.channel = isNaN(parseInt(xhannel)) ? this.version.channel : parseInt(xhannel)
          const mbGameId = params.get('mbGameId')!
          const mbToken = params.get('mbToken')!
          const mbUserId = params.get('mbUserId')!

          this.username = JSON.stringify({
            mbGameId,
            mbToken,
            mbUserId,
          })
          this.password = 'chrome'

          this.displayName = '天宇账号'
        }
        break
    }

    return this
  }

  setDisplayName(name: string) {
    this.displayName = name

    return this
  }

  setId(id: string) {
    this.id = id

    return this
  }

  static fromForm(form: Form, version: Version) {
    const account = new Account()
      .setVersion(version)
      .setPassword(form.password)
      .setUsername(form.username)
      .setUrl(form.username)
      .setDisplayName(form.displayName)

    return account
  }

  // 反序列化 Account 信息
  static from(state: string) {
    const _state: AccountState = JSON.parse(state)

    const account = new Account()

    account.setVersion(
      VERSION[_state.version],
    )
      .setId(_state.id)
      .setUsername(_state.username)
      .setPassword(_state.password)
      .setUrl(_state.url)
      .setDisplayName(_state.displayName)

    return account
  }

  // 序列化 Account 信息
  toString() {
    const state: AccountState = {
      id: this.id,
      url: this.url,
      username: this.username,
      password: this.password,
      version: this.version.name,
      displayName: this.displayName,
    }

    return JSON.stringify(state)
  }
}
