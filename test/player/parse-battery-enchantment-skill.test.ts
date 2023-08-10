import {
  BatteryEnchantmentSkill,
  parseBatteryEnchantmentSkill,
} from "../../src";

test("BatteryEnchantmentSkillはパースできる", () => {
  const data: BatteryEnchantmentSkill = {
    type: "BatteryEnchantmentSkill",
    batteryEnchantment: 1,
    duration: 2,
  };
  expect(parseBatteryEnchantmentSkill(data)).toEqual(data);
});

test("BatteryEnchantmentSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryEnchantment",
    enchantment: 1,
    effectDuration: 2,
  };
  expect(parseBatteryEnchantmentSkill(data)).toEqual(data);
});
