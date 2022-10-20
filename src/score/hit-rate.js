// @flow

import type { PlayerId } from "../player/player";
import type { GameState } from "../state/game-state";

/**
 * 攻撃命中率を計算する
 * 1回も攻撃しなかった場合は命中率0%とみなす
 *
 * @param stateHistory ステートヒストリー
 * @param attacker 命中率を計算するプレイヤー
 * @return 計算結果
 */
export function hitRate(stateHistory: GameState[], attacker: PlayerId): number {
  const allAttacks = stateHistory.filter(
    (v) =>
      v.effect.name === "Battle" &&
      v.effect.attacker === attacker &&
      v.effect.result.name !== "Feint"
  );
  if (allAttacks.length <= 0) {
    return 0;
  }

  const hitBattleResults = ["NormalHit", "Guard", "CriticalHit"];
  const hits = allAttacks.filter(
    (v) =>
      v.effect.name === "Battle" &&
      hitBattleResults.includes(v.effect.result.name)
  );
  return Math.floor((1000 * hits.length) / allAttacks.length) / 1000;
}
