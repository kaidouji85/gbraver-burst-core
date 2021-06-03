// @flow

import type {GameState} from "../../state/game-state";
import {effectActivationFlow, isEffectActivationFlow} from "./effect-activation-flow";
import {battleFlow} from "./battle-flow";
import type {PlayerCommand, PlayerCommandX} from "../command/player-command";
import type {BatteryCommand} from '../../command/battery';

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: [PlayerCommand, PlayerCommand]): GameState[] {
  if (isEffectActivationFlow(commands)) {
    return effectActivationFlow(lastState, commands);
  }

  if ((commands[0].command.type === 'BATTERY_COMMAND') && (commands[1].command.type === 'BATTERY_COMMAND')) {
    const command1: BatteryCommand = commands[0].command;
    const playerCommand1 = ((commands[0]: any): PlayerCommandX<typeof command1>);
    const command2: BatteryCommand = commands[1].command;
    const playerCommand2 = ((commands[1]: any): PlayerCommandX<typeof command2>);
    return battleFlow(lastState, [playerCommand1, playerCommand2]);
  }

  throw new Error('invalid commands');
}