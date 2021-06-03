// @flow

import type {GameStateX, GameState} from '../../state/game-state';
import type {Effect} from '../../effect';

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

/**
 * 強制的にアップキャストする
 * 
 * @param origin キャスト元
 * @returns キャスト結果
 */
export function forceUpcastGameFlow<X>(origin: GameFlow<X>): GameFlow<Effect> {
  return ((origin: any): GameFlow<Effect>);
}