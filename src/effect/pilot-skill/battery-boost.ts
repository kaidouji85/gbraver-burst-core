import { BatteryBoostSkill } from "../../player/pilot/battery-boost-skill";
import { ArmdozerState } from "../../state/armdozer-state";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * ブースト後のバッテリーを計算する
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @return 回復後のバッテリー
 */
export function calcBoostedBattery(
  armdozer: ArmdozerState,
  skill: BatteryBoostSkill,
): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}

/**
 * バッテリーブーストをプレイヤーに適用する
 * @param invoker 適用対象のプレイヤー
 * @param skill スキル内容
 * @return 適用後のステート
 */
function updateInvoker(
  invoker: PlayerState,
  skill: BatteryBoostSkill,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: calcBoostedBattery(invoker.armdozer, skill),
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "BatteryRecoverSkip",
          period: {
            type: "SpecialPeriod",
          },
        },
      ],
    },
  };
}

/**
 * パイロットスキル バッテリーブースト
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function batteryBoost(
  params: PilotSkillInvokeParams<BatteryBoostSkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: updateInvoker(invoker, skill),
    other,
  };
}
