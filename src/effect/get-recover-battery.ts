import { PlayerState } from "../state/player-state";

/**
 * 回復後のバッテリー値を取得する
 * @param player プレイヤーステート
 * @param recoverBattery バッテリー回復量
 * @returns 回復後のバッテリー値
 */
export const getRecoverBattery = (
  player: PlayerState,
  recoverBattery: number,
): number =>
  Math.min(
    player.armdozer.battery + recoverBattery,
    player.armdozer.maxBattery,
  );
