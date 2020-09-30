// @flow

import type {Pilot} from "../player/pilot";

/**
 * パイロットIDを集めたもの
 */
export const PilotIds = {
  SHINYA: 'SHINYA',
  GAI: 'GAI',
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
  },
  {
    id: PilotIds.GAI,
    name: 'ガイ',
    skill: {
      type: 'BuffPowerSkill',
      buffPower: 600,
      duration: 2,
    }
  }
];