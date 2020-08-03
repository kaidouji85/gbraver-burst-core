// @flow

import type {GameState} from "../../game/state/game-state";
import type {NoChoice, Selectable} from "./input-command";
import type {Command, PlayerCommand} from "../../command/command";
import type {PlayerState} from "../../game/state/player-state";
import {selectableBatteryCommand} from "./selectable-battery-command";
import {selectableBurstCommand} from "./selectable-burst-command";
import {castQuickCommand} from "../../command/command";

/**
 * ゲームスタート時だけに利用するInputCommand
 * InputCommandはそのターンに入力したコマンドを参照する想定だが、
 * ゲーム開始時にコマンド入力できないので、本関数を用意した
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function gameStartInputCommand(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(v => selectable(v))
    }
  };
}

/**
 * コマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @param commands このターン、各プレイヤーが入力した内容
 * @return 更新結果
 */
export function inputCommand(lastState: GameState, commands: PlayerCommand[]): GameState {
  const playerCommands = lastState.players.map(player => {
    const myCommand = commands.find(command => command.playerId === player.playerId);
    const other = lastState.players.find(other => other.playerId !== player.playerId);
    const otherCommand = commands.find(command => command.playerId !== player.playerId);
    if (!myCommand || !other || !otherCommand) {
      return selectable(player);
    }

    return isNoChoice(myCommand.command, otherCommand.command)
      ? noChoice(player, myCommand.command)
      : selectable(player);
  });

  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: playerCommands,
    }
  };
}

/**
 * コマンド選択不可能か否かを判定する
 *
 * @param myCommand 自分のコマンド
 * @param otherCommand 相手のコマンド
 * @return {boolean}
 */
export function isNoChoice(myCommand: Command, otherCommand: Command) {
  return myCommand.type === 'BATTERY_COMMAND'
    && !!castQuickCommand(otherCommand);
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
function noChoice(player: PlayerState, command: Command): NoChoice {
  return {
    playerId: player.playerId,
    selectable: false,
    nextTurnCommand: command
  };
}
