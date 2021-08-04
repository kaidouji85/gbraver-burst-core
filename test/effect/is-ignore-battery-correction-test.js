// @flow

import test from 'ava';
import {isIgnoreBatteryCorrection} from "../../src/effect/battery-correction";

const ignoreBatteryCorrection
  = {type: 'IgnoreBatteryCorrection', remainingTurn: 1};

const notIgnoreBatteryCorrection
  = {type: 'CorrectPower',  power: 1000, remainingTurn: 1};

test('バッテリー補正無効を持つ場合、バッテリー補正が無視される', t => {
  const data = [ignoreBatteryCorrection];
  const result = isIgnoreBatteryCorrection(data);
  t.true(result);
});

test('バッテリー補正無効がない場合、バッテリー補正は適用される', t => {
  const data = [notIgnoreBatteryCorrection];
  const result = isIgnoreBatteryCorrection(data);
  t.false(result);
});

test('バッテリー補正無効を複数持つ場合、バッテリー補正が適用される', t => {
  const data = [
    notIgnoreBatteryCorrection,
    ignoreBatteryCorrection,
    ignoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = isIgnoreBatteryCorrection(data);
  t.true(result);
});

test('バッテリー補正以外を複数持つ場合、バッテリー補正は適用されない', t => {
  const data = [
    notIgnoreBatteryCorrection,
    notIgnoreBatteryCorrection
  ];
  const result = isIgnoreBatteryCorrection(data);
  t.false(result);
});

test('効果を何も持たない場合、バッテリー補正は適用されない', t => {
  const data = [];
  const result = isIgnoreBatteryCorrection(data);
  t.false(result);
});
