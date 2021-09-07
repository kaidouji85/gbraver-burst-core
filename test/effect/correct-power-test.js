// @flow

import test from 'ava';
import {correctPower} from "../../src";

const oneTurnLimit = {type: 'TurnLimit', remainingTurn: 1};
const halveCorrect = {type: 'HalveCorrectPower', period: oneTurnLimit};
const plusCorrect = {type: 'CorrectPower', power: 1000, period: oneTurnLimit};
const minusCorrect = {type: 'CorrectPower', power: -1000, period: oneTurnLimit};

test('攻撃補正半減効果を持たない場合、攻撃補正効果の合計が最終的な値になる', t => {
  const effects = [plusCorrect, plusCorrect, minusCorrect];
  const result = correctPower(effects);
  t.is(result, 1000);
});

test('攻撃補正半減効果を持つ場合、攻撃補正効果の合計の半分が最終的な値になる', t => {
  const effects = [plusCorrect, plusCorrect, minusCorrect, halveCorrect];
  const result = correctPower(effects);
  t.is(result, 500);
});

test('攻撃補正合計がマイナスの場合でも、攻撃補正半減効果は適用される', t => {
  const effects = [plusCorrect, minusCorrect, minusCorrect, halveCorrect];
  const result = correctPower(effects);
  t.is(result, -500);
});