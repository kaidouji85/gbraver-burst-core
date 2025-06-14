import {
  HalveCorrectPower,
  HalveCorrectPowerSchema,
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
  expect(HalveCorrectPowerSchema.parse(halveCorrectPower)).toEqual(
    halveCorrectPower,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(halveCorrectPower);
  const data = JSON.parse(str);
  expect(HalveCorrectPowerSchema.parse(data)).toEqual(halveCorrectPower);
});

test("HalveCorrectPower以外はパースできない", () => {
  const data = {
    type: "HalvePower",
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => HalveCorrectPowerSchema.parse(data)).toThrow();
});
