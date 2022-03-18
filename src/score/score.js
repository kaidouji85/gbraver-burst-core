// @flow
import type {GameState} from "../state/game-state";
import type {PlayerId} from "../player/player";
import {hitRate as getHitRate} from "./hit-rate";
import {evasionRate as getEvasionRate} from "./evasion-rate";

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
};

/**
 * 指定したプレイヤーのスコアを算出する
 *
 * @param stateHistory ステートヒストリー
 * @param player スコアを算出するプレイヤーのID
 * @return スコア算出結果
 */
export function score(stateHistory: GameState[], player: PlayerId): Score {
  const hitRate = getHitRate(stateHistory, player);
  const hitRateScore = hitRate * 10000;
  const evasionRate = getEvasionRate(stateHistory, player);
  const evasionRateScore = evasionRate * 30000;
  return {hitRate, hitRateScore, evasionRate, evasionRateScore};
}