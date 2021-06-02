// @flow

import {GameFlow} from "./game-flow";

/**
 * サブフロー
 *
 * @param fn 追加するサブフローを指定する
 * @return 更新関数
 */
export function subFlow<X, Y>(fn: (v: GameFlow<X>) => GameFlow<Y>): ((v: GameFlow<X>) => GameFlow<Y>) {
  return (v: GameFlow<X>): GameFlow<Y> =>  {
    const update = fn(v);
    const stateHistory = [...v.stateHistory, ...update.stateHistory];
    return new GameFlow<Y>(stateHistory, update.lastState);
  };
}