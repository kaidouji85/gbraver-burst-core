// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlowWithHistory} from './game-flow';

/**
 * ゲームフローに1個だけステートを追加する
 *
 * @param fn 追加するステートを指定する
 * @return 更新結果
 */
export function chain<X, Y>(fn: (v: GameStateX<X>) => GameStateX<Y>): ((v: GameFlowWithHistory<X>) => GameFlowWithHistory<Y>) {
  return (v: GameFlowWithHistory<X>): GameFlowWithHistory<Y> =>  {
    const lastState = fn(v.lastState);
    const stateHistory = [...v.stateHistory, (lastState: any)];
    return new GameFlowWithHistory(stateHistory, lastState);
  }
}