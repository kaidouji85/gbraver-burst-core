// @flow

import {correctedBattery} from "../../src/effect/battery-correction";

const emptyBatteryCorrection = {
  type: 'BatteryCorrection',
  batteryCorrection: 0,
  period: {
    type: 'TurnLimit',
    remainingTurn: 1
  }
};

test('補正後バッテリーが正しく計算できる', () => {
  const battery = {type: 'BATTERY_COMMAND', battery: 1};
  const effects = [{...emptyBatteryCorrection, batteryCorrection: 2}];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(3);
});

test('バッテリーが0の場合は補正されない', () => {
  const battery = {type: 'BATTERY_COMMAND', battery: 0};
  const effects = [{...emptyBatteryCorrection, batteryCorrection: 2}];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(0);
});

test('補正後バッテリーが0より小さい場合、結果を0とみなす', () => {
  const battery = {type: 'BATTERY_COMMAND', battery: 3};
  const effects = [{...emptyBatteryCorrection, batteryCorrection: -4}];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(0);
});

test('アームドーザ効果が空の場合、元の値をそのまま返す', () => {
  const battery = {type: 'BATTERY_COMMAND', battery: 4};
  const effects = [];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(4);
});
