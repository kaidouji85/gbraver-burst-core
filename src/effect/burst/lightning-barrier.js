// @flow

import type {BurstPlayer} from "./burst-player";
import type {LightningBarrier, PlayerState} from "../..";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * 電撃バリアの効果を適用する
 *
 * @param burstPlayer バーストするプレイヤー
 * @param otherPlayer それ以外のプレイヤー
 * @return 更新結果
 */
export function lightningBarrier(burstPlayer: BurstPlayer<LightningBarrier>, otherPlayer: PlayerState): PlayerState[] {
  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        enableBurst: false,
        battery: getBurstRecoverBattery(burstPlayer.armdozer),
        effects: [
          ...burstPlayer.armdozer.effects,
          {
            type: 'TryReflect',
            damage: burstPlayer.armdozer.burst.damage,
            effect: 'Lightning',
            remainingTurn: burstPlayer.armdozer.burst.duration
          }
        ]
      }
    },
    otherPlayer
  ];
}
