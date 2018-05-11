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
  const enableBattery = getEnableBattery(armdozer);
  return toBatteryCommandList(enableBattery);
}

/**
 * アームドーザの状態から、選択可能なバッテリーポイントを返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
export function getEnableBattery(armdozer: ArmdozerState): number[] {
  return R.range(0, armdozer.maxBattery + 1)
    .filter(v => v <= armdozer.battery);
}

/**
 * 選択可能なバッテリーポイントから、バッテリーコマンドリストを作る
 *
 * @param enableBattery 選択可能なバッテリー
 * @return 計算結果
 */
export function toBatteryCommandList(enableBattery: number[]): BatteryCommand[] {
  return enableBattery.map(v => ({type: 'BATTERY_COMMAND', battery: v}));
}