// @flow

import type {GameState} from "../../game/state/game-state";
import type {NoChoice, Selectable} from "./input-command";
import type {Command, PlayerCommand} from "../../command/command";
import type {PlayerState} from "../../game/state/player-state";
import {isSelectableCommand} from "./is-selectable-command";
import {selectableBatteryCommand} from "./selectable-battery-command";
import {selectableBurstCommand} from "./selectable-burst-command";

/**
 * コマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @param commands このターン、各プレイヤーが入力した内容
 * @return 更新結果
 */
export function inputCommand(lastState: GameState, commands: PlayerCommand[]): GameState {
  lastState.players.map(player => {
    const myCommand = commands.find(command => command.playerId === player.playerId);
    const other = lastState.players.find(other => other.playerId !== player.playerId);
    const otherCommand = commands.find(command => command.playerId !== player.playerId);
    if (!myCommand || !other || !otherCommand) {
      return selectable(player);
    }

    const canNotSelectCommand = myCommand.command.type === 'BATTERY_COMMAND'
      && otherCommand.command.type === 'BURST_COMMAND'
      && other.armdozer.burst.type !== 'SKIP_TURN';
    return canNotSelectCommand ? noSelectable(player, myCommand.command) : selectable(player);
  });

  return lastState;
}

/**
 * コマンド選択可能なケース
 *
 * @param player プレイヤー情報
 * @return プレイヤーが次のターンに入力可能なコマンド
 */
function selectable(player: PlayerState): Selectable {
  return {
    playerId: player.playerId,
    selectable: true,
    command: [
      ...selectableBatteryCommand(player.armdozer),
      ...selectableBurstCommand(player.armdozer),
    ]
  };
}

/**
 * コマンド選択が不可能なケース
 * このターンに選択したコマンドをそのまま次も選択する
 *
 * @param player プレイヤー情報
 * @param command このターンの入力したコマンド
 * @return プレイヤーが次のターンに入力可能なコマンド
 */
function noSelectable(player: PlayerState, command: Command): NoChoice {
  return {
    playerId: player.playerId,
    selectable: false,
    nextTurnCommand: command
  };
}

// TODO 削除する
/**
 * コマンド入力フェイズのステートを生成する
 * ゲーム開始時、誰もバーストコマンドを選択したなかった場合、本関数でコマンド入力フェイズの効果を解決すること
 *
 * @param lastState 更新前の状態
 * @return コマンド入力状態
 */
export function delete_inputCommand(lastState: GameState): GameState {
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

// TODO 削除する
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
          : noSelectable(player, playerCommand.command);
      })
    }
  };
}