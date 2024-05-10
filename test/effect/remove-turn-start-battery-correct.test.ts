import { CorrectPower, TurnStartBatteryCorrect } from "../../src";
import { removeTurnStartBatteryCorrect } from "../../src/effect/remove-turn-start-battery-correct";

/** ターン開始時バッテリー回復量補正  */
const turnStartBatteryCorrect: TurnStartBatteryCorrect = {
  type: "TurnStartBatteryCorrect",
  correctBattery: 1,
  period: {
    type: "SpecialPeriod",
  },
};

/** TurnStartBatteryCorrect以外 */
const other: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("TurnStartBatteryCorrectだけを取り除く", () => {
  const data = [other, other, turnStartBatteryCorrect, other];
  expect(removeTurnStartBatteryCorrect(data)).toEqual([other, other, other]);
});

test("TurnStartBatteryCorrectがなければそのまま", () => {
  const data = [other, other, other];
  expect(removeTurnStartBatteryCorrect(data)).toEqual([other, other, other]);
});
