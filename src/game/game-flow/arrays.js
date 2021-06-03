// @flow

import {forceUpcastGameFlow, GameFlow} from "./game-flow";
import type {GameState} from "../../state/game-state";
import type {Effect} from "../../effect";

/**
 * 複数のステートヒストリーを追加する
 *
 * @param histories 追加するステートヒストリー
 * @return 更新関数
 */
export function arrays<X>(histories: GameState[]): ((v: GameFlow<X>) => GameFlow<Effect>) {
  return (v: GameFlow<X>): GameFlow<Effect> => {
    return addHistories(v, histories);
  };
}

/**
 * 複数のステートヒストリーを追加する
 *
 * @param origin 追加前
 * @param histories 追加するステートヒストリー
 * @return 更新結果
 */
export function addHistories<X>(origin: GameFlow<X>, histories: GameState[]): GameFlow<Effect> {
  if (histories.length <= 0) {
    return forceUpcastGameFlow(origin);
  }

  const lastState = histories[histories.length - 1];
  const stateHistory = [...origin.stateHistory, ...histories];
  return new GameFlow<Effect>(stateHistory, lastState);
}