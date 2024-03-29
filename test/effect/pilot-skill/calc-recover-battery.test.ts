import type { ArmdozerState } from "../../../src";
import { calcRecoverBattery } from "../../../src/effect/pilot-skill/recover-battery";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { RecoverBatterySkill } from "../../../src/player/pilot/recover-battery-skill";

test("バッテリー回復後のバッテリーが正しく計算できる", () => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    maxBattery: 5,
    battery: 1,
  };
  const skill: RecoverBatterySkill = {
    type: "RecoverBatterySkill",
    recoverBattery: 2,
  };
  const result = calcRecoverBattery(armdozer, skill);
  expect(result).toBe(3);
});

test("バッテリー上限以上にはならない", () => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    maxBattery: 5,
    battery: 4,
  };
  const skill: RecoverBatterySkill = {
    type: "RecoverBatterySkill",
    recoverBattery: 2,
  };
  const result = calcRecoverBattery(armdozer, skill);
  expect(result).toBe(5);
});
