import { RecoverBatterySkill } from "../../player/pilot/recover-battery-skill";
import { PlayerState } from "../../state/player-state";
import { getRecoverBattery } from "../get-recover-battery";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * パイロットスキル発動者のステートを更新する
 * @param invoker パイロットスキル発動者のステート
 * @param skill パイロットスキル情報
 * @returns パイロットスキル発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  skill: RecoverBatterySkill,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: getRecoverBattery(invoker, skill.recoverBattery),
  },
});

/**
 * パイロットスキル バッテリー回復を発動する
 * @param params パイロットスキル発動情報
 * @returns パイロットスキル発動結果
 */
export function recoverBattery(
  params: PilotSkillInvokeParams<RecoverBatterySkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: updateInvoker(invoker, skill),
    other,
  };
}
