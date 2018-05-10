// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {Command} from "../../command/command";
import * as R from "ramda";

/**
 * アームドーザの状態から、出せるバッテリーポイントを返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
export function getEnableBattery(armdozer: ArmdozerState): number[] {
  return R.range(0, armdozer.maxBattery + 1)
    .filter(v => v <= armdozer.battery);
}