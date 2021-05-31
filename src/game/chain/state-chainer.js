// @flow

import type {GameStateX, GameState} from '../../state/game-state';

/** 
 * ゲームステートチェイナー
 * 
 * @template X 最新のゲームステートの効果
 */
export interface StateChainer<X> {
  /**
   * ゲームステート履歴を取得する
   * 
   * @return 取得結果
   */
  stateHistory(): GameState[];

  /**
   * 最新のゲームステートを取得する
   * 
   * @return 取得結果
   */
  lastState(): GameStateX<X>;

  /**
   * ゲームステートをチェインする
   * 
   * @template Y チェイン後の最新ゲームステートの効果
   * @param fn チェインする関数
   * @return チェイン結果 
   */
  chain<Y>(fn: (v: GameStateX<X>) => StateChainer<Y>): StateChainer<Y>;
}

/**
 * シンプルなゲームステートチェイナー
 * 
 * @template X 最新のゲームステートの効果
 */
export class SimpleStateChainer<X> implements StateChainer<X> {
  _stateHistory: GameState[];

  /**
   * コンストラクタ
   * 
   * @param history ゲームステート履歴 
   * @param lastState 最新のゲームステート
   */
  constructor(history: GameState[], lastState: GameStateX<X>) {
    this._stateHistory = [...history, (lastState: any)];
  }

  /**
   * 最新のゲームステートを取得する
   * 
   * @return 取得結果
   */
  stateHistory(): GameState[] {
    return this._stateHistory;
  }

  /**
   * 最新のゲームステートを取得する
   * 
   * @return 取得結果
   */
  lastState(): GameStateX<X> {
    return ((this.stateHistory[this.stateHistory.length - 1]): any);
  }

  /**
   * ゲームステートをチェインする
   * 
   * @template Y チェイン後の最新ゲームステートの効果
   * @param fn チェインする関数
   * @return チェイン結果 
   */
  chain<Y>(fn: (v: GameStateX<X>) => StateChainer<Y>): StateChainer<Y> {
    const result = fn(this.lastState());
    const stateHistory = [...this.stateHistory(), ...result.stateHistory().slice(0, -1)];
    return new SimpleStateChainer(stateHistory, result.lastState());
  }
}

/**
 * ゲームステートからチャイナーを生成する
 * 
 * @template X ゲームステートの効果
 * @param state ゲームステート
 * @return 生成結果 
 */
export function to<X>(state: GameStateX<X>): StateChainer<X> {
  return new SimpleStateChainer([], state);
}