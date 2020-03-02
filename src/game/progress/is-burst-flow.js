// @flow

import type {PlayerCommand} from "../../command/player-command";

/**
 * バーストフェイズを行うか否かを判定する
 *
 * @param commands プレイヤーが選択したコマンド
 * @return 判定結果、trueでバーストフェイズを行う
 */
export function isBurstFlow(commands: PlayerCommand[]): boolean {
  return commands.map(v => v.command.type)
    .includes('BURST_COMMAND');
}
