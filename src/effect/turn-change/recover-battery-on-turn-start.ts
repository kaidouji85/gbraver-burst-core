import { PlayerState } from "../../state/player-state";
import { getRecoverBattery } from "../get-recover-battery";

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
 * バッテリー回復スキップ時の処理
 * @param player プレイヤーステート
 * @return 計算結果
 */
const onBatteryRecoverSkip = (player: PlayerState) => ({
  recoverBattery: 0,
  battery: player.armdozer.battery,
});

/**
 * バッテリー回復時の処理
 * @param player プレイヤーステート
 * @return 計算結果
 */
const onBatteryRecover = (player: PlayerState) => {
  const correct = player.armdozer.effects
    .map((e) => (e.type === "TurnStartBatteryCorrect" ? e.correctBattery : 0))
    .reduce((total, v) => total + v, 0);
  const recoverBattery = BASIC_BATTERY_RECOVER + correct;
  const battery = getRecoverBattery(player, recoverBattery);
  return { recoverBattery, battery };
};

/**
 * ターン開始時のバッテリー回復処理計算
 * @param player プレイヤーステート
 * @returns 計算結果
 */
export function recoverBatteryOnTurnStart(
  player: PlayerState,
): RecoverBatteryResult {
  const hasBatteryRecoverSkip = player.armdozer.effects.some(
    (e) => e.type === "BatteryRecoverSkip",
  );
  if (hasBatteryRecoverSkip) {
    return onBatteryRecoverSkip(player);
  }

  return onBatteryRecover(player);
}
