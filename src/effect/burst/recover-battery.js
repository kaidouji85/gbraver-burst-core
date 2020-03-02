// @flow

import type {PlayerState} from "../../state/player-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";
import type {BurstPlayer} from "./burst-player";
import type {RecoverBattery} from "../../player/armdozer/burst";

/**
 * バースト効果 バッテリー回復
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function recoverBattery(burstPlayer: BurstPlayer<RecoverBattery>, otherPlayer: PlayerState): PlayerState[] {
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
