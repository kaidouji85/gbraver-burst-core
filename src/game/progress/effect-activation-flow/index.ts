import { inputCommand } from "../../../effect/input-command";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";

type PlayerEffectActivationFlowResult = {
  stateHistory: GameState[];
  shouldNextEffectActivationSkip: boolean;
};

function playereffectActivationFlow(
  lastState: GameState,
  command: PlayerCommand,
): PlayerEffectActivationFlowResult {
  const done = activateEffectOrNot(lastState, command);
  if (!done) {
    return { stateHistory: [], shouldNextEffectActivationSkip: false };
  }

  const isForceTurnEndActivated =
    done.effect.name === "BurstEffect" &&
    done.effect.burst.type === "ForceTurnEnd";
  if (isForceTurnEndActivated) {
    const postForceTurnEnd = startGameFlow(done, [
      (state) => [updateRemainingTurn(state)],
    ]);
    return {
      stateHistory: [done, ...postForceTurnEnd],
      shouldNextEffectActivationSkip: true,
    };
  }

  return { stateHistory: [done], shouldNextEffectActivationSkip: false };
}

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
      inputCommand(
        state,
        attackerCommand.playerId,
        attackerCommand.command,
        defenderCommand.playerId,
        defenderCommand.command,
      ),
    ],
  ]);
}
