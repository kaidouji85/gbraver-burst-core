// @flow

import type {GameState} from "../../../../src/state/game-state";
import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('ターン交代が正しく処理できる', t => {
  const attacker = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: []
    }
  };
  const defender = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: []
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: defender.playerId,
    players: [
      {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          battery: 5
        }
      },
      attacker
    ],
    effect: {
      name: 'TurnChange',
      recoverBattery: 3
    }
  };
  t.deepEqual(result, expected);
});