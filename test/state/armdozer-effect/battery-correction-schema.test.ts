import { BatteryCorrection, BatteryCorrectionSchema } from "../../../src";

/** 有効な BatteryCorrection */
const batteryCorrection: BatteryCorrection = {
  type: "BatteryCorrection",
  batteryCorrection: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 2,
  },
};

test("BatteryCorrectionはパースできる", () => {
  expect(BatteryCorrectionSchema.parse(batteryCorrection)).toEqual(
    batteryCorrection,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryCorrection);
  const data = JSON.parse(str);
  expect(BatteryCorrectionSchema.parse(data)).toEqual(batteryCorrection);
});

test("BatteryCorrection以外はパースできない", () => {
  const data = {
    type: "BatteryCorrection",
    correction: 1000,
    period: {
      type: "TurnLimit",
      remaining: 2,
    },
  };
  expect(() => BatteryCorrectionSchema.parse(data)).toThrow();
});
