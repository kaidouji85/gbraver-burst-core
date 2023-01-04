import type {
  BatteryLimitBreak,
  BuffPower,
  ContinuousAttack,
  LightningBarrier,
  RecoverBattery,
} from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import type { BurstEffect } from "./burst-effect";
import { continuousAttack } from "./continuous-attack";
import { lightningBarrier } from "./lightning-barrier";
import { recoverBattery } from "./recover-battery";

/**
 * バーストを実行する
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(
  lastState: GameState,
  burstPlayerId: PlayerId
): GameStateX<BurstEffect> {
  const doneBurstEffect = burstEffect(lastState, burstPlayerId);
  return disableBurst(doneBurstEffect);
}

/**
 * バースト効果を適用する
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return 更新結果、更新できない場合は例外を投げる
 */
export function burstEffect(
  lastState: GameState,
  burstPlayerId: PlayerId
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === burstPlayerId
  );

  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  if (burstPlayer.armdozer.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = burstPlayer.armdozer.burst;
    return recoverBattery(lastState, burstPlayerId, burst);
  }

  if (burstPlayer.armdozer.burst.type === "BuffPower") {
    const burst: BuffPower = burstPlayer.armdozer.burst;
    return buffPower(lastState, burstPlayerId, burst);
  }

  if (burstPlayer.armdozer.burst.type === "LightningBarrier") {
    const lightningBarrierBurst: LightningBarrier = burstPlayer.armdozer.burst;
    return lightningBarrier(lastState, burstPlayerId, lightningBarrierBurst);
  }

  if (burstPlayer.armdozer.burst.type === "ContinuousAttack") {
    const continuousAttackBurst: ContinuousAttack = burstPlayer.armdozer.burst;
    return continuousAttack(lastState, burstPlayerId, continuousAttackBurst);
  }

  if (burstPlayer.armdozer.burst.type === "BatteryLimitBreak") {
    const batteryLimitBreakBurst: BatteryLimitBreak =
      burstPlayer.armdozer.burst;
    return batteryLimitBreak(lastState, burstPlayerId, batteryLimitBreakBurst);
  }

  throw new Error("burst not found");
}

/**
 * 指定したプレイヤーのバーストを利用不能にする
 * @param lastState 最新状態
 * @return 更新結果
 */
export function disableBurst(
  lastState: GameStateX<BurstEffect>
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === lastState.effect.burstPlayer
  );

  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  const updatedBurstPlayer = {
    ...burstPlayer,
    armdozer: { ...burstPlayer.armdozer, enableBurst: false },
  };
  const updatedPlayers = lastState.players.map((v) =>
    v.playerId === updatedBurstPlayer.playerId ? updatedBurstPlayer : v
  );
  return { ...lastState, players: updatedPlayers };
}
