// @flow

import type {PlayerCommand, PlayerCommandX} from "../command/player-command";
import type {BatteryCommand} from "../../command/battery";
import type {GameState} from "../../state/game-state";

/**
 * 抽出したバッテリーコマンド
 */
type Resp = {
  attacker: PlayerCommandX<BatteryCommand>,
  defender: PlayerCommandX<BatteryCommand>,
};

/**
 * 戦闘フローに利用するバッテリーコマンドを抽出する
 *
 * @param state 最新のゲーム ステート
 * @param commands コマンド
 * @return コマンド抽出結果、抽出できない場合はnullを返す
 */
export function extractBatteryCommands(state: GameState, commands: [PlayerCommand, PlayerCommand]): ?Resp {
  const attackerCommand = commands.find(v => v.playerId === state.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== state.activePlayerId);
  if (!attackerCommand ||!defenderCommand) {
    return null;
  }

  if (attackerCommand.command.type !== 'BATTERY_COMMAND' || defenderCommand.command.type !== 'BATTERY_COMMAND') {
    return null;
  }

  const attackerBattery: PlayerCommandX<BatteryCommand> = {
    playerId: attackerCommand.playerId,
    command: attackerCommand.command
  };
  const defenderBattery: PlayerCommandX<BatteryCommand> = {
    playerId: defenderCommand.playerId,
    command: defenderCommand.command
  };
  return {
    attacker: attackerBattery,
    defender: defenderBattery
  };
}