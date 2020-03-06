// @flow

import test from 'ava';
import {buffPower} from "../../../../src/effect/burst/buff-power";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {BuffPower} from "../../../../src/player/armdozer/burst";
import type {PlayerStateX} from '../../../../src/state/player-state';

test('攻撃力バフが正しく適用される', t => {
  const burstPlayer: PlayerStateX<BuffPower> = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 1,
      maxBattery: 5,
      effects: [],
      enableBurst: true,
      burst: {
        type: 'BuffPower',
        recoverBattery: 3,
        buffPower: 1000,
        duration: 2
      }
    }
  };
  const otherPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer',
  };

  const result = buffPower(burstPlayer, otherPlayer);
  t.deepEqual(result, [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: 4,
        enableBurst: false,
        effects: [
          {
            type: 'CorrectPower',
            remainingTurn: 2,
            power: 1000,
          }
        ],

      }
    },
    otherPlayer
  ]);
});