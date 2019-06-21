// @flow

import type {BurstPlayer} from "./burst-player";
import type {BuffPower} from "../../armdozer/burst";
import type {PlayerState} from "../../game-state/player-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * バースト効果 攻撃力バフ
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function buffPower(burstPlayer: BurstPlayer<BuffPower>, otherPlayer: PlayerState): PlayerState[] {
  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        battery: getBurstRecoverBattery(burstPlayer.armdozer),
        enableBurst: false,
        effects: [
          ...burstPlayer.armdozer.effects,
          {
            type: 'CorrectPower',
            power: burstPlayer.armdozer.burst.plusPower,
            remainingTurn: burstPlayer.armdozer.burst.duration,
          }
        ]
      }
    },
    otherPlayer,
  ];
}
