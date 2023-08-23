import { BuffPowerSkill, BuffPowerSkillSchema } from "../../../src";

/** 有効なBuffPowerSkill */
const buffPowerSkill: BuffPowerSkill = {
  type: "BuffPowerSkill",
  buffPower: 600,
  duration: 2,
};

test("BuffPowerSkillはパースできる", () => {
  expect(BuffPowerSkillSchema.parse(buffPowerSkill)).toEqual(buffPowerSkill);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(buffPowerSkill);
  const data = JSON.parse(str);
  expect(BuffPowerSkillSchema.parse(data)).toEqual(buffPowerSkill);
});

test("BuffPowerSkill以外はnullを返す", () => {
  const data = {
    type: "BuffPower",
    buff: 600,
    effectDuration: 2,
  };
  expect(() => BuffPowerSkillSchema.parse(data)).toThrow();
});
