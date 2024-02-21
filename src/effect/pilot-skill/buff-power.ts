import { BuffPowerSkill } from "../../player/pilot/buff-power-skill";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * パイロットスキル発動者のステートを更新する
 * @param invoker パイロットスキル発動者のステート
 * @param skill パイロットスキル情報
 * @return パイロットスキル発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  skill: BuffPowerSkill,
): PlayerState => ({
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
});

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
    invoker: updateInvoker(invoker, skill),
    other,
  };
}
