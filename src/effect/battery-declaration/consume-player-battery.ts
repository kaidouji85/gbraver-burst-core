import { BatteryCommand } from "../../command/battery";
import { PlayerState } from "../../state/player-state";

/**
 * プレイヤーのバッテリーを消費する
 * @param origin バッテリー消費前のステート
 * @param command バッテリーコマンド
 * @returns バッテリー消費後のステート
 */
export function consumePlayerBattery(
  origin: PlayerState,
  command: BatteryCommand,
): PlayerState {
  return {
    ...origin,
    armdozer: {
      ...origin.armdozer,
      battery: origin.armdozer.battery - command.battery,
    },
  };
}
