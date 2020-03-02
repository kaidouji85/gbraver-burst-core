// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerCommand} from "../../command/player-command";
import type {PlayerState} from "../../game-state/player-state";
import type {BatteryCommand} from "../../command/battery";

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

  const updatedAttacker = {
    ...attacker,
    armdozer: {
      ...attacker.armdozer,
      battery: attacker.armdozer.battery - attackerBattery.battery,
    }
  };

  const updatedDefender = {
    ...defender,
    armdozer: {
      ...defender.armdozer,
      battery: defender.armdozer.battery - defenderBattery.battery,
    }
  };

  return {
    ...lastState,
    players: [updatedAttacker, updatedDefender],
    effect: {
      name: 'BatteryDeclaration',
      attacker: attacker.playerId,
      attackerBattery: attackerBattery.battery,
      defenderBattery: defenderBattery.battery,
    }
  }
}