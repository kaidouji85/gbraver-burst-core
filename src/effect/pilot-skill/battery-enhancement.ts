import { BatteryEnhancementSkill } from "../../player/pilot/battery-enhancement-skill";
import { PlayerState } from "../../state/player-state";
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
  skill: BatteryEnhancementSkill,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    effects: [
      ...invoker.armdozer.effects,
      {
        type: "BatteryCorrection",
        batteryCorrection: skill.batteryEnhancement,
        period: {
          type: "TurnLimit",
          remainingTurn: skill.duration,
        },
      },
      {
        type: "HalveCorrectPower",
        period: {
          type: "TurnLimit",
          remainingTurn: skill.duration,
        },
      },
    ],
  },
});

/**
 * パイロットスキル バッテリー増強
 * @param params パイロットスキル発動情報
 * @returns パイロットスキル発動結果
 */
export function batteryEnhancement(
  params: PilotSkillInvokeParams<BatteryEnhancementSkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: updateInvoker(invoker, skill),
    other,
  };
}
