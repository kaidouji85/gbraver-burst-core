import { DamageHalvedSkill, parseDamageHalvedSkill } from "../../../src";

/** 有効なDamageHalvedSkill */
const damageHalvedSkill: DamageHalvedSkill = {
  type: "DamageHalvedSkill",
  duration: 1,
};

test("DamageHalvedSkillはパースできる", () => {
  expect(parseDamageHalvedSkill(damageHalvedSkill)).toEqual(damageHalvedSkill);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(damageHalvedSkill);
  const data = JSON.parse(str);
  expect(parseDamageHalvedSkill(data)).toEqual(damageHalvedSkill);
});

test("DamageHalvedSkill以外はnullを返す", () => {
  const data = {
    type: "DamageHalved",
    effectDuration: 1,
  };
  expect(parseDamageHalvedSkill(data)).toBe(null);
});
