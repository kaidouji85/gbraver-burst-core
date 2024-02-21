import { BuffPowerSkill } from "../../player/pilot/buff-power-skill";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * 攻撃バフスキルを発動する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return 発動後のステート
 */
function invokeBuffPower(
  invoker: PlayerState,
  skill: BuffPowerSkill,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "CorrectPower",
          power: skill.buffPower,
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
 * パイロットスキル 攻撃バフ
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function buffPower(
  params: PilotSkillInvokeParams<BuffPowerSkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: invokeBuffPower(invoker, skill),
    other,
  };
}
