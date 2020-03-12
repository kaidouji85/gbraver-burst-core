// @flow
import type {Armdozer} from '../player/armdozer/armdozer';

/** アームドーザIDマスタ */
export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
  LIGHTNING_DOZER: 'LIGHTNING_DOZER',
};

/** アームドーザマスタ */
export const ArmdozerAppearances = {
  SHIN_BRAVER: 'shin-braver',
  NEO_LANDOZER: 'neo-landozer',
  LIGHTNING_DOZER: 'lightning-dozer',
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
    appearance: ArmdozerAppearances.SHIN_BRAVER,
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
    appearance: ArmdozerAppearances.NEO_LANDOZER,
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
    appearance: ArmdozerAppearances.LIGHTNING_DOZER,
    burst: {
      type: 'LightningBarrier',
      recoverBattery: 3,
      damage: 1000,
      duration: 2
    }
  }
];
