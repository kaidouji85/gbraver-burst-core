import { BatteryCorrection, parseBatteryCorrection } from "../../../src";

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
  expect(parseBatteryCorrection(batteryCorrection)).toEqual(batteryCorrection);
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
  expect(parseBatteryCorrection(data)).toBeNull();
});
