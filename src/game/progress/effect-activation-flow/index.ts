import { inputCommand } from "../../../effect/input-command";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";

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
      const done = activateEffectOrNot(state, attackerCommand);
      return done ? [done] : [];
    },
    (state) => {
      const done = activateEffectOrNot(state, defenderCommand);
      return done ? [done] : [];
    },
    (state) => [
      inputCommand({
        lastState: state,
        noChoices: commands.filter((c) => c.command.type === "BATTERY_COMMAND"),
      }),
    ],
  ]);
}
