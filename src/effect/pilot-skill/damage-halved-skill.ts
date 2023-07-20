import type { DamageHalvedSkill } from "../../player/pilot";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { PilotSkillEffectX } from "./pilot-skill-effect";

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
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果
 */
export function damageHalvedSkill(
  lastState: GameState,
  invokerId: PlayerId,
  skill: DamageHalvedSkill,
): GameStateX<PilotSkillEffectX<DamageHalvedSkill>> {
  const players: PlayerState[] = lastState.players.map((v) =>
    v.playerId === invokerId ? invokeDamageHalvedSkill(v, skill) : v,
  );
  const effect: PilotSkillEffectX<DamageHalvedSkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill,
  };
  return { ...lastState, players, effect };
}
