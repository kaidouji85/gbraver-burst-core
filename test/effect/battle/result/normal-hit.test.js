// @flow

import {normalHit} from "../../../../src/effect/battle/result/normal-hit";
import {EMPTY_CORRECT_POWER, EMPTY_DAMAGE_DECREASE} from "../../../../src/empty/amrdozer-effect";
import {EMPTY_ARMDOZER_STATE} from "../../../../src/empty/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../../src/empty/player";
import type {PlayerState} from "../../../../src/state/player-state";

test('通常ヒットのダメージ計算が正しい', () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
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
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_DAMAGE_DECREASE, decrease: 600}
      ]
    }
  };
  const result = normalHit(attacker, 5, defender, 2);
  expect(result).toEqual({
    name: 'NormalHit',
    damage: 2600
  });
});
