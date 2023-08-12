import {
  BurstRecoverBattery,
  parseBurstRecoverBattery,
} from "../../src/player/burst/burst";

test("BurstRecoverBatteryはパースできる", () => {
  const data: BurstRecoverBattery = {
    recoverBattery: 3,
  };
  expect(parseBurstRecoverBattery(data)).toEqual(data);
});

test("BurstRecoverBattery以外はnullを返す", () => {
  const data = {
    recover: 3,
  };
  expect(parseBurstRecoverBattery(data)).toEqual(null);
});
