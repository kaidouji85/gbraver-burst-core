// @flow
import type {Armdozer} from '../player/armdozer/armdozer';

/** アームドーザIDリスト */
export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
  LIGHTNING_DOZER: 'LIGHTNING_DOZER',
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
    appearance: 'shin-braver',
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
    appearance: 'neo-landozer',
    burst: {
      type: 'BuffPower',
      recoverBattery: 3,
      buffPower: 1000,
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
    appearance: 'lightning-dozer',
    burst: {
      type: 'LightningBarrier',
      recoverBattery: 3,
      damage: 1000,
      duration: 2
    }
  }
];
