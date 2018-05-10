// @flow

import test from 'ava';
import {getEnableBattery} from "../../../src/effect/input-command/enable-battery-command";

const ARMDOZER_STATE = {
  id: 'test',
  name: 'name',
  maxHp: 3000,
  hp: 3000,
  maxBattery: 5,
  battery: 5,
  power: 2000,
  speed: 2000,
  enableBurst: true
};

test('バッテリーが満タンなら0〜最大値まで入力可能', t => {
  t.deepEqual(getEnableBattery(ARMDOZER_STATE), [0, 1, 2, 3, 4, 5]);
});

test('バッテリーが0なら0以外は入力不可能', t => {
  t.deepEqual(getEnableBattery({...ARMDOZER_STATE, battery: 0}), [0]);
});

test('バッテリーが3なら0〜3まで入力可能', t => {
  t.deepEqual(getEnableBattery({...ARMDOZER_STATE, battery: 3}), [0, 1, 2, 3]);
});
