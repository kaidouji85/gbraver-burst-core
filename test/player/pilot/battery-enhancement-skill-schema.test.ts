import {
  BatteryEnhancementSkill,
  BatteryEnhancementSkillSchema,
} from "../../../src/player/pilot/battery-enhancement-skill";

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

test("BatteryEnhancementSkill以外は例外を投げる", () => {
  const data = {
    type: "BatteryEnhancement",
    enhancement: 1,
    effectDuration: 2,
  };
  expect(() => BatteryEnhancementSkillSchema.parse(data)).toThrow();
});
