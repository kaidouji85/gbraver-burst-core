// @flow
import type {GameState, GameStateX} from "../state/game-state";

/**
 * ゲームステート更新
 * @template X 更新前ゲームステートのゲーム効果
 * @template Y 更新後ゲームステートのゲーム効果
 * @param origin 更新前ゲームステート
 * @return 更新後ゲームステート
 */
type GameStateUpdater<X, Y> = (origin: GameStateX<X>) => GameStateX<Y>;

/**
 * ゲームステートチェイナー
 * @template X 最終ステートのゲーム効果
 */
interface GameStateChainer<X> {
  /**
   * ステートを更新する
   * @param updater 更新関数
   */
  chain<Y>(updater: GameStateUpdater<X, Y>): GameStateChainer<Y>;

  /**
   * ゲームステート履歴に変換する
   *
   * @return 変換結果
   */
  toGameStateHistory(): GameState[];
}

/**
 * ゲームステートチェイナーのシンプルな実装
 * @template X 最終ステートのゲーム効果
 */
class SimpleGameStateChainer<X> implements GameStateChainer<X> {
  +stateHistory: GameState[];
  +lastState: GameStateX<X>;

  /**
   * コンストラクタ
   *
   * @param stateHistory ステート履歴
   * @param lastState 最終ステート
   */
  constructor(stateHistory: GameState[], lastState: GameStateX<X>) {
    this.stateHistory = stateHistory;
    this.lastState = lastState;
  }

  /** @override */
  chain<Y>(updater: GameStateUpdater<X, Y>): GameStateChainer<Y> {
    const latestState = updater(this.lastState);
    return new SimpleGameStateChainer(this.toGameStateHistory(), latestState);
  }

  /** @override */
  toGameStateHistory(): GameState[] {
    return [...this.stateHistory, ((this.lastState: any): GameState)];
  }
}

/**
 * ゲームステートチェイナーを開始する
 *
 * @template 最終ステートのゲーム効果
 * @param lastState 最終ステート
 * @return 生成したゲームステートチェイナー
 */
export function startGameStateChainer<X>(lastState: GameStateX<X>): GameStateChainer<X> {
  return new SimpleGameStateChainer([], lastState);
}

/** ゲームステートルートセレクタ */
type GameStateBranchSelector = (lastState: ?GameState) => GameState[];

/** ゲームステート分岐 */
interface GameStateBranch {
  /**
   * ゲームステートを分岐する
   *
   * @param selector ルートセレクタ
   * @return 選択したルートを追加したステート分岐
   */
  branch(selector: GameStateBranchSelector): GameStateBranch;

  /**
   * ゲームステート履歴に変換する
   *
   * @return 変換結果
   */
  toGameStateHistory(): GameState[];
}

/** ゲームステートルートセレクタのシンプルな実装 */
class SimpleGameStateBranch implements GameStateBranch {
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
  branch(selector: GameStateBranchSelector): GameStateBranch {
    const lastState = this.stateHistory[this.stateHistory.length - 1];
    const update = selector(lastState);
    return new SimpleGameStateBranch(update);
  }

  /** @override */
  toGameStateHistory(): GameState[] {
    return this.stateHistory;
  }
}

/**
 * ゲームステート分岐を開始する
 *
 * @param stateHistory ゲームステート履歴
 * @return 生成したゲームステート分岐
 */
export function startGameStateBranch(stateHistory: GameState[]): GameStateBranch {
  return new SimpleGameStateBranch(stateHistory);
}