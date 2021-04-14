// @flow

import test from 'ava';
import {correctedBattery} from "../../../../src/effect/battery-declaration/battery-correction";

test('補正後バッテリーが正しく計算できる', t => {
  const battery = {type: 'BATTERY_COMMAND', battery: 1};
  const effects = [{type: 'BatteryCorrection', batteryCorrection: 2, duration: 1}];
  const result = correctedBattery(battery, effects);
  t.is(result, 3);
});

test('バッテリーが0の場合は補正されない', t => {
  const battery = {type: 'BATTERY_COMMAND', battery: 0};
  const effects = [{type: 'BatteryCorrection', batteryCorrection: 2, duration: 1}];
  const result = correctedBattery(battery, effects);
  t.is(result, 0);
});

test('補正後バッテリーが0より小さい場合、結果を0とみなす', t => {
  const battery = {type: 'BATTERY_COMMAND', battery: 3};
  const effects = [{type: 'BatteryCorrection', batteryCorrection: -4, duration: 1}];
  const result = correctedBattery(battery, effects);
  t.is(result, 0);
});

test('アームドーザ効果が空の場合、元の値をそのまま返す', t => {
  const battery = {type: 'BATTERY_COMMAND', battery: 4};
  const effects = [];
  const result = correctedBattery(battery, effects);
  t.is(result, 4);
});
