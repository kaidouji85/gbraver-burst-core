// @flow

import type {Pilot} from "../../src/player/pilot";
import type {PilotState} from "../../src/state/pilot-state";

/**
 * 空のパイロット
 */
export const EMPTY_PILOT: Pilot = {
  id: 'EMPTY_PLAYER',
  name: '名無し',
  skill: {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  }
};

/**
 * 空のパイロットステート
 */
export const EMPTY_PILOT_STATE: PilotState = {
  ...EMPTY_PILOT,
  enableSkill: true
};
