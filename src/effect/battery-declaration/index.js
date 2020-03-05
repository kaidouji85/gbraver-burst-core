// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerCommand} from "../../player/command/player-command";
import type {PlayerState} from "../../state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {updatePlayer} from "./update-player";

/**
 * 攻撃、防御のバッテリー宣言
 *
 * @param lastState 最新状態
 * @param commands コマンド
 * @returns 更新結果
 */
export function batteryDeclaration(lastState: GameState, commands: PlayerCommand[]): GameState {
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

  const updatedAttacker = updatePlayer(attacker, attackerBattery);
  const updatedDefender = updatePlayer(defender, defenderBattery);
  const updatedPlayers = lastState.players.map(v => {
    if (v.playerId === updatedAttacker.playerId) {
      return updatedAttacker;
    } else if (v.playerId === updatedDefender.playerId) {
      return updatedDefender;
    } else {
      return v;
    }
  });

  return {
    ...lastState,
    players: updatedPlayers,
    effect: {
      name: 'BatteryDeclaration',
      attacker: attacker.playerId,
      attackerBattery: attackerBattery.battery,
      defenderBattery: defenderBattery.battery,
    }
  }
}