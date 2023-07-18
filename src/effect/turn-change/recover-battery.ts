import { PlayerState } from "../../state/player-state";

/** ターンチェンジの際に回復するバッテリー */
export const BATTERY_RECOVERY_VALUE = 3;

/** 計算結果 */
type Ret = {
  recoverBattery: number;
  battery: number;
};

/**
 * ターン開始時のバッテリー回復処理計算
 * @param player プレイヤーステート
 * @return 計算結果
 */
export function calcTurnChangeRecoverBattery(player: PlayerState): Ret {
  const hasBatteryRecoverSkip = player.armdozer.effects.some(
    (v) => v.type === "BatteryRecoverSkip",
  );
  if (hasBatteryRecoverSkip) {
    return {
      recoverBattery: 0,
      battery: player.armdozer.battery,
    };
  }

  return {
    recoverBattery: BATTERY_RECOVERY_VALUE,
    battery: Math.min(
      player.armdozer.battery + BATTERY_RECOVERY_VALUE,
      player.armdozer.maxBattery,
    ),
  };
}
