import { inputCommand } from "../../../effect/input-command";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { playerEffectActivationFlow } from "./player-effect-activation-flow";

/**
 * 効果発動フロー
 * 現状ではバースト、パイロットスキルを想定している
 * @param lastState 最後の状態
 * @param commands コマンド
 * @returns 更新されたゲームの状態
 */
export function effectActivationFlow(
  lastState: GameState,
  commands: [PlayerCommand, PlayerCommand],
): GameState[] {
  const attackerCommand = commands.find(
    (v) => v.playerId === lastState.activePlayerId,
  );
  const defenderCommand = commands.find(
    (v) => v.playerId !== lastState.activePlayerId,
  );
  if (!attackerCommand || !defenderCommand) {
    throw new Error("not found attacker or defender command");
  }

  return startGameFlow(lastState, [
    (state) => {
      const attackerResult = playerEffectActivationFlow(state, attackerCommand);
      if (attackerResult.shouldNextEffectActivationSkip) {
        return attackerResult.stateHistory;
      }

      const stateAfterAttackerEffect =
        attackerResult.stateHistory.at(-1) ?? state;
      const defenderResult = playerEffectActivationFlow(
        stateAfterAttackerEffect,
        defenderCommand,
      );
      return [...attackerResult.stateHistory, ...defenderResult.stateHistory];
    },
    (state) => [
      inputCommand({
        lastState: state,
        noChoices: commands.filter((c) => c.command.type === "BATTERY_COMMAND"),
      }),
    ],
  ]);
}
