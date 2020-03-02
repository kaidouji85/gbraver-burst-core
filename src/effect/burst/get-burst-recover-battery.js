// @flow

import type {ArmdozerState} from "../../state/armdozer-state";

/**
 * バーストで回復した後のバッテリー値を計算する
 *
 * @param player バーストするプレイヤーの状態
 * @return バースト実施後のバッテリー値
 */
export function getBurstRecoverBattery(armdozer: ArmdozerState): number {
  return Math.min(armdozer.battery + armdozer.burst.recoverBattery, armdozer.maxBattery);
}
