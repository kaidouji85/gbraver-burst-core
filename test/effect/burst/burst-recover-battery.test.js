// @flow

import type { Burst } from "../../../src";
import { burstRecoverBattery } from "../../../src/effect/burst/burst-recover-battery";
import { EMPTY_ARMDOZER_STATE, EMPTY_BURST } from "../../../src/empty/armdozer";
import type { ArmdozerState } from "../../../src/state/armdozer-state";

test("現在バッテリー値にバッテリー回復料をプラスした値を返す", () => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 1,
    maxBattery: 5,
  };
  const burst: Burst = {
    ...EMPTY_BURST,
    recoverBattery: 3,
  };
  const result = burstRecoverBattery(armdozer, burst);
  expect(result).toBe(4);
});

test("最大バッテリー以上の値にはならない", () => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    battery: 3,
    maxBattery: 5,
  };
  const burst: Burst = {
    ...EMPTY_BURST,
    recoverBattery: 3,
  };
  const result = burstRecoverBattery(armdozer, burst);
  expect(result).toBe(5);
});
