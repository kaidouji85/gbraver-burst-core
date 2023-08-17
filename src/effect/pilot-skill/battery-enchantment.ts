import { BatteryEnchantmentSkill } from "../../player/pilot/battery-enchantment-skill";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state/player-state";
import type { PilotSkillEffectX } from "./pilot-skill-effect";

/**
 * バッテリー増強スキルを適用する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return スキル発動後のステート
 */
function invokeBatteryEnchantment(
  invoker: PlayerState,
  skill: BatteryEnchantmentSkill,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "BatteryCorrection",
          batteryCorrection: skill.batteryEnchantment,
          period: {
            type: "TurnLimit",
            remainingTurn: skill.duration,
          },
        },
        {
          type: "HalveCorrectPower",
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
 * パイロットスキル バッテリー増強
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果
 */
export function batteryEnchantment(
  lastState: GameState,
  invokerId: PlayerId,
  skill: BatteryEnchantmentSkill,
): GameStateX<PilotSkillEffectX<BatteryEnchantmentSkill>> {
  const players: PlayerState[] = lastState.players.map((v) =>
    v.playerId === invokerId ? invokeBatteryEnchantment(v, skill) : v,
  );
  const effect: PilotSkillEffectX<BatteryEnchantmentSkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill,
  };
  return { ...lastState, players, effect };
}
