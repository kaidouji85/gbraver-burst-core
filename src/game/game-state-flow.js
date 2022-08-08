// @flow
import type {GameState} from "../state/game-state";

/**
 * ゲームステートルートセレクタ
 * @param lastState 最終ステート
 * @return 選択したゲームステートスート
 */
type GameStateFlowUpdater = (lastState: GameState) => GameState[];

/** ゲームステートフロー */
interface GameStateFlow {
  /**
   * ゲームステートを分岐する
   *
   * @param selector ルートセレクタ
   * @return 選択したルートを追加したステート分岐
   */
  update(selector: GameStateFlowUpdater): GameStateFlow;

  /**
   * ゲームステート履歴に変換する
   *
   * @return 変換結果
   */
  toGameStateHistory(): GameState[];
}

/** ゲームステートルートセレクタのシンプルな実装 */
class SimpleGameStateBranch implements GameStateFlow {
  +stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param stateHistory ゲームステート履歴
   */
  constructor(stateHistory: GameState[]) {
    this.stateHistory = stateHistory;
  }

  /** @override */
  update(selector: GameStateFlowUpdater): GameStateFlow {
    const lastState = this.stateHistory[this.stateHistory.length - 1];
    const selectedRoute = selector(lastState);
    const update = [...this.stateHistory, ...selectedRoute];
    return new SimpleGameStateBranch(update);
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
  return new SimpleGameStateBranch(stateHistory);
}