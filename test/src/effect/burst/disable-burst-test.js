// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {disableBurst} from "../../../../src/effect/burst";

test('バーストしたプレイヤーはバースト利用不可になる', t => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      enableBurst: true
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer',
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer]
  };

  const result = disableBurst(lastState, burstPlayer.playerId);
  const expected = {
    ...lastState,
    players: [
      otherPlayer,
      {
        ...burstPlayer,
        armdozer: {
          ...burstPlayer.armdozer,
          enableBurst: false
        }
      }
    ]
  };
  t.deepEqual(result, expected);
});