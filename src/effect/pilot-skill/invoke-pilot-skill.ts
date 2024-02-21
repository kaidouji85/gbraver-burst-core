import { BatteryBoostSkill } from "../../player/pilot/battery-boost-skill";
import { PilotSkill } from "../../player/pilot/pilot-skill";
import { batteryBoost } from "./battery-boost";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * パイロットスキル種別に応じた効果を適用する
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function invokePilotSkill(
  params: PilotSkillInvokeParams<PilotSkill>,
): PilotSkillInvokeResult {
  if (params.skill.type === "BatteryBoostSkill") {
    const skill: BatteryBoostSkill = params.skill;
    return batteryBoost({ ...params, skill });
  }

  throw new Error("pilotSkill not found");
}
