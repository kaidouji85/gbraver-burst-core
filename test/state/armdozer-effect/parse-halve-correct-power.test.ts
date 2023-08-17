import {
  HalveCorrectPower,
  parseHalveCorrectPower,
} from "../../../src/state/armdozer-effect/halve-correct-power";

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

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(halveCorrectPower);
  const data = JSON.parse(str);
  expect(parseHalveCorrectPower(data)).toEqual(halveCorrectPower);
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
