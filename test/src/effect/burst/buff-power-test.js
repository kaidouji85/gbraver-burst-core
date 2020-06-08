// @flow

import test from 'ava';
import {buffPower} from "../../../../src/effect/burst/buff-power";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {BuffPower} from "../../../../src/player/armdozer/burst";
import type {GameState, PlayerState} from "../../../../src";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('攻撃力バフが正しく適用される', t => {
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
              remainingTurn: 2,
              power: 1000,
            }
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
  t.deepEqual(result, expected);
});