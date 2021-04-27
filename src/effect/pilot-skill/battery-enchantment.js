// @flow

import type {GameState, GameStateX} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {BatteryEnchantmentSkill} from "../../player/pilot";
import type {PilotSkillEffectX} from "./pilot-skill-effect";
import type {PlayerState} from "../../state/player-state";

/**
 * パイロットスキル バッテリー増強
 *
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function batteryEnchantment(lastState: GameState, invokerId: PlayerId, skill: BatteryEnchantmentSkill): ?GameStateX<PilotSkillEffectX<BatteryEnchantmentSkill>> {
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
          type: 'BatteryCorrection',
          batteryCorrection: skill.batteryEnchantment * 2,
          remainingTurn: 1,
        },
        {
          type: 'BatteryCorrection',
          batteryCorrection: -skill.batteryEnchantment,
          remainingTurn: 2,
        },
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