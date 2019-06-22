// @flow

import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {GameState} from "../../../../src/game-state/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";


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
    players: [player1, player2],
    activePlayerId: 'player1',
    effect: {name: 'StartGame'}
  };

  const result = turnChange(lastState);
  t.deepEqual(result, {
    ...lastState,
    activePlayerId: 'player2',
    players: [
      player1,
      {
        ...player2,
        armdozer: {
          ...player2.armdozer,
          battery: 5
        }
      }
    ],
    effect: {name: 'TurnChange'}
  });
});
