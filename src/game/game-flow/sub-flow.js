// @flow

import {GameFlowWithHistory} from "./game-flow";

/**
 * サブフロー
 *
 * @param fn 追加するサブフローを指定する
 * @return 更新関数
 */
export function subFlow<X, Y>(fn: (v: GameFlowWithHistory<X>) => GameFlowWithHistory<Y>): ((v: GameFlowWithHistory<X>) => GameFlowWithHistory<Y>) {
  return (v: GameFlowWithHistory<X>): GameFlowWithHistory<Y> =>  {
    const update = fn(v);
    const stateHistory = [...v.stateHistory, ...update.stateHistory];
    return new GameFlowWithHistory<Y>(stateHistory, update.lastState);
  };
}