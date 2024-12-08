import {
  canContinuousActive,
  continuousActive,
} from "../../../effect/continuous-active";
import { inputCommand } from "../../../effect/input-command";
import { turnChange } from "../../../effect/turn-change";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import type { GameState } from "../../../state/game-state";
import { startGameFlow } from "../../game-flow";

/**
 * ゲーム継続フロー
 * @param lastState 最新の状態
 * @returns 更新結果
 */
export function gameContinueFlow(lastState: GameState): GameState[] {
  return startGameFlow(lastState, [
    (state) => [updateRemainingTurn(state)],
    (state) =>
      canContinuousActive(state)
        ? [continuousActive(state)]
        : [turnChange(state)],
    (state) => [inputCommand({ lastState: state })],
  ]);
}
