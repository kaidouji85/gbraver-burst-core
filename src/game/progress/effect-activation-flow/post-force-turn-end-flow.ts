import { inputCommand } from "../../../effect/input-command";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import { GameState } from "../../../state/game-state";
import { startGameFlow } from "../../game-flow";

/**
 * 強制ターンエンド後のフローを実行する
 * @param lastState 最新のゲームステート
 * @returns 更新されたゲームの状態
 */
export const postForceTurnEndFlow = (lastState: GameState): GameState[] =>
  startGameFlow(lastState, [
    (state) => [updateRemainingTurn(state)],
    (state) => [inputCommand({ lastState: state, noChoices: [] })],
  ]);
