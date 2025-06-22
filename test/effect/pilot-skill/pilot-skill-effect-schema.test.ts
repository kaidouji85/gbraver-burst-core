import { PilotSkillEffectSchema } from "../../../src/effect/pilot-skill/pilot-skill-effect";
import { validPilotSkillEffect } from "./valid-pilot-skill-effect";

test("PilotSkillEffectはパースできる", () => {
  expect(PilotSkillEffectSchema.parse(validPilotSkillEffect)).toEqual(
    validPilotSkillEffect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validPilotSkillEffect);
  const data = JSON.parse(str);
  expect(PilotSkillEffectSchema.parse(data)).toEqual(validPilotSkillEffect);
});

test("PilotSkillEffect以外はパースできない", () => {
  const data = {
    name: "PilotSkillEffect",
    invokerId: "player1",
    skill: {
      name: "BatteryBoostSkill",
      battery: 5,
    },
  };
  expect(() => PilotSkillEffectSchema.parse(data)).toThrow();
});
