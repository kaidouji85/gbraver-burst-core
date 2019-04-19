// @flow

import test from 'ava';
import type {ArmdozerState} from "../../../../src/game-state/armdozer-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/empty-armdozer";
import {doRecoverBattery} from "../../../../src/effect/burst/do-recover-battery";

test('バースト効果 バッテリー回復が正しく適用される', t => {
  const burstPlayer: ArmdozerState  = {
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
  const otherPlayer: ArmdozerState = {
    playerId: 'player02',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE
    },
  };

  const result = doRecoverBattery(burstPlayer, otherPlayer);
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
