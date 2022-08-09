// @flow

import type {GameState, PlayerState} from "../../../src";
import {buffPower} from "../../../src/effect/burst/buff-power";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {BuffPower} from "../../../src/player/burst";

test('攻撃力バフが正しく適用される', () => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 1,
      maxBattery: 5,
      effects: [],
      enableBurst: true,
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
  const burst: BuffPower = {
    type: 'BuffPower',
    recoverBattery: 3,
    buffPower: 1000,
    duration: 2
  };

  const result = buffPower(lastState, burstPlayer.playerId, burst);
  const expected: GameState = {
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
              type: 'CorrectPower',
              power: 1000,
              period: {
                type: 'TurnLimit',
                remainingTurn: 2,
              }
            },
          ],
        }
      }
    ],
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: burst,
    }
  };
  expect(result).toEqual(expected);
});