import { PlayerState } from "../../state/player-state";

/** ターンチェンジの際に回復するバッテリー */
export const BATTERY_RECOVERY_VALUE = 3;

/** バッテリー回復結果 */
type RecoverBatteryResult = {
  /** バッテリー回復量 */
  recoverBattery: number;
  /** 回復後のバッテリー量 */
  battery: number;
};

/**
 * バッテリー回復スキップ
 * @param player プレイヤーステート
 * @return 計算結果
 */
const batteryRecoverSkip = (player: PlayerState) => ({
  recoverBattery: 0,
  battery: player.armdozer.battery,
});

/**
 * ターン開始時のバッテリー回復
 * @param player プレイヤーステート
 * @return 計算結果
 */
const turnStartRecoverBattery = (player: PlayerState) => ({
  recoverBattery: BATTERY_RECOVERY_VALUE,
  battery: Math.min(
    player.armdozer.battery + BATTERY_RECOVERY_VALUE,
    player.armdozer.maxBattery,
  ),
});

/**
 * ターン開始時のバッテリー回復処理計算
 * @param player プレイヤーステート
 * @returns 計算結果
 */
export function calcRecoverBattery(player: PlayerState): RecoverBatteryResult {
  const hasBatteryRecoverSkip = player.armdozer.effects.some(
    (e) => e.type === "BatteryRecoverSkip",
  );
  if (hasBatteryRecoverSkip) {
    return batteryRecoverSkip(player);
  }

  return turnStartRecoverBattery(player);
}
