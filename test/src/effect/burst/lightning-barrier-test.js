// @flow

import test from 'ava';
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {lightningBarrier} from "../../../../src/effect/burst/lightning-barrier";
import type {LightningBarrier} from "../../../../src/player/burst";
import type {PlayerState} from "../../../../src/game/state/player-state";
import type {GameState} from "../../../../src";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('電撃バリアバーストの適用が正しくできる', t => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burst',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      enableBurst: true,
      battery: 1,
      maxBattery: 5,
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'other',
  };
  const burst: LightningBarrier = {
    type: 'LightningBarrier',
    damage: 1000,
    duration: 2,
    recoverBattery: 3,
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer],
  };

  const result = lightningBarrier(lastState, burstPlayer.playerId, burst);
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
            ...burstPlayer.armdozer.effects,
            {
              type: 'TryReflect',
              damage: 1000,
              effect: 'Lightning',
              remainingTurn: 2,
            }
          ]
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