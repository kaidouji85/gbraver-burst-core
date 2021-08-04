// @flow

import type {ArmdozerEffect} from "../state/armdozer-effect";
import type {BatteryCommand} from "../command/battery";

/**
 * 補正後のバッテリー宣言を計算する
 *
 * @param command バッテリーコマンド
 * @param effects アームドーザ効果
 * @return 補正後のバッテリー
 */
export function correctedBattery(command: BatteryCommand, effects: ArmdozerEffect[]): number {
  if (isIgnoreBatteryCorrection(effects)) {
    return command.battery;
  }

  const totalCorrection = totalBatteryCorrection(effects);
  const corrected = command.battery + totalCorrection;
  return Math.max(corrected, 0);
}

/**
 * バッテリー補正が無効になるか否かを判定する
 * trueでバッテリー補正無効である
 *
 * @param effects アームドーザエフェクト
 * @return 判定結果
 */
export function isIgnoreBatteryCorrection(effects: ArmdozerEffect[]): boolean {
  return effects
    .filter(v => v.type === 'IgnoreBatteryCorrection')
    .length > 0;
}

/**
 * アームドーザ効果のバッテリー補正合計値を計算する
 *
 * @param effects アームドーザエフェクト
 * @return バッテリー補正値合計
 */
export function totalBatteryCorrection(effects: ArmdozerEffect[]): number {
  return effects
    .map(v => (v.type === 'BatteryCorrection') ? v.batteryCorrection : 0)
    .reduce((a, b) => a + b, 0);
}