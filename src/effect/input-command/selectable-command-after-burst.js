// @flow

import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBatteryCommand} from "./enable-battery-command";

/**
 * バーストフェイズ後に選択可能なコマンドを取得する
 *
 * @param player プレイヤーの状態
 * @param command バーストフェイズにプレイヤーが選択したコマンド
 * @returns コマンド
 */
export function selectableCommandAfterBurst(player: PlayerState, command: Command): Command[] {
  switch (command.type) {
    case 'BATTERY_COMMAND':
      return [command];
    case 'BURST_COMMAND':
      // getEnableBatteryCommand(player.armdozer)をそのまま返すと、flowでエラーになる
      // それを回避するために、配列を詰めなおしている
      return [...getEnableBatteryCommand(player.armdozer)];
    default:
      return [];
  }
}
