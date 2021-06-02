// @flow

import {GameFlow} from "./game-flow";
import type {GameState} from "../../state/game-state";
import type {Effect} from "../../effect";

/**
 * 配列でステートヒストリー追加を行う
 *
 * @param fns 更新関数の配列
 * @return 更新関数
 */
export function updates<X>(fns: ((v: GameState) => GameState)[]): ((v: GameFlow<X>) => GameFlow<Effect>) {
  return (v: GameFlow<X>): GameFlow<Effect> => {
    return addHistoriesByFunctions(v, fns);
  }
}

/**
 * 配列でステートヒストリー追加を行う
 *
 * @param origin ステートヒストリー追加前のゲームフロー
 * @param fns 更新関数の配列
 * @return 更新結果
 */
export function addHistoriesByFunctions<X>(origin: GameFlow<X>, fns: ((v: GameState) => GameState)[]): GameFlow<Effect> {
  const updates = fns.reduce((history: GameState[], fn) => {
    const lastState = history[history.length - 1];
    const update = fn(lastState);
    return [...history, update];
  }, [(origin.lastState: any)])
    .slice(1);
  const newStateHistory = [...origin.stateHistory, ...updates];
  const newLastState = updates[updates.length - 1];
  return new GameFlow(newStateHistory, newLastState);
}