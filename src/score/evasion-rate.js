// @flow

import type {GameState} from "../state/game-state";
import type {PlayerId} from "../player/player";

/**
 * 回避率を計算する
 *
 * @param stateHistory ステートヒストリー
 * @param defender 回避率を計算するプレイヤー
 * @returns 計算結果
 */
export function evasionRate(stateHistory: GameState[], defender: PlayerId): number {
  const allAttacks = stateHistory
    .filter(v => v.effect.name === 'Battle' && v.effect.attacker !== defender && v.effect.result.name !== 'Feint');
  if (allAttacks.length <= 0) {
    return 1;
  }

  const evasionBattleResults = ['Miss'];
  const evasions = allAttacks.filter(v => v.effect.name === 'Battle' && evasionBattleResults.includes(v.effect.result.name));
  return evasions.length / allAttacks.length;
}