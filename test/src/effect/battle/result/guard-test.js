// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {guard} from "../../../../../src/effect/battle/result/guard";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import {EMPTY_CORRECT_POWER, EMPTY_DAMAGE_DECREASE} from "../../../../data/amrdozer-effect";

test('通常ヒットの半分のダメージを受ける', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [
        {...EMPTY_CORRECT_POWER, power: 1000}
      ]
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_DAMAGE_DECREASE, decrease: 600}
      ]
    }
  };
  const result = guard(attacker, 3, defender, 3);
  t.deepEqual(result, {
    name: 'Guard',
    damage: 900
  });
});
