import { DamageHalvedSkill, parseDamageHalvedSkill } from "../../../src";

test("DamageHalvedSkillはパースできる", () => {
  const data: DamageHalvedSkill = {
    type: "DamageHalvedSkill",
    duration: 1,
  };
  expect(parseDamageHalvedSkill(data)).toEqual(data);
});

test("DamageHalvedSkill以外はnullを返す", () => {
  const data = {
    type: "DamageHalved",
    effectDuration: 1,
  };
  expect(parseDamageHalvedSkill(data)).toBe(null);
});
