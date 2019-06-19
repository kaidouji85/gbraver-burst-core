// @flow

import type {Command} from "../../command/command";

/**
 * コマンド選択可能か否かを判定する
 * 本関数はバーストフェイズ後のインプットコマンドフェイズで使われることを想定している
 *
 * @param command 前のターンにプレイヤーが選択したコマンド
 * @return 判定結果、trueでコマンド選択可能
 */
export function isSelectableCommand(command: Command): boolean {
  return command.type === 'BURST_COMMAND';
}