import { BatteryBoostSkill } from "../../player/pilot/battery-boost-skill";
import { ArmdozerState } from "../../state/armdozer-state";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * ブースト後のバッテリーを計算する
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @returns 回復後のバッテリー
 */
export function calcBoostedBattery(
  armdozer: ArmdozerState,
  skill: BatteryBoostSkill,
): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}

/**
 * パイロットスキル発動者のステートを更新する
 * @param invoker パイロットスキル発動者のステート
 * @param skill パイロットスキル情報
 * @returns パイロットスキル発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  skill: BatteryBoostSkill,
): PlayerState => ({
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
});

/**
 * パイロットスキル バッテリーブースト
 * @param params パイロットスキル発動情報
 * @returns パイロットスキル発動結果
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
