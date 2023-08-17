import { BatteryLimitBreak, parseBatteryLimitBreak } from "../../../src";

/** 有効なBatteryLimitBreak */
const batteryLimitBreak: BatteryLimitBreak = {
  type: "BatteryLimitBreak",
  recoverBattery: 8,
  maxBattery: 8,
};

test("BatteryLimitBreakはパースできる", () => {
  expect(parseBatteryLimitBreak(batteryLimitBreak)).toEqual(batteryLimitBreak);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryLimitBreak);
  const data = JSON.parse(str);
  expect(parseBatteryLimitBreak(data)).toEqual(batteryLimitBreak);
});

test("BatteryLimitBreak以外はnullを返す", () => {
  const data = {
    type: "LimitBreak",
    recover: 8,
    battery: 8,
  };
  expect(parseBatteryLimitBreak(data)).toBe(null);
});
