// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerCommand} from "../../command/player-command";
import type {PlayerState} from "../../game-state/player-state";
import {battleResult} from "./result/index";

export function battle(lastState: GameState, commands: PlayerCommand[]): GameState {
  const attacker: ?PlayerState = lastState.players.find(v => v.playerId === lastState.activePlayerId);
  const defender: ?PlayerState = lastState.players.find(v => v.playerId !== lastState.activePlayerId);
  if (!attacker || !defender) {
    return lastState;
  }

  const attackerCommand: ?PlayerCommand = commands.find(v => v.playerId === attacker.playerId);
  const defenderCommand: ?PlayerCommand = commands.find(v => v.playerId === defender.playerId);
  if (!attackerCommand || !defenderCommand) {
    return lastState;
  }
  if (attackerCommand.command.type !== 'BATTERY_COMMAND' || defenderCommand.command.type !== 'BATTERY_COMMAND') {
    return lastState;
  }

  const result = battleResult(attacker, attackerCommand.command, defender, defenderCommand.command);
  return {
    ...lastState,
    effect: {
      name: 'Battle',
      attacker: attacker.playerId,
      result: result
    }
  }
}

