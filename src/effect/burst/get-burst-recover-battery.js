// @flow

import type {ArmdozerState} from "../../state/armdozer-state";
import type {Burst} from "../..";

// TODO 削除する
/**
 * バーストで回復した後のバッテリー値を計算する
 *
 * @param player バーストするプレイヤーの状態
 * @return バースト実施後のバッテリー値
 */
export function getBurstRecoverBattery(armdozer: ArmdozerState): number {
  const recoverBattery = armdozer.burst.recoverBattery;
  return Math.min(armdozer.battery + recoverBattery, armdozer.maxBattery);
}

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