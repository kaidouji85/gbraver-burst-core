// @flow

import test from 'ava';
import {batteryEnchantmentToCorrects} from "../../../../src/effect/pilot-skill/battery-enchantment";

test('バッテリー補正の合計とバッテリー増強値が一致する', t => {
  const result = batteryEnchantmentToCorrects(3)
    .map(v => v.batteryCorrection)
    .reduce((a, b) => a + b, 0);
  t.is(result, 3);
});

test('継続ターン数=2のバッテリー補正は、バッテリー増強値のマイナスと一致する', t => {
  const result = batteryEnchantmentToCorrects(2)
    .filter(v => v.remainingTurn === 2)
    .map(v => v.batteryCorrection)
    .reduce((a, b) => a + b, 0);
  t.is(result, -2);
});

test('バッテリー増強が0の場合でも、正しい結果を返すことができる', t => {
  const result = batteryEnchantmentToCorrects(0);
  const expected = [
    {
      type: 'BatteryCorrection',
      batteryCorrection: 0,
      remainingTurn: 1,
    },
    {
      type: 'BatteryCorrection',
      batteryCorrection: 0,
      remainingTurn: 2,
    },
  ];
  t.is(result, -2);
});