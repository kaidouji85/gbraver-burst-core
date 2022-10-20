// @flow
import { EMPTY_ARMDOZER } from "../../../src/empty/armdozer";
import type { Armdozer } from "../../../src/player/armdozer";
import { createArmdozerState } from "../../../src/state/armdozer-state";

test("追加されたパラメータに正しい値がセットされている", () => {
  const data: Armdozer = {
    ...EMPTY_ARMDOZER,
    hp: 3000,
    battery: 5,
  };
  const result = createArmdozerState(data);
  expect(result).toEqual({
    ...data,
    maxHp: 3000,
    maxBattery: 5,
    enableBurst: true,
    effects: [],
  });
});
