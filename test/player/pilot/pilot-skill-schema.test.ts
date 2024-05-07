import { PilotSkill, PilotSkillSchema } from "../../../src";

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
    type: "BatteryEnhancementSkill",
    batteryEnhancement: 1,
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
    expect(PilotSkillSchema.parse(skill)).toEqual(skill);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  pilotSkills.forEach((skill) => {
    const str = JSON.stringify(skill);
    const data = JSON.parse(str);
    expect(PilotSkillSchema.parse(data)).toEqual(skill);
  });
});

test("PilotSkill以外はnullを返す", () => {
  const data = {
    type: "RecoverBattery",
    recover: 5,
  };
  expect(() => PilotSkillSchema.parse(data)).toThrow();
});
