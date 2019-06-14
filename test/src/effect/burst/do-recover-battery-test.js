// @flow

import test from 'ava';
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {recoverBattery} from "../../../../src/effect/burst/recover-battery";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";

test('バースト効果バッテリー回復が正しく適用される', t => {
  const burstPlayer  = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player01',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 0,
      maxBattery: 5,
      enableBurst: true,
      burst: {
        type: 'RecoverBattery',
        recoverBattery: 5,
      }
    },
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player02',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE
    },
  };

  const result = recoverBattery(burstPlayer, otherPlayer);
  t.deepEqual(result, [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: 5,
        enableBurst: false
      }
    },
    otherPlayer,
  ]);
});

