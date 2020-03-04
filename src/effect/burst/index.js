// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {PlayerState} from "../../state/player-state";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";
import {lightningBarrier} from "./lightning-barrier";
import type {BuffPower, LightningBarrier, RecoverBattery} from "../..";
import type {BurstPlayer} from "./burst-player";

/**
 * バーストを実施する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト実施後の状態
 */
export function burst(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  const otherPlayer = lastState.players.find(v => v.playerId !== burstPlayerId);
  if (!burstPlayer || !otherPlayer) {
    return lastState;
  }

  const updatedPlayers = updateForBurst(burstPlayer, otherPlayer);
  const sortedPlayers = lastState.players
    .map(player => updatedPlayers.find(v => v.playerId === player.playerId) || player);
  return {
    ...lastState,
    players: sortedPlayers,
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: burstPlayer.armdozer.burst,
    }
  };
}

/**
 * 各プレイヤーのステータスをバースト実施後のものに更新する
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function updateForBurst(burstPlayer: PlayerState, otherPlayer: PlayerState): PlayerState[] {
  if (burstPlayer.armdozer.burst.type === 'RecoverBattery') {
    const recoverBatteryPlayer: BurstPlayer<RecoverBattery> = (burstPlayer: (typeof burstPlayer.armdozer.burst));
    return recoverBattery(recoverBatteryPlayer, otherPlayer);
  }

  if (burstPlayer.armdozer.burst.type === 'BuffPower') {
    const buffPowerPlayer : BurstPlayer<BuffPower> = (burstPlayer: (typeof burstPlayer.armdozer.burst));
    return buffPower(buffPowerPlayer, otherPlayer);
  }

  if (burstPlayer.armdozer.burst.type === 'LightningBarrier') {
    const lightningBarrierPlayer: BurstPlayer<LightningBarrier> = (burstPlayer: (typeof burstPlayer.armdozer.burst));
    return lightningBarrier(lightningBarrierPlayer, otherPlayer);
  }

  return  [burstPlayer, otherPlayer];
}
