// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlow} from './game-flow';
import {forceUpcastGameState} from "../../state/game-state";

/**
 * ゲームフローに1個だけステートを追加する
 *
 * @param fn 追加するステートを指定する
 * @return 更新結果
 */
export function chain<X, Y>(fn: (v: GameStateX<X>) => GameStateX<Y>): ((v: GameFlow<X>) => GameFlow<Y>) {
  return (v: GameFlow<X>): GameFlow<Y> =>  {
    const updated = fn(v.lastState);
    return addHistory(v, updated);
  }
}

/**
 * ゲームフローのステートヒストリーに追加する
 *
 * @param origin 変更前
 * @param add 追加するヒストリー
 * @return 追加結果
 */
export function addHistory<X, Y>(origin: GameFlow<X>, add: GameStateX<Y>): GameFlow<Y> {
  const stateHistory = [...origin.stateHistory, forceUpcastGameState(add)];
  return new GameFlow(stateHistory, add);
}