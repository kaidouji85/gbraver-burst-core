// @flow

import test from 'ava';
import {burstRecoverBattery} from "../../../../src/effect/burst/burst-recover-battery";
import {EMPTY_ARMDOZER_STATE, EMPTY_BURST} from "../../../data/armdozer";
import type {ArmdozerState} from "../../../../src/state/armdozer-state";
import type {Burst} from "../../../../src";

test('現在バッテリー値にバッテリー回復料をプラスした値を返す', t => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 1,
    maxBattery: 5,
  };
  const burst: Burst = {
    ...EMPTY_BURST,
    recoverBattery: 3
  };
  const result = burstRecoverBattery(armdozer, burst);
  t.is(result, 4);
});

test('最大バッテリー以上の値にはならない', t => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 3,
    maxBattery: 5,
  };
  const burst: Burst = {
    ...EMPTY_BURST,
    recoverBattery: 3
  };
  const result = burstRecoverBattery(armdozer, burst);
  t.is(result, 5);
});
