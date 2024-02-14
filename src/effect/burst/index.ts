import { Burst } from "../../player/burst";
import { RecoverBattery } from "../../player/burst/recover-battery";
import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { PlayerState } from "../../state/player-state";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import { BurstEffect } from "./burst-effect";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { continuousActivePlayer } from "./continuous-active-player";
import { lightningBarrier } from "./lightning-barrier";
import { deprecatedRecoverBattery, recoverBattery } from "./recover-battery";

/**
 * @deprecated
 * バースト効果を発動する
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return 更新結果、更新できない場合は例外を投げる
 */
function deprecatedInvokeBurst(
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
    return deprecatedRecoverBattery(
      lastState,
      burstPlayerId,
      burstPlayer.armdozer.burst,
    );
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
 * @deprecated
 * 指定したプレイヤーのバーストを利用不能にする
 * @param lastState 最新状態
 * @return 更新結果
 */
export function disableBurst(
  lastState: GameStateX<BurstEffect>,
): GameStateX<BurstEffect> {
  const updateBurstPlayer = (burstPlayer: PlayerState) => ({
    ...burstPlayer,
    armdozer: { ...burstPlayer.armdozer, enableBurst: false },
  });
  const players = lastState.players.map((v) =>
    v.playerId === lastState.effect.burstPlayer ? updateBurstPlayer(v) : v,
  );
  return { ...lastState, players };
}

/**
 * バースト種別に応じた効果を適用する
 * @param params バースト発動情報
 * @return バースト発動結果
 */
function invokeBurst(params: BurstInvoke<Burst>): BurstInvokeResult {
  if (params.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = params.burst;
    return recoverBattery({ ...params, burst });
  }

  throw new Error("burst not found");
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
  const invoker = lastState.players.find((v) => v.playerId === burstPlayerId);
  const other = lastState.players.find((v) => v.playerId !== burstPlayerId);
  if (!invoker || !other) {
    throw new Error("invalid burst player id");
  }

  const result = invokeBurst({
    burst: invoker.armdozer.burst,
    invoker,
    other,
  });
  const updatedInvoker = {
    ...result.invoker,
    armdozer: {
      ...result.invoker.armdozer,
      enableBurst: false,
    },
  };
  const updatedOther = result.other;
  const players = lastState.players.map((v) =>
    v.playerId === burstPlayerId ? updatedInvoker : updatedOther,
  );
  return {
    ...lastState,
    players,
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayerId,
      burst: invoker.armdozer.burst,
    },
  };
}
