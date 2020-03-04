// @flow

import type {PlayerState, PlayerStateX} from "../../state/player-state";
import type {Burst, RecoverBattery} from "../../player/armdozer/burst";
import type {ArmdozerStateX} from "../../state/armdozer-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * バースト効果 バッテリー回復
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function recoverBattery(burstPlayer: PlayerStateX<RecoverBattery>, otherPlayer: PlayerState): PlayerState[] {
  const castedArmdozer = ((burstPlayer.armdozer: any): ArmdozerStateX<Burst | typeof burstPlayer.armdozer.burst>);
  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: getBurstRecoverBattery(castedArmdozer),
        enableBurst: false,
      }
    },
    otherPlayer,
  ];
}
