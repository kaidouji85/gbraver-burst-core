// @flow

import type {PlayerState} from "../../game-state/player-state";
import {doRecoverBattery} from "./do-recover-battery";

/**
 * 各プレイヤーのステータスをバースト実施後のものに更新する
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function updateForBurst(burstPlayer: PlayerState, otherPlayer: PlayerState): PlayerState[] {
  switch (burstPlayer.armdozer.burst.type) {
    case 'RecoverBattery':
      return doRecoverBattery(burstPlayer, otherPlayer);
    default:
      return [burstPlayer, otherPlayer];
  }
}
