// @flow
import type { PlayerId } from "../player/player";
import type { GameState } from "../state/game-state";
import { evasionRate as getEvasionRate } from "./evasion-rate";
import { hitRate as getHitRate } from "./hit-rate";

/** スコア */
export type Score = {
  /** 命中率 */
  hitRate: number,
  /** 命中率スコア */
  hitRateScore: number,
  /** 回避率 */
  evasionRate: number,
  /** 回避率スコア */
  evasionRateScore: number,
  /** トータルスコア */
  totalScore: number,
};

/**
 * 指定したプレイヤーのスコアを算出する
 *
 * @param stateHistory ステートヒストリー
 * @param player スコアを算出するプレイヤーのID
 * @return スコア算出結果
 */
export function calculateScore(
  stateHistory: GameState[],
  player: PlayerId
): Score {
  if (stateHistory.length <= 0) {
    return {
      hitRate: 0,
      hitRateScore: 0,
      evasionRate: 0,
      evasionRateScore: 0,
      totalScore: 0,
    };
  }

  const hitRate = getHitRate(stateHistory, player);
  const hitRateScore = hitRate * 10000;
  const evasionRate = getEvasionRate(stateHistory, player);
  const evasionRateScore = evasionRate * 30000;
  const totalScore = hitRateScore + evasionRateScore;
  return { hitRate, hitRateScore, evasionRate, evasionRateScore, totalScore };
}
