import { DamageHalvedSkill } from "../../player/pilot/damage-halved-skill";
import { PlayerState } from "../../state/player-state";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";

/**
 * ダメージ半減スキルを発動する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return 発動後のステート
 */
function invokeDamageHalvedSkill(
  invoker: PlayerState,
  skill: DamageHalvedSkill,
): PlayerState {
  return {
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
  };
}

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
    invoker: invokeDamageHalvedSkill(invoker, skill),
    other,
  };
}
