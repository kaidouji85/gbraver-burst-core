import { PilotSkillEffect } from "../../../src/effect/pilot-skill/pilot-skill-effect";

/** 有効なPilotSkillEffect */
export const validPilotSkillEffect: PilotSkillEffect = {
  name: "PilotSkillEffect",
  invokerId: "player1",
  skill: {
    type: "BatteryBoostSkill",
    recoverBattery: 5,
  },
};
