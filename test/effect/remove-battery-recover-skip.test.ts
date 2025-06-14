import { removeBatteryRecoverSkip } from "../../src/effect/remove-battery-recover-skip";
import { BatteryRecoverSkip } from "../../src/state/armdozer-effect/battery-recover-skip";
import { CorrectPower } from "../../src/state/armdozer-effect/correct-power";

/** 効果 ターン開始時バッテリー回復スキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/** 効果 BatteryRecoverSkip以外 */
const other: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("BatteryRecoverSkipだけを取り除く", () => {
  const data = [other, other, batteryRecoverSkip, other];
  expect(removeBatteryRecoverSkip(data)).toEqual([other, other, other]);
});

test("BatteryRecoverSkipがなければそのまま", () => {
  const data = [other, other, other];
  expect(removeBatteryRecoverSkip(data)).toEqual([other, other, other]);
});
