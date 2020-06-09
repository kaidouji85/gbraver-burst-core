// @flow

import type {PlayerState} from "../../game/state/player-state";
import type {BatteryCommand} from "../../command/battery";

/**
 * プレイヤーの状態更新 バッテリー戦g年
 *
 * @param origin 更新前
 * @param command バッテリーコマンド
 * @returns 更新結果
 */
export function updatePlayer(origin: PlayerState, command: BatteryCommand): PlayerState {
  return {
    ...origin,
    armdozer: {
      ...origin.armdozer,
      battery: origin.armdozer.battery - command.battery
    }
  };
}
