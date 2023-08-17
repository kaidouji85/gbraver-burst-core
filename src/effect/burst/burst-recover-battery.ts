import type { Burst } from "../../player/burst";
import type { ArmdozerState } from "../../state/armdozer-state/armdozer-state";

/**
 * バーストで回復した後のバッテリー値を計算する
 * @param armdozer アームドーザ状態
 * @param burst バースト
 * @return バースト実施後のバッテリー値
 */
export function burstRecoverBattery(
  armdozer: ArmdozerState,
  burst: Burst,
): number {
  const recoverBattery = burst.recoverBattery;
  return Math.min(armdozer.battery + recoverBattery, armdozer.maxBattery);
}
