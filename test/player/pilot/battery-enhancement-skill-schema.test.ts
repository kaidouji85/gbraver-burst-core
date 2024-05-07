import {
  BatteryEnhancementSkill,
  BatteryEnhancementSkillSchema,
} from "../../../src";

/** 有効なBatteryEnhancementSkill */
const batteryEnhancementSkill: BatteryEnhancementSkill = {
  type: "BatteryEnhancementSkill",
  batteryEnhancement: 1,
  duration: 2,
};

test("BatteryEnhancementSkillはパースできる", () => {
  expect(BatteryEnhancementSkillSchema.parse(batteryEnhancementSkill)).toEqual(
    batteryEnhancementSkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryEnhancementSkill);
  const data = JSON.parse(str);
  expect(BatteryEnhancementSkillSchema.parse(data)).toEqual(
    batteryEnhancementSkill,
  );
});

test("BatteryEnhancementSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryEnhancement",
    enhancement: 1,
    effectDuration: 2,
  };
  expect(() => BatteryEnhancementSkillSchema.parse(data)).toThrow();
});
