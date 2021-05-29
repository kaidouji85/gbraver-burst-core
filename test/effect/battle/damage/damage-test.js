// @flow

import test from 'ava/index';
import {normalHitDamage} from "../../../../src/effect/battle/damage/damage";
import {EMPTY_ARMDOZER_STATE} from "../../../../src/empty-data/armdozer";
import type {PlayerState} from "../../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../../../src/empty-data/player";
import {EMPTY_CORRECT_POWER} from "../../../../src/empty-data/amrdozer-effect";

test('ダメージ = 攻撃力  + 攻撃力補正 +　バッテリーボーナス', t => {
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
  };
  t.is(normalHitDamage(attacker, 5, defender, 2), 3200);
});

