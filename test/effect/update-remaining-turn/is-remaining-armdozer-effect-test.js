// @flow

import test from 'ava';
import {EMPTY_ARMDOZER_EFFECT} from "../../../src/empty-data/amrdozer-effect";
import {isRemainArmdozerEffect} from "../../../src/effect/update-remaning-turn/armdozer-effect";

test('アームドーザ効果継続ターン数が1より大きい場合はtrueを返す', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: 1
  };
  const result = isRemainArmdozerEffect(data);
  t.true(result);
});

test('アームドーザ効果継続ターン数が0以下の場合はfalseを返す', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: 0
  };
  const result = isRemainArmdozerEffect(data);
  t.false(result);
});

test('アームドーザ効果継続ターン数が無限の場合はtrueを返す', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: Infinity
  };
  const result = isRemainArmdozerEffect(data);
  t.true(result);
});