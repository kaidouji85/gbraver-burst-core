import { CorrectPower, parseCorrectPower } from "../../src";

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
  expect(parseCorrectPower(correctPower)).toEqual(correctPower);
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
  expect(parseCorrectPower(data)).toBe(null);
});
