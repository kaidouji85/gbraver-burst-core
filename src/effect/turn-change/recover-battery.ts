import { PlayerState } from "../../state/player-state";

/** ターン開始時に回復するバッテリーの基礎値 */
const BASIC_BATTERY_RECOVER = 3;

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
const turnStartRecoverBattery = (player: PlayerState) => {
  const correct = player.armdozer.effects
    .map((e) => (e.type === "TurnStartBatteryCorrect" ? e.correctBattery : 0))
    .reduce((total, v) => total + v, 0);
  const recoverBattery = BASIC_BATTERY_RECOVER + correct;
  const battery = Math.min(
    player.armdozer.battery + recoverBattery,
    player.armdozer.maxBattery,
  );
  return { recoverBattery, battery };
};

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
