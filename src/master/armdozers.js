// @flow
import type {Armdozer} from '../player/armdozer';

/** アームドーザIDマスタ */
export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
  LIGHTNING_DOZER: 'LIGHTNING_DOZER',
  WING_DOZER: 'WING_DOZER',
};

/** アームドーザのマスターデータ */
export const ArmDozers: Armdozer[] = [
  {
    id: ArmDozerIdList.SHIN_BRAVER,
    name: 'シンブレイバー',
    maxHp: 3100,
    maxBattery: 5,
    power: 2000,
    speed: 2000,
    burst: {
      type: 'RecoverBattery',
      recoverBattery: 5,
    },
  },
  {
    id: ArmDozerIdList.NEO_LANDOZER,
    name: 'ネオランドーザ',
    maxHp: 3200,
    maxBattery: 5,
    power: 2100,
    speed: 1800,
    burst: {
      type: 'BuffPower',
      recoverBattery: 3,
      buffPower: 900,
      duration: 2
    }
  },
  {
    id: ArmDozerIdList.LIGHTNING_DOZER,
    name: 'ライトニングドーザ',
    maxHp: 3300,
    maxBattery: 5,
    power: 1900,
    speed: 1900,
    burst: {
      type: 'LightningBarrier',
      recoverBattery: 3,
      damage: 2000,
      duration: 2
    }
  },
  {
    id: ArmDozerIdList.WING_DOZER,
    name: 'ウィングドーザ',
    maxHp: 2700,
    maxBattery: 5,
    power: 2200,
    speed: 2200,
    burst: {
      type: 'ContinuousAttack',
      recoverBattery: 3,
    },
  },
];
