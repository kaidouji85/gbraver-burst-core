// @flow

import {getBurstRecoverBattery} from "./get_burst_recover_battery";
import type {LightningBarrier} from '../../player/armdozer/burst';
import type {PlayerStateX, PlayerState} from '../../state/player-state';
import type {ArmdozerState, ArmdozerStateX} from '../../state/armdozer-state';
import type {Burst} from '../../player/armdozer/burst';

/**
 * 電撃バリアの効果を適用する
 *
 * @param burstPlayer バーストするプレイヤー
 * @param otherPlayer それ以外のプレイヤー
 * @return 更新結果
 */
export function lightningBarrier(burstPlayer: PlayerStateX<LightningBarrier>, otherPlayer: PlayerState): PlayerState[] {
  const castedArmdozer: ArmdozerState = ((burstPlayer.armdozer: any): ArmdozerStateX<Burst | typeof burstPlayer.armdozer.burst>);
  return [
    {
      ...burstPlayer,
      armdozer: {
        ...burstPlayer.armdozer,
        enableBurst: false,
        battery: getBurstRecoverBattery(castedArmdozer),
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
