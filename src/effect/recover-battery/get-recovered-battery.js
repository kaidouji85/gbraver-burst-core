// @flow

/**
 * 回復後のバッテリー値を取得する
 *
 * @param battery 現在のバッテリー値
 * @param maxBattery 最大バッテリー値
 * @param recoveryValue 回復量
 * @return 回復後のバッテリー
 */
export function getRecoveredBattery(battery: number, maxBattery: number, recoveryValue: number): number {
  return Math.min(battery + recoveryValue, maxBattery);
}