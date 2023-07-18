import { PlayerState } from "../../state/player-state";

/** ターンチェンジの際に回復するバッテリー */
export const BATTERY_RECOVERY_VALUE = 3;

/**
 * @deprecated
 * 回復後のバッテリー値を取得する
 * @param battery 現在のバッテリー値
 * @param maxBattery 最大バッテリー値
 * @param recoveryValue 回復量
 * @return 回復後のバッテリー
 */
export function turnChangeRecoverBattery(
  battery: number,
  maxBattery: number,
  recoveryValue: number,
): number {
  return Math.min(battery + recoveryValue, maxBattery);
}

/**
 * 回復後のバッテリー値を取得する
 * @param player プレイヤーステート
 * @return 回復後のバッテリー
 */
export function tekitou(
  player: PlayerState
): number {
  const hasBatteryRecoverSkip = player.armdozer.effects
    .some(v => v.type === 'BatteryRecoverSkip');
  if (hasBatteryRecoverSkip) {
    return 0;
  }

  return Math.min(player.armdozer.battery + BATTERY_RECOVERY_VALUE, player.armdozer.maxBattery);
}