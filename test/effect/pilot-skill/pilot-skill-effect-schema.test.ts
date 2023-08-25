import { PilotSkillEffect, PilotSkillEffectSchema } from "../../../src";

/** 有効なPilotSkillEffect */
const pilotSkillEffect: PilotSkillEffect = {
  name: "PilotSkillEffect",
  invokerId: "player1",
  skill: {
    type: "BatteryBoostSkill",
    recoverBattery: 5
  }
};

test("PilotSkillEffectはパースできる", () => {
  expect(PilotSkillEffectSchema.parse(pilotSkillEffect)).toEqual(pilotSkillEffect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる",() => {
  const str = JSON.stringify(pilotSkillEffect);
  const data = JSON.parse(str);
  expect(PilotSkillEffectSchema.parse(data)).toEqual(pilotSkillEffect);
});

test("PilotSkillEffect以外はパースできない", () => {
  const data = {
    name: "PilotSkillEffect",
    invokerId: "player1",
    skill: {
      name: "BatteryBoostSkill",
      battery: 5
    }
  };
  expect(() => PilotSkillEffectSchema.parse(data)).toThrow();
});
