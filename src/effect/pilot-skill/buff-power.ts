import { BuffPowerSkill } from "../../player/pilot/buff-power-skill";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state/player-state";
import type { PilotSkillEffectX } from "./pilot-skill-effect";

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
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果
 */
export function buffPower(
  lastState: GameState,
  invokerId: PlayerId,
  skill: BuffPowerSkill,
): GameStateX<PilotSkillEffectX<BuffPowerSkill>> {
  const players: PlayerState[] = lastState.players.map((v) =>
    v.playerId === invokerId ? invokeBuffPower(v, skill) : v,
  );
  const effect: PilotSkillEffectX<BuffPowerSkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill,
  };
  return { ...lastState, players, effect };
}
