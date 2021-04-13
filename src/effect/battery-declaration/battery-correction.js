// @flow

import type {ArmdozerEffect} from "../../state/armdozer-effect";
import type {BatteryCommand} from "../../command/battery";

/**
 * 補正後のバッテリーを取得する
 *
 * @param command バッテリーコマンド
 * @param effects アームドーザ効果
 * @return 補正後のバッテリー
 */
export function correctedBattery(command: BatteryCommand, effects: ArmdozerEffect[]): number {
  if (command.battery <= 0) {
    return 0;
  }

  const totalCorrection = totalBatteryCorrection(effects);
  const corrected = command.battery + totalCorrection;
  return Math.max(corrected, 0);
}

/**
 * バッテリー補正の合計値を取得する
 *
 * @param effects アームドーザエフェクト
 * @return バッテリー補正値合計
 */
export function totalBatteryCorrection(effects: ArmdozerEffect[]): number {
  return effects
    .map(v => (v.type === 'BatteryCorrection') ? v.batteryCorrection : 0)
    .reduce((a, b) => a + b, 0);
}