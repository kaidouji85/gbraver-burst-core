//@flow

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
  if (stateHistory.length <= 0) {
    return 0;
  }

  const allAttacks = stateHistory
    .filter(v => v.effect.name === 'Battle' && v.effect.attacker === attacker && v.effect.result.name !== 'Feint');
  const hitBattleResult = ['NormalHit', 'Guard', 'CriticalHit'];
  const hits = allAttacks.filter(v => v.effect.name === 'Battle' && hitBattleResult.includes(v.effect.name));
  return hits.length / allAttacks.length;
}