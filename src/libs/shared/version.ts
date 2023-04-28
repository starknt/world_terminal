export class Version {
  constructor(
    readonly name: string,
    readonly loginWebsocketUrl: string,
    public xgameid: number,
    public channel: number = 9600,
  ) { }
}

export const enum VERSION_KEY {
  GF = '官方',
  XiaoQi = '小七',
  TianYu = '天宇',
}

export const VERSION: Record<string, Version> = {
  [VERSION_KEY.GF]: new Version(VERSION_KEY.GF, 'wss://wanba.worldh5.com/websocket', 1000, 1100),
  [VERSION_KEY.XiaoQi]: new Version(VERSION_KEY.XiaoQi, 'wss://wanba.worldh5.com/websocket', 1000, 9600),
  [VERSION_KEY.TianYu]: new Version(VERSION_KEY.TianYu, 'wss://wanba.worldh5.com/websocket', 1000, 9600),
}
