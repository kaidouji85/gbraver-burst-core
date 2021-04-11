// @flow

import test from 'ava';
import {totalBatteryCorrection} from "../../../src/state/armdozer-effect";
import {EMPTY_ARMDOZER_EFFECT} from "../../data/amrdozer-effect";

test('バッテリー補正合計値が正しく取得できる', t => {
  const data = [
    {type: 'BatteryCorrection', batteryCorrection: 3},
    {type: 'BatteryCorrection', batteryCorrection: -1},
    EMPTY_ARMDOZER_EFFECT
  ];
  const result = totalBatteryCorrection(data);
  t.is(result, 2);
});

test('バッテリー補正がない場合、バッテリー補正は0', t => {
  const data = [
    EMPTY_ARMDOZER_EFFECT
  ];
  const result = totalBatteryCorrection(data);
  t.is(result, 0);
});

test('アームドーザ効果が何もない場合、、バッテリー補正は0', t => {
  const data = [];
  const result = totalBatteryCorrection(data);
  t.is(result, 0);
});