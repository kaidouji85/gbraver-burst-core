// @flow

import type {PlayerState} from "../../game-state/player-state";

/**
 * バーストで回復した後のバッテリー値を計算する
 *
 * @param player バーストするプレイヤーの状態
 * @return バースト実施後のバッテリー値
 */
export function getRecoverBattery(player: PlayerState): number {
  return Math.min(player.armdozer.battery + player.armdozer.burst.recoverBattery, player.armdozer.maxBattery);
}