import { BatteryBoostSkill, BatteryBoostSkillSchema } from "../../../src";

/** 有効なBatteryBoostSkill */
const batteryBoostSkill: BatteryBoostSkill = {
  type: "BatteryBoostSkill",
  recoverBattery: 5,
};

test("BatteryBoostSkillはパースできる", () => {
  expect(BatteryBoostSkillSchema.parse(batteryBoostSkill)).toEqual(
    batteryBoostSkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryBoostSkill);
  const data = JSON.parse(str);
  expect(BatteryBoostSkillSchema.parse(data)).toEqual(batteryBoostSkill);
});

test("BatteryBoostSkill以外はnullを返す", () => {
  const data = {
    type: "BatteryBoost",
    recover: 5,
  };
  expect(() => BatteryBoostSkillSchema.parse(data)).toThrow();
});
