// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerCommand} from "../../command/player-command";
import type {BattleResult} from "./battle";
import type {Command} from "../../command/command";
import type {PlayerState} from "../../game-state/player-state";
import type {BatteryCommand} from "../../command/battery";

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

  const result = createResult(attacker, attackerCommand.command, defender, defenderCommand.command);
  return lastState;
}

export function createResult(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): BattleResult {
  if (attackerCommand.battery < defenderCommand.battery) {
    return {name: 'Miss'};
  }

  if (attackerCommand.battery === defenderCommand.battery) {
    return {
      name: 'Guard',
      damage: guardDamage(attacker)
    };
  }

  if ((defenderCommand.battery < attackerCommand.battery) && defenderCommand.battery === 0) {
    return {
      name: 'CriticalHit',
      damage: criticalHitDamage(attacker, attackerCommand, defender, defenderCommand)
    };
  }

  if (defenderCommand.battery < attackerCommand.battery) {
    return {
      name: 'NormalHit',
      damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand)
    };
  }

  return {name: 'Miss'};
}

export function guardDamage(attacker: PlayerState): number {
  return attacker.armdozer.power / 2;
}

export function normalHitDamage(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): number {
  return attacker.armdozer.power + 100 * (attackerCommand.battery - defenderCommand.battery - 1)
}

export function criticalHitDamage(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): number {
  return normalHitDamage(attacker, attackerCommand, defender, defenderCommand) * 2;
}