// @flow

import {totalDamageDecrease} from "../../src/effect/damage-decrease";
import {EMPTY_ARMDOZER_EFFECT, EMPTY_DAMAGE_DECREASE} from "../../src/empty/amrdozer-effect";

test('ダメージ減少効果の合計値を返す', () => {
  const result = totalDamageDecrease([
    {...EMPTY_DAMAGE_DECREASE, decrease: 600},
    {...EMPTY_DAMAGE_DECREASE, decrease: 300},
    EMPTY_ARMDOZER_EFFECT
  ]);
  expect(result).toBe(900);
});

test('ダメージ減少効果がない場合は0を返す', () => {
  const result = totalDamageDecrease([
    EMPTY_ARMDOZER_EFFECT
  ]);
  expect(result).toBe(0);
});

test('アームドーザ効果がない場合は0を返す', () => {
  const result = totalDamageDecrease([]);
  expect(result).toBe(0);
});