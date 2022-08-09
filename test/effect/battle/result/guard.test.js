// @flow

import {guard} from "../../../../src/effect/battle/result/guard";
import {EMPTY_CORRECT_POWER, EMPTY_DAMAGE_DECREASE} from "../../../../src/empty/amrdozer-effect";
import {EMPTY_ARMDOZER_STATE} from "../../../../src/empty/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../../src/empty/player";
import type {PlayerState} from "../../../../src/state/player-state";

test('通常ヒットの半分のダメージを受ける', () => {
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
  expect(result).toEqual({
    name: 'Guard',
    damage: 900
  });
});
