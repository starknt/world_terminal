import { Emitter, Queue } from '@livemoe/utils'
import type { GameService } from 'libs/service/GameService'

export interface AutoRobotTaskCompleteCallback {

}

export interface AutoRobotTaskAction {

}

export interface AutoRobotTask {
  name: string
  description: string
  childrenTask: AutoRobotTask[]
  actions: AutoRobotTaskAction[]
  cb?: AutoRobotTaskCompleteCallback
}

/**
 * 1. 快速战斗
 * 2. 完成任务
 * 3. 跳转地图
 * 4. 寻找任务NPC
 * 5. 顺序执行任务作业
 */
export class AutoRobot {
  private readonly queue = new Queue<AutoRobotTask>()

  private readonly _onMissionCompleted = new Emitter<AutoRobotTask>()

  readonly onMissionCompleted = this._onMissionCompleted.event

  constructor(readonly service: GameService) {

  }

  addTask(task: AutoRobotTask | AutoRobotTask[]) {

  }

  removeTask() {

  }

  dispose() {

  }
}
