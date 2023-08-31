import { PilotSkillEffect } from "../../../src";

/** 有効なPilotSkillEffect */
export const validPilotSkillEffect: PilotSkillEffect = {
  name: "PilotSkillEffect",
  invokerId: "player1",
  skill: {
    type: "BatteryBoostSkill",
    recoverBattery: 5,
  },
};