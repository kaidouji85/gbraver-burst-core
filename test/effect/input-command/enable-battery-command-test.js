// @flow
import test from 'ava';
import {getEnableBatteryCommand} from "../../../src/effect/input-command/enable-battery-command";
import type {Command} from "../../../src/command/command";

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
  const result: Command[] = getEnableBatteryCommand(ARMDOZER_STATE);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 0).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 1).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 2).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 3).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 4).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 5).length, 1);
});

test('バッテリーが0なら0以外は入力不可能', t => {
  const result: Command[] = getEnableBatteryCommand({...ARMDOZER_STATE, battery: 0});
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 0).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 1).length, 0);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 2).length, 0);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 3).length, 0);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 4).length, 0);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 5).length, 0);
});

test('バッテリーが3なら0〜3まで入力可能', t => {
  const result: Command[] = getEnableBatteryCommand({...ARMDOZER_STATE, battery: 3});
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 0).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 1).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 2).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 3).length, 1);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 4).length, 0);
  t.is(result.filter(v => v.type === 'BATTERY_COMMAND'&& v.battery === 5).length, 0);
});
