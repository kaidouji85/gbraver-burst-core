// @flow

import type {PlayerState} from "../../../../src/state/player-state";
import type {GameState} from "../../../../src/state/game-state";
import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('ターンチェンジが正しくできる', t => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5
    }
  };

  const player2: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5
    }
  };

  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player2, player1],
    activePlayerId: 'player1'
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: 'player2',
    players: [
      {
        ...player2,
        armdozer: {
          ...player2.armdozer,
          battery: 5
        }
      },
      player1
    ],
    effect: {
      name: 'TurnChange'
    }
  };
  t.deepEqual(result, expected);
});
