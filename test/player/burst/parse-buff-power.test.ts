import { BuffPower, parseBuffPower } from "../../../src";

test("BuffPowerはパースできる", () => {
  const data: BuffPower = {
    type: "BuffPower",
    buffPower: 1000,
    duration: 3,
    recoverBattery: 3,
  };
  expect(parseBuffPower(data)).toEqual(data);
});

test("BuffPower以外はnullを返す", () => {
  const data = {
    type: "Buff",
    power: 1000,
    effectDuration: 3,
    battery: 3,
  };
  expect(parseBuffPower(data)).toBe(null);
});
