// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty-data/player";
import {EMPTY_GAME_STATE} from "../../../src/empty-data/game-state";
import type {ContinuousAttack} from "../../../src/player/burst";
import {continuousAttack} from "../../../src/effect/burst/continuous-attack";

test('連続攻撃バーストが正しく適用できる', t => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      battery: 1,
      maxBattery: 5,
      effects: []
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer'
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer]
  };
  const burst: ContinuousAttack = {
    type: 'ContinuousAttack',
    recoverBattery: 3,
  };

  const result = continuousAttack(lastState, burstPlayer.playerId, burst);
  const expected = {
    ...lastState,
    players: [
      otherPlayer,
      {
        ...burstPlayer,
        armdozer: {
          ...burstPlayer.armdozer,
          battery: 4,
          effects: [
            {
              type: 'ContinuousActivePlayer',
              remainingTurn: Infinity
            }
          ]
        }
      },
    ],
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: burst
    }
  };
  t.deepEqual(result, expected);
});