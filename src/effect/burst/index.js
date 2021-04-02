// @flow

import type {GameState, GameStateX} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {BuffPower, ContinuousAttack, LightningBarrier, RecoverBattery} from "../../player/burst";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";
import {lightningBarrier} from "./lightning-barrier";
import {continuousAttack} from "./continuous-attack";
import type {BurstEffect} from "./burst-effect";

/**
 * バーストを実行する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(lastState: GameState, burstPlayerId: PlayerId): ?GameStateX<BurstEffect> {
  const doneBurstEffect = burstEffect(lastState, burstPlayerId);
  if (!doneBurstEffect) {
    return null;
  }

  return disableBurst(doneBurstEffect);
}

/**
 * バースト効果を適用する
 *
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return 更新結果
 */
export function burstEffect(lastState: GameState, burstPlayerId: PlayerId): ?GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return null;
  }

  if (burstPlayer.armdozer.burst.type === 'RecoverBattery') {
    const burst: RecoverBattery = burstPlayer.armdozer.burst;
    return recoverBattery(lastState, burstPlayerId, burst);
  }

  if (burstPlayer.armdozer.burst.type === 'BuffPower') {
    const burst: BuffPower = burstPlayer.armdozer.burst;
    return buffPower(lastState, burstPlayerId, burst);
  }

  if (burstPlayer.armdozer.burst.type === 'LightningBarrier') {
    const lightningBarrierBurst: LightningBarrier = burstPlayer.armdozer.burst;
    return lightningBarrier(lastState, burstPlayerId, lightningBarrierBurst);
  }

  if (burstPlayer.armdozer.burst.type === 'ContinuousAttack') {
    const continuousAttackBurst: ContinuousAttack = burstPlayer.armdozer.burst;
    return continuousAttack(lastState, burstPlayerId, continuousAttackBurst);
  }

  return null;
}

/**
 * 指定したプレイヤーのバーストを利用不能にする
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function disableBurst(lastState: GameStateX<BurstEffect>): ?GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(v => v.playerId === lastState.effect.burstPlayer);
  if (!burstPlayer) {
    return null;
  }

  const updatedBurstPlayer = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      enableBurst: false
    }
  };
  const updatedPlayers = lastState.players
    .map(v => (v.playerId === updatedBurstPlayer.playerId) ? updatedBurstPlayer : v);
  return {
    ...lastState,
    players: updatedPlayers,
  };
}