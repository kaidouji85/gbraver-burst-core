import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import type { BurstEffect } from "./burst-effect";
import { continuousActivePlayer } from "./continuous-active-player";
import { lightningBarrier } from "./lightning-barrier";
import { recoverBattery } from "./recover-battery";

/**
 * バースト効果を適用する
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return 更新結果、更新できない場合は例外を投げる
 */
export function burstEffect(
  lastState: GameState,
  burstPlayerId: PlayerId,
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === burstPlayerId,
  );
  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  if (burstPlayer.armdozer.burst.type === "RecoverBattery") {
    return recoverBattery(lastState, burstPlayerId, burstPlayer.armdozer.burst);
  }

  if (burstPlayer.armdozer.burst.type === "BuffPower") {
    return buffPower(lastState, burstPlayerId, burstPlayer.armdozer.burst);
  }

  if (burstPlayer.armdozer.burst.type === "LightningBarrier") {
    return lightningBarrier(
      lastState,
      burstPlayerId,
      burstPlayer.armdozer.burst,
    );
  }

  if (burstPlayer.armdozer.burst.type === "ContinuousAttack") {
    return continuousActivePlayer(
      lastState,
      burstPlayerId,
      burstPlayer.armdozer.burst,
    );
  }

  if (burstPlayer.armdozer.burst.type === "BatteryLimitBreak") {
    return batteryLimitBreak(
      lastState,
      burstPlayerId,
      burstPlayer.armdozer.burst,
    );
  }

  throw new Error("burst not found");
}

/**
 * 指定したプレイヤーのバーストを利用不能にする
 * @param lastState 最新状態
 * @return 更新結果
 */
export function disableBurst(
  lastState: GameStateX<BurstEffect>,
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === lastState.effect.burstPlayer,
  );

  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  const updatedBurstPlayer = {
    ...burstPlayer,
    armdozer: { ...burstPlayer.armdozer, enableBurst: false },
  };
  const updatedPlayers = lastState.players.map((v) =>
    v.playerId === updatedBurstPlayer.playerId ? updatedBurstPlayer : v,
  );
  return { ...lastState, players: updatedPlayers };
}

/**
 * バーストを実行する
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(
  lastState: GameState,
  burstPlayerId: PlayerId,
): GameStateX<BurstEffect> {
  const doneBurstEffect = burstEffect(lastState, burstPlayerId);
  return disableBurst(doneBurstEffect);
}