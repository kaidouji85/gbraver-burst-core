// @flow

import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER, EMPTY_ARMDOZER_STATE} from "../../../data/empty-armdozer";
import {createArmdozerState} from "../../../../src/game-state/armdozer-state";
import type {GameState} from "../../../../src/game-state/game-state";
import {inspect} from 'util';

const PLAYER1: PlayerState = {
  playerId: 'player1',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5
  }
};

const PLAYER2: PlayerState = {
  playerId: 'player2',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5
  }
};

const LAST_STATE: GameState = {
  players: [PLAYER1, PLAYER2],
  activePlayerId: 'player1',
  effect: {name: 'StartGame'}
};

test('ターンチェンジが正しくできる', t => {
  const result = turnChange(LAST_STATE);
  const expected = {
    ...LAST_STATE,
    activePlayerId: 'player2',
    players: [
      PLAYER1,
      {
        ...PLAYER2,
        armdozer: {
          ...PLAYER2.armdozer,
          battery: 5
        }
      }
    ],
    effect: {name: 'TurnChange'}
  };
  t.deepEqual(result, expected);
});