import { inputCommand } from "../../../effect/input-command";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
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

  const orderedCommands = [attackerCommand, defenderCommand];
  const initial = { state: lastState, history: [], hasForceTurnEnd: false };
  const stateActivatedEffect = orderedCommands.reduce(
    (
      ac: { state: GameState; history: GameState[]; hasForceTurnEnd: boolean },
      command,
    ) => {
      if (ac.hasForceTurnEnd) {
        return ac;
      }

      const result = playerEffectActivationFlow(ac.state, command);
      return {
        state: result.stateHistory.at(-1) ?? ac.state,
        history: [...ac.history, ...result.stateHistory],
        hasForceTurnEnd: result.hasForceTurnEnd,
      };
    },
    initial,
  );
  return stateActivatedEffect.hasForceTurnEnd
    ? stateActivatedEffect.history
    : [
        ...stateActivatedEffect.history,
        inputCommand({
          lastState: stateActivatedEffect.state,
          noChoices: commands.filter(
            (c) => c.command.type === "BATTERY_COMMAND",
          ),
        }),
      ];
}
