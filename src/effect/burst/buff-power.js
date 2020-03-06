// @flow

import type {BuffPower, Burst} from "../../player/armdozer/burst";
import type {PlayerState, PlayerStateX} from "../../state/player-state";
import type {ArmdozerState, ArmdozerStateX} from "../../state/armdozer-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * バースト効果 攻撃力バフ
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function buffPower(burstPlayer: PlayerStateX<BuffPower>, otherPlayer: PlayerState): PlayerState[] {
  const castedArmdozer: ArmdozerState = ((burstPlayer.armdozer: any): ArmdozerStateX<Burst | typeof burstPlayer.armdozer.burst>);
  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: getBurstRecoverBattery(castedArmdozer),
        enableBurst: false,
        effects: [
          ...burstPlayer.armdozer.effects,
          {
            type: 'CorrectPower',
            power: burstPlayer.armdozer.burst.buffPower,
            remainingTurn: burstPlayer.armdozer.burst.duration,
          }
        ]
      }
    },
    otherPlayer,
  ];
}
