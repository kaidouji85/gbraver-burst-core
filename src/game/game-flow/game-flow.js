// @flow

import type {GameStateX, GameState} from '../../state/game-state';

/**
 * ゲームフロー
 *
 * @template X 最新のゲームステートの効果
 */
export interface GameFlow<X> {
  /** ステートヒストリー */
  stateHistory: GameState[];

  /**
   * ゲームフローを進める
   *
   * @param fn 更新関数
   * @return 更新結果
   */
  to<Y>(fn: (v: GameFlow<X>) => GameFlow<Y>): GameFlow<Y>;
}

/**
 * ステート履歴を持たない
 *
 * @template X 最新のゲームステート
 */
export class ZeroGameFlow<X> implements GameFlow<X> {
  /** ステートヒストリー */
  stateHistory: GameState[];

  /** コンストラクタ */
  constructor() {
    this.stateHistory = [];
  }

  /**
   * ゲームフローを進める
   *
   * @param fn 更新関数
   * @return 更新結果
   */
  to<Y>(fn: (v: GameFlow<X>) => GameFlow<Y>): GameFlow<Y> {
    return fn(this);
  }
}

/**
 * ステート履歴を持つゲームフロー
 * 
 * @template X 最新のゲームステートの効果
 */
export class GameFlowWithHistory<X> implements GameFlow<X> {
  /** ステートヒストリー */
  stateHistory: GameState[];
  /** 最新のゲームステート */
  lastState: GameStateX<X>;
  
  /**
   * コンストラクタ
   * 
   * @param stateHistory ステートヒストリー 
   * @param lastState 最新のゲームステート
   */
  constructor(stateHistory: Array<GameState>, lastState: GameStateX<X>) {
    this.stateHistory = stateHistory;
    this.lastState = lastState;
  }
  
  /**
   * ゲームフローを進める
   * 
   * @param fn 更新関数
   * @return 更新結果
   */
  to<Y>(fn: (v: GameFlowWithHistory<X>) => GameFlow<Y>): GameFlow<Y> {
    return fn(this);
  }
}