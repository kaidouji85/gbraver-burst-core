// @flow

import type {GameState} from "../game-state/game-state";
import * as R from "ramda";

/**
 * ステートヒストリー更新関数
 *
 * @param history 更新前のステートヒストリー
 * @return 更新後のステートヒストリー
 */
export type HistoryUpdate = (history: GameState[]) => GameState[];

/**
 * ゲームフロー
 *
 * @param lastState 最後の状態
 * @param updateList ステートヒストリー更新関数リスト
 * @return 更新後のステートヒストリー
 */
export function gameFlow(lastState: GameState, updateList: HistoryUpdate[]): GameState[] {
  return R.pipe(...updateList)([lastState]).slice(1);
}

/**
 * ヒストリーの最新状態を取得する
 *
 * @param history ステートヒストリー
 * @return 最新状態
 */
export function getLastState(history: GameState[]): GameState {
  return history[history.length - 1];
}
