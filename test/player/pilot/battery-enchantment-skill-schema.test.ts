import {
  BatteryEnchantmentSkill,
  BatteryEnchantmentSkillSchema,
} from "../../../src";

/** 有効なBatteryEnchantmentSkill */
const batteryEnchantmentSkill: BatteryEnchantmentSkill = {
  type: "BatteryEnchantmentSkill",
  batteryEnchantment: 1,
  duration: 2,
};

test("BatteryEnchantmentSkillはパースできる", () => {
  expect(BatteryEnchantmentSkillSchema.parse(batteryEnchantmentSkill)).toEqual(
    batteryEnchantmentSkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryEnchantmentSkill);
  const data = JSON.parse(str);
  expect(BatteryEnchantmentSkillSchema.parse(data)).toEqual(batteryEnchantmentSkill);
});

test("BatteryEnchantmentSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryEnchantment",
    enchantment: 1,
    effectDuration: 2,
  };
  expect(() => BatteryEnchantmentSkillSchema.parse(data)).toThrow();
});
