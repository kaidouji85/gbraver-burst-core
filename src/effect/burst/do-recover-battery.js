// @flow

import type {PlayerState} from "../../game-state/player-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * バースト効果 バッテリー回復
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function doRecoverBattery(burstPlayer: PlayerState, otherPlayer: PlayerState): PlayerState[] {
  if (burstPlayer.armdozer.burst.type !== 'RecoverBattery') {
    return [burstPlayer, otherPlayer];
  }

  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: getBurstRecoverBattery(burstPlayer.armdozer),
        enableBurst: false,
      }
    },
    otherPlayer,
  ];
}
