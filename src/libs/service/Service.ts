import EventEmitter from 'eventemitter3'

export enum ServiceEventBusEvents {
  // #region mission
  ACCEPT_MISSION = 'accept:mission',
  SUBMIT_MISSION = 'submit:mission',
  ABANDON_MISSION = 'abandon:mission',
  // #endregion

  // #region battle
  ENTER_BATTLE = 'enter:battle',
  UPDATE_BATTLE = 'update:battle',
  ERROR_BATTLE = 'error:battle',
  EXIT_BATTLE = 'exit:battle',
  // #endregion

  // #region team
  JOIN_TEAM = 'join:team',
  DISBAND_TEAM = 'disband:team',
  CHANGE_TEAM_CAPTAIN = 'change:team:captain',
  LEAVE_TEAM = 'leave:team',
  INVITE_TEAM = 'invite:team',
  // #endregion

  // #region other
  UPDATE_AUTO_SKILL = 'update:auto:skill',
  UPDATE_ACHIEVE_TITLE = 'update:achieve:title',
  // #endregion
}

export class ServiceEventBus {
  private readonly emitter: EventEmitter = new EventEmitter()
}
