// @flow

import type {BatteryCommand} from "../command/battery";
import type {ArmdozerEffect} from "../state/armdozer-effect";

/**
 * 補正後のバッテリー宣言を計算する
 *
 * @param command バッテリーコマンド
 * @param effects アームドーザ効果
 * @return 補正後のバッテリー
 */
export function correctedBattery(command: BatteryCommand, effects: ArmdozerEffect[]): number {
  if (command.battery <= 0) {
    return command.battery;
  }

  if (hasIgnoreBatteryCorrection(effects)) {
    return command.battery;
  }

  const totalCorrection = totalBatteryCorrection(effects);
  const corrected = command.battery + totalCorrection;
  return Math.max(corrected, 0);
}

/**
 * バッテリー補正無効効果を持つか否かを判定する
 * trueでバッテリー補正無効効果を持つ
 *
 * @param effects アームドーザエフェクト
 * @return 判定結果
 */
export function hasIgnoreBatteryCorrection(effects: ArmdozerEffect[]): boolean {
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