import {
  BatteryLimitBreak,
  BatteryLimitBreakSchema,
} from "../../../src/player/burst/battery-limit-break";

/** 有効なBatteryLimitBreak */
const batteryLimitBreak: BatteryLimitBreak = {
  type: "BatteryLimitBreak",
  recoverBattery: 8,
  maxBattery: 8,
};

test("BatteryLimitBreakはパースできる", () => {
  expect(BatteryLimitBreakSchema.parse(batteryLimitBreak)).toEqual(
    batteryLimitBreak,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryLimitBreak);
  const data = JSON.parse(str);
  expect(BatteryLimitBreakSchema.parse(data)).toEqual(batteryLimitBreak);
});

test("BatteryLimitBreak以外は例外を投げる", () => {
  const data = {
    type: "LimitBreak",
    recover: 8,
    battery: 8,
  };
  expect(() => BatteryLimitBreakSchema.parse(data)).toThrow();
});
