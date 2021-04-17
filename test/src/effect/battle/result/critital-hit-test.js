// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {criticalHit} from "../../../../../src/effect/battle/result/critical-hit";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import {EMPTY_CORRECT_POWER, EMPTY_DAMAGE_DECREASE} from "../../../../data/amrdozer-effect";

test('クリティカルヒットのダメージ計算が正しい', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE, power: 2000,
      effects: [
        {...EMPTY_CORRECT_POWER, power: 600}
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
  const result = criticalHit(attacker, 2, defender, 0);
  t.deepEqual(result, {
    name: 'CriticalHit',
    damage: 4800
  });
});
