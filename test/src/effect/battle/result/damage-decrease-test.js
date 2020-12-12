// @flow

import test from 'ava';
import {EMPTY_ARMDOZER_EFFECT, EMPTY_DAMAGE_DECREASE} from "../../../../data/amrdozer-effect";
import {damageDecrease} from "../../../../../src/effect/battle/result/damage-decrease";

test('ダメージ減少効果の合計値を返す', t => {
  const result = damageDecrease([
    {...EMPTY_DAMAGE_DECREASE, decrease: 600},
    {...EMPTY_DAMAGE_DECREASE, decrease: 300},
    EMPTY_ARMDOZER_EFFECT
  ]);
  t.is(result, 900);
});

test('ダメージ減少効果がない場合は0を返す', t => {
  const result = damageDecrease([
    EMPTY_ARMDOZER_EFFECT
  ]);
  t.is(result, 0);
});

test('アームドーザ効果がない場合は0を返す', t => {
  const result = damageDecrease([]);
  t.is(result, 0);
});