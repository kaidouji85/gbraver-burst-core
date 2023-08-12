import {BatteryRecoverSkip, parseBatteryRecoverSkip} from "../../src";

/** 有効なBatteryRecoverSkip */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  }
};

test("BatteryRecoverSkipはパースできる", () => {
  expect(parseBatteryRecoverSkip(batteryRecoverSkip)).toEqual(batteryRecoverSkip);
});

test("BatteryRecoverSkip以外はパースできない", () => {
  const data = {
    type: "recoverSkip",
    period: {
      type: "Special",
    }
  }
  expect(parseBatteryRecoverSkip(data)).toBeNull();
});
