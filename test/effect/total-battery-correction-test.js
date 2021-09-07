// @flow

import test from 'ava';
import {EMPTY_ARMDOZER_EFFECT} from "../../src/empty/amrdozer-effect";
import {totalBatteryCorrection} from "../../src/effect/battery-correction";

test('バッテリー補正合計値が正しく取得できる', t => {
  const oneTurn = {type: 'TurnLimit', remainingTurn: 1};
  const data = [
    {type: 'BatteryCorrection', batteryCorrection: 3, period: oneTurn},
    {type: 'BatteryCorrection', batteryCorrection: -1, period: oneTurn},
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