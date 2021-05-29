// @flow

import test from 'ava';
import {batteryEnchantmentToCorrects} from "../../../src/effect/pilot-skill/battery-enchantment";

test('バッテリー補正の合計と、バッテリー増強値が一致する', t => {
  const {plusBatteryCorrection, minusBatteryCorrection} = batteryEnchantmentToCorrects(3);
  const result = plusBatteryCorrection + minusBatteryCorrection;
  t.is(result, 3);
});

test('マイナスバッテリー補正は、バッテリー増強値のマイナスと一致する', t => {
  const {minusBatteryCorrection} = batteryEnchantmentToCorrects(2);
  t.is(minusBatteryCorrection, -2);
});