// @flow

import test from 'ava';
import {batteryBonus} from "../../../../../src/effect/battle/damage/battery-bonus";

test('ダメージのバッテリーボーナス = 100 * (攻撃側バッテリー - 防御側バッテリー - 1)', t => {
  const result = batteryBonus(5, 1);
  t.is(result, 300);
});

test('攻撃側バッテリーが防御側バッテリーを1上回っている時は、バッテリーボーナスはなし', t => {
  const result = batteryBonus(4, 3);
  t.is(result, 0);
});

test('攻撃側バッテリーと防御側バッテリーが同じ場合、バッテリーボーナスはなし', t => {
  const result = batteryBonus(0, 0);
  t.is(result, 0);
});

test('攻撃側バッテリーが防御側バッテリーより小さい場合、バッテリーボーナスはなし', t => {
  const result = batteryBonus(3, 5);
  t.is(result, 0);
});
