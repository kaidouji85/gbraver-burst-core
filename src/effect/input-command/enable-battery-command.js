// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {Command} from "../../command/command";
import * as R from "ramda";

/**
 * アームドーザの状態から、バッテリー系コマンドで使えるものを返す
 * 使えるコマンドがない場合は空配列を返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
export function getEnableBatteryCommand(armdozer: ArmdozerState): Command[] {
  return R.range(0, armdozer.maxBattery + 1)
    .filter(v => v <= armdozer.battery)
    .map(v => ({type: 'BATTERY_COMMAND', battery: v}));
}