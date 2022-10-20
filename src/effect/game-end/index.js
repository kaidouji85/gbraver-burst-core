// @flow

import type { GameState, GameStateX } from "../../state/game-state";
import type { GameEnd, GameEndResult } from "./game-end";

/**
 * ゲーム終了
 *
 * @param lastState 最新のゲーム ステート
 * @param result ゲーム終了結果
 * @return 更新結果
 */
export function gameEnd(
  lastState: GameState,
  result: GameEndResult
): GameStateX<GameEnd> {
  return {
    ...lastState,
    effect: {
      name: "GameEnd",
      result: result,
    },
  };
}
