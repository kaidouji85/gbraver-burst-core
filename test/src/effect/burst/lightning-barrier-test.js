// @flow

import test from 'ava';
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {lightningBarrier} from "../../../../src/effect/burst/lightning-barrier";

test('電撃バリアバーストの適用が正しくできる', t => {
  const burstPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burst',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      enableBurst: true,
      battery: 1,
      maxBattery: 5,
      burst: {
        type: 'LightningBarrier',
        damage: 1000,
        duration: 2,
        recoverBattery: 3,
      }
    }
  };
  const otherPlayer = {
    EMPTY_PLAYER_STATE,
    playerId: 'other',
  };
  const result = lightningBarrier(burstPlayer, otherPlayer);
  const expected = [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        enableBurst: false,
        battery: 4,
        effects: [
          ...burstPlayer.armdozer.effects,
          {
            type: 'BodyStriking',
            damage: 1000,
            appearance: 'Lightning',
            remainingTurn: 2,
          }
        ]
      }
    },
    otherPlayer
  ];
  t.deepEqual(result, expected);
});