import {
  CorrectPower,
  CorrectPowerSchema,
} from "../../../src/state/armdozer-effect/correct-power";

/** 有効なCorrectPower */
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 2,
  },
};

test("CorrectPowerはパースできる", () => {
  expect(CorrectPowerSchema.parse(correctPower)).toEqual(correctPower);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(correctPower);
  const data = JSON.parse(str);
  expect(CorrectPowerSchema.parse(data)).toEqual(correctPower);
});

test("CorrectPower以外はパースできない", () => {
  const data = {
    type: "CorrectPower",
    powerUp: 1000,
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => CorrectPowerSchema.parse(data)).toThrow();
});
