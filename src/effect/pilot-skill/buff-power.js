// @flow

import type {GameState, GameStateX, PilotSkillEffect, PlayerId, PlayerState} from "../..";
import type {BuffPowerSkill} from "../../player/pilot";

/**
 * パイロットスキル 攻撃バフ
 *
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function buffPower(lastState: GameState, invokerId: PlayerId, skill: BuffPowerSkill): ?GameStateX<PilotSkillEffect> {
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
          type: 'CorrectPower',
          power: skill.buffPower,
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