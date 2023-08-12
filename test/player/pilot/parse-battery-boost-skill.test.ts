import { BatteryBoostSkill, parseBatteryBoostSkill } from "../../../src";

test("BatteryBoostSkillはパースできる", () => {
  const data: BatteryBoostSkill = {
    type: "BatteryBoostSkill",
    recoverBattery: 5,
  };
  expect(parseBatteryBoostSkill(data)).toEqual(data);
});

test("BatteryBoostSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryBoost",
    recover: 5,
  };
  expect(parseBatteryBoostSkill(data)).toBe(null);
});
