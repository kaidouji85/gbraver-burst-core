// @flow

import type {GameState, GameStateX, PilotSkillEffectX, PlayerId, PlayerState} from "../..";
import type {DamageDecreaseSkill} from "../../player/pilot";

/**
 * パイロットスキル ダメージ減少
 *
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function damageDecrease(lastState: GameState, invokerId: PlayerId, skill: DamageDecreaseSkill): ?GameStateX<PilotSkillEffectX<DamageDecreaseSkill>> {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    return null;
  }

  const updatedInvoker = {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      effects: [
        ...invoker.armdozer.effects,
        {
          type: 'DamageDecrease',
          decrease: skill.decrease,
          remainingTurn: skill.duration,
        }
      ]
    }
  };
  const updatedPlayers: PlayerState[] = lastState.players
    .map(v => v.playerId === invokerId ? updatedInvoker : v);
  const effect = {
    name: 'PilotSkillEffect',
    invokerId: invokerId,
    skill: skill,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}