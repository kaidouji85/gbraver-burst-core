import { BuffPowerSkill, parseBuffPowerSkill } from "../../../src";

test("BuffPowerSkillはパースできる", () => {
  const data: BuffPowerSkill = {
    type: "BuffPowerSkill",
    buffPower: 600,
    duration: 2,
  };
  expect(parseBuffPowerSkill(data)).toEqual(data);
});

test("BuffPowerSkill以外はnullを返す", () => {
  const data = {
    type: "BuffPower",
    buff: 600,
    effectDuration: 2,
  };
  expect(parseBuffPowerSkill(data)).toBe(null);
});
