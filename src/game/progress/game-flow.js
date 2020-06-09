// @flow

import type {GameState} from "../state/game-state";

/**
 * ステートヒストリー更新関数
 *
 * @param lastState 最新の状態
 * @return 更新内容
 */
export type HistoryUpdate = (state: GameState) => GameState[];

/**
 * ゲームフロー
 *
 * @param lastState 最後の状態
 * @param updateList ステートヒストリー更新関数リスト
 * @return 更新後のステートヒストリー
 */
export function gameFlow(lastState: GameState, updateList: HistoryUpdate[]): GameState[] {
  return updateList.reduce((history: GameState[], update: HistoryUpdate) => {
    const state = history[history.length - 1];
    return [...history,  ...update(state)];
  }, [lastState]).slice(1);
}