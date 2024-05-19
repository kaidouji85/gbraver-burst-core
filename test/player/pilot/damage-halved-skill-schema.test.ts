import { DamageHalvedSkill, DamageHalvedSkillSchema } from "../../../src";

/** 有効なDamageHalvedSkill */
const damageHalvedSkill: DamageHalvedSkill = {
  type: "DamageHalvedSkill",
  duration: 1,
};

test("DamageHalvedSkillはパースできる", () => {
  expect(DamageHalvedSkillSchema.parse(damageHalvedSkill)).toEqual(
    damageHalvedSkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(damageHalvedSkill);
  const data = JSON.parse(str);
  expect(DamageHalvedSkillSchema.parse(data)).toEqual(damageHalvedSkill);
});

test("DamageHalvedSkill以外は例外を投げる", () => {
  const data = {
    type: "DamageHalved",
    effectDuration: 1,
  };
  expect(() => DamageHalvedSkillSchema.parse(data)).toThrow();
});
