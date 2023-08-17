import {
  BatteryEnchantmentSkill,
  parseBatteryEnchantmentSkill,
} from "../../../src";

/** 有効なBatteryEnchantmentSkill */
const batteryEnchantmentSkill: BatteryEnchantmentSkill = {
  type: "BatteryEnchantmentSkill",
  batteryEnchantment: 1,
  duration: 2,
};

test("BatteryEnchantmentSkillはパースできる", () => {
  expect(parseBatteryEnchantmentSkill(batteryEnchantmentSkill)).toEqual(batteryEnchantmentSkill);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryEnchantmentSkill);
  const data = JSON.parse(str);
  expect(parseBatteryEnchantmentSkill(data)).toEqual(batteryEnchantmentSkill);
});

test("BatteryEnchantmentSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryEnchantment",
    enchantment: 1,
    effectDuration: 2,
  };
  expect(parseBatteryEnchantmentSkill(data)).toBe(null);
});
