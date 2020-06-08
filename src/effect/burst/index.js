// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {BuffPower, LightningBarrier, RecoverBattery, SkipTurn} from "../../player/armdozer/burst";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";
import {lightningBarrier} from "./lightning-barrier";
import {skipTurn} from "./skip-turn";

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

  if (burstPlayer.armdozer.burst.type === 'SkipTurn') {
    const skipTurnBurst: SkipTurn = burstPlayer.armdozer.burst;
    return skipTurn(lastState, burstPlayerId, skipTurnBurst);
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

  return lastState;
}
