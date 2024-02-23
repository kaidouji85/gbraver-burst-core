import { DamageHalvedSkill } from "../../player/pilot/damage-halved-skill";
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
  skill: DamageHalvedSkill,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    effects: [
      ...invoker.armdozer.effects,
      {
        type: "DamageHalved",
        period: {
          type: "TurnLimit",
          remainingTurn: skill.duration,
        },
      },
    ],
  },
});

/**
 * パイロットスキル ダメージ半減
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function damageHalvedSkill(
  params: PilotSkillInvokeParams<DamageHalvedSkill>,
): PilotSkillInvokeResult {
  const { invoker, other, skill } = params;
  return {
    invoker: updateInvoker(invoker, skill),
    other,
  };
}
