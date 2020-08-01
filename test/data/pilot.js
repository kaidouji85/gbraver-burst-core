// @flow

import type {Pilot} from "../../src/player/pilot";

/**
 * 空のパイロット
 */
export const EMPTY_PILOT: Pilot = {
  id: 'EMPTY_PLAYER',
  name: '名無し',
  skill: {
    type: 'BatteryRecoverSkill',
    recoverBattery: 2
  }
};