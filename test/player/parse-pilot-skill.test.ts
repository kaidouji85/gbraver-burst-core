import { parsePilotSkill, PilotSkill } from "../../src";

/** 有効なパイロットスキル */
const pilotSkills: PilotSkill[] = [
  {
    type: "RecoverBatterySkill",
    recoverBattery: 5,
  },
  {
    type: "BuffPowerSkill",
    buffPower: 600,
    duration: 2,
  },
  {
    type: "BatteryEnchantmentSkill",
    batteryEnchantment: 1,
    duration: 2,
  },
  {
    type: "DamageHalvedSkill",
    duration: 1,
  },
  {
    type: "BatteryBoostSkill",
    recoverBattery: 5,
  },
];

test("PilotSkillはパースできる", () => {
  pilotSkills.forEach((skill) => {
    expect(parsePilotSkill(skill)).toEqual(skill);
  });
});

test("PilotSkill以外はnullを返す", () => {
  const data = {
    type: "RecoverBattery",
    recover: 5,
  };
  expect(parsePilotSkill(data)).toBe(null);
});
