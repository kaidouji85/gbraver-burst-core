// @flow

import test from "ava";
import type {ContinuousActivePlayer, GameState, PlayerState} from "../../../src";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {continuousActive} from "../../../src/effect/continuous-active";

const CONTINUOUS_ACTIVE: ContinuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  remainingTurn: Infinity,
};

test('アクティブ継続が正しく処理できる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: [CONTINUOUS_ACTIVE]
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: [CONTINUOUS_ACTIVE]
    }
  }
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = continuousActive(lastState);
  const expected = {
    ...lastState,
    activePlayerId: attacker.playerId,
    players: [
      defender,
      {
        ...attacker,
        armdozer: {
          ...attacker.armdozer,
          effects: []
        }
      }
    ],
    effect: {
      name: 'TurnChange',
      recoverBattery: 0
    }
  };
  t.deepEqual(result, expected);
});