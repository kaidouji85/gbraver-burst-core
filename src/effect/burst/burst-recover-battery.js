// @flow

import type {ArmdozerState} from "../../game/state/armdozer-state";
import type {Burst} from "../..";

/**
 * バーストで回復した後のバッテリー値を計算する
 *
 * @param armdozer アームドーザ状態
 * @param burst バースト
 * @return バースト実施後のバッテリー値
 */
export function burstRecoverBattery(armdozer: ArmdozerState, burst: Burst): number {
  const recoverBattery = burst.recoverBattery;
  return Math.min(armdozer.battery + recoverBattery, armdozer.maxBattery);
}