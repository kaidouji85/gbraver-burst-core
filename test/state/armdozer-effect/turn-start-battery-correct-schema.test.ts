import {
  TurnStartBatteryCorrect,
  TurnStartBatteryCorrectSchema,
} from "../../../src/state/armdozer-effect/turn-start-battery-correction";

/** 有効なTurnStartBatteryCorrect */
const turnStartBatteryCorrect: TurnStartBatteryCorrect = {
  type: "TurnStartBatteryCorrect",
  correctBattery: 1,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("TurnStartBatteryCorrectはパースできる", () => {
  expect(TurnStartBatteryCorrectSchema.parse(turnStartBatteryCorrect)).toEqual(
    turnStartBatteryCorrect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(turnStartBatteryCorrect);
  const data = JSON.parse(str);
  expect(TurnStartBatteryCorrectSchema.parse(data)).toEqual(
    turnStartBatteryCorrect,
  );
});

test("TurnStartBatteryCorrect以外はパースできない", () => {
  const data = {
    type: "TurnStartBattery",
    correct: 1,
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => TurnStartBatteryCorrectSchema.parse(data)).toThrow();
});
