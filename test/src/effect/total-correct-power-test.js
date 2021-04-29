//@flow

import test from 'ava';
import {totalCorrectPower} from "../../../src/effect/correct-power";
import {EMPTY_ARMDOZER_EFFECT, EMPTY_CORRECT_POWER} from "../../data/amrdozer-effect";

test('攻撃力補正の合計値を返す', t => {
  const result = totalCorrectPower([
    {...EMPTY_CORRECT_POWER, power: 1000},
    {...EMPTY_CORRECT_POWER, power: -500},
    {...EMPTY_CORRECT_POWER, power: 2000}
  ]);
  t.is(result, 2500);
});

test('アームドーザ効果が空の場合には0を返す', t => {
  const result = totalCorrectPower([]);
  t.is(result, 0);
});

test('攻撃補正以外のアームドーザ効果は無視する', t => {
  const result = totalCorrectPower([
    EMPTY_ARMDOZER_EFFECT,
    {...EMPTY_CORRECT_POWER, power: -500},
    {...EMPTY_CORRECT_POWER, power: 2000}
  ]);
  t.is(result, 1500);
});