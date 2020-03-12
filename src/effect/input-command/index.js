// @flow

import type {GameState} from "../../state/game-state";
import type {NoChoice, Selectable} from "./input-command";
import type {Command, PlayerCommand} from "../../command/command";
import type {PlayerState} from "../../state/player-state";
import {isSelectableCommand} from "./is-selectable-command";
import {selectableBatteryCommand} from "./selectable-battery-command";
import {selectableBurstCommand} from "./selectable-burst-command";

/**
 * コマンド入力フェイズのステートを生成する
 * ゲーム開始時、誰もバーストコマンドを選択したなかった場合、本関数でコマンド入力フェイズの効果を解決すること
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
        selectable: true,
        command: [
          ...selectableBatteryCommand(v.armdozer),
          ...selectableBurstCommand(v.armdozer)
        ]
      }))
    }
  };
}

/**
 * バーストフェイズ後のコマンド入力フェイズのステートを生成する
 * 本関数はいずれかのプレイヤーがバーストコマンドを選択した場合に、実行される
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
        if (!playerCommand) {
          return selectable(player);
        }

        return isSelectableCommand(playerCommand.command)
          ? selectable(player)
          : noChoice(player, playerCommand.command);
      })
    }
  };
}

/** コマンド選択可能なケース */
function selectable(player: PlayerState): Selectable {
  return {
    playerId: player.playerId,
    selectable: true,
    command: [
      ...selectableBatteryCommand(player.armdozer)
    ]
  };
}

/** コマンド選択が不可能なケース */
function noChoice(player: PlayerState, command: Command): NoChoice {
  return {
    playerId: player.playerId,
    selectable: false,
    nextTurnCommand: command
  };
}