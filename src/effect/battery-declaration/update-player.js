// @flow

import type { BatteryCommand } from "../../command/battery";
import type { PlayerState } from "../../state/player-state";

/**
 * プレイヤーの状態更新 バッテリー使用後
 *
 * @param origin 更新前
 * @param command バッテリーコマンド
 * @returns 更新結果
 */
export function updatePlayer(
  origin: PlayerState,
  command: BatteryCommand
): PlayerState {
  return {
    ...origin,
    armdozer: {
      ...origin.armdozer,
      battery: origin.armdozer.battery - command.battery,
    },
  };
}
