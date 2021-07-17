// @flow

import test from 'ava';
import {toMinDamage} from "../../src/effect/to-min-damage";

test('マイナスダメージを0に修正する', t => {
  const result = toMinDamage(-1000);
  t.is(result, 0);
});

test('0ダメージはそのまま', t => {
  const result = toMinDamage(0);
  t.is(result, 0);
});

test('プラスダメージはそのまま', t => {
  const result = toMinDamage(1000);
  t.is(result, 1000);
});