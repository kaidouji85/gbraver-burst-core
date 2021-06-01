// @flow

import type {GameStateX, GameState} from '../../state/game-state';

/**
 * ゲームフロー
 * 
 * @template X 最新のゲームステートの効果
 */
export class GameFlow<X> {
  /** ステートヒストリー */
  stateHistory: Array<GameState>;
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
  to<Y>(fn: (v: GameFlow<X>) => GameFlow<Y>): GameFlow<Y> {
    return fn(this);
  }
}