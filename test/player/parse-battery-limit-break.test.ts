import { BatteryLimitBreak, parseBatteryLimitBreak } from "../../src";

test("BatteryLimitBreakはパースできる", () => {
  const data: BatteryLimitBreak = {
    type: "BatteryLimitBreak",
    recoverBattery: 8,
    maxBattery: 8,
  };
  expect(parseBatteryLimitBreak(data)).toEqual(data);
});

test("BatteryLimitBreak以外はnullを返す", () => {
  const data = {
    type: "LimitBreak",
    recover: 8,
    battery: 8,
  };
  expect(parseBatteryLimitBreak(data)).toBe(null);
});
