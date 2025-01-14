import { BatteryCommand } from "../command/battery";
import { ArmdozerEffect } from "../state/armdozer-effect";
import { hasArmdozerEffectsDisabled } from "./has-armdozer-effects-disabled";

/**
 * アームドーザ効果のバッテリー補正合計値を計算する
 * @param effects アームドーザエフェクト
 * @returns バッテリー補正値合計
 */
export function totalBatteryCorrection(effects: ArmdozerEffect[]): number {
  return effects
    .map((v) => (v.type === "BatteryCorrection" ? v.batteryCorrection : 0))
    .reduce((a, b) => a + b, 0);
}

/**
 * 補正後のバッテリー宣言を計算する
 * @param command バッテリーコマンド
 * @param effects アームドーザ効果
 * @returns 補正後のバッテリー
 */
export function correctedBattery(
  command: BatteryCommand,
  effects: ArmdozerEffect[],
): number {
  if (command.battery <= 0 || hasArmdozerEffectsDisabled(effects)) {
    return command.battery;
  }

  const totalCorrection = totalBatteryCorrection(effects);
  const corrected = command.battery + totalCorrection;
  return Math.max(corrected, 0);
}
