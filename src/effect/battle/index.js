// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerCommand} from "../../player/command/player-command";
import type {PlayerState} from "../../state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {battleResult} from "./result/battle-result";
import {updateDefender} from "./players/update-defender";
import {isDeath} from "../../player/death/is-death";

/**
 * 戦闘を行う
 *
 * @param lastState 更新前の状態
 * @param commands プレイヤーのコマンド
 * @return 更新結果
 */
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
  const attackerBattery: BatteryCommand = attackerCommand.command;
  const defenderBattery: BatteryCommand = defenderCommand.command;

  const result = battleResult(attacker, attackerBattery, defender, defenderBattery);
  const updatedDefender = updateDefender(result, defender);
  const updatedPlayers = lastState.players.map(v => {
    switch (v.playerId) {
      case updatedDefender.playerId:
        return updatedDefender;
      default:
        return v;
    }
  });
  return {
    ...lastState,
    players: updatedPlayers,
    effect: {
      name: 'Battle',
      attacker: attacker.playerId,
      isDeath: isDeath(updatedDefender),
      result: result
    }
  }
}
