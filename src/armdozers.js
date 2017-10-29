// @flow
import type {ArmDozerBasicStatus} from './flow-type';
import {ArmDozerIdList} from './flow-type';


/** アームドーザのマスターデータ */

export const armDozers: ArmDozerBasicStatus[] = [
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