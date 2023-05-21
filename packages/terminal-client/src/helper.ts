import type { Protocol } from '@terminal/core'
import { Role, ServerAreaInfo, ServerLineInfo } from '@terminal/models/parser'
import type { AuthenticationPayload } from './types'

export function parseAreaServer(p: Protocol): Array<ServerAreaInfo> {
  return Array.from({ length: p.getByte() }, () => {
    const info = ServerAreaInfo.from(p)
    info.lines = Array.from({ length: p.getByte() }, () => ServerLineInfo.from(p))
    return info
  })
}

export function parseAuthenticationPayload(p: Protocol): AuthenticationPayload {
  const key = p.getLong()
  const session = p.getUnsignedInt()
  const ip = p.getString()
  const setting = p.getInt()

  return {
    key,
    ip,
    session,
    setting,
  }
}

export function parseRoleInfo(p: Protocol): Array<Role> {
  return Array.from({ length: p.getByte() }, () => Role.from(p))
}
