// @flow

import type {BuffPower, Burst} from "../../player/armdozer/burst";
import type {PlayerState, PlayerStateX} from "../../state/player-state";
import type {ArmdozerState, ArmdozerStateX} from "../../state/armdozer-state";
import {burstRecoverBattery, getBurstRecoverBattery} from "./get-burst-recover-battery";
import type {GameState, PlayerId} from "../..";

// TODO 削除する
/**
 * バースト効果 攻撃力バフ
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function delete_buffPower(burstPlayer: PlayerStateX<BuffPower>, otherPlayer: PlayerState): PlayerState[] {
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

/**
 * バースト 攻撃力アップ
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果
 */
export function buffPower(lastState: GameState, burstPlayerId: PlayerId, burst: BuffPower): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
      enableBurst: false,
      effects: [
        ...burstPlayer.armdozer.effects,
        {
          type: 'CorrectPower',
          power: burst.buffPower,
          remainingTurn: burst.duration,
        }
      ]
    }
  };
  const updatedPlayers = lastState.players.map(player => player.playerId === burstPlayerId
    ? updatedBurstPlayer
    : player
  );
  return {
    ...lastState,
    players: updatedPlayers,
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayerId,
      burst: burst,
    }
  };
}