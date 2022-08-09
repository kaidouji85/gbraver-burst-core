// @flow

import {burst} from "../../../src/effect/burst";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {GameState} from "../../../src/state/game-state";
import type {PlayerState} from "../../../src/state/player-state";

test('バースト効果適用処理が正しく実行されている', () => {
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
  expect(result).toEqual({
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
