// @flow

import test from 'ava';
import type {GameState} from "../../../src/state/game-state";
import type {PlayerState} from "../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty-data/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../src/empty-data/player";
import {EMPTY_GAME_STATE} from "../../../src/empty-data/game-state";
import {burst} from "../../../src/effect/burst";

test('バースト効果適用処理が正しく実行されている', t => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 0,
      maxBattery: 5,
      enableBurst: true,
      burst: {
        type: 'RecoverBattery',
        recoverBattery: 5
      }
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer',
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer],
  };

  const result = burst(lastState, 'burstPlayer');
  t.deepEqual(result, {
    ...lastState,
    players: [
      otherPlayer,
      {
        ...burstPlayer,
        armdozer: {
          ...burstPlayer.armdozer,
          battery: 5,
          enableBurst: false
        }
      }
    ],
    effect: {
      name: 'BurstEffect',
      burstPlayer: 'burstPlayer',
      burst: burstPlayer.armdozer.burst
    }
  });
});
