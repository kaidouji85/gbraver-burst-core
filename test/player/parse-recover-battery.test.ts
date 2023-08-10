import { parseRecoverBattery, RecoverBattery } from "../../src";

test("RecoverBatteryはパースできる", () => {
  const data: RecoverBattery = {
    type: "RecoverBattery",
    recoverBattery: 5,
  };
  expect(parseRecoverBattery(data)).toEqual(data);
});

test("RecoverBattery以外はnullを返す", () => {
  const data = {
    type: "Battery",
    recover: 5,
  };
  expect(parseRecoverBattery(data)).toEqual(null);
});
