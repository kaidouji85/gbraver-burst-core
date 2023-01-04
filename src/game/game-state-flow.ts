import type { GameState } from "../state/game-state";

/**
 * ゲームステート履歴追加関数
 * @param lastState 最新ゲームステート
 * @return 追加するゲームステート履歴
 */
type GameStateHistoryAdd = (lastState: GameState) => GameState[];

/** ゲームステートフロー */
interface GameStateFlow {
  /**
   * 新しいゲームステートを追加する
   *
   * @param fn ゲームステート追加関数
   * @return 新しいステートを追加したゲームステートフロー
   */
  add(fn: GameStateHistoryAdd): GameStateFlow;

  /**
   * ゲームステート履歴に変換する
   *
   * @return 変換結果
   */
  toGameStateHistory(): GameState[];
}
/** ゲームステートフローのシンプルな実装 */

class SimpleGameStateFlow implements GameStateFlow {
  readonly stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param stateHistory ゲームステート履歴
   */
  constructor(stateHistory: GameState[]) {
    this.stateHistory = stateHistory;
  }

  /** @override */
  add(fn: GameStateHistoryAdd): GameStateFlow {
    const lastState = this.stateHistory[this.stateHistory.length - 1];
    const addedStateHistory = fn(lastState);
    const updatedStateHistory = [...this.stateHistory, ...addedStateHistory];
    return new SimpleGameStateFlow(updatedStateHistory);
  }

  /** @override */
  toGameStateHistory(): GameState[] {
    return this.stateHistory;
  }

}
/**
 * ゲームステートフローを開始する
 *
 * @param stateHistory ゲームステート履歴
 * @return 生成したゲームステート分岐
 */


export function startGameStateFlow(stateHistory: GameState[]): GameStateFlow {
  if (stateHistory.length <= 0) {
    throw new Error("requires at least 1 game state history.");
  }

  return new SimpleGameStateFlow(stateHistory);
}