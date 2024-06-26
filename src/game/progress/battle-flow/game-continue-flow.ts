import type { Command } from "../../../command/command";
import {
  canContinuousActive,
  continuousActive,
} from "../../../effect/continuous-active";
import { inputCommand } from "../../../effect/input-command";
import { turnChange } from "../../../effect/turn-change";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import type { PlayerId } from "../../../player/player";
import type { GameState } from "../../../state/game-state";
import { startGameFlow } from "../../game-flow";

/**
 * ゲーム継続フロー
 * @param lastState 最新の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerCommand 攻撃側コマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderCommand 防御側コマンド
 * @returns 更新結果
 */
export function gameContinueFlow(
  lastState: GameState,
  attackerId: PlayerId,
  attackerCommand: Command,
  defenderId: PlayerId,
  defenderCommand: Command,
): GameState[] {
  return startGameFlow(lastState, [
    (state) => [updateRemainingTurn(state)],
    (state) =>
      canContinuousActive(state)
        ? [continuousActive(state)]
        : [turnChange(state)],
    (state) => [
      inputCommand(
        state,
        attackerId,
        attackerCommand,
        defenderId,
        defenderCommand,
      ),
    ],
  ]);
}
