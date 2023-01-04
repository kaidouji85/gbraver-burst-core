import type { BatteryEnchantmentSkill } from "../../player/pilot";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { PilotSkillEffectX } from "./pilot-skill-effect";

/**
 * パイロットスキル バッテリー増強
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function batteryEnchantment(lastState: GameState, invokerId: PlayerId, skill: BatteryEnchantmentSkill): GameStateX<PilotSkillEffectX<BatteryEnchantmentSkill>> {
  const invoker = lastState.players.find(v => v.playerId === invokerId);

  if (!invoker) {
    throw new Error("not found pilot skill invoker");
  }

  const updatedInvoker: PlayerState = { ...invoker,
    armdozer: { ...invoker.armdozer,
      effects: [...invoker.armdozer.effects, {
        type: "BatteryCorrection",
        batteryCorrection: skill.batteryEnchantment,
        period: {
          type: "TurnLimit",
          remainingTurn: skill.duration
        }
      }, {
        type: "HalveCorrectPower",
        period: {
          type: "TurnLimit",
          remainingTurn: skill.duration
        }
      }]
    }
  };
  const updatedPlayers: PlayerState[] = lastState.players.map(v => v.playerId === invokerId ? updatedInvoker : v);
  const effect: PilotSkillEffectX<BatteryEnchantmentSkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill
  };
  return { ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}