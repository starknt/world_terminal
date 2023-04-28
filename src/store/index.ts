import { GameService } from "libs/service/GameService"

interface ITabTask {
  state: 'running' | 'done' | 'waiting'
}

interface ITabState {
  service: GameService
  tasks: ITabTask[]
}

interface GlobalState {
  tabs: ITabState[]
}

export const useGlobalStore = defineStore<string, GlobalState>('global', {
  state: () => ({
      tabs: []
  })
})
