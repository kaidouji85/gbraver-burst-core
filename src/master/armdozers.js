// @flow
import type {ArmDozerId} from '../armdozer/armdozer-status';
import type {ArmdozerStatus} from "../armdozer/armdozer-status";

/** アームドーザIDリスト */
export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
};

/** アームドーザのマスターデータ */
export const ArmDozers: ArmdozerStatus[] = [
  {
    id: ArmDozerIdList.SHIN_BRAVER,
    name: 'シンブレイバー',
    maxHp: 3000,
    maxBattery: 5,
    power: 2000,
    speed: 2000
  },
  {
    id: ArmDozerIdList.NEO_LANDOZER,
    name: 'ネオランドーザ',
    maxHp: 3300,
    maxBattery: 5,
    power: 2300,
    speed: 1500
  }
];