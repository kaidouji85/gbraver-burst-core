// @flow

import test from 'ava';
import {hasIgnoreBatteryCorrection} from "../../src/effect/battery-correction";

const oneTurnLimit = {type: 'TurnLimit', remainingTurn: 1};
const ignoreBatteryCorrection = {type: 'IgnoreBatteryCorrection', period: oneTurnLimit};
const notIgnoreBatteryCorrection = {type: 'CorrectPower',  power: 1000, period: oneTurnLimit};

test('バッテリー補正無効を持つことを正しく判定できる', t => {
  const data = [ignoreBatteryCorrection];
  const result = hasIgnoreBatteryCorrection(data);
  t.true(result);
});

test('バッテリー補正無効を持たないことを正しく判定できる', t => {
  const data = [notIgnoreBatteryCorrection];
  const result = hasIgnoreBatteryCorrection(data);
  t.false(result);
});

test('バッテリー補正無効を複数持つ場合、バッテリー補正効果を持つと見なす', t => {
  const data = [
    notIgnoreBatteryCorrection,
    ignoreBatteryCorrection,
    ignoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = hasIgnoreBatteryCorrection(data);
  t.true(result);
});

test('バッテリー補正以外を複数持つ場合、バッテリー補正無効を持たないとみなす', t => {
  const data = [
    notIgnoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = hasIgnoreBatteryCorrection(data);
  t.false(result);
});

test('何も効果を持たない場合、バッテリー補正無効を持たないとみなす', t => {
  const data = [];
  const result = hasIgnoreBatteryCorrection(data);
  t.false(result);
});
