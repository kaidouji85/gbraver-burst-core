// @flow

import test from 'ava';
import {getBurstRecoverBattery} from "../../../../src/effect/burst/get-burst-recover-battery";
import {EMPTY_ARMDOZER_STATE, EMPTY_BURST} from "../../../data/armdozer";
import type {ArmdozerState} from "../../../../src/game-state/armdozer/armdozer-state";

test('現在バッテリー値にバッテリー回復料をプラスした値を返す', t => {
  const data: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 1,
    maxBattery: 5,
    burst: {
      ...EMPTY_BURST,
      recoverBattery: 3
    }
  };
  const result = getBurstRecoverBattery(data);
  t.is(result, 4);
});

test('最大バッテリー以上の値にはならない', t => {
  const data: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 3,
    maxBattery: 5,
    burst: {
      ...EMPTY_BURST,
      recoverBattery: 3
    }
  };
  const result = getBurstRecoverBattery(data);
  t.is(result, 5);
});
