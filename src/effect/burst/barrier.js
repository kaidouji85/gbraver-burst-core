// @flow

import type {BurstPlayer} from "./burst-player";
import type {Barrier} from "../../armdozer/burst";
import type {PlayerState} from "../../game-state/player-state";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * バースト効果 バリア
 *
 * @param burstPlayer バーストしたプレイたー
 * @param otherPlayer それ以外のプレイヤー
 * @return 更新結果
 */
export function barrier(burstPlayer: BurstPlayer<Barrier>, otherPlayer: PlayerState): PlayerState[] {
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
            type: 'Barrier',
            damage: burstPlayer.armdozer.burst.damage,
            remainingTurn: burstPlayer.armdozer.burst.duration,
          }
        ]
      },
    },
    otherPlayer
  ];
}