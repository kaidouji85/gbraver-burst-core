import {
  HalveCorrectPower,
  parseHalveCorrectPower,
} from "../../src/state/armdozer-effect";

/** 有効なHalveCorrectPower */
const halveCorrectPower: HalveCorrectPower = {
  type: "HalveCorrectPower",
  period: {
    type: "TurnLimit",
    remainingTurn: 2,
  },
};

test("HalveCorrectPowerはパースできる", () => {
  expect(parseHalveCorrectPower(halveCorrectPower)).toEqual(halveCorrectPower);
});

test("HalveCorrectPower以外はパースできない", () => {
  const data = {
    type: "HalvePower",
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(parseHalveCorrectPower(data)).toBe(null);
});
