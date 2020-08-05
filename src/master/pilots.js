// @flow

import type {Pilot} from "../player/pilot";

/**
 * パイロットIDを集めたもの
 */
export const PilotIds = {
  SHINYA: 'SHINYA'
};

/**
 * パイロットマスタ
 */
export const Pilots: Pilot[] = [
  {
    id: PilotIds.SHINYA,
    name: 'シンヤ',
    skill: {
      type: 'RecoverBatterySkill',
      recoverBattery: 2
    }
  }
];