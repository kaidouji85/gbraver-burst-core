// @flow

import test from 'ava';
import {EMPTY_ARMDOZER_EFFECT} from "../../../src/empty/amrdozer-effect";
import {isRemainArmdozerEffect} from "../../../src/effect/update-remaning-turn/armdozer-effect";

test('アームドーザ効果継続ターン数が1より大きい場合は効果継続する', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: 'TurnLimit',
      remainingTurn: 1
    }
  };
  const result = isRemainArmdozerEffect(data);
  t.true(result);
});

test('アームドーザ効果継続ターン数が0以下の場合は効果が終了する', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: 'TurnLimit',
      remainingTurn: 0,
    }

  };
  const result = isRemainArmdozerEffect(data);
  t.false(result);
});

test('永続効果は効果継続すると見なす', t => {
  const data = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: 'Permanent'
    }
  };
  const result = isRemainArmdozerEffect(data);
  t.true(result);
});