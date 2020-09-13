// @flow

import test from 'ava';
import type {Burst, GameState, PlayerId, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {disableBurst} from "../../../../src/effect/burst";
import {EMPTY_BURST} from "../../../data/armdozer";

test('バーストしたプレイヤーはバースト利用不可になる', t => {
  const burstPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      enableBurst: true
    }
  };
  const otherPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer',
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer],
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: EMPTY_BURST,
    }
  };

  const result = disableBurst(lastState);
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