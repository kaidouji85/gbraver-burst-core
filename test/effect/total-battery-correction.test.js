// @flow

import {totalBatteryCorrection} from "../../src/effect/battery-correction";
import {EMPTY_ARMDOZER_EFFECT} from "../../src/empty/amrdozer-effect";

test('バッテリー補正合計値が正しく取得できる', () => {
  const oneTurn = {type: 'TurnLimit', remainingTurn: 1};
  const data = [
    {type: 'BatteryCorrection', batteryCorrection: 3, period: oneTurn},
    {type: 'BatteryCorrection', batteryCorrection: -1, period: oneTurn},
    EMPTY_ARMDOZER_EFFECT
  ];
  const result = totalBatteryCorrection(data);
  expect(result).toBe(2);
});

test('バッテリー補正がない場合、バッテリー補正は0', () => {
  const data = [
    EMPTY_ARMDOZER_EFFECT
  ];
  const result = totalBatteryCorrection(data);
  expect(result).toBe(0);
});

test('アームドーザ効果が何もない場合、、バッテリー補正は0', () => {
  const data = [];
  const result = totalBatteryCorrection(data);
  expect(result).toBe(0);
});