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
    speed: 2000,
    appearance: 'shin-braver',
    burst: {
      type: 'RecoverBattery',
      recoverBattery: 5,
    },
  },
  {
    id: ArmDozerIdList.NEO_LANDOZER,
    name: 'ネオランドーザ',
    maxHp: 3300,
    maxBattery: 5,
    power: 2300,
    speed: 1500,
    appearance: 'neo-landozer',
    burst: {
      type: 'BuffPower',
      recoverBattery: 3,
      buffPower: 1000,
      duration: 2
    }
  }
];
