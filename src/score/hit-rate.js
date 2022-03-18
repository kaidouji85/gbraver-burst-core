// @flow

import type {GameState} from "../state/game-state";
import type {PlayerId} from "../player/player";

/**
 * 攻撃命中率を計算する
 *
 * @param stateHistory ステートヒストリー
 * @param attacker 命中率を計算するプレイヤー
 * @return 計算結果
 */
export function hitRate(stateHistory: GameState[], attacker: PlayerId): number {
  const allAttacks = stateHistory.filter(v => v.effect.name === 'Battle' && v.effect.attacker === attacker
    && v.effect.result.name !== 'Feint');
  if (allAttacks.length <= 0) {
    return 0;
  }

  const hitBattleResults = ['NormalHit', 'Guard', 'CriticalHit'];
  const hits = allAttacks.filter(v => v.effect.name === 'Battle' && hitBattleResults.includes(v.effect.result.name));
  return hits.length / allAttacks.length;
}