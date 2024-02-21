import { BatteryEnchantmentSkill } from "../../player/pilot/battery-enchantment-skill";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * バッテリー増強スキルを適用する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return スキル発動後のステート
 */
function invokeBatteryEnchantment(
  invoker: PlayerState,
  skill: BatteryEnchantmentSkill,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "BatteryCorrection",
          batteryCorrection: skill.batteryEnchantment,
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
  };
}

/**
 * パイロットスキル バッテリー増強
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function batteryEnchantment(
  params: PilotSkillInvokeParams<BatteryEnchantmentSkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: invokeBatteryEnchantment(invoker, skill),
    other,
  };
}
