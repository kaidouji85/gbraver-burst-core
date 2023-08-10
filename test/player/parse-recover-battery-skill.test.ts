import { parseRecoverBatterySkill, RecoverBatterySkill } from "../../src";

test("RecoverBatterySkillはパースできる", () => {
  const data: RecoverBatterySkill = {
    type: "RecoverBatterySkill",
    recoverBattery: 5,
  };
  expect(parseRecoverBatterySkill(data)).toEqual(data);
});

test("RecoverBatterySkill以外はnullを返す", () => {
  const data = {
    type: "RecoverBattery",
    recover: 5,
  };
  expect(parseRecoverBatterySkill(data)).toBe(null);
});
