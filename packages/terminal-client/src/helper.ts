import type { Protocol } from '@terminal/core'
import { ServerAreaInfo, ServerLineInfo } from '@terminal/models/parser'

export function parseAreaServer(p: Protocol) {
  const areaList: ServerAreaInfo[] = []
  for (let i = p.getByte(), n = 0; i > n; n++) {
    const info = ServerAreaInfo.from(p)
    const len = p.getByte()
    for (let j = 0; j < len; j++) {
      const line = ServerLineInfo.from(p)
      info.lines.push(line)
      areaList.push(info)
    }
  }
  return areaList
}
