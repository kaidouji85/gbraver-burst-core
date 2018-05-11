// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import * as R from "ramda";
import type {BatteryCommand} from "../../command/battery";

/**
 * アームドーザの状態から実行可能なバッテリーコマンドを返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
export function getEnableBatteryCommand(armdozer: ArmdozerState): BatteryCommand[] {
  return R.range(0, armdozer.maxBattery + 1)
    .filter(v => v <= armdozer.battery)
    .map(v => ({type: 'BATTERY_COMMAND', battery: v}));
}
