// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {createArmdozerState} from "../../../../../src/game-state/armdozer-state";
import {EMPTY_ARMDOZER} from "../../../../data/empty-armdozer";
import {guard} from "../../../../../src/effect/battle/result/guard";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: createArmdozerState({...EMPTY_ARMDOZER, power: 2000})
};

test('防御なので、攻撃力の半分のダメージが与えられる', t => {
  const result = guard(ATTACKER);
  t.is(result.damage, 1000);
});