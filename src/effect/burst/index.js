// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerId} from "../../player/player";
import type {BuffPower, ContinuousAttack, LightningBarrier, RecoverBattery} from "../../player/burst";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";
import {lightningBarrier} from "./lightning-barrier";
import {continuousAttack} from "./continuous-attack";

/**
 * バーストを実施する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト実施後の状態
 */
export function burst(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const doneBurstEffect = burstEffect(lastState, burstPlayerId);
  return disableBurst(doneBurstEffect, burstPlayerId);
}

/**
 * バースト効果を適用する
 *
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤー
 * @return 更新結果
 */
export function burstEffect(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  if (burstPlayer.armdozer.burst.type === 'RecoverBattery') {
    const recoverBatteryBurst: RecoverBattery = burstPlayer.armdozer.burst;
    return recoverBattery(lastState, burstPlayerId, recoverBatteryBurst);
  }

  if (burstPlayer.armdozer.burst.type === 'BuffPower') {
    const buffPowerBurst: BuffPower = burstPlayer.armdozer.burst;
    return buffPower(lastState, burstPlayerId, buffPowerBurst);
  }

  if (burstPlayer.armdozer.burst.type === 'LightningBarrier') {
    const lightningBarrierBurst: LightningBarrier = burstPlayer.armdozer.burst;
    return lightningBarrier(lastState, burstPlayerId, lightningBarrierBurst);
  }

  if (burstPlayer.armdozer.burst.type === 'ContinuousAttack') {
    const continuousAttackBurst: ContinuousAttack = burstPlayer.armdozer.burst;
    return continuousAttack(lastState, burstPlayerId, continuousAttackBurst);
  }

  return lastState;
}

/**
 * 指定したプレイヤーのバーストを利用不能にする
 *
 * @param lastState 最新状態
 * @param burstPlayerId バーストしたプレイヤー
 * @return 更新結果
 */
export function disableBurst(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const updatedBurstPlayer = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      enableBurst: false
    }
  };
  const updatedPlayers = lastState.players.map(player => player.playerId === burstPlayerId
    ? updatedBurstPlayer
    : player
  );
  return {
    ...lastState,
    players: updatedPlayers,
  };
}