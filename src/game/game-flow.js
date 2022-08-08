// @flow
import {upcastGameState} from "../state/game-state";
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
export interface GameStateChainer<X> {
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
  constructor(stateHistory: GameState, lastState: GameStateX<X>) {
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
    return [...this.stateHistory, upcastGameState(this.lastState)];
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