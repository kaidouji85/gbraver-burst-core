// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlow} from './game-flow';

/**
 * ゲームフローに1個だけステートを追加する
 *
 * @param fn 更新関数
 * @return 更新結果
 */
export function chain<X, Y>(fn: (v: GameStateX<X>) => GameStateX<Y>): ((v: GameFlow<X>) => GameFlow<Y>) {
  return (v: GameFlow<X>): GameFlow<Y> =>  {
    const lastState = fn(v.lastState);
    const stateHistory = [...v.stateHistory, (lastState: any)];
    return new GameFlow(stateHistory, lastState);
  }
}