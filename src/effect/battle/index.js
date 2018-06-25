// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerCommand} from "../../command/player-command";
import type {PlayerState} from "../../game-state/player-state";
import {battleResult} from "./result/index";
import type {BatteryCommand} from "../../command/battery";
import {updateAttacker} from "./update/update-attacker";
import {updateDefender} from "./update/update-defender";
import {battleEffect} from "./effect/battle-effect";

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
  const effect = battleEffect(result, attacker, attackerBattery, defender, defenderBattery);
  const updatePlayers = [
    updateAttacker(attacker, attackerBattery),
    updateDefender(result, defender, defenderBattery)
  ];
  return {
    ...lastState,
    players: updatePlayers,
    effect: effect
  }
}