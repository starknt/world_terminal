import { clone } from '../../terminal-kit/src/base/object'

export class EventEmitter<CallBackData> {
  private map: Map<string | number | symbol, ((data: CallBackData) => void | Promise<void>)[]> = new Map()

  on(event: string | number | symbol, callback: (data: CallBackData) => void | Promise<void>) {
    if (!this.map.has(event))
      this.map.set(event, [callback])
    this.map.get(event)!.push(callback)
    return this
  }

  emit(event: string | number | symbol, data: CallBackData) {
    for (const callback of (this.map.get(event) ?? [])) {
      callback(clone(data))
        ?.then(() => { /* ignore void */ })
        ?.catch(() => { /* ignore error */ })
    }
    return this
  }

  remove(event: string | number | symbol, callback?: (data: CallBackData) => void | Promise<void>) {
    if (this.map.has(event)) {
      if (!callback)
        this.map.delete(event)
      else
        this.map.set(event, this.map.get(event)!.filter(cb => cb === callback))
    }
  }
}
