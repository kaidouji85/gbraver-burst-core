import { PilotSkill } from "../../player/pilot/pilot-skill";
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
  // TODO 条件分岐を作る
  throw new Error("pilotSkill not found");
}
