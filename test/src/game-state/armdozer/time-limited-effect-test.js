// @flow

import test from 'ava';
import {isTimeLimitedEffect} from "../../../../src/game-state/armdozer/time-limited-effect";

test('時限付き効果として正しいデータ型なら、trueを返す', t => {
  const result = isTimeLimitedEffect({remainingTurn: 1});
  t.true(result);
});

test('余計なプロパティがあっても正しいデータ型なら、trueを返す', t => {
  const result = isTimeLimitedEffect({type: 'example', value: 100, remainingTurn: 1});
  t.true(result);
});

test('残りターン数が整数でない場合、falseを返す', t => {
  const result = isTimeLimitedEffect({remainingTurn: 1.5});
  t.false(result);
});

test('nullを与えたら、falseを返す', t => {
  const result = isTimeLimitedEffect(null);
  t.false(result)
});
