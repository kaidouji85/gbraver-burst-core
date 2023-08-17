import { BatteryRecoverSkip, parseBatteryRecoverSkip } from "../../../src";

/** 有効なBatteryRecoverSkip */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

test("BatteryRecoverSkipはパースできる", () => {
  expect(parseBatteryRecoverSkip(batteryRecoverSkip)).toEqual(
    batteryRecoverSkip,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryRecoverSkip);
  const data = JSON.parse(str);
  expect(parseBatteryRecoverSkip(data)).toEqual(batteryRecoverSkip);
});

test("BatteryRecoverSkip以外はパースできない", () => {
  const data = {
    type: "recoverSkip",
    period: {
      type: "Special",
    },
  };
  expect(parseBatteryRecoverSkip(data)).toBeNull();
});
