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

  const {plusBatteryCorrection, minusBatteryCorrection} = batteryEnchantmentToCorrects(skill.batteryEnchantment);
  const updatedInvoker = {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      effects: [
        ...invoker.armdozer.effects,
        {
          type: 'BatteryCorrection',
          batteryCorrection: plusBatteryCorrection,
          remainingTurn: 1,
        },
        {
          type: 'BatteryCorrection',
          batteryCorrection: minusBatteryCorrection,
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

/**
 * バッテリー増強を同様の意味を持つバッテリー補正に変換する
 *
 * バッテリー増強の効果は以下の通り
 *   (1)バッテリー増強を発動したターンは、出したバッテリーに+Xされる
 *   (2)次のターンは、出したバッテリーに-Xされる
 *
 * これを再現するために、以下の補正を作る
 *   (A)バッテリープラス効果は1ターン継続
 *   (B)バッテリーマイナス効果は2ターン継続
 *
 * なお、(A)、(B)は以下の関係を満たす
 *   (A) + (B) = バッテリー増強値
 *   (B) = -バッテリー増強値
 *
 * @param batteryEnchantment バッテリー増強値
 * @return バッテリー補正
 */
export function batteryEnchantmentToCorrects(batteryEnchantment: number): { plusBatteryCorrection: number, minusBatteryCorrection: number } {
  return {
    plusBatteryCorrection: batteryEnchantment * 2,
    minusBatteryCorrection: -batteryEnchantment,
  }
}