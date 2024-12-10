import { inputCommand } from "../../../effect/input-command";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";
import { postForceTurnEndFlow } from "./post-force-turn-end-flow";

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

      const done = activateEffectOrNot(ac.state, command);
      const state = done ?? ac.state;
      const history = done ? [...ac.history, done] : ac.history;
      const hasForceTurnEnd =
        done !== null &&
        done.effect.name === "BurstEffect" &&
        done.effect.burst.type === "ForceTurnEnd";
      return { state, history, hasForceTurnEnd };
    },
    initial,
  );

  if (stateActivatedEffect.hasForceTurnEnd) {
    return [
      ...stateActivatedEffect.history,
      ...startGameFlow(stateActivatedEffect.state, [
        (state) => postForceTurnEndFlow(state),
      ]),
    ];
  }

  return [
    ...stateActivatedEffect.history,
    inputCommand({
      lastState: stateActivatedEffect.state,
      noChoices: commands.filter((c) => c.command.type === "BATTERY_COMMAND"),
    }),
  ];
}
