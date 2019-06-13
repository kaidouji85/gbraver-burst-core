// @flow

import type {GameState} from "../../game-state/game-state";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";
import type {PlayerCommand} from "../../command/player-command";
import {selectableCommandAfterBurst} from "./selectable-command-after-burst";

/**
 * コマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @return コマンド入力状態
 */
export function inputCommand(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(v => ({
        playerId: v.playerId,
        command: [
          ...getEnableBatteryCommand(v.armdozer),
          ...getEnableBurstCommand(v.armdozer)
        ]
      }))
    }
  };
}

/**
 * バーストフェイズ後のコマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @param commands バーストフェイズ発生時に各プレイヤーが選択したコマンド
 * @returns コマンド入力状態
 */
export function inputCommandAfterBurst(lastState: GameState, commands: PlayerCommand[]): GameState {
  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(player => {
        const playerCommand = commands.find(v => v.playerId === player.playerId);
        const command = playerCommand ? selectableCommandAfterBurst(player, playerCommand.command) : [];
        return {
          playerId: player.playerId,
          command: command
        }
      })
    }
  };
}
