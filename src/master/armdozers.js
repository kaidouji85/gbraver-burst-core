// @flow
import type {Armdozer} from '../armdozer/armdozer';

/** アームドーザIDリスト */
export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
};

/** アームドーザのマスターデータ */
export const ArmDozers: Armdozer[] = [
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