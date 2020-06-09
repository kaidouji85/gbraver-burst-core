// @flow

import type {GameState} from "../../game/state/game-state";
import type {GameEndResult} from "./game-end";

/**
 * ゲーム終了
 *
 * @param lastState
 * @param result
 * @return {{players: PlayerState[], effect: {result: *, name: string}, activePlayerId: PlayerId}}
 */
export function gameEnd(lastState: GameState, result: GameEndResult): GameState {
  return {
    ...lastState,
    effect: {
      name: 'GameEnd',
      result: result
    }
  };
}