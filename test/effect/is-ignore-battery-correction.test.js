// @flow

import {hasIgnoreBatteryCorrection} from "../../src/effect/battery-correction";

const oneTurn = {type: 'TurnLimit', remainingTurn: 1};
const ignoreBatteryCorrection = {type: 'IgnoreBatteryCorrection', period: oneTurn};
const notIgnoreBatteryCorrection = {type: 'CorrectPower', power: 1000, period: oneTurn};

test('バッテリー補正無効を持つことを正しく判定できる', () => {
  const data = [ignoreBatteryCorrection];
  const result = hasIgnoreBatteryCorrection(data);
  expect(result).toBe(true);
});

test('バッテリー補正無効を持たないことを正しく判定できる', () => {
  const data = [notIgnoreBatteryCorrection];
  const result = hasIgnoreBatteryCorrection(data);
  expect(result).toBe(false);
});

test('バッテリー補正無効を複数持つ場合、バッテリー補正効果を持つと見なす', () => {
  const data = [
    notIgnoreBatteryCorrection,
    ignoreBatteryCorrection,
    ignoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = hasIgnoreBatteryCorrection(data);
  expect(result).toBe(true);
});

test('バッテリー補正以外を複数持つ場合、バッテリー補正無効を持たないとみなす', () => {
  const data = [
    notIgnoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = hasIgnoreBatteryCorrection(data);
  expect(result).toBe(false);
});

test('何も効果を持たない場合、バッテリー補正無効を持たないとみなす', () => {
  const data = [];
  const result = hasIgnoreBatteryCorrection(data);
  expect(result).toBe(false);
});
