// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {guard} from "../../../../../src/effect/battle/effect/guard";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
};

test('防御なので、攻撃力の半分のダメージが与えられる', t => {
  const result = guard(ATTACKER);
  t.is(result.damage, 1000);
});
