// @flow

import test from 'ava';
import {removeContinuousActive} from "../../../../src/effect/continuous-active/remove-continuous-active";
import type {ArmdozerEffect, CorrectPower} from "../../../../src";
import type {ContinuousActivePlayer} from "../../../../src/state/armdozer-effect";

const CORRECT_POWER: CorrectPower = {
    type: 'CorrectPower',
    power: 1000,
    remainingTurn: 1
}

const CONTINUOUS_ACTIVE_PLAYER: ContinuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  remainingTurn: Infinity
};

test('アクティブ継続のみ取り除かれる', t => {
  const origin: ArmdozerEffect[] = [CORRECT_POWER, CONTINUOUS_ACTIVE_PLAYER];
  const result = removeContinuousActive(origin);
  const expected = [CORRECT_POWER];
  t.deepEqual(result, expected);
});

test('アクティブ継続がない場合はそのまま', t => {
  const origin: ArmdozerEffect[] = [CORRECT_POWER];
  const result = removeContinuousActive(origin);
  const expected = [CORRECT_POWER];
  t.deepEqual(result, expected);
});
