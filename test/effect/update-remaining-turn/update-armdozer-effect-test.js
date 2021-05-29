// @flow

import test from 'ava';
import {updateArmdozerEffect} from "../../../src/effect/update-remaning-turn/armdozer-effect";
import {EMPTY_ARMDOZER_EFFECT} from "../../../src/empty/amrdozer-effect";

test('アームドーザ効果の継続ターン数がマイナス1される', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: 3
  };
  const result = updateArmdozerEffect(data);
  const expexted = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: 2
  };
  t.deepEqual(result, expexted);
});

test('アームドーザ効果継続ターン数が無限の場合は変化なし', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: Infinity
  };
  const result = updateArmdozerEffect(data);
  const expexted = {
    ...EMPTY_ARMDOZER_EFFECT,
    remainingTurn: Infinity
  };
  t.deepEqual(result, expexted);
});