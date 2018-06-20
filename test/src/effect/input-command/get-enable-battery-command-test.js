// @flow

import test from 'ava';
import {getEnableBatteryCommand} from "../../../../src/effect/input-command/enable-battery-command";

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
  t.deepEqual(getEnableBatteryCommand(ARMDOZER_STATE), [
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3},
    {type: 'BATTERY_COMMAND', battery: 4},
    {type: 'BATTERY_COMMAND', battery: 5}
  ]);
});

test('バッテリーが0なら0以外は入力不可能', t => {
  t.deepEqual(getEnableBatteryCommand({...ARMDOZER_STATE, battery: 0}), [
    {type: 'BATTERY_COMMAND', battery: 0}
  ]);
});

test('バッテリーが3なら0〜3まで入力可能', t => {
  t.deepEqual(getEnableBatteryCommand({...ARMDOZER_STATE, battery: 3}), [
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3}
  ]);
});
