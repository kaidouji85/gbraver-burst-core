import { RecoverBatterySkill } from "../../player/pilot/recover-battery-skill";
import { ArmdozerState } from "../../state/armdozer-state";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * 回復後のバッテリーを計算する
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @return 回復後のバッテリー
 */
export function calcRecoverBattery(
  armdozer: ArmdozerState,
  skill: RecoverBatterySkill,
): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}

/**
 * バッテリー回復スキルを発動する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return 発動後のステート
 */
function invokeRecoverBattery(
  invoker: PlayerState,
  skill: RecoverBatterySkill,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: calcRecoverBattery(invoker.armdozer, skill),
    },
  };
}

/**
 * パイロットスキル バッテリー回復を発動する
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function recoverBattery(
  params: PilotSkillInvokeParams<RecoverBatterySkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: invokeRecoverBattery(invoker, skill),
    other,
  };
}
